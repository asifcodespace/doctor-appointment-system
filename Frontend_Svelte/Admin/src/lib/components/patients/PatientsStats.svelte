<script lang="ts">
	import type { PatientStats } from '#lib/types/patient';

	let { stats }: { stats: PatientStats } = $props();
</script>

<section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
	<!-- Total patients -->
	<div
		class="bg-brand-card border border-brand-border rounded-6 p-5 flex flex-col gap-1 shadow-sm"
	>
		<span class="text-13px text-text-secondary">Total patients</span>
		<span class="text-3.5xl font-bold text-text-primary tracking-tight">
			{stats.totalPatients.toLocaleString()}
		</span>
		<span class="text-xs text-text-secondary">Registered</span>
	</div>

	<!-- New this month -->
	<div
		class="bg-brand-card border border-brand-border rounded-6 p-5 flex flex-col gap-1 shadow-sm"
	>
		<span class="text-13px text-text-secondary">New this month</span>
		<span class="text-3.5xl font-bold text-brand-teal tracking-tight">
			{stats.newThisMonth}
		</span>
		<span class="text-xs text-text-secondary">{stats.newSinceDateText}</span>
	</div>

	<!-- Follow-ups due -->
	<div
		class="bg-brand-card border border-brand-border rounded-6 p-5 flex flex-col gap-1 shadow-sm"
	>
		<span class="text-13px text-text-secondary">Follow-ups due</span>
		<span class="text-3.5xl font-bold text-brand-gold tracking-tight">
			{stats.followUpsDue}
		</span>
		<span class="text-xs text-text-secondary">This week</span>
	</div>

	<!-- Inactive -->
	<div
		class="bg-brand-card border border-brand-border rounded-6 p-5 flex flex-col gap-1 shadow-sm"
	>
		<span class="text-13px text-text-secondary">Inactive</span>
		<span class="text-3.5xl font-bold text-status-blue tracking-tight">
			{stats.inactiveCount}
		</span>
		<span class="text-xs text-text-secondary">No visit in 6 months</span>
	</div>
</section>
