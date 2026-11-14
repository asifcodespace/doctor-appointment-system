<script lang="ts">
	import { onMount } from 'svelte';
	import { Sidebar } from '#lib';
	import AppointmentsHeader from '#lib/components/appointments/AppointmentsHeader.svelte';
	import AppointmentsStats from '#lib/components/appointments/AppointmentsStats.svelte';
	import AppointmentsTable from '#lib/components/appointments/AppointmentsTable.svelte';
	import {
		completeAppointmentStats,
		fetchAppointments,
		fetchAppointmentStats,
		fetchServerStatus,
		type Appointment,
		type AppointmentStats,
		type Pagination,
		type ServerStatus
	} from '#lib/api';

	const SEED_APPOINTMENTS: Appointment[] = [];
	const SEED_STATS: AppointmentStats = {
		totalToday: 0,
		doctorCount: 1,
		confirmed: 0,
		pending: 0,
		cancelled: 0
	};
	const SEED_SERVER_STATUS: ServerStatus = {
		connected: false,
		lastSyncSeconds: 0
	};
	const DEFAULT_PAGE_LIMIT = 10;

	// ── State using Svelte 5 Runes ───────────────────────────────────────────
	let appointments = $state<Appointment[]>(SEED_APPOINTMENTS);
	let stats = $state<AppointmentStats>(SEED_STATS);
	let serverStatus = $state<ServerStatus>(SEED_SERVER_STATUS);
	let lastSyncTime = $state<number | null>(null);
	let secondsSinceSync = $state(0);

	let currentPage = $state(1);
	let pageLimit = $state(DEFAULT_PAGE_LIMIT);
	let pagination = $state<Pagination>({
		page: 1,
		limit: DEFAULT_PAGE_LIMIT,
		totalItems: 0,
		totalPages: 1
	});

	let searchQuery = $state('');
	let activeFilter = $state<'All' | 'Pending' | 'Confirmed'>('All');
	let isRefreshing = $state(false);
	let apiError = $state<string | null>(null);

	async function loadData(targetPage = currentPage) {
		try {
			const [apptsResult, st, srv] = await Promise.all([
				fetchAppointments({
					page: targetPage,
					limit: pageLimit,
					search: searchQuery
				}),
				fetchAppointmentStats(),
				fetchServerStatus()
			]);
			appointments = apptsResult.appointments;
			pagination = apptsResult.pagination;
			currentPage = apptsResult.pagination.page;
			stats = completeAppointmentStats(st, appointments);
			serverStatus = srv;
			lastSyncTime = Date.now();
			secondsSinceSync = 0;
			serverStatus.lastSyncSeconds = 0;
			apiError = null;
		} catch (err) {
			serverStatus = {
				...serverStatus,
				connected: false
			};
			apiError = err instanceof Error ? err.message : 'Failed to reach the server.';
		}
	}

	function goToPage(page: number) {
		if (page < 1 || page > pagination.totalPages || page === currentPage) return;
		currentPage = page;
		loadData(page);
	}

	let searchDebounceTimeout: ReturnType<typeof setTimeout> | undefined;
	function handleSearchInput(e: Event) {
		const target = e.target as HTMLInputElement;
		searchQuery = target.value;
		clearTimeout(searchDebounceTimeout);
		searchDebounceTimeout = setTimeout(() => {
			currentPage = 1;
			loadData(1);
		}, 300);
	}

	async function handleRefresh() {
		if (isRefreshing) return;
		isRefreshing = true;
		await loadData();
		isRefreshing = false;
	}

	onMount(() => {
		loadData();

		const tickTimer = setInterval(() => {
			if (lastSyncTime !== null && serverStatus.connected) {
				secondsSinceSync = Math.max(0, Math.floor((Date.now() - lastSyncTime) / 1000));
				serverStatus.lastSyncSeconds = secondsSinceSync;
			}
		}, 1000);

		const syncTimer = setInterval(() => {
			if (typeof document === 'undefined' || !document.hidden) {
				if (!isRefreshing) {
					loadData();
				}
			}
		}, 15000);

		return () => {
			clearInterval(tickTimer);
			clearInterval(syncTimer);
		};
	});

	let filteredAppointments = $derived(
		appointments.filter((apt) => {
			if (activeFilter === 'Pending' && apt.status !== 'Pending') return false;
			if (activeFilter === 'Confirmed' && apt.status !== 'Confirmed') return false;
			return true;
		})
	);
</script>

<svelte:head>
	<title>Appointments - MediDesk Admin</title>
</svelte:head>

<div class="flex min-h-screen w-full bg-brand-bg font-sans text-text-primary overflow-x-hidden">
	<!-- Left Sidebar -->
	<Sidebar {serverStatus} activePage="Appointments" />

	<!-- Main Appointments Content -->
	<main class="flex-1 min-w-0 p-8 lg:p-10 flex flex-col gap-7 box-border">
		<!-- Header with search and refresh -->
		<AppointmentsHeader
			bind:searchQuery
			{isRefreshing}
			onSearch={handleSearchInput}
			onRefresh={handleRefresh}
		/>

		<!-- Offline error banner -->
		{#if apiError}
			<div
				class="flex items-center gap-3 rounded-2xl border border-status-red/30 bg-status-red/10 px-5 py-3 text-sm text-status-red"
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
				>
					<circle cx="12" cy="12" r="10" />
					<path d="M12 8v4M12 16h.01" />
				</svg>
				<span>Server not reachable — showing cached data. ({apiError})</span>
			</div>
		{/if}

		<!-- Stats Cards -->
		<AppointmentsStats {stats} />

		<!-- Appointments Table & Pagination -->
		<AppointmentsTable
			appointments={filteredAppointments}
			{pagination}
			{activeFilter}
			{currentPage}
			onFilterChange={(f) => (activeFilter = f)}
			onPageChange={goToPage}
		/>
	</main>
</div>

