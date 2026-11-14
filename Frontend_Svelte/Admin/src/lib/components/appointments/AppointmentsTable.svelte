<script lang="ts">
	import type { Appointment, Pagination } from '#lib/api';

	let {
		appointments = [],
		pagination,
		activeFilter = 'All',
		currentPage = 1,
		onFilterChange,
		onPageChange
	}: {
		appointments: Appointment[];
		pagination: Pagination;
		activeFilter: 'All' | 'Pending' | 'Confirmed';
		currentPage: number;
		onFilterChange: (filter: 'All' | 'Pending' | 'Confirmed') => void;
		onPageChange: (page: number) => void;
	} = $props();

	function getStatusBadge(status: Appointment['status']) {
		switch (status) {
			case 'Confirmed':
				return {
					color: 'var(--color-status-green)',
					bg: 'rgba(52, 211, 153, 0.14)'
				};
			case 'Pending':
				return {
					color: 'var(--color-status-amber)',
					bg: 'rgba(251, 191, 36, 0.14)'
				};
			case 'Checked in':
				return {
					color: 'var(--color-status-blue)',
					bg: 'rgba(125, 211, 252, 0.14)'
				};
			case 'Cancelled':
				return {
					color: 'var(--color-status-red)',
					bg: 'rgba(252, 165, 165, 0.14)'
				};
			default:
				return {
					color: 'var(--color-text-secondary)',
					bg: 'rgba(255,255,255,0.08)'
				};
		}
	}
</script>

