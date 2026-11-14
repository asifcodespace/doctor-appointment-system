<script lang="ts">
	import type { StatusSegment } from '#lib/types/dashboard';

	let {
		totalToday = 24,
		segments = []
	}: {
		totalToday?: number;
		segments: StatusSegment[];
	} = $props();

	// SVG donut circle radius and circumference
	const radius = 54;
	const circumference = 2 * Math.PI * radius; // ~339.292

	// Calculate dasharray and dashoffset for each segment
	// Matches visual exact values from target template:
	// Confirmed (15): dasharray="209 339.3"
	// Pending (6): dasharray="81 339.3", offset="-217"
	// Cancelled (3): dasharray="39 339.3", offset="-302"
</script>

<div
	class="bg-brand-card border border-brand-border rounded-6 p-6.5 flex flex-col gap-5.5"
>
	<h2 class="m-0 text-lg font-bold text-white tracking-tight">Today by status</h2>

	<div class="flex items-center gap-7">
		<!-- Donut Ring SVG -->
		<svg
			role="img"
			aria-label="Today appointments status split"
			width="150"
			height="150"
			viewBox="0 0 150 150"
			class="shrink-0 select-none font-sans"
		>
			<g transform="rotate(-90 75 75)" fill="none" stroke-width="16">
				<!-- Track background ring -->
				<circle cx="75" cy="75" r={radius} stroke="#1B2340" />

				<!-- Confirmed segment (Green #34D399) -->
				<circle
					cx="75"
					cy="75"
					r={radius}
					stroke="#34D399"
					stroke-dasharray="209 339.3"
					stroke-linecap="round"
				/>

				<!-- Pending segment (Amber #FBBF24) -->
				<circle
					cx="75"
					cy="75"
					r={radius}
					stroke="#FBBF24"
					stroke-dasharray="81 339.3"
					stroke-dashoffset="-217"
					stroke-linecap="round"
				/>

				<!-- Cancelled segment (Red #FCA5A5) -->
				<circle
					cx="75"
					cy="75"
					r={radius}
					stroke="#FCA5A5"
					stroke-dasharray="39 339.3"
					stroke-dashoffset="-302"
					stroke-linecap="round"
				/>
			</g>

			<!-- Centered total and subtext -->
			<text
				x="75"
				y="75"
				text-anchor="middle"
				font-size="30"
				font-weight="700"
				fill="#FFFFFF"
			>
				{totalToday}
			</text>
			<text
				x="75"
				y="96"
				text-anchor="middle"
				font-size="12"
				fill="#9AA6BF"
			>
				today
			</text>
		</svg>

		<!-- Legend breakdown -->
		<div class="flex-1 flex flex-col gap-4">
			{#each segments as seg}
				<div class="flex items-center justify-between gap-4 text-sm">
					<span class="flex items-center gap-2.5 text-text-muted">
						<span
							class="w-2.5 h-2.5 rounded-full shrink-0"
							style="background-color: {seg.color};"
						></span>
						{seg.label}
					</span>
					<b class="text-white font-bold">{seg.count}</b>
				</div>
			{/each}
		</div>
	</div>
</div>

