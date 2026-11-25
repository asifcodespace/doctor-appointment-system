<script lang="ts">
	import type { Appointment, AppointmentStatus } from '#lib/api';

	let {
		appointment = null,
		onClose,
		onStatusChange,
		onReschedule,
		onRequestCancel
	}: {
		appointment: Appointment | null;
		onClose: () => void;
		onStatusChange: (id: string, status: AppointmentStatus) => void;
		onReschedule: (appointment: Appointment) => void;
		onRequestCancel: (appointment: Appointment) => void;
	} = $props();

	function getStatusBadge(status: AppointmentStatus) {
		switch (status) {
			case 'Confirmed':
				return { color: 'var(--color-status-green)', bg: 'rgba(52, 211, 153, 0.14)' };
			case 'Pending':
				return { color: 'var(--color-status-amber)', bg: 'rgba(251, 191, 36, 0.14)' };
			case 'Checked in':
				return { color: 'var(--color-status-blue)', bg: 'rgba(125, 211, 252, 0.14)' };
			case 'Cancelled':
				return { color: 'var(--color-status-red)', bg: 'rgba(252, 165, 165, 0.14)' };
			case 'Completed':
				return { color: '#a78bfa', bg: 'rgba(167, 139, 250, 0.14)' };
			default:
				return { color: 'var(--color-text-secondary)', bg: 'rgba(255,255,255,0.08)' };
		}
	}

	// Header label differs for Pending
	let headerLabel = $derived(
		appointment?.status === 'Pending' ? 'APPOINTMENT REQUEST' : 'APPOINTMENT'
	);

	// Date label for Pending: "Requested time", else "Date and time"
	let dateLabel = $derived(
		appointment?.status === 'Pending' ? 'Requested time' : 'Date and time'
	);

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && appointment) onClose();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if appointment}
	{@const badge = getStatusBadge(appointment.status)}

	<!-- Dimmed backdrop -->
	<div
		role="presentation"
		onclick={onClose}
		class="fixed inset-0 z-100 bg-black/75 backdrop-blur-xs transition-opacity"
	></div>

	<!-- Slide-in right drawer -->
	<aside
		aria-label="Appointment details"
		class="fixed top-0 right-0 bottom-0 z-100 flex w-full max-w-117.5 flex-col gap-5 overflow-y-auto border-l border-brand-border bg-brand-sidebar p-7 shadow-2xl"
	>
		<!-- Top Header -->
		<div class="flex items-center justify-between">
			<div>
				<div class="text-xs font-bold tracking-wider text-[#E6C27A] uppercase">{headerLabel}</div>
				<div class="text-2xl font-extrabold text-white">
					#{appointment.id.startsWith('APT-') ? appointment.id : `APT-${appointment.id}`}
				</div>
			</div>
			<button
				type="button"
				onclick={onClose}
				aria-label="Close panel"
				class="flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-2xl border border-btn-border bg-btn-dark text-text-primary transition-colors hover:border-btn-border-hover hover:bg-btn-hover"
			>
				<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round">
					<path d="M6 6l12 12M18 6L6 18" />
				</svg>
			</button>
		</div>

		<!-- Patient Card -->
		<div class="flex items-center gap-3.5 rounded-2xl border border-brand-border bg-brand-card p-4">
			<span
				style="background-color: {appointment.patient.avatarBg};"
				class="flex h-13 w-13 shrink-0 items-center justify-center rounded-full text-lg font-extrabold text-brand-bg"
			>
				{appointment.patient.initials}
			</span>
			<div class="min-w-0 flex-1">
				<div class="truncate text-base font-bold text-white">{appointment.patient.name}</div>
				<div class="text-xs text-text-secondary">{appointment.patient.id}</div>
			</div>
			<a
				href="/patients?search={encodeURIComponent(appointment.patient.id)}"
				class="shrink-0 text-xs font-semibold text-brand-teal no-underline hover:underline"
			>
				Open record
			</a>
		</div>

		<!-- Details List -->
		<div class="flex flex-col">
			<div class="flex items-center justify-between pb-2.5">
				<span class="text-xs font-bold text-text-muted">Status</span>
				<span
					style="background-color: {badge.bg}; color: {badge.color};"
					class="rounded-full px-3.5 py-1.5 text-xs font-bold"
				>
					{appointment.status}
				</span>
			</div>

			<div class="flex justify-between gap-3 border-t border-brand-border-subtle py-3 text-sm">
				<span class="text-text-secondary">Doctor</span>
				<b class="text-right text-text-primary">{appointment.doctor}</b>
			</div>
			<div class="flex justify-between gap-3 border-t border-brand-border-subtle py-3 text-sm">
				<span class="text-text-secondary">{dateLabel}</span>
				<b class="text-right text-text-primary">{appointment.dateTime}</b>
			</div>
			<div class="flex justify-between gap-3 border-t border-brand-border-subtle py-3 text-sm">
				<span class="text-text-secondary">Type</span>
				<b class="text-right text-text-primary">{appointment.type}</b>
			</div>

			{#if appointment.status === 'Pending'}
				<!-- Pending: show Requested row instead of Reason/Booked on -->
				<div class="flex justify-between gap-3 border-t border-brand-border-subtle py-3 text-sm">
					<span class="text-text-secondary">Requested</span>
					<b class="text-right text-text-primary">12 Nov, 09:14, online</b>
				</div>

				<!-- Patient Note Card -->
				<div class="mt-1 rounded-2xl border border-[#E6C27A]/30 bg-[#2a2010] p-4">
					<div class="mb-2 text-xs font-extrabold tracking-widest text-[#E6C27A] uppercase">
						Patient note
					</div>
					<p class="m-0 text-sm leading-relaxed text-text-primary">
						{appointment.type} appointment request. Prefer an afternoon slot if possible.
					</p>
				</div>
			{:else}
				<div class="flex justify-between gap-3 border-t border-brand-border-subtle py-3 text-sm">
					<span class="text-text-secondary">Reason</span>
					<b class="text-right text-text-primary">{appointment.type}</b>
				</div>
				<div class="flex justify-between gap-3 border-t border-brand-border-subtle py-3 text-sm">
					<span class="text-text-secondary">Booked on</span>
					<b class="text-right text-text-primary">By admin</b>
				</div>
			{/if}
		</div>

		<!-- Bottom Actions – status-aware -->
		<div class="mt-auto flex flex-col gap-2.5 pt-4">
			<span class="text-xs font-bold text-text-muted">Actions</span>

			{#if appointment.status === 'Pending'}
				<!-- Pending panel: Confirm, Reschedule, Decline -->
				<button
					type="button"
					onclick={() => onStatusChange(appointment.id, 'Confirmed')}
					class="min-h-12.5 cursor-pointer rounded-2xl border-0 bg-brand-teal text-sm font-bold text-brand-bg transition-opacity hover:opacity-90"
				>
					Confirm appointment
				</button>
				<div class="grid grid-cols-2 gap-2.5">
					<button
						type="button"
						onclick={() => onReschedule(appointment)}
						class="min-h-12 cursor-pointer rounded-2xl border border-btn-border bg-btn-dark text-sm font-semibold text-text-primary transition-colors hover:border-btn-border-hover hover:bg-btn-hover"
					>
						Reschedule
					</button>
					<button
						type="button"
						onclick={() => onRequestCancel(appointment)}
						class="min-h-12 cursor-pointer rounded-2xl border border-red-400 bg-red-400/10 text-sm font-bold text-red-300 transition-colors hover:bg-red-400/20"
					>
						Decline request
					</button>
				</div>

			{:else if appointment.status === 'Confirmed'}
				<!-- Confirmed: Check in, Reschedule, Mark pending, Cancel -->
				<button
					type="button"
					onclick={() => onStatusChange(appointment.id, 'Checked in')}
					class="min-h-12.5 cursor-pointer rounded-2xl border-0 bg-brand-teal text-sm font-bold text-brand-bg transition-opacity hover:opacity-90"
				>
					Check in patient
				</button>
				<div class="grid grid-cols-2 gap-2.5">
					<button
						type="button"
						onclick={() => onReschedule(appointment)}
						class="min-h-12 cursor-pointer rounded-2xl border border-btn-border bg-btn-dark text-sm font-semibold text-text-primary transition-colors hover:border-btn-border-hover hover:bg-btn-hover"
					>
						Reschedule
					</button>
					<button
						type="button"
						onclick={() => onStatusChange(appointment.id, 'Pending')}
						class="min-h-12 cursor-pointer rounded-2xl border border-btn-border bg-btn-dark text-sm font-semibold text-text-primary transition-colors hover:border-btn-border-hover hover:bg-btn-hover"
					>
						Mark pending
					</button>
				</div>
				<button
					type="button"
					onclick={() => onRequestCancel(appointment)}
					class="min-h-12.5 cursor-pointer rounded-2xl border border-red-400 bg-red-400/10 text-sm font-bold text-red-300 transition-colors hover:bg-red-400/20"
				>
					Cancel appointment
				</button>

			{:else if appointment.status === 'Checked in'}
				<!-- Checked in: Complete visit only -->
				<button
					type="button"
					onclick={() => onStatusChange(appointment.id, 'Completed')}
					class="min-h-12.5 cursor-pointer rounded-2xl border-0 bg-brand-teal text-sm font-bold text-brand-bg transition-opacity hover:opacity-90"
				>
					Complete visit
				</button>

			{:else if appointment.status === 'Cancelled' || appointment.status === 'Completed'}
				<!-- Terminal states: details only -->
				<div class="rounded-2xl border border-brand-border bg-brand-card p-3.5 text-center text-xs text-text-secondary">
					{#if appointment.status === 'Cancelled'}
						This appointment was cancelled and its time slot is available again.
					{:else}
						This visit has been completed. No further actions available.
					{/if}
				</div>
			{/if}
		</div>
	</aside>
{/if}
