<script lang="ts">
	let {
		dateStr = 'MONDAY, 9 NOVEMBER',
		headline = 'Good morning, Admin',
		subline = '24 appointments today, 6 waiting for your approval.',
		onReviewPending
	}: {
		dateStr?: string;
		headline?: string;
		subline?: string;
		onReviewPending?: () => void;
	} = $props();
</script>

<header class="flex flex-wrap items-end justify-between gap-4">
	<div>
		<span class="text-3.25 text-brand-gold font-semibold tracking-widest uppercase">
			{dateStr}
		</span>
		<h1 class="m-0 mt-2 font-serif font-medium text-4.25xl lg:text-5xl text-white tracking-tight leading-tight">
			{headline}
		</h1>
		<p class="m-0 mt-2 text-text-secondary text-3.75">
			{subline}
		</p>
	</div>

	<button
		type="button"
		onclick={onReviewPending}
		class="min-h-12 px-6 rounded-2xl border-0 bg-brand-teal text-brand-bg font-sans font-bold text-sm cursor-pointer transition-all hover:brightness-110 active:scale-95"
	>
		Review pending
	</button>
</header>

