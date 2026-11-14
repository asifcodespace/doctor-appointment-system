<script lang="ts">
	import type { UpcomingAppointmentItem } from '#lib/types/dashboard';

	let {
		appointments = [],
		onViewAll
	}: {
		appointments: UpcomingAppointmentItem[];
		onViewAll?: () => void;
	} = $props();
</script>

<div
	class="bg-brand-card border border-brand-border rounded-6 p-6.5 flex flex-col"
>
	<!-- Header -->
	<div class="flex justify-between items-baseline pb-3">
		<h2 class="m-0 text-lg font-bold text-white tracking-tight">Up next</h2>
		<button
			type="button"
			onclick={onViewAll}
			class="bg-transparent border-0 p-0 text-3.25 text-brand-teal font-semibold cursor-pointer hover:underline"
		>
			View all
		</button>
	</div>

	<!-- List -->
	<div class="flex flex-col">
		{#each appointments as apt}
			<div
				class="flex items-center gap-4 py-3.5 border-t border-brand-border-subtle"
			>
				<!-- Time column -->
				<span class="w-16 shrink-0 font-bold text-brand-gold text-3.75">
					{apt.time}
				</span>

				<!-- Patient & Doctor details -->
				<div class="flex-1 min-w-0">
					<div class="font-semibold text-text-primary text-sm truncate">
						{apt.patientName}
					</div>
					<div class="text-xs text-text-secondary truncate mt-0.5">
						{apt.doctorName}
					</div>
				</div>

				<!-- Status indicator -->
				<span
					class="text-xs font-semibold shrink-0"
					style="color: {apt.statusColor}"
				>
					{apt.status}
				</span>
			</div>
		{/each}
	</div>
</div>