<section class="overflow-hidden rounded-3xl border border-brand-border bg-brand-card">
	<!-- Header inside table card -->
	<div class="flex flex-wrap items-center justify-between gap-3 p-5.5 px-6">
		<div class="flex items-center gap-3">
			<h2 class="m-0 text-lg font-bold text-white">Upcoming appointments</h2>
		</div>

		<div class="flex items-center gap-2">
			<button
				type="button"
				onclick={() => onFilterChange('All')}
				class="cursor-pointer rounded-full px-3.5 py-2 text-3.25 font-semibold transition-colors {activeFilter ===
				'All'
					? 'bg-brand-active text-white'
					: 'text-text-secondary hover:text-white'}"
			>
				All
			</button>
			<button
				type="button"
				onclick={() => onFilterChange('Pending')}
				class="cursor-pointer rounded-full px-3.5 py-2 text-3.25 font-semibold transition-colors {activeFilter ===
				'Pending'
					? 'bg-brand-active text-white'
					: 'text-text-secondary hover:text-white'}"
			>
				Pending
			</button>
			<button
				type="button"
				onclick={() => onFilterChange('Confirmed')}
				class="cursor-pointer rounded-full px-3.5 py-2 text-3.25 font-semibold transition-colors {activeFilter ===
				'Confirmed'
					? 'bg-brand-active text-white'
					: 'text-text-secondary hover:text-white'}"
			>
				Confirmed
			</button>
		</div>
	</div>

	<!-- Table Content -->
	<div class="overflow-x-auto">
		<!-- Table Header Row -->
		<div
			class="grid min-w-225 grid-cols-[2.2fr_1.8fr_1.4fr_1.5fr_1.3fr_80px] items-center gap-4 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-text-secondary"
		>
			<div>Patient</div>
			<div>Doctor</div>
			<div>Date and time</div>
			<div>Type</div>
			<div>Status</div>
			<div></div>
		</div>

		<!-- Table Body Rows -->
		{#if appointments.length === 0}
			<div
				class="border-t border-brand-border-subtle px-6 py-12 text-center text-sm text-text-secondary"
			>
				No appointments found matching your criteria.
			</div>
		{:else}
			{#each appointments as apt (apt.id)}
				{@const badge = getStatusBadge(apt.status)}
				<div
					class="grid min-w-225 grid-cols-[2.2fr_1.8fr_1.4fr_1.5fr_1.3fr_80px] items-center gap-4 border-t border-brand-border-subtle px-6 py-3.5 text-sm text-text-muted transition-colors hover:bg-brand-active/30"
				>
					<!-- Patient -->
					<div class="flex items-center gap-3">
						<span
							style="background-color: {apt.patient.avatarBg};"
							class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-brand-bg"
						>
							{apt.patient.initials}
						</span>
						<div>
							<div class="font-semibold text-text-primary">
								{apt.patient.name}
							</div>
							<div class="text-xs text-text-secondary">
								{apt.patient.id}
							</div>
						</div>
					</div>

					<!-- Doctor -->
					<div class="text-text-muted">{apt.doctor}</div>

					<!-- Date & time -->
					<div class="text-text-primary">{apt.dateTime}</div>

					<!-- Type -->
					<div class="text-text-muted">{apt.type}</div>

					<!-- Status -->
					<div>
						<span
							style="background-color: {badge.bg}; color: {badge.color};"
							class="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold"
						>
							<span style="background-color: {badge.color};" class="h-1.5 w-1.5 rounded-full"></span>
							{apt.status}
						</span>
					</div>

					<!-- Action -->
					<div>
						<button
							type="button"
							aria-label="View appointment {apt.patient.name}"
							class="flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-xl border border-btn-border bg-btn-dark px-4 text-sm font-semibold text-text-primary transition-all hover:border-btn-border-hover hover:bg-btn-hover"
						>
							View
						</button>
					</div>
				</div>
			{/each}
		{/if}
	</div>

	<!-- Pagination Footer -->
	{#if pagination.totalItems > 0}
		<div
			class="flex flex-wrap items-center justify-between gap-4 border-t border-brand-border-subtle px-6 py-4 text-sm text-text-secondary"
		>
			<div>
				Showing
				<span class="font-semibold text-text-primary">
					{(pagination.page - 1) * pagination.limit + 1}
				</span>
				to
				<span class="font-semibold text-text-primary">
					{Math.min(pagination.page * pagination.limit, pagination.totalItems)}
				</span>
				of
				<span class="font-semibold text-text-primary">
					{pagination.totalItems}
				</span>
				appointments
			</div>

			<div class="flex items-center gap-1.5">
				<!-- Previous Button -->
				<button
					type="button"
					disabled={currentPage <= 1}
					onclick={() => onPageChange(currentPage - 1)}
					class="flex min-h-9 min-w-9 cursor-pointer items-center justify-center rounded-xl border border-btn-border bg-btn-dark px-3 text-sm font-medium text-text-primary transition-all hover:border-btn-border-hover hover:bg-btn-hover disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-btn-border disabled:hover:bg-btn-dark"
					aria-label="Previous page"
				>
					<svg
						aria-hidden="true"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M15 18l-6-6 6-6" />
					</svg>
				</button>

				<!-- Page Numbers -->
				{#each Array.from({ length: pagination.totalPages }, (_, i) => i + 1) as pageNum}
					{#if pageNum === 1 || pageNum === pagination.totalPages || (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)}
						<button
							type="button"
							onclick={() => onPageChange(pageNum)}
							class="flex min-h-9 min-w-9 cursor-pointer items-center justify-center rounded-xl border px-3 text-sm font-semibold transition-all {pageNum ===
							currentPage
								? 'border-brand-teal bg-brand-teal text-brand-bg'
								: 'border-btn-border bg-btn-dark text-text-primary hover:border-btn-border-hover hover:bg-btn-hover'}"
						>
							{pageNum}
						</button>
					{:else if (pageNum === currentPage - 2 && pageNum > 1) || (pageNum === currentPage + 2 && pageNum < pagination.totalPages)}
						<span class="px-1 text-text-secondary">...</span>
					{/if}
				{/each}

				<!-- Next Button -->
				<button
					type="button"
					disabled={currentPage >= pagination.totalPages}
					onclick={() => onPageChange(currentPage + 1)}
					class="flex min-h-9 min-w-9 cursor-pointer items-center justify-center rounded-xl border border-btn-border bg-btn-dark px-3 text-sm font-medium text-text-primary transition-all hover:border-btn-border-hover hover:bg-btn-hover disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-btn-border disabled:hover:bg-btn-dark"
					aria-label="Next page"
				>
					<svg
						aria-hidden="true"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M9 18l6-6-6-6" />
					</svg>
				</button>
			</div>
		</div>
	{/if}
</section>

