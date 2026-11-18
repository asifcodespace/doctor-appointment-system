<script lang="ts">
	import type { PatientStatus } from '#lib/types/patient';

	let { status }: { status: PatientStatus } = $props();

	const statusConfig: Record<
		PatientStatus,
		{ dot: string; bg: string; text: string }
	> = {
		Active: {
			dot: 'bg-status-green',
			bg: 'bg-status-green/14',
			text: 'text-status-green'
		},
		'Follow-up': {
			dot: 'bg-status-amber',
			bg: 'bg-status-amber/14',
			text: 'text-status-amber'
		},
		New: {
			dot: 'bg-status-blue',
			bg: 'bg-status-blue/14',
			text: 'text-status-blue'
		},
		Inactive: {
			dot: 'bg-status-inactive',
			bg: 'bg-status-inactive/12',
			text: 'text-status-inactive'
		}
	};
</script>

<span
	class="inline-flex items-center gap-1.5 px-3 py-1.25 rounded-full text-xs font-semibold {statusConfig[status].bg} {statusConfig[status].text}"
>
	<span class="w-1.5 h-1.5 rounded-full {statusConfig[status].dot}"></span>
	{status}
</span>
