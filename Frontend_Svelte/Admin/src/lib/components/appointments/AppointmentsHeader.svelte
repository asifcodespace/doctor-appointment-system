<script lang="ts">
	let {
		searchQuery = $bindable(''),
		isRefreshing = false,
		onSearch,
		onRefresh
	}: {
		searchQuery: string;
		isRefreshing?: boolean;
		onSearch: (e: Event) => void;
		onRefresh: () => void;
	} = $props();
</script>

<header class="flex flex-wrap items-center justify-between gap-4">
	<div>
		<h1 class="m-0 text-3xl font-extrabold tracking-tight text-white">Appointments</h1>
		<p class="mt-1.5 text-sm text-text-secondary">
			Live from the patient booking server · Monday, 9 November
		</p>
	</div>

	<div class="flex flex-wrap items-center gap-3">
		<!-- Search box -->
		<label
			class="flex min-h-11 items-center gap-2.5 rounded-2xl border border-brand-border bg-brand-card px-4 text-text-secondary transition-colors focus-within:border-brand-teal"
		>
			<svg
				aria-hidden="true"
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
			>
				<circle cx="11" cy="11" r="7" />
				<path d="M20 20l-3.5-3.5" />
			</svg>
			<input
				type="text"
				bind:value={searchQuery}
				oninput={onSearch}
				aria-label="Search patients"
				placeholder="Search patient or doctor"
				class="w-52 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-secondary"
			/>
		</label>

		<!-- Refresh Button -->
		<button
			type="button"
			onclick={onRefresh}
			class="flex min-h-11 cursor-pointer items-center gap-2 rounded-2xl border-0 bg-brand-teal px-5 text-sm font-bold text-brand-bg transition-all hover:brightness-110 active:scale-95"
		>
			<svg
				aria-hidden="true"
				class={isRefreshing ? 'animate-spin' : ''}
				width="18"
				height="18"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2.4"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M21 12a9 9 0 1 1-3-6.7L21 8" />
				<path d="M21 3v5h-5" />
			</svg>
			Refresh
		</button>
	</div>
</header>

