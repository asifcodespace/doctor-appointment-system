<script lang="ts">
	import type { ServerStatus } from '#lib/api';

	let {
		serverStatus,
		activePage = 'Dashboard'
	}: {
		serverStatus: ServerStatus;
		activePage?: string;
	} = $props();

	const navItems = [
		{ label: 'Dashboard', href: '/' },
		{ label: 'Appointments', href: '/appointments' },
		{ label: 'Patients', href: '#patients' },
		{ label: 'Doctors', href: '#doctors' },
		{ label: 'Reports', href: '#reports' },
		{ label: 'Settings', href: '#settings' }
	];

	let lastSyncLabel = $derived(
		serverStatus.connected
			? serverStatus.lastSyncSeconds < 60
				? `Last sync ${serverStatus.lastSyncSeconds} sec ago`
				: serverStatus.lastSyncSeconds < 3600
					? `Last sync ${Math.floor(serverStatus.lastSyncSeconds / 60)}m ${serverStatus.lastSyncSeconds % 60}s ago`
					: `Last sync ${Math.floor(serverStatus.lastSyncSeconds / 3600)}h ago`
			: 'Offline'
	);
</script>

<aside
	class="w-62.5 shrink-0 bg-brand-sidebar border-r border-brand-border-subtle p-7 flex flex-col gap-7 box-border"
>
	<!-- Brand Logo -->
	<div class="flex items-center gap-3 px-1.5">
		<span class="w-10 h-10 rounded-xl bg-brand-teal flex items-center justify-center">
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
		<span class="font-extrabold text-4.75 text-white tracking-tight">MediDesk</span>
	</div>

	<!-- Navigation Links -->
	<nav class="flex flex-col gap-1.5">
		{#each navItems as item}
			{@const isActive = activePage === item.label}
			<a
				href={item.href}
				class="flex items-center gap-3 min-h-11 px-3.5 rounded-xl text-sm font-semibold transition-colors {isActive
					? 'bg-brand-active text-white'
					: 'bg-transparent text-text-secondary font-medium hover:text-white'}"
			>
				<span
					class="w-2 h-2 rounded-0.75 {isActive ? 'bg-brand-teal' : 'bg-[#3A4565]'}"
				></span>
				{item.label}
			</a>
		{/each}
	</nav>

	<!-- Server Status Card in Sidebar -->
	<div
		class="mt-auto bg-brand-status-card border border-brand-border rounded-2xl p-4 flex flex-col gap-1.5"
	>
		<span class="text-xs text-text-secondary">Server status</span>
		<span class="flex items-center gap-2 font-semibold text-sm text-white">
			<span
				class="w-2 h-2 rounded-full {serverStatus.connected ? 'bg-status-green' : 'bg-status-red'}"
			></span>
			{serverStatus.connected ? 'Connected' : 'Disconnected'}
		</span>
		<span class="text-xs text-text-secondary">{lastSyncLabel}</span>
	</div>
</aside>

