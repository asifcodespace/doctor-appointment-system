<script lang="ts">
	import type { PatientRecord } from '#lib/types/patient';
	import {
		BOOKING_DOCTORS,
		BOOKING_TIME_SLOTS,
		BOOKING_START_STATUSES,
		type BookingDoctor,
		type BookingStartStatus,
		type BookingPayload
	} from '#lib/types/booking';

	// ── Props ────────────────────────────────────────────────────────────────
	let {
		open = false,
		patient = null,
		onClose,
		onConfirm
	}: {
		open: boolean;
		patient?: PatientRecord | null;
		onClose?: () => void;
		onConfirm?: (booking: BookingPayload) => void;
	} = $props();

	// ── Generate next 6 days ─────────────────────────────────────────────────
	function getNext6Days(): { short: string; num: number; full: string }[] {
		const result: { short: string; num: number; full: string }[] = [];
		const now = new Date();
		const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
		for (let i = 0; i < 6; i++) {
			const d = new Date(now);
			d.setDate(now.getDate() + i);
			result.push({
				short: dayNames[d.getDay()],
				num: d.getDate(),
				full: `${dayNames[d.getDay()]} ${d.getDate()} ${monthNames[d.getMonth()]}`
			});
		}
		return result;
	}

	// ── Local state ──────────────────────────────────────────────────────────
	let days = $state(getNext6Days());
	let selectedDoctor = $state<BookingDoctor>(BOOKING_DOCTORS[1]);
	let selectedDayIndex = $state(2);
	let selectedTime = $state('10:30');
	let startAs = $state<BookingStartStatus>('Confirmed');
	let reason = $state('');

	// Reset state each time the modal opens
	$effect(() => {
		if (open) {
			days = getNext6Days();
			selectedDoctor = BOOKING_DOCTORS[1];
			selectedDayIndex = 2;
			selectedTime = '10:30';
			startAs = 'Confirmed';
			reason = '';
		}
	});

	let selectedDayFull = $derived(days[selectedDayIndex]?.full ?? '');

	// ── Event handlers ───────────────────────────────────────────────────────
	function handleKeydown(e: KeyboardEvent) {
		if (open && e.key === 'Escape') onClose?.();
	}

	function handleConfirm() {
		if (!selectedDayFull || !selectedTime) return;
		onConfirm?.({
			patient: patient ?? null,
			doctor: selectedDoctor,
			date: selectedDayFull,
			time: selectedTime,
			startAs,
			reason
		});
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<!--
		Backdrop — full-viewport overlay.
		We use a wrapping <div> as the scroll container so the modal itself
		can be a natural-height flex row without any max-h gymnastics.
	-->
	<div
		role="presentation"
		onclick={() => onClose?.()}
		class="fixed inset-0 z-50 overflow-y-auto bg-black/65 backdrop-blur-sm"
	>
		<!-- Centering shell — extra padding so the modal never touches edges -->
		<div class="flex min-h-full items-center justify-center p-4 py-8">
			<!--
				Modal panel.
				– max-w is capped so it never stretches too wide on ultra-wide screens.
				– We let height grow naturally with content; the left column is the
				  only scrollable area when content is taller than the viewport.
			-->
			<!-- svelte-ignore a11y_click_events_have_key_events -->
			<div
				role="dialog"
				aria-modal="true"
				aria-label="Book appointment"
				tabindex="-1"
				onclick={(e) => e.stopPropagation()}
				class="relative flex w-full max-w-5xl rounded-5 border border-brand-border bg-brand-bg shadow-2xl overflow-hidden"
			>
				<!-- ══ LEFT: Booking Form ══════════════════════════════════════ -->
				<div class="flex-1 min-w-0 overflow-y-auto p-8 flex flex-col gap-7">

					<!-- Page heading -->
					<div>
						<h2 class="m-0 text-32px font-extrabold tracking-tight text-white">
							Book appointment
						</h2>
						<p class="mt-1.5 m-0 text-sm text-text-secondary">
							Create a booking for a patient and choose how it starts
						</p>
					</div>

					<!-- ── Step 1: Patient ────────────────────────────────────── -->
					<section class="flex flex-col gap-3">
						<h3 class="m-0 text-xs font-bold tracking-widest text-text-secondary uppercase">
							1. Patient
						</h3>
						<div
							class="flex items-center justify-between gap-4 rounded-4 border border-brand-border bg-brand-card px-5 py-4"
						>
							{#if patient}
								<div class="flex items-center gap-3.5">
									<span
										class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-brand-bg"
										style="background-color: {patient.avatarBg};"
									>
										{patient.initials}
									</span>
									<div>
										<div class="font-bold text-white leading-snug">{patient.name}</div>
										<div class="text-xs text-text-secondary mt-0.5">
											{patient.id} · {patient.age} · {patient.gender}
										</div>
									</div>
								</div>
							{:else}
								<div class="flex items-center gap-3.5">
									<span
										class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-active text-sm font-bold text-text-secondary"
									>
										?
									</span>
									<div>
										<div class="font-semibold text-text-muted leading-snug">No patient selected</div>
										<div class="text-xs text-text-secondary mt-0.5">Search to assign a patient</div>
									</div>
								</div>
							{/if}
							<button
								type="button"
								class="shrink-0 text-sm font-semibold text-brand-teal hover:underline cursor-pointer border-0 bg-transparent p-0"
							>
								Change
							</button>
						</div>
					</section>

					<!-- ── Step 2: Doctor ─────────────────────────────────────── -->
					<section class="flex flex-col gap-3">
						<h3 class="m-0 text-xs font-bold tracking-widest text-text-secondary uppercase">
							2. Doctor
						</h3>
						<div class="grid grid-cols-3 gap-3">
							{#each BOOKING_DOCTORS as doc (doc.id)}
								<button
									type="button"
									onclick={() => (selectedDoctor = doc)}
									class="flex flex-col gap-3 rounded-4 border p-4 text-left cursor-pointer transition-all
										{selectedDoctor.id === doc.id
											? 'border-brand-teal bg-brand-teal/10'
											: 'border-brand-border bg-brand-card hover:border-brand-teal/40'}"
								>
									<span
										class="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-brand-bg shrink-0"
										style="background-color: {doc.avatarBg};"
									>
										{doc.initials}
									</span>
									<div>
										<div class="text-sm font-bold text-white leading-snug">{doc.name}</div>
										<div class="text-xs text-text-secondary mt-0.5">{doc.specialty}</div>
										<div class="text-xs text-brand-teal mt-1.5">Next free: {doc.nextFree}</div>
									</div>
								</button>
							{/each}
						</div>
					</section>

					<!-- ── Step 3: Date ───────────────────────────────────────── -->
					<section class="flex flex-col gap-3">
						<h3 class="m-0 text-xs font-bold tracking-widest text-text-secondary uppercase">
							3. Date
						</h3>
						<div class="flex gap-2.5">
							{#each days as day, i (i)}
								<button
									type="button"
									onclick={() => (selectedDayIndex = i)}
									class="flex flex-1 flex-col items-center rounded-3.5 border py-3 px-2 cursor-pointer font-semibold transition-all
										{selectedDayIndex === i
											? 'border-brand-teal bg-brand-teal text-brand-bg'
											: 'border-brand-border bg-brand-card text-text-primary hover:border-brand-teal/50'}"
								>
									<span class="text-xs font-semibold leading-tight">{day.short}</span>
									<span class="text-2xl font-extrabold leading-tight mt-0.5">{day.num}</span>
								</button>
							{/each}
						</div>
					</section>

					<!-- ── Step 4: Time ───────────────────────────────────────── -->
					<section class="flex flex-col gap-3">
						<h3 class="m-0 text-xs font-bold tracking-widest text-text-secondary uppercase">
							4. Time
						</h3>
						<div class="grid grid-cols-4 gap-2.5">
							{#each BOOKING_TIME_SLOTS as slot (slot)}
								<button
									type="button"
									onclick={() => (selectedTime = slot)}
									class="rounded-3.5 border py-3 text-sm font-semibold cursor-pointer transition-all
										{selectedTime === slot
											? 'border-brand-teal bg-brand-teal text-brand-bg'
											: 'border-brand-border bg-brand-card text-text-primary hover:border-brand-teal/50'}"
								>
									{slot}
								</button>
							{/each}
						</div>
					</section>

					<!-- ── Step 5: Reason for visit ───────────────────────────── -->
					<section class="flex flex-col gap-3">
						<h3 class="m-0 text-xs font-bold tracking-widest text-text-secondary uppercase">
							5. Reason for visit
						</h3>
						<textarea
							bind:value={reason}
							rows="3"
							placeholder="e.g. Blood pressure follow-up"
							class="w-full resize-none rounded-4 border border-brand-border bg-brand-card px-5 py-4 text-sm text-text-primary placeholder:text-text-secondary outline-none focus:border-brand-teal transition-colors"
						></textarea>
					</section>

				</div>

				<!-- ══ RIGHT: Booking Summary ════════════════════════════════════ -->
				<aside
					class="w-72 shrink-0 flex flex-col border-l border-brand-border bg-brand-sidebar p-7 gap-5"
				>
					<h3 class="m-0 text-xl font-bold text-white">Booking summary</h3>

					<!-- Summary rows -->
					<div class="flex flex-col gap-4 py-1">
						<div class="flex items-start justify-between gap-2">
							<span class="text-sm text-text-secondary shrink-0">Patient</span>
							<span class="text-sm font-semibold text-white text-right">
								{patient?.name ?? '—'}
							</span>
						</div>
						<div class="flex items-start justify-between gap-2">
							<span class="text-sm text-text-secondary shrink-0">Doctor</span>
							<span class="text-sm font-semibold text-white text-right">
								{selectedDoctor.name}
							</span>
						</div>
						<div class="flex items-start justify-between gap-2">
							<span class="text-sm text-text-secondary shrink-0">Date</span>
							<span class="text-sm font-semibold text-white text-right">
								{selectedDayFull}
							</span>
						</div>
						<div class="flex items-start justify-between gap-2">
							<span class="text-sm text-text-secondary shrink-0">Time</span>
							<span class="text-sm font-semibold text-white text-right">
								{selectedTime}
							</span>
						</div>
					</div>

					<!-- Divider -->
					<hr class="border-0 border-t border-brand-border m-0" />

					<!-- Start as dropdown -->
					<div class="flex flex-col gap-2">
						<label class="text-sm text-text-secondary" for="book-start-as">Start as</label>
						<div class="relative">
							<select
								id="book-start-as"
								bind:value={startAs}
								class="w-full appearance-none rounded-3.5 border border-brand-border bg-brand-card px-4 py-3 pr-9 text-sm font-semibold text-text-primary outline-none focus:border-brand-teal transition-colors cursor-pointer"
							>
								{#each BOOKING_START_STATUSES as s (s)}
									<option value={s} class="bg-brand-card text-text-primary">{s}</option>
								{/each}
							</select>
							<svg
								aria-hidden="true"
								width="14"
								height="14"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								stroke-width="2.5"
								stroke-linecap="round"
								stroke-linejoin="round"
								class="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-text-secondary"
							>
								<polyline points="6 9 12 15 18 9"></polyline>
							</svg>
						</div>
					</div>

					<!-- Spacer pushes buttons to bottom -->
					<div class="flex-1"></div>

					<!-- Action buttons -->
					<div class="flex flex-col gap-2.5">
						<button
							type="button"
							onclick={handleConfirm}
							class="w-full min-h-12 rounded-3.5 border-0 bg-brand-teal font-bold text-sm text-brand-bg cursor-pointer hover:opacity-90 active:scale-98 transition-all"
						>
							Confirm booking
						</button>
						<button
							type="button"
							onclick={() => onClose?.()}
							class="w-full min-h-12 rounded-3.5 border border-brand-border bg-btn-dark font-semibold text-sm text-text-primary cursor-pointer hover:bg-btn-hover active:scale-98 transition-all"
						>
							Cancel
						</button>
					</div>
				</aside>

				<!-- ✕ Close button (absolutely positioned in top-right of the form side) -->
				<button
					type="button"
					onclick={() => onClose?.()}
					aria-label="Close booking dialog"
					class="absolute right-80 top-5 flex h-8 w-8 items-center justify-center rounded-full border border-brand-border bg-brand-active text-text-secondary cursor-pointer hover:text-white hover:border-brand-teal/60 transition-all"
				>
					<svg
						aria-hidden="true"
						width="13"
						height="13"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path d="M18 6L6 18M6 6l12 12" />
					</svg>
				</button>
			</div>
		</div>
	</div>
{/if}
