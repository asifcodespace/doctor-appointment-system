/**
 * api.ts — Centralised API layer for the Admin portal.
 *
 * All backend communication lives here. When the Go backend is ready,
 * update BASE_URL and the endpoint paths below — no other file needs
 * to change.
 *
 * Every function returns a typed result or throws an ApiError so the
 * UI can handle loading / error states uniformly.
 */

// ─── Config ──────────────────────────────────────────────────────────────────

/** Change this to the real server origin when the backend is running. */
const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:4000';

// ─── Shared types ─────────────────────────────────────────────────────────────

export type AppointmentStatus = 'Confirmed' | 'Pending' | 'Checked in' | 'Cancelled';

export interface Patient {
	name: string;
	/** e.g. "#APT-2041" — the display ID shown under the name */
	id: string;
	initials: string;
	avatarBg: string;
}

export interface Appointment {
	id: string;
	patient: Patient;
	doctor: string;
	/** Human-readable date+time string, e.g. "Today · 09:30" */
	dateTime: string;
	type: string;
	status: AppointmentStatus;
}

export interface AppointmentStats {
	totalToday: number;
	doctorCount: number;
	confirmed: number;
	pending: number;
	cancelled: number;
}

export interface ServerStatus {
	connected: boolean;
	/** Seconds since the last successful sync */
	lastSyncSeconds: number;
	timestamp?: number;
}

/** Used when a booking has no doctor on record. */
export const DEFAULT_DOCTOR = 'Dr Nafis Tarafder';

const DEFAULT_STATUS: AppointmentStatus = 'Pending';
const DEFAULT_TYPE = 'General Check-up';
const DEFAULT_AVATAR_BG = '#6D5EF5';

function initialsFromName(name: string): string {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) return 'P';
	if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
	return (parts[0][0] + parts[1][0]).toUpperCase();
}

/**
 * Fill fields the appointments table does not store.
 * Patient name, display id, visit type, and time come from the server when present.
 */
export function withAppointmentDefaults(
	apt: Partial<Appointment> & { patient?: Partial<Patient> }
): Appointment {
	const name = apt.patient?.name?.trim() || 'Patient';
	const id = apt.id?.trim() || '0';

	return {
		id,
		patient: {
			name,
			id: apt.patient?.id?.trim() || `#APT-${id}`,
			initials: apt.patient?.initials?.trim() || initialsFromName(name),
			avatarBg: apt.patient?.avatarBg?.trim() || DEFAULT_AVATAR_BG
		},
		doctor: apt.doctor?.trim() || DEFAULT_DOCTOR,
		dateTime: apt.dateTime?.trim() || 'Today',
		type: apt.type?.trim() || DEFAULT_TYPE,
		status: apt.status ?? DEFAULT_STATUS
	};
}

/**
 * Status buckets and doctor count are not stored. When the server omits them,
 * derive status counts from the list and assume the single practice doctor.
 */
export function completeAppointmentStats(
	partial: Partial<AppointmentStats>,
	appointments: Appointment[]
): AppointmentStats {
	const confirmed = appointments.filter((apt) => apt.status === 'Confirmed').length;
	const pending = appointments.filter((apt) => apt.status === 'Pending').length;
	const cancelled = appointments.filter((apt) => apt.status === 'Cancelled').length;

	return {
		totalToday: partial.totalToday ?? appointments.length,
		doctorCount: partial.doctorCount ?? 1,
		confirmed: partial.confirmed ?? confirmed,
		pending: partial.pending ?? pending,
		cancelled: partial.cancelled ?? cancelled
	};
}

// ─── Error helper ─────────────────────────────────────────────────────────────

export class ApiError extends Error {
	constructor(
		public readonly status: number,
		message: string
	) {
		super(message);
		this.name = 'ApiError';
	}
}

async function handleResponse<T>(res: Response): Promise<T> {
	if (!res.ok) {
		let message = `HTTP ${res.status}`;
		try {
			const body = await res.json();
			message = body?.message ?? body?.error ?? message;
		} catch {
			// ignore parse errors — keep the status message
		}
		throw new ApiError(res.status, message);
	}
	return res.json() as Promise<T>;
}

// ─── Appointments API ─────────────────────────────────────────────────────────

/**
 * Fetch all appointments for today (and upcoming).
 *
 * GET /api/appointments
 * Query params:
 *   status  — optional filter: "Pending" | "Confirmed" | "Cancelled" | "Checked in"
 *   search  — optional free-text search string
 *
 * Expected response shape:
 *   { appointments: Appointment[] }
 */
export async function fetchAppointments(params?: {
	status?: AppointmentStatus | 'All';
	search?: string;
}): Promise<Appointment[]> {
	const url = new URL(`${BASE_URL}/appointments`);

	if (params?.status && params.status !== 'All') {
		url.searchParams.set('status', params.status);
	}
	if (params?.search?.trim()) {
		url.searchParams.set('search', params.search.trim());
	}

	const res = await fetch(url.toString(), {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include'
	});

	interface AppointmentsResponse {
		appointments?: Array<Partial<Appointment>>;
		data?: { appointments?: Array<Partial<Appointment>> } | Array<Partial<Appointment>>;
	}

	const data = await handleResponse<AppointmentsResponse>(res);
	const items = Array.isArray(data.data)
		? data.data
		: (data.data?.appointments ?? data.appointments ?? []);

	return items.map((apt) => withAppointmentDefaults(apt));
}

/**
 * Fetch the summary stats shown in the four stat-cards.
 *
 * GET /api/appointments/stats
 *
 * The server returns totalToday. Doctor count and status buckets are omitted
 * when they are not stored; completeAppointmentStats fills those defaults.
 */
export async function fetchAppointmentStats(): Promise<Partial<AppointmentStats>> {
	const res = await fetch(`${BASE_URL}/appointments/stats`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include'
	});

	return handleResponse<Partial<AppointmentStats>>(res);
}

/**
 * Fetch the current server / connection status shown in the sidebar card.
 *
 * GET /api/status
 *
 * Expected response shape:
 *   { connected: boolean, lastSyncSeconds: number }
 */
export async function fetchServerStatus(): Promise<ServerStatus> {
	const res = await fetch(`${BASE_URL}/server/status`, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include'
	});

	return handleResponse<ServerStatus>(res);
}

/**
 * Update the status of a single appointment (e.g. Confirm / Cancel).
 *
 * PATCH /appointments/:id/status
 * Body: { status: AppointmentStatus }
 *
 * Returns the updated appointment.
 */
export async function updateAppointmentStatus(
	id: string,
	status: AppointmentStatus
): Promise<Appointment> {
	const res = await fetch(`${BASE_URL}/appointments/${id}/status`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'include',
		body: JSON.stringify({ status })
	});

	return handleResponse<Appointment>(res);
}

