<script lang="ts">
	import type { WeeklyBar } from '#lib/types/dashboard';

	let {
		weeklyData = [],
		subtitle = 'Mon – Sun'
	}: {
		weeklyData: WeeklyBar[];
		subtitle?: string;
	} = $props();

	// SVG bar chart parameters matching the target design
	const chartWidth = 560;
	const chartHeight = 226;
	const baseY = 190;
	const barWidth = 44;
	const barRadius = 10;
	const maxCount = 30; // 28 is highest

	// Days layout coordinates
	// Mon: x=34, Tue: 110, Wed: 186, Thu: 262, Fri: 338, Sat: 414, Sun: 490
	const xPositions = [34, 110, 186, 262, 338, 414, 490];

	function getBarMetrics(count: number, index: number) {
		const height = Math.round((count / maxCount) * 180);
		const y = baseY - height;
		const x = xPositions[index] ?? 34 + index * 76;
		const textX = x + barWidth / 2;
		const labelY = y - 8;
		return { x, y, height, textX, labelY };
	}
</script>

<div
	class="bg-brand-card border border-brand-border rounded-6 p-6.5 flex flex-col gap-4.5 min-w-0"
>
	<div class="flex justify-between items-baseline">
		<h2 class="m-0 text-lg font-bold text-white tracking-tight">
			Appointments this week
		</h2>
		<span class="text-3.25 text-text-secondary">{subtitle}</span>
	</div>

	<svg
		role="img"
		aria-label="Appointments per day this week"
		viewBox="0 0 {chartWidth} {chartHeight}"
		class="w-full h-auto block font-sans select-none"
	>
		<!-- Horizontal gridlines -->
		<line x1="10" y1="190" x2="550" y2="190" stroke="#232C48" />
		<line x1="10" y1="130" x2="550" y2="130" stroke="#1B2340" stroke-dasharray="4 6" />
		<line x1="10" y1="70" x2="550" y2="70" stroke="#1B2340" stroke-dasharray="4 6" />

		<!-- Bars and labels -->
		{#each weeklyData as bar, i}
			{@const m = getBarMetrics(bar.count, i)}
			{@const isHighlight = bar.isHighlight ?? (i === 0)}

			<!-- Bar Rect -->
			<rect
				x={m.x}
				y={m.y}
				width={barWidth}
				height={m.height}
				rx={barRadius}
				fill={isHighlight ? '#2DD4BF' : '#2A3560'}
			/>

			<!-- Value on top of bar -->
			<text
				x={m.textX}
				y={m.labelY}
				text-anchor="middle"
				font-size="12"
				font-weight="600"
				fill={isHighlight ? '#2DD4BF' : '#B8C2DB'}
			>
				{bar.count}
			</text>

			<!-- Day of week label -->
			<text
				x={m.textX}
				y="214"
				text-anchor="middle"
				font-size="12"
				fill="#9AA6BF"
			>
				{bar.day}
			</text>
		{/each}
	</svg>
</div>

