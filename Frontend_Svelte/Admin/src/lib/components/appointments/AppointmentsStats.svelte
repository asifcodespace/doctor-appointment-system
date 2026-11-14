<script lang="ts">
	import type { AppointmentStats } from '#lib/api';

	let { stats }: { stats: AppointmentStats } = $props();
</script>

<section class="grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-4">
	<div class="flex flex-col gap-1.5 rounded-5 border border-brand-border bg-brand-card p-5.5">
		<span class="text-3.25 text-text-secondary">Total today</span>
		<span class="text-4xl font-bold tracking-tight text-text-primary">{stats.totalToday}</span>
		<span class="text-xs text-text-secondary">Across {stats.doctorCount} doctors</span>
	</div>

	<div class="flex flex-col gap-1.5 rounded-5 border border-brand-border bg-brand-card p-5.5">
		<span class="text-3.25 text-text-secondary">Confirmed</span>
		<span class="text-4xl font-bold tracking-tight text-status-green">{stats.confirmed}</span>
		<span class="text-xs text-text-secondary">Ready to be seen</span>
	</div>

	<div class="flex flex-col gap-1.5 rounded-5 border border-brand-border bg-brand-card p-5.5">
		<span class="text-3.25 text-text-secondary">Pending</span>
		<span class="text-4xl font-bold tracking-tight text-status-amber">{stats.pending}</span>
		<span class="text-xs text-text-secondary">Awaiting approval</span>
	</div>

	<div class="flex flex-col gap-1.5 rounded-5 border border-brand-border bg-brand-card p-5.5">
		<span class="text-3.25 text-text-secondary">Cancelled</span>
		<span class="text-4xl font-bold tracking-tight text-status-red">{stats.cancelled}</span>
		<span class="text-xs text-text-secondary">Slots reopened</span>
	</div>
</section>

