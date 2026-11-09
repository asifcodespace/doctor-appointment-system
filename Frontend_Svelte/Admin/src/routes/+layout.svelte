<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Admin Appointments - MediDesk</title>
</svelte:head>

{@render children()}

