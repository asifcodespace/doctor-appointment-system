<script lang="ts">
	import type { PatientRecord } from '#lib/types/patient';
	import PatientStatusBadge from './PatientStatusBadge.svelte';

	let {
		patients,
		selectedPatientId,
		activeTab = $bindable('All'),
		onSelectPatient
	}: {
		patients: PatientRecord[];
		selectedPatientId: string;
		activeTab: 'All' | 'Follow-up' | 'New';
		onSelectPatient: (patient: PatientRecord) => void;
	} = $props();

	const tabs: Array<'All' | 'Follow-up' | 'New'> = ['All', 'Follow-up', 'New'];
</script>

<section
	class="bg-brand-card border border-brand-border rounded-6 overflow-hidden flex flex-col min-w-0"
>
	<!-- Top Bar / Filter Tabs -->
	<div class="flex items-center justify-between px-5.5 py-5 border-b border-brand-border-subtle">
		<h2 class="m-0 text-lg font-bold text-white">All patients</h2>
		<div class="flex gap-2">
			{#each tabs as tab}
				{@const isActive = activeTab === tab}
				<button
					type="button"
					onclick={() => (activeTab = tab)}
					class="px-3.5 py-2 rounded-full text-13px font-semibold transition-colors cursor-pointer border-0 {isActive
						? 'bg-brand-active text-white'
						: 'bg-transparent text-text-secondary hover:text-white'}"
				>
					{tab}
				</button>
			{/each}
		</div>
	</div>

	<!-- Table Content -->
	<div class="overflow-x-auto">
		<div class="min-w-140">
			<!-- Table Header -->
			<div
				class="grid grid-cols-[2.4fr_1fr_1.5fr_1.2fr] gap-4 items-center px-5.5 py-3 text-xs font-semibold tracking-wider text-text-secondary uppercase"
			>
				<div>PATIENT</div>
				<div>LAST VISIT</div>
				<div>NEXT APPOINTMENT</div>
				<div>STATUS</div>
			</div>

			<!-- Rows -->
			<div class="divide-y divide-brand-border-subtle">
				{#each patients as patient (patient.id)}
					{@const isSelected = selectedPatientId === patient.id}
					<button
						type="button"
						onclick={() => onSelectPatient(patient)}
						class="w-full text-left grid grid-cols-[2.4fr_1fr_1.5fr_1.2fr] gap-4 items-center px-5.5 py-3.25 text-sm transition-colors cursor-pointer border-0 {isSelected
							? 'bg-track-bg'
							: 'bg-transparent hover:bg-track-bg/50'}"
					>
						<!-- Patient info with Avatar -->
						<div class="flex items-center gap-3 min-w-0">
							<span
								class="w-10 h-10 rounded-full text-brand-bg font-bold text-sm flex items-center justify-center shrink-0"
								style="background-color: {patient.avatarBg};"
							>
								{patient.initials}
							</span>
							<div class="min-w-0">
								<div class="font-semibold text-text-primary truncate">
									{patient.name}
								</div>
								<div class="text-xs text-text-secondary">
									{patient.id} · {patient.age} · {patient.gender === 'Female' ? 'F' : 'M'}
								</div>
							</div>
						</div>

						<!-- Last visit -->
						<div class="text-text-muted text-sm">{patient.lastVisit}</div>

						<!-- Next appointment -->
						<div class="{patient.nextAppointmentText === 'Not booked' ? 'text-text-secondary' : 'text-text-primary font-medium'} text-sm truncate">
							{patient.nextAppointmentText}
						</div>

						<!-- Status Badge -->
						<div>
							<PatientStatusBadge status={patient.status} />
						</div>
					</button>
				{/each}

				{#if patients.length === 0}
					<div class="px-5.5 py-12 text-center text-text-secondary text-sm">
						No patients match the search or filter criteria.
					</div>
				{/if}
			</div>
		</div>
	</div>
</section>
