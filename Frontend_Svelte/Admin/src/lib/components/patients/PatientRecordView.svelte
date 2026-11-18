<script lang="ts">
	import type { PatientRecord, PatientStatus } from '#lib/types/patient';

	let {
		patient,
		onBack,
		onStatusChange,
		onEditDetails,
		onBookAppointment
	}: {
		patient: PatientRecord;
		onBack?: () => void;
		onStatusChange?: (status: PatientStatus) => void;
		onEditDetails?: (patient: PatientRecord) => void;
		onBookAppointment?: (patient: PatientRecord) => void;
	} = $props();

	const statuses: PatientStatus[] = ['Active', 'Follow-up', 'New', 'Inactive'];

	// Fallback data if some fields are not set on newer/arbitrary patient objects
	let allergies = $derived(
		patient.allergiesAndConditions && patient.allergiesAndConditions.length > 0
			? patient.allergiesAndConditions
			: ['No known allergies']
	);

	let notesText = $derived(
		patient.doctorNotes || patient.notes || 'No doctor notes recorded yet.'
	);

	let visits = $derived(
		patient.visitHistory && patient.visitHistory.length > 0
			? patient.visitHistory
			: [
					{
						date: patient.lastVisit,
						title: 'General consultation',
						doctor: 'Dr. Nusrat Jahan',
						status: 'Completed' as const
					}
				]
	);

	let prescriptionsList = $derived(
		patient.prescriptions && patient.prescriptions.length > 0
			? patient.prescriptions
			: [
					{
						name: 'No active prescription',
						dosage: 'None',
						date: patient.lastVisit
					}
				]
	);

	function handleStatusSelect(e: Event) {
		const target = e.target as HTMLSelectElement;
		if (target) {
			onStatusChange?.(target.value as PatientStatus);
		}
	}
</script>

