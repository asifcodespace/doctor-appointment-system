<script lang="ts">
	interface Patient {
		name: string;
		id: string;
		initials: string;
		avatarBg: string;
	}

	interface Appointment {
		id: string;
		patient: Patient;
		doctor: string;
		dateTime: string;
		type: string;
		status: 'Confirmed' | 'Pending' | 'Checked in' | 'Cancelled';
	}

	// Initial data matching the reference design and attached image
	const initialAppointments: Appointment[] = [
		{
			id: 'APT-2041',
			patient: {
				name: 'Amina Rahman',
				id: '#APT-2041',
				initials: 'AR',
				avatarBg: '#6D5EF5'
			},
			doctor: 'Dr. Karim Hasan',
			dateTime: 'Today · 09:30',
			type: 'Cardiology',
			status: 'Confirmed'
		},
		{
			id: 'APT-2042',
			patient: {
				name: 'Tanvir Islam',
				id: '#APT-2042',
				initials: 'TI',
				avatarBg: '#14B8A6'
			},
			doctor: 'Dr. Nusrat Jahan',
			dateTime: 'Today · 10:15',
			type: 'General Checkup',
			status: 'Pending'
		},
		{
			id: 'APT-2043',
			patient: {
				name: 'Sadia Akter',
				id: '#APT-2043',
				initials: 'SA',
				avatarBg: '#F472B6'
			},
			doctor: 'Dr. Karim Hasan',
			dateTime: 'Today · 11:00',
			type: 'Cardiology',
			status: 'Confirmed'
		},
		{
			id: 'APT-2044',
			patient: {
				name: 'Mahin Hossain',
				id: '#APT-2044',
				initials: 'MH',
				avatarBg: '#F59E0B'
			},
			doctor: 'Dr. Farhana Sultana',
			dateTime: 'Today · 12:45',
			type: 'Dermatology',
			status: 'Checked in'
		},
		{
			id: 'APT-2045',
			patient: {
				name: 'Rafi Khan',
				id: '#APT-2045',
				initials: 'RK',
				avatarBg: '#38BDF8'
			},
			doctor: 'Dr. Nusrat Jahan',
			dateTime: 'Tomorrow · 09:00',
			type: 'Pediatrics',
			status: 'Pending'
		},
		{
			id: 'APT-2046',
			patient: {
				name: 'Lamia Begum',
				id: '#APT-2046',
				initials: 'LB',
				avatarBg: '#A78BFA'
			},
			doctor: 'Dr. Farhana Sultana',
			dateTime: 'Tomorrow · 10:30',
			type: 'Dermatology',
			status: 'Cancelled'
		}
	];

	// Reactive states
	let appointments = $state<Appointment[]>(initialAppointments);
	let searchQuery = $state('');
	let activeFilter = $state<'All' | 'Pending' | 'Confirmed'>('All');
	let isRefreshing = $state(false);

	// Refresh simulation (pure UI)
	function handleRefresh() {
		if (isRefreshing) return;
		isRefreshing = true;
		setTimeout(() => {
			appointments = [...initialAppointments];
			isRefreshing = false;
		}, 400);
	}

	// Filtered list
	let filteredAppointments = $derived(
		appointments.filter((apt) => {
			if (activeFilter === 'Pending' && apt.status !== 'Pending') {
				return false;
			}
			if (activeFilter === 'Confirmed' && apt.status !== 'Confirmed') {
				return false;
			}

			if (searchQuery.trim()) {
				const q = searchQuery.toLowerCase().trim();
				return (
					apt.patient.name.toLowerCase().includes(q) ||
					apt.patient.id.toLowerCase().includes(q) ||
					apt.doctor.toLowerCase().includes(q) ||
					apt.type.toLowerCase().includes(q)
				);
			}

			return true;
		})
	);

	// Badge styling helper
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
		}
	}
</script>

