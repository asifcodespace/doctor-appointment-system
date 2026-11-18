<script lang="ts">
	import type { PatientRecord } from '#lib/types/patient';

	let {
		patient,
		onOpenFullRecord,
		onBookAppointment
	}: {
		patient: PatientRecord;
		onOpenFullRecord?: (patient: PatientRecord) => void;
		onBookAppointment?: (patient: PatientRecord) => void;
	} = $props();
</script>

<aside
	class="bg-brand-card border border-brand-border rounded-6 p-6.5 flex flex-col gap-5.5 min-w-0"
>
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
	<div
		class="grid grid-cols-2 gap-4 py-4.5 border-t border-b border-brand-border"
	>
		<div class="flex flex-col gap-0.5">
			<span class="text-xs text-text-secondary">Age</span>
			<span class="text-15px font-semibold text-text-primary">
				{patient.age} years
			</span>
		</div>

		<div class="flex flex-col gap-0.5">
			<span class="text-xs text-text-secondary">Gender</span>
			<span class="text-15px font-semibold text-text-primary">
				{patient.gender}
			</span>
		</div>

		<div class="flex flex-col gap-0.5">
			<span class="text-xs text-text-secondary">Blood group</span>
			<span class="text-15px font-semibold text-text-primary">
				{patient.bloodGroup}
			</span>
		</div>

		<div class="flex flex-col gap-0.5">
			<span class="text-xs text-text-secondary">Total visits</span>
			<span class="text-15px font-semibold text-text-primary">
				{patient.totalVisits}
			</span>
		</div>
	</div>

	<!-- Next Appointment Card -->
	<div class="bg-track-bg rounded-4.5 p-4 flex flex-col gap-1 border border-brand-border/40">
		<span class="text-xs font-bold tracking-wider uppercase text-brand-gold">
			Next appointment
		</span>
		{#if patient.nextAppointmentDetails}
			<span class="text-base font-bold text-white">
				{patient.nextAppointmentDetails.date} · {patient.nextAppointmentDetails.time}
			</span>
			<span class="text-13px text-text-muted">
				{patient.nextAppointmentDetails.doctor} · {patient.nextAppointmentDetails.department}
			</span>
		{:else}
			<span class="text-base font-bold text-text-secondary">
				{patient.nextAppointmentText}
			</span>
			<span class="text-13px text-text-secondary/70">
				No upcoming appointment scheduled
			</span>
		{/if}
	</div>

	<!-- Notes Section -->
	<div class="flex flex-col gap-1.5">
		<span class="text-xs text-text-secondary font-medium">Notes</span>
		<p class="m-0 text-sm leading-relaxed text-text-muted">
			{patient.notes}
		</p>
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
