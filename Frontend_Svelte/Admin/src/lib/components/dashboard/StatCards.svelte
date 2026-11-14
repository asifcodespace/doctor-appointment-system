<script lang="ts">
	import type { StatCardData } from '#lib/types/dashboard';

	let { metrics = [] }: { metrics: StatCardData[] } = $props();
</script>

<section class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4.5">
	{#each metrics as card}
		<div
			class="bg-brand-card border border-brand-border rounded-6 p-5.5 flex flex-col gap-1"
		>
			<span class="text-3.25 text-text-secondary">{card.label}</span>
			<div class="flex items-end justify-between gap-2">
				<span class="text-4xl lg:text-4.25xl font-bold text-white tracking-tight leading-tight">
					{card.value}
				</span>
				<svg
					aria-hidden="true"
					width="96"
					height="34"
					viewBox="0 0 96 34"
					fill="none"
					class="shrink-0"
				>
					<polyline
						points={card.polylinePoints}
						stroke={card.color}
						stroke-width="2.4"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</div>
			<span class="text-xs font-semibold mt-1" style="color: {card.color}">
				{card.changeText}
			</span>
		</div>
	{/each}
</section>