<div
	class="flex min-h-225 w-full bg-brand-bg font-sans text-text-primary"
>
	<!-- Sidebar -->
	<aside
		class="side hidden md:flex w-62.5 shrink-0 flex-col gap-7 border-r border-brand-border-subtle bg-brand-sidebar p-7"
	>
		<!-- Logo -->
		<div class="flex items-center gap-3 px-1.5">
			<span class="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-teal">
				<svg
					aria-hidden="true"
					width="22"
					height="22"
					viewBox="0 0 24 24"
					fill="none"
					stroke="#0B0F1A"
					stroke-width="2.6"
					stroke-linecap="round"
				>
					<path d="M12 5v14M5 12h14" />
				</svg>
			</span>
			<span class="text-4.75 font-extrabold text-white">MediDesk</span>
		</div>

		<!-- Nav -->
		<nav class="flex flex-col gap-1.5">
			<a
				href="#dashboard"
				class="flex min-h-11 items-center gap-3 rounded-xl px-3.5 text-sm font-medium text-text-secondary transition-colors hover:text-white"
			>
				<span class="h-2 w-2 rounded-0.75 bg-btn-border-hover"></span>
				Dashboard
			</a>

			<a
				href="#appointments"
				class="flex min-h-11 items-center gap-3 rounded-xl bg-brand-active px-3.5 text-sm font-semibold text-white"
			>
				<span class="h-2 w-2 rounded-0.75 bg-brand-teal"></span>
				Appointments
			</a>

			<a
				href="#patients"
				class="flex min-h-11 items-center gap-3 rounded-xl px-3.5 text-sm font-medium text-text-secondary transition-colors hover:text-white"
			>
				<span class="h-2 w-2 rounded-0.75 bg-btn-border-hover"></span>
				Patients
			</a>

			<a
				href="#doctors"
				class="flex min-h-11 items-center gap-3 rounded-xl px-3.5 text-sm font-medium text-text-secondary transition-colors hover:text-white"
			>
				<span class="h-2 w-2 rounded-0.75 bg-btn-border-hover"></span>
				Doctors
			</a>

			<a
				href="#reports"
				class="flex min-h-11 items-center gap-3 rounded-xl px-3.5 text-sm font-medium text-text-secondary transition-colors hover:text-white"
			>
				<span class="h-2 w-2 rounded-0.75 bg-btn-border-hover"></span>
				Reports
			</a>

			<a
				href="#settings"
				class="flex min-h-11 items-center gap-3 rounded-xl px-3.5 text-sm font-medium text-text-secondary transition-colors hover:text-white"
			>
				<span class="h-2 w-2 rounded-0.75 bg-btn-border-hover"></span>
				Settings
			</a>
		</nav>

		<!-- Bottom Server Status Card -->
		<div
			class="mt-auto flex flex-col gap-1.5 rounded-2xl border border-brand-border bg-brand-status-card p-4"
		>
			<span class="text-xs text-text-secondary">Server status</span>
			<span class="flex items-center gap-2 text-sm font-semibold text-white">
				<span class="h-2 w-2 rounded-full bg-status-green"></span>
				Connected
			</span>
			<span class="text-xs text-text-secondary">Last sync 12 sec ago</span>
		</div>
	</aside>

	<!-- Main Content -->
	<main class="flex min-w-0 flex-1 flex-col gap-7 p-8 lg:p-10">
		<!-- Header -->
		<header class="flex flex-wrap items-center justify-between gap-4">
			<div>
				<h1 class="m-0 text-3xl font-extrabold tracking-tight text-white">Appointments</h1>
				<p class="mt-1.5 text-sm text-text-secondary">
					Live from the patient booking server · Monday, 9 November
				</p>
			</div>

			<div class="flex flex-wrap items-center gap-3">
				<!-- Search -->
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
						aria-label="Search patients"
						placeholder="Search patient or doctor"
						class="w-52 bg-transparent text-sm text-text-primary outline-none placeholder:text-text-secondary"
					/>
				</label>

				<!-- Refresh -->
				<button
					onclick={handleRefresh}
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

		<!-- 4 Stats Cards -->
		<section class="grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-4">
			<div class="flex flex-col gap-1.5 rounded-5 border border-brand-border bg-brand-card p-5.5">
				<span class="text-3.25 text-text-secondary">Total today</span>
				<span class="text-4xl font-bold tracking-tight text-text-primary">24</span>
				<span class="text-xs text-text-secondary">Across 4 doctors</span>
			</div>

			<div class="flex flex-col gap-1.5 rounded-5 border border-brand-border bg-brand-card p-5.5">
				<span class="text-3.25 text-text-secondary">Confirmed</span>
				<span class="text-4xl font-bold tracking-tight text-status-green">15</span>
				<span class="text-xs text-text-secondary">Ready to be seen</span>
			</div>

			<div class="flex flex-col gap-1.5 rounded-5 border border-brand-border bg-brand-card p-5.5">
				<span class="text-3.25 text-text-secondary">Pending</span>
				<span class="text-4xl font-bold tracking-tight text-status-amber">6</span>
				<span class="text-xs text-text-secondary">Awaiting approval</span>
			</div>

			<div class="flex flex-col gap-1.5 rounded-5 border border-brand-border bg-brand-card p-5.5">
				<span class="text-3.25 text-text-secondary">Cancelled</span>
				<span class="text-4xl font-bold tracking-tight text-status-red">3</span>
				<span class="text-xs text-text-secondary">Slots reopened</span>
			</div>
		</section>

		<!-- Appointments Table Section -->
		<section class="overflow-hidden rounded-3xl border border-brand-border bg-brand-card">
			<!-- Header inside table card -->
			<div class="flex flex-wrap items-center justify-between gap-3 p-5.5 px-6">
				<div class="flex items-center gap-3">
					<h2 class="m-0 text-lg font-bold text-white">Upcoming appointments</h2>
					<span
						class="rounded-lg bg-brand-teal/12 px-2.5 py-1 font-mono text-xs font-medium text-brand-teal"
					>
						GET /api/appointments
					</span>
				</div>

				<div class="flex items-center gap-2">
					<button
						onclick={() => (activeFilter = 'All')}
						class="cursor-pointer rounded-full px-3.5 py-2 text-3.25 font-semibold transition-colors {activeFilter ===
						'All'
							? 'bg-brand-active text-white'
							: 'text-text-secondary hover:text-white'}"
					>
						All
					</button>
					<button
						onclick={() => (activeFilter = 'Pending')}
						class="cursor-pointer rounded-full px-3.5 py-2 text-3.25 font-semibold transition-colors {activeFilter ===
						'Pending'
							? 'bg-brand-active text-white'
							: 'text-text-secondary hover:text-white'}"
					>
						Pending
					</button>
					<button
						onclick={() => (activeFilter = 'Confirmed')}
						class="cursor-pointer rounded-full px-3.5 py-2 text-3.25 font-semibold transition-colors {activeFilter ===
						'Confirmed'
							? 'bg-brand-active text-white'
							: 'text-text-secondary hover:text-white'}"
					>
						Confirmed
					</button>
				</div>
			</div>

			<!-- Table -->
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
				{#if filteredAppointments.length === 0}
					<div class="border-t border-brand-border-subtle px-6 py-12 text-center text-sm text-text-secondary">
						No appointments found matching your criteria.
					</div>
				{:else}
					{#each filteredAppointments as apt (apt.id)}
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
									<div class="font-semibold text-text-primary">{apt.patient.name}</div>
									<div class="text-xs text-text-secondary">{apt.patient.id}</div>
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
									<span
										style="background-color: {badge.color};"
										class="h-1.5 w-1.5 rounded-full"
									></span>
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
		</section>
	</main>
</div>
