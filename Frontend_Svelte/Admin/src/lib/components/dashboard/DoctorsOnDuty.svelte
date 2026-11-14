<script lang="ts">
	import type { DoctorOnDuty } from '#lib/types/dashboard';

	let { doctors = [] }: { doctors: DoctorOnDuty[] } = $props();
</script>

<div
	class="bg-brand-card border border-brand-border rounded-6 p-6.5 flex flex-col gap-5.5"
>
	<h2 class="m-0 text-lg font-bold text-white tracking-tight">Doctors on duty</h2>

	<div class="flex flex-col gap-4">
		{#each doctors as doc}
			<div class="flex flex-col gap-2">
				<div class="flex justify-between items-baseline gap-3 text-sm">
					<span class="text-text-primary font-semibold truncate">{doc.name}</span>
					<span class="text-text-secondary text-xs shrink-0">
						{doc.specialty} · {doc.bookedPercentage}% booked
					</span>
				</div>

				<!-- Capacity Progress Track -->
				<div class="h-2 rounded-full bg-track-bg overflow-hidden">
					<div
						class="h-2 rounded-full transition-all duration-500"
						style="width: {doc.bookedPercentage}%; background-color: {doc.barColor};"
					></div>
				</div>
			</div>
		{/each}
	</div>
</div>

