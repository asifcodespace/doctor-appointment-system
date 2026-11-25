<script lang="ts">
	import type { PatientRecord, PatientStatus } from '#lib/types/patient';

	const STATUS_OPTIONS: PatientStatus[] = ['Active', 'Follow-up', 'New', 'Inactive'];

	let {
		patient,
		onOpenFullRecord,
		onBookAppointment,
		onStatusChange
	}: {
		patient: PatientRecord;
		onOpenFullRecord?: (patient: PatientRecord) => void;
		onBookAppointment?: (patient: PatientRecord) => void;
		onStatusChange?: (status: PatientStatus) => void;
	} = $props();

	let statusDropdownOpen = $state(false);

	function selectStatus(s: PatientStatus) {
		onStatusChange?.(s);
		statusDropdownOpen = false;
	}

	function getStatusColor(s: PatientStatus) {
		switch (s) {
			case 'Active': return { color: 'var(--color-status-green)', bg: 'rgba(52,211,153,0.14)' };
			case 'Follow-up': return { color: 'var(--color-status-amber)', bg: 'rgba(251,191,36,0.14)' };
			case 'New': return { color: 'var(--color-status-blue)', bg: 'rgba(125,211,252,0.14)' };
			case 'Inactive': return { color: 'var(--color-text-secondary)', bg: 'rgba(255,255,255,0.08)' };
		}
	}

	let currentBadge = $derived(getStatusColor(patient.status));
</script>

<aside class="bg-brand-card border border-brand-border rounded-6 p-6.5 flex flex-col gap-5.5 min-w-0">
	<!-- Patient Profile Avatar & Name -->
	<div class="flex flex-col items-center gap-2.5 text-center">
		<span
			class="w-21 h-21 rounded-full text-brand-bg font-extrabold text-28px flex items-center justify-center shrink-0"
			style="background-color: {patient.avatarBg};"
		>
			{patient.initials}
		</span>
		<div>
			<div class="text-xl font-bold text-white tracking-tight">{patient.name}</div>
			<div class="text-13px text-text-secondary mt-0.5">
				{patient.id} · Patient since {patient.patientSince}
			</div>
		</div>
	</div>

	<!-- Vitals / Key Info Grid -->
	<div class="grid grid-cols-2 gap-4 py-4.5 border-t border-b border-brand-border">
		<div class="flex flex-col gap-0.5">
			<span class="text-xs text-text-secondary">Age</span>
			<span class="text-15px font-semibold text-text-primary">{patient.age} years</span>
		</div>
		<div class="flex flex-col gap-0.5">
			<span class="text-xs text-text-secondary">Gender</span>
			<span class="text-15px font-semibold text-text-primary">{patient.gender}</span>
		</div>
		<div class="flex flex-col gap-0.5">
			<span class="text-xs text-text-secondary">Blood group</span>
			<span class="text-15px font-semibold text-text-primary">{patient.bloodGroup}</span>
		</div>
		<div class="flex flex-col gap-0.5">
			<span class="text-xs text-text-secondary">Total visits</span>
			<span class="text-15px font-semibold text-text-primary">{patient.totalVisits}</span>
		</div>
	</div>

	<!-- Next Appointment Card -->
	<div class="bg-track-bg rounded-4.5 p-4 flex flex-col gap-1 border border-brand-border/40">
		<span class="text-xs font-bold tracking-wider uppercase text-brand-gold">Next appointment</span>
		{#if patient.nextAppointmentDetails}
			<span class="text-base font-bold text-white">
				{patient.nextAppointmentDetails.date} · {patient.nextAppointmentDetails.time}
			</span>
			<span class="text-13px text-text-muted">
				{patient.nextAppointmentDetails.doctor} · {patient.nextAppointmentDetails.department}
			</span>
		{:else}
			<span class="text-base font-bold text-text-secondary">{patient.nextAppointmentText}</span>
			<span class="text-13px text-text-secondary/70">No upcoming appointment scheduled</span>
		{/if}
	</div>

	<!-- Patient Status Dropdown (replaces notes) -->
	<div class="flex flex-col gap-2">
		<span class="text-xs font-bold text-text-muted">Patient status</span>
		<div class="relative">
			<button
				type="button"
				onclick={() => (statusDropdownOpen = !statusDropdownOpen)}
				aria-haspopup="listbox"
				aria-expanded={statusDropdownOpen}
				class="flex min-h-12 w-full cursor-pointer items-center justify-between rounded-2xl border border-btn-border bg-btn-dark px-4 text-sm font-semibold text-text-primary transition-colors hover:border-btn-border-hover hover:bg-btn-hover"
			>
				<span
					class="flex items-center gap-2"
					style="color: {currentBadge.color};"
				>
					<span
						class="h-2 w-2 rounded-full shrink-0"
						style="background-color: {currentBadge.color};"
					></span>
					{patient.status}
				</span>
				<svg
					aria-hidden="true"
					width="15"
					height="15"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2.2"
					stroke-linecap="round"
					stroke-linejoin="round"
					class="shrink-0 text-text-secondary transition-transform {statusDropdownOpen ? 'rotate-180' : ''}"
				>
					<path d="M6 9l6 6 6-6" />
				</svg>
			</button>

			{#if statusDropdownOpen}
				<div
					role="listbox"
					aria-label="Patient status"
					class="absolute top-full left-0 right-0 z-20 mt-1.5 flex flex-col overflow-hidden rounded-2xl border border-btn-border bg-brand-sidebar p-1.5 shadow-2xl"
				>
					{#each STATUS_OPTIONS as s}
						{@const badge = getStatusColor(s)}
						<button
							type="button"
							role="option"
							aria-selected={patient.status === s}
							onclick={() => selectStatus(s)}
							class="flex min-h-10 w-full cursor-pointer items-center justify-between rounded-xl px-3.5 text-left text-sm transition-colors {patient.status === s
								? 'bg-brand-active font-semibold'
								: 'text-text-primary hover:bg-brand-active/50'}"
							style={patient.status === s ? `color: ${badge.color};` : ''}
						>
							<span class="flex items-center gap-2">
								<span class="h-2 w-2 rounded-full shrink-0" style="background-color: {badge.color};"></span>
								{s}
							</span>
							{#if patient.status === s}
								<svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
									<path d="M20 6L9 17l-5-5" />
								</svg>
							{/if}
						</button>
					{/each}
				</div>
			{/if}
		</div>
	</div>

	<!-- Action Buttons -->
	<div class="flex flex-col gap-2.5 mt-auto pt-2">
		<button
			type="button"
			onclick={() => onOpenFullRecord?.(patient)}
			class="min-h-12 rounded-xl border-0 bg-brand-teal text-brand-bg font-bold text-sm cursor-pointer hover:opacity-90 active:scale-98 transition-all"
		>
			Open full record
		</button>
		<button
			type="button"
			onclick={() => onBookAppointment?.(patient)}
			class="min-h-12 rounded-xl border border-btn-border bg-btn-dark text-text-primary font-semibold text-sm cursor-pointer hover:bg-btn-hover active:scale-98 transition-all"
		>
			Book appointment
		</button>
	</div>
</aside>
