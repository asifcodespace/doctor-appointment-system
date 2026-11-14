<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import {
		Sidebar,
		Header,
		StatCards,
		WeeklyChart,
		StatusDonut,
		UpcomingList,
		DoctorsOnDuty,
		INITIAL_DASHBOARD_DATA,
		type DashboardData
	} from '#lib';
	import {
		fetchServerStatus,
		fetchAppointmentStats,
		fetchAppointments,
		type ServerStatus
	} from '#lib/api';

	// ── State using Svelte 5 Runes ──────────────────────────────────────────────
	let dashboard = $state<DashboardData>(INITIAL_DASHBOARD_DATA);
	let serverStatus = $state<ServerStatus>(INITIAL_DASHBOARD_DATA.serverStatus);
	let lastSyncTime = $state<number | null>(null);
	let secondsSinceSync = $state(0);
	let isRefreshing = $state(false);

	// ── Data Loader / Live Sync with Go backend ──────────────────────────────────
	async function loadLiveStatus() {
		try {
			const [srv, st, apptsResult] = await Promise.allSettled([
				fetchServerStatus(),
				fetchAppointmentStats(),
				fetchAppointments({ page: 1, limit: 10 })
			]);

			if (srv.status === 'fulfilled') {
				serverStatus = srv.value;
				lastSyncTime = Date.now();
				secondsSinceSync = 0;
				serverStatus.lastSyncSeconds = 0;
			}

			// If appointment stats are populated from the live backend, blend smoothly
			if (st.status === 'fulfilled' && typeof st.value.totalToday === 'number' && st.value.totalToday > 0) {
				const liveTotal: number = st.value.totalToday;
				dashboard.statusSummary.totalToday = liveTotal;
				if (dashboard.metrics[0]) {
					dashboard.metrics[0].value = liveTotal;
				}
			}

			// If appointments are available, map up to 4 items into Up Next
			if (apptsResult.status === 'fulfilled' && apptsResult.value.appointments.length > 0) {
				const list = apptsResult.value.appointments.slice(0, 4);
				dashboard.upcomingAppointments = list.map((apt) => {
					// Extract time like "09:30" or use dateTime
					const timeMatch = apt.dateTime.match(/\d{2}:\d{2}/);
					const time = timeMatch ? timeMatch[0] : apt.dateTime;
					let statusColor = '#34D399';
					if (apt.status === 'Pending') statusColor = '#FBBF24';
					else if (apt.status === 'Checked in') statusColor = '#7DD3FC';
					else if (apt.status === 'Cancelled') statusColor = '#FCA5A5';

					return {
						time,
						patientName: apt.patient.name,
						doctorName: apt.doctor,
						status: apt.status,
						statusColor
					};
				});
			}
		} catch {
			// Fail gracefully without breaking design
			serverStatus.connected = false;
		}
	}

	function handleReviewPending() {
		goto('/appointments');
	}

	function handleViewAll() {
		goto('/appointments');
	}

	onMount(() => {
		loadLiveStatus();

		// Live 1-second ticker for elapsed sync time
		const tickTimer = setInterval(() => {
			if (lastSyncTime !== null && serverStatus.connected) {
				secondsSinceSync = Math.max(0, Math.floor((Date.now() - lastSyncTime) / 1000));
				serverStatus.lastSyncSeconds = secondsSinceSync;
			}
		}, 1000);

		// Periodic live sync every 15 seconds
		const syncTimer = setInterval(() => {
			if (typeof document === 'undefined' || !document.hidden) {
				if (!isRefreshing) {
					loadLiveStatus();
				}
			}
		}, 15000);

		return () => {
			clearInterval(tickTimer);
			clearInterval(syncTimer);
		};
	});
</script>

<div class="flex min-h-screen w-full bg-brand-bg font-sans text-text-primary overflow-x-hidden">
	<!-- Left Sidebar -->
	<Sidebar {serverStatus} activePage="Dashboard" />

	<!-- Main Dashboard Area -->
	<main class="flex-1 min-w-0 p-8 lg:p-10 flex flex-col gap-6.5 box-border">
		<!-- Greeting Header with "Review pending" Action -->
		<Header
			dateStr={dashboard.greeting.dateStr}
			headline={dashboard.greeting.headline}
			subline={dashboard.greeting.subline}
			onReviewPending={handleReviewPending}
		/>

		<!-- 4 KPI Metrics Cards -->
		<StatCards metrics={dashboard.metrics} />

		<!-- Middle Grid: Weekly Bar Chart + Today by Status Donut -->
		<section class="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-4.5">
			<WeeklyChart weeklyData={dashboard.weeklyAppointments} />
			<StatusDonut
				totalToday={dashboard.statusSummary.totalToday}
				segments={dashboard.statusSummary.segments}
			/>
		</section>

		<!-- Bottom Grid: Up Next Appointments + Doctors On Duty -->
		<section class="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-4.5">
			<UpcomingList
				appointments={dashboard.upcomingAppointments}
				onViewAll={handleViewAll}
			/>
			<DoctorsOnDuty doctors={dashboard.doctorsOnDuty} />
		</section>
	</main>
</div>
