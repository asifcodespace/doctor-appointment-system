<script lang="ts">
	import { onMount } from 'svelte';
	import { Sidebar } from '#lib';
	import { fetchServerStatus, type ServerStatus } from '#lib/api';
	import {
		PatientsHeader,
		PatientsStats,
		PatientsTable,
		PatientDetailsSidebar,
		PatientRecordView
	} from '#lib/components/patients';
	import BookAppointmentModal from '#lib/components/appointments/BookAppointmentModal.svelte';
	import PatientFormModal from '#lib/components/patients/PatientFormModal.svelte';
	import type { BookingPayload } from '#lib/types/booking';
	import {
		INITIAL_PATIENTS,
		INITIAL_PATIENT_STATS
	} from '#lib/types/patient-mock';
	import type { PatientRecord, PatientStats, PatientStatus } from '#lib/types/patient';

	// ── State using Svelte 5 Runes ───────────────────────────────────────────
	let allPatients = $state<PatientRecord[]>(INITIAL_PATIENTS);
	let stats = $state<PatientStats>(INITIAL_PATIENT_STATS);
	let serverStatus = $state<ServerStatus>({
		connected: false,
		lastSyncSeconds: 0
	});

	let searchQuery = $state('');
	let activeTab = $state<'All' | 'Follow-up' | 'New'>('All');
	let selectedPatientId = $state<string>(INITIAL_PATIENTS[0]?.id ?? '');
	let isRecordScreenOpen = $state(false);
	let isBookingOpen = $state(false);
	let bookingPatient = $state<PatientRecord | null>(null);
	let isPatientFormOpen = $state(false);
	let editPatient = $state<PatientRecord | null>(null);

	// Derived filtered patients list
	let filteredPatients = $derived(
		allPatients.filter((p) => {
			// Tab filtering
			if (activeTab === 'Follow-up' && p.status !== 'Follow-up') return false;
			if (activeTab === 'New' && p.status !== 'New') return false;

			// Search query filtering
			if (searchQuery.trim()) {
				const q = searchQuery.toLowerCase().trim();
				return (
					p.name.toLowerCase().includes(q) ||
					p.id.toLowerCase().includes(q) ||
					p.notes.toLowerCase().includes(q)
				);
			}

			return true;
		})
	);

	// Derived currently selected patient
	let selectedPatient = $derived(
		allPatients.find((p) => p.id === selectedPatientId) ?? allPatients[0]
	);

	function handleSelectPatient(patient: PatientRecord) {
		selectedPatientId = patient.id;
	}

	function handleAddPatient() {
		editPatient = null;
		isPatientFormOpen = true;
	}

	function handleEditPatient(patient: PatientRecord) {
		editPatient = patient;
		isPatientFormOpen = true;
	}

	function handlePatientFormSave(data: Partial<PatientRecord>) {
		if (editPatient) {
			allPatients = allPatients.map((p) =>
				p.id === editPatient!.id ? { ...p, ...data } : p
			);
		} else {
			const newId = `PT-${3100 + allPatients.length}`;
			const avatarColors = ['#34D399', '#60A5FA', '#F472B6', '#A78BFA', '#FBBF24', '#FB923C'];
			const newPatient: PatientRecord = {
				id: newId,
				name: data.name ?? 'New Patient',
				initials: data.initials ?? 'NP',
				avatarBg: avatarColors[allPatients.length % avatarColors.length],
				age: data.age ?? 0,
				gender: data.gender ?? 'Female',
				bloodGroup: data.bloodGroup ?? 'Not known',
				phone: data.phone ?? '',
				email: data.email ?? '',
				address: data.address ?? '',
				totalVisits: 0,
				lastVisit: 'Not visited',
				nextAppointmentText: 'Not booked',
				status: data.status ?? 'New',
				patientSince: new Date().getFullYear().toString(),
				notes: '',
				allergiesAndConditions: data.allergiesAndConditions ?? []
			};
			allPatients = [newPatient, ...allPatients];
			selectedPatientId = newId;
			stats = {
				...stats,
				totalPatients: stats.totalPatients + 1,
				newThisMonth: stats.newThisMonth + 1
			};
		}
		isPatientFormOpen = false;
		editPatient = null;
	}

	function handleOpenFullRecord(patient: PatientRecord) {
		selectedPatientId = patient.id;
		isRecordScreenOpen = true;
	}

	function handleBackToPatients() {
		isRecordScreenOpen = false;
	}

	function handleUpdatePatientStatus(newStatus: PatientStatus) {
		allPatients = allPatients.map((p) =>
			p.id === selectedPatientId ? { ...p, status: newStatus } : p
		);
	}

	function handleBookAppointment(patient: PatientRecord) {
		bookingPatient = patient;
		isBookingOpen = true;
	}

	function handleBookingClose() {
		isBookingOpen = false;
		bookingPatient = null;
	}

	function handleBookingConfirm(payload: BookingPayload) {
		// TODO: wire to real API when backend is ready
		console.log('Booking confirmed from patients page:', payload);
		isBookingOpen = false;
		bookingPatient = null;
	}

	// Periodic server status synchronization
	onMount(() => {
		async function updateStatus() {
			try {
				const srv = await fetchServerStatus();
				serverStatus = srv;
			} catch {
				// Backend offline fallback handled gracefully
			}
		}

		updateStatus();
		const interval = setInterval(updateStatus, 10000);
		return () => clearInterval(interval);
	});
