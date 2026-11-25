<script lang="ts">
	import type { Appointment } from '#lib/api';

	let {
		appointment = null,
		onKeep,
		onConfirmReschedule
	}: {
		appointment: Appointment | null;
		onKeep: () => void;
		onConfirmReschedule: (payload: {
			id: string;
			newDate: string;
			newTime: string;
			reason: string;
			notifyPatient: boolean;
		}) => void;
	} = $props();

	// Generate a 7-day strip from today
	const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	function buildDays() {
		const today = new Date();
		const days = [];
		for (let i = 0; i < 7; i++) {
			const d = new Date(today);
			d.setDate(today.getDate() + i);
			days.push({
				dayName: DAY_NAMES[d.getDay()],
				dayNum: d.getDate(),
				monthName: MONTH_NAMES[d.getMonth()],
				iso: d.toISOString().slice(0, 10)
			});
		}
		return days;
	}

	const TIME_SLOTS = [
		'09:00', '09:45', '10:30', '11:15',
		'14:00', '14:45', '15:30', '16:15'
	];

	const days = buildDays();

	let selectedDayIso = $state(days[1]?.iso ?? days[0].iso);
	let selectedTime = $state('');
	let reason = $state('');
	let notifyPatient = $state(true);

	$effect(() => {
		if (appointment) {
			selectedDayIso = days[1]?.iso ?? days[0].iso;
			selectedTime = '';
			reason = '';
			notifyPatient = true;
		}
	});

	let selectedDay = $derived(days.find((d) => d.iso === selectedDayIso) ?? days[0]);

	let newTimeLabel = $derived(
		selectedTime
			? `${selectedDay.dayName} ${selectedDay.dayNum} ${selectedDay.monthName} · ${selectedTime}`
			: '—'
	);

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!appointment || !selectedTime) return;
		onConfirmReschedule({
			id: appointment.id,
			newDate: selectedDayIso,
			newTime: selectedTime,
			reason: reason.trim(),
			notifyPatient
		});
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && appointment) onKeep();
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if appointment}
	<!-- Backdrop -->
	<div
		role="presentation"
		onclick={onKeep}
		class="fixed inset-0 z-110 bg-black/75 backdrop-blur-xs"
	></div>

	<!-- Dialog -->
	<div
		role="dialog"
		aria-modal="true"
		aria-label="Reschedule appointment"
		class="fixed top-1/2 left-1/2 z-110 w-[calc(100%-2rem)] max-w-145 -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl border border-btn-border bg-brand-card p-8 shadow-2xl"
	>
		<h2 class="m-0 text-2xl font-extrabold text-white">Reschedule appointment</h2>
		<p class="mt-1 mb-5 text-sm text-text-muted">
			{appointment.patient.name} · {appointment.doctor}
		</p>

		<!-- Current → New Time Banner -->
		<div class="mb-6 flex items-center gap-3 rounded-2xl border border-brand-border bg-brand-sidebar px-4 py-3 text-sm">
			<span class="shrink-0 text-xs font-semibold text-text-secondary">Current time</span>
			<span class="rounded-xl border border-btn-border bg-btn-dark px-3 py-1.5 text-xs font-semibold text-text-secondary line-through">
				{appointment.dateTime}
			</span>
			<svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 text-text-secondary">
				<path d="M5 12h14M13 6l6 6-6 6" />
			</svg>
			{#if selectedTime}
				<span class="rounded-xl bg-brand-teal px-3 py-1.5 text-xs font-bold text-brand-bg">
					{selectedDay.dayName} {selectedDay.dayNum} {selectedDay.monthName} · {selectedTime}
				</span>
			{:else}
				<span class="rounded-xl border border-brand-border bg-btn-dark px-3 py-1.5 text-xs font-semibold text-text-secondary/50 italic">
					Pick a date & time
				</span>
			{/if}
		</div>

		<form onsubmit={handleSubmit} class="flex flex-col gap-5">
			<!-- Date Strip -->
			<div class="flex flex-col gap-2.5">
				<span class="text-xs font-bold text-text-muted">New date</span>
				<div class="flex gap-3 overflow-x-auto pb-1">
					{#each days as day}
						<button
							type="button"
							onclick={() => { selectedDayIso = day.iso; selectedTime = ''; }}
							class="flex shrink-0 cursor-pointer flex-col items-center gap-1 rounded-2xl px-4 py-2.5 text-center transition-colors {selectedDayIso === day.iso
								? 'bg-brand-teal text-brand-bg'
								: 'text-text-primary hover:bg-brand-active/40'}"
						>
							<span class="text-xs font-semibold leading-none {selectedDayIso === day.iso ? 'opacity-80' : 'text-text-secondary'}">{day.dayName}</span>
							<span class="text-xl font-extrabold leading-none">{day.dayNum}</span>
						</button>
					{/each}
				</div>
			</div>

			<!-- Time Slots -->
			<div class="flex flex-col gap-2.5">
				<span class="text-xs font-bold text-text-muted">New time</span>
				<div class="grid grid-cols-4 gap-2">
					{#each TIME_SLOTS as slot}
						<button
							type="button"
							onclick={() => (selectedTime = slot)}
							class="min-h-11 cursor-pointer rounded-2xl border text-sm font-semibold transition-colors {selectedTime === slot
								? 'border-brand-teal bg-brand-teal text-brand-bg'
								: 'border-btn-border bg-btn-dark text-text-primary hover:border-btn-border-hover hover:bg-btn-hover'}"
						>
							{slot}
						</button>
					{/each}
				</div>
			</div>

			<!-- Reason -->
			<label class="flex flex-col gap-2 text-xs font-bold text-text-muted">
				Reason for change (optional)
				<input
					type="text"
					bind:value={reason}
					placeholder="e.g. Doctor unavailable"
					class="min-h-12 rounded-2xl border border-btn-border bg-brand-sidebar px-4 text-sm font-normal text-text-primary placeholder:text-text-secondary outline-none focus:border-brand-teal"
				/>
			</label>

			<!-- Notify -->
			<label class="flex min-h-11 cursor-pointer items-center gap-3 text-sm text-text-primary">
				<input
					type="checkbox"
					bind:checked={notifyPatient}
					class="h-5 w-5 cursor-pointer accent-brand-teal"
				/>
				Notify the patient by email and SMS
			</label>

			<!-- Footer Buttons -->
			<div class="flex justify-end gap-3 pt-1">
				<button
					type="button"
					onclick={onKeep}
					class="min-h-12 cursor-pointer rounded-2xl border border-btn-border bg-btn-dark px-6 text-sm font-semibold text-text-primary transition-colors hover:border-btn-border-hover hover:bg-btn-hover"
				>
					Keep current time
				</button>
				<button
					type="submit"
					disabled={!selectedTime}
					class="min-h-12 cursor-pointer rounded-2xl border-0 bg-brand-teal px-6 text-sm font-extrabold text-brand-bg transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
				>
					Confirm new time
				</button>
			</div>
		</form>
	</div>
{/if}
