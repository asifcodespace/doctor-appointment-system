<script lang="ts">
	let {
		searchQuery = $bindable(''),
		onAddPatient
	}: {
		searchQuery: string;
		onAddPatient?: () => void;
	} = $props();
</script>

<header class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
	<div>
		<h1 class="m-0 text-32px font-extrabold tracking-[-1px] text-white">Patients</h1>
		<p class="mt-1.5 mb-0 text-14px text-text-secondary">
			Everyone registered with the clinic, in one place
		</p>
	</div>

	<div class="flex items-center gap-3">
		<!-- Search Bar -->
		<label
			class="flex items-center gap-2.5 min-h-11 px-4 rounded-3.5 bg-brand-card border border-brand-border text-text-secondary focus-within:border-brand-teal transition-colors"
		>
			<svg
				aria-hidden="true"
				class="w-4.5 h-4.5 text-text-secondary shrink-0"
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
				aria-label="Search patients"
				placeholder="Search name or patient ID"
				bind:value={searchQuery}
				class="bg-transparent border-0 outline-none text-text-primary text-14px w-48 placeholder:text-text-secondary"
			/>
		</label>

		<!-- Add Patient Button -->
		<button
			type="button"
			onclick={onAddPatient}
			class="min-h-11 px-5 rounded-3.5 border-0 bg-brand-teal text-brand-bg font-bold text-14px cursor-pointer hover:opacity-90 active:scale-98 transition-all shrink-0"
		>
			Add patient
		</button>
	</div>
</header>