</script>

<svelte:head>
	<title>Patients - MediDesk</title>
</svelte:head>

<div
	class="flex h-screen w-screen overflow-hidden bg-brand-bg font-sans text-text-primary box-border"
>
	<!-- Persistent Sidebar Navigation -->
	<Sidebar {serverStatus} activePage="Patients" />

	{#if isRecordScreenOpen && selectedPatient}
		<!-- Patient Medical Record Screen (matches design reference) -->
		<PatientRecordView
			patient={selectedPatient}
			onBack={handleBackToPatients}
			onStatusChange={handleUpdatePatientStatus}
			onEditDetails={handleEditPatient}
			onBookAppointment={handleBookAppointment}
		/>
	{:else}
		<!-- Main Patients View -->
		<main
			class="flex-1 min-w-0 p-8 sm:p-10 flex flex-col gap-6 overflow-y-auto box-border"
		>
			<!-- Header (Title, Subtitle, Search input, Add Patient button) -->
			<PatientsHeader
				bind:searchQuery
				onAddPatient={handleAddPatient}
			/>

			<!-- Quick Metric Stats Cards -->
			<PatientsStats {stats} />

			<!-- Main 2-Column Split: Table (flex-1) + Selected Patient Details (330px) -->
			<div
				class="grid grid-cols-1 xl:grid-cols-[1fr_330px] gap-5 flex-1 min-h-0 items-start"
			>
				<!-- Patients Table Section with Filter Tabs -->
				<PatientsTable
					patients={filteredPatients}
					{selectedPatientId}
					bind:activeTab
					onSelectPatient={handleSelectPatient}
				/>

				<!-- Patient Profile & Vitals Details Aside -->
				{#if selectedPatient}
					<PatientDetailsSidebar
						patient={selectedPatient}
						onOpenFullRecord={handleOpenFullRecord}
						onBookAppointment={handleBookAppointment}
						onStatusChange={handleUpdatePatientStatus}
					/>
				{/if}
			</div>
		</main>
	{/if}
</div>

<!-- Book Appointment Modal (pre-fills the selected patient) -->
<BookAppointmentModal
	open={isBookingOpen}
	patient={bookingPatient}
	onClose={handleBookingClose}
	onConfirm={handleBookingConfirm}
/>

<!-- Add / Edit Patient Modal -->
<PatientFormModal
	open={isPatientFormOpen}
	patient={editPatient}
	onClose={() => { isPatientFormOpen = false; editPatient = null; }}
	onSave={handlePatientFormSave}
/>