<main class="flex-1 min-w-0 p-8 sm:p-10 flex flex-col gap-6 overflow-y-auto box-border">
	<!-- Record Header -->
	<header class="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
		<!-- Patient Identity & Back Navigation -->
		<div class="flex items-center gap-5">
			<span
				class="w-19 h-19 rounded-full text-brand-bg font-extrabold text-26px flex items-center justify-center shrink-0"
				style="background-color: {patient.avatarBg};"
			>
				{patient.initials}
			</span>
			<div>
				<button
					type="button"
					onclick={() => onBack?.()}
					class="p-0 border-0 bg-transparent text-13px text-brand-teal font-semibold cursor-pointer hover:underline flex items-center gap-1"
				>
					← Back to patients
				</button>
				<h1 class="m-0 mt-1 text-32px font-extrabold tracking-tight text-white">
					{patient.name}
				</h1>
				<p class="m-0 mt-1 text-text-secondary text-sm">
					{patient.id} · Patient since {patient.patientSince}
				</p>
			</div>
		</div>

		<!-- Action Controls: Status, Edit, Book appointment -->
		<div class="flex items-center gap-3 flex-wrap">
			<label class="flex items-center gap-2.5 text-13px text-text-secondary">
				Status
				<div class="relative inline-flex items-center">
					<select
						aria-label="Patient status"
						value={patient.status}
						onchange={handleStatusSelect}
						class="appearance-none min-h-11.5 pl-4 pr-9.5 rounded-3.5 border border-btn-border bg-brand-card text-text-primary font-semibold text-sm cursor-pointer outline-none focus:border-brand-teal transition-colors"
					>
						{#each statuses as s}
							<option value={s} class="bg-brand-card text-text-primary">{s}</option>
						{/each}
					</select>
					<!-- Custom styled chevron positioned comfortably inside the dropdown -->
					<svg
						aria-hidden="true"
						width="14"
						height="14"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
						class="pointer-events-none absolute right-3.5 text-text-secondary"
					>
						<polyline points="6 9 12 15 18 9"></polyline>
					</svg>
				</div>
			</label>

			<button
				type="button"
				onclick={() => onEditDetails?.(patient)}
				class="min-h-11.5 px-5 rounded-3.5 border border-btn-border bg-btn-dark text-text-primary font-semibold text-sm cursor-pointer hover:bg-btn-hover active:scale-98 transition-all"
			>
				Edit details
			</button>

			<button
				type="button"
				onclick={() => onBookAppointment?.(patient)}
				class="min-h-11.5 px-5.5 rounded-3.5 border-0 bg-brand-teal text-brand-bg font-bold text-sm cursor-pointer hover:opacity-90 active:scale-98 transition-all"
			>
				Book appointment
			</button>
		</div>
	</header>

	<!-- Main 2-Column Content Grid: 1.6fr / 1fr matching design specs -->
	<div class="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-5 flex-1 min-h-0 items-start">
		<!-- Left Column: Personal details & Visit history -->
		<div class="flex flex-col gap-5 min-w-0">
			<!-- Personal Details Card -->
			<section
				class="bg-brand-card border border-brand-border rounded-6 p-6 flex flex-col gap-4.5"
			>
				<h2 class="m-0 text-lg font-bold text-white">Personal details</h2>
				<div class="grid grid-cols-3 gap-5">
					<div class="flex flex-col gap-1">
						<span class="text-xs text-text-secondary">Age</span>
						<span class="text-15px font-semibold text-text-primary">
							{patient.age} years
						</span>
					</div>
					<div class="flex flex-col gap-1">
						<span class="text-xs text-text-secondary">Gender</span>
						<span class="text-15px font-semibold text-text-primary">
							{patient.gender}
						</span>
					</div>
					<div class="flex flex-col gap-1">
						<span class="text-xs text-text-secondary">Blood group</span>
						<span class="text-15px font-semibold text-text-primary">
							{patient.bloodGroup}
						</span>
					</div>
					<div class="flex flex-col gap-1">
						<span class="text-xs text-text-secondary">Phone</span>
						<span class="text-15px font-semibold text-text-primary truncate">
							{patient.phone || '[PHONE NUMBER]'}
						</span>
					</div>
					<div class="flex flex-col gap-1">
						<span class="text-xs text-text-secondary">Email</span>
						<span class="text-15px font-semibold text-text-primary truncate">
							{patient.email || '[EMAIL ADDRESS]'}
						</span>
					</div>
					<div class="flex flex-col gap-1">
						<span class="text-xs text-text-secondary">Address</span>
						<span class="text-15px font-semibold text-text-primary truncate">
							{patient.address || 'Mymensingh'}
						</span>
					</div>
				</div>
			</section>

			<!-- Visit History Card -->
			<section
				class="bg-brand-card border border-brand-border rounded-6 p-6 pb-2.5 flex flex-col"
			>
				<div class="flex justify-between items-baseline pb-2.5">
					<h2 class="m-0 text-lg font-bold text-white">Visit history</h2>
					<span class="text-13px text-text-secondary">
						{patient.totalVisits} visits in total
					</span>
				</div>

				<div class="divide-y divide-brand-border-subtle">
					{#each visits as visit}
						<div class="flex gap-4 py-3.5 items-center">
							<span
								class="w-2.5 h-2.5 rounded-full bg-brand-teal shrink-0"
							></span>
							<span class="w-27.5 shrink-0 text-13px text-text-secondary">
								{visit.date}
							</span>
							<div class="flex-1 min-w-0">
								<div class="font-semibold text-text-primary truncate">
									{visit.title}
								</div>
								<div class="text-xs text-text-secondary truncate">
									{visit.doctor}
								</div>
							</div>
							<span
								class="text-xs font-semibold text-status-green bg-status-green/15 px-3 py-1.25 rounded-full"
							>
								{visit.status}
							</span>
						</div>
					{/each}
				</div>
			</section>
		</div>

		<!-- Right Column: Next appointment, Allergies, Doctor notes, Prescriptions -->
		<div class="flex flex-col gap-5 min-w-0">
			<!-- Next Appointment Banner Card -->
			<section
				class="bg-track-bg border border-btn-border rounded-6 p-6 flex flex-col gap-1.5"
			>
				<span
					class="text-xs font-bold tracking-wider uppercase text-brand-gold"
				>
					Next appointment
				</span>
				{#if patient.nextAppointmentDetails}
					<span class="text-22px font-bold text-white tracking-tight">
						{patient.nextAppointmentDetails.date} · {patient.nextAppointmentDetails.time}
					</span>
					<span class="text-sm text-text-muted">
						{patient.nextAppointmentDetails.doctor} · {patient.nextAppointmentDetails.department}
					</span>
					<span
						class="mt-2 self-start text-xs font-semibold text-status-green bg-status-green/15 px-3 py-1.25 rounded-full"
					>
						Confirmed
					</span>
				{:else}
					<span class="text-22px font-bold text-white tracking-tight">
						{patient.nextAppointmentText}
					</span>
					<span class="text-sm text-text-muted">
						No upcoming appointment scheduled
					</span>
				{/if}
			</section>

			<!-- Allergies and conditions -->
			<section
				class="bg-brand-card border border-brand-border rounded-6 p-6 flex flex-col gap-3.5"
			>
				<h2 class="m-0 text-lg font-bold text-white">Allergies and conditions</h2>
				<div class="flex flex-wrap items-start gap-2 max-w-75">
					{#each allergies as allergy}
						<span
							class="px-3.5 py-1.75 rounded-full bg-track-bg border border-btn-border text-13px font-semibold text-text-primary"
						>
							{allergy}
						</span>
					{/each}
				</div>
			</section>

			<!-- Doctor notes -->
			<section
				class="bg-brand-card border border-brand-border rounded-6 p-6 flex flex-col gap-2"
			>
				<h2 class="m-0 text-lg font-bold text-white">Doctor notes</h2>
				<p class="m-0 text-sm leading-relaxed text-text-muted">
					{notesText}
				</p>
			</section>

			<!-- Prescriptions Card -->
			<section
				class="bg-brand-card border border-brand-border rounded-6 p-6 pb-3 flex flex-col"
			>
				<h2 class="m-0 text-lg font-bold text-white pb-2.5">Prescriptions</h2>
				<div class="divide-y divide-brand-border-subtle">
					{#each prescriptionsList as rx}
						<div class="flex justify-between items-center gap-3 py-3">
							<div class="min-w-0">
								<div class="font-semibold text-text-primary truncate">
									{rx.name}
								</div>
								<div class="text-xs text-text-secondary truncate">
									{rx.dosage}
								</div>
							</div>
							<span class="text-xs text-text-secondary shrink-0">
								{rx.date}
							</span>
						</div>
					{/each}
				</div>
			</section>
		</div>
	</div>
</main>
