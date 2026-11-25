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
	let isStartAsOpen = $state(false);
	let openUpward = $state(false);
	let startAsTrigger = $state<HTMLButtonElement | null>(null);
	let reason = $state('');

	function toggleStartAs() {
		if (!isStartAsOpen && startAsTrigger) {
			const rect = startAsTrigger.getBoundingClientRect();
			const spaceBelow = window.innerHeight - rect.bottom;
			const spaceAbove = rect.top;
			openUpward = spaceBelow < 180 && spaceAbove > spaceBelow;
		}
		isStartAsOpen = !isStartAsOpen;
	}

	const START_STATUS_COLORS: Record<BookingStartStatus, string> = {
		Confirmed: '#34D399',
		Pending: '#FBBF24',
		'Follow-up': '#7DD3FC'
	};

	// Reset state each time the modal opens
	$effect(() => {
		if (open) {
			days = getNext6Days();
			selectedDoctor = BOOKING_DOCTORS[1];
			selectedDayIndex = 2;
			selectedTime = '10:30';
			startAs = 'Confirmed';
			isStartAsOpen = false;
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
				class="relative flex w-full max-w-5xl rounded-6 border border-brand-border bg-brand-bg shadow-2xl overflow-hidden"
			>
				<!-- ══ LEFT: Booking Form ══════════════════════════════════════ -->
				<div class="flex-1 min-w-0 overflow-y-auto p-8 flex flex-col gap-6 bg-brand-card rounded-l-6">

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
							class="flex items-center justify-between gap-4 rounded-4.5 border border-btn-border bg-track-bg px-4 py-3.5"
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
						<div class="grid grid-cols-1 md:grid-cols-3 gap-3">
							{#each BOOKING_DOCTORS as doc (doc.id)}
								<button
									type="button"
									onclick={() => (selectedDoctor = doc)}
									class="flex items-center gap-3 rounded-4.5 border p-3.5 text-left cursor-pointer transition-all
										{selectedDoctor.id === doc.id
											? 'border-brand-teal bg-brand-active'
											: 'border-btn-border bg-brand-card hover:border-brand-teal/40'}"
								>
									<span
										class="flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold text-brand-bg shrink-0"
										style="background-color: {doc.avatarBg};"
									>
										{doc.initials}
									</span>
									<div class="min-w-0">
										<div class="text-sm font-bold text-white leading-snug">{doc.name}</div>
										<div class="text-xs text-text-secondary mt-0.5">{doc.specialty}</div>
										<div class="text-xs text-brand-teal mt-1">Next free: {doc.nextFree}</div>
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
									class="flex flex-1 min-h-17.5 flex-col items-center justify-center rounded-2xl border py-3 px-2 cursor-pointer font-semibold transition-all
										{selectedDayIndex === i
											? 'border-brand-teal bg-brand-teal text-brand-bg'
											: 'border-btn-border bg-brand-card text-text-primary hover:border-brand-teal/50'}"
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
									class="min-h-11.5 rounded-xl border py-2.5 text-sm font-bold cursor-pointer transition-all
										{selectedTime === slot
											? 'border-brand-teal bg-brand-teal text-brand-bg'
											: 'border-btn-border bg-brand-card text-text-primary hover:border-brand-teal/50'}"
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
						<input
							type="text"
							bind:value={reason}
							placeholder="e.g. Blood pressure follow-up"
							class="w-full min-h-12.5 rounded-3.5 border border-btn-border bg-brand-card px-4 text-sm text-text-primary placeholder:text-text-secondary outline-none focus:border-brand-teal transition-colors"
						/>
					</section>

				</div>

				<!-- ══ RIGHT: Booking Summary ════════════════════════════════════ -->
				<aside
					class="w-72 shrink-0 flex flex-col border-l border-brand-border bg-brand-card rounded-r-6 p-7 gap-5"
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

					<!-- Start as custom dropdown -->
					<div class="flex flex-col gap-2">
						<span class="text-13px font-bold text-text-muted">Start as</span>
						<div class="relative">
							<button
								bind:this={startAsTrigger}
								type="button"
								aria-haspopup="listbox"
								aria-expanded={isStartAsOpen}
								onclick={toggleStartAs}
								class="w-full min-h-11.5 flex items-center justify-between rounded-3.5 border px-4 text-sm font-semibold text-text-primary outline-none transition-colors cursor-pointer bg-brand-card
									{isStartAsOpen ? 'border-brand-teal' : 'border-btn-border hover:border-brand-teal/50'}"
							>
								<span class="flex items-center gap-2.5">
									<span
										class="h-2 w-2 rounded-full shrink-0"
										style="background-color: {START_STATUS_COLORS[startAs]};"
									></span>
									{startAs}
								</span>
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
									class="text-text-secondary transition-transform {isStartAsOpen ? 'rotate-180' : ''}"
								>
									<polyline points="6 9 12 15 18 9"></polyline>
								</svg>
							</button>

							{#if isStartAsOpen}
								<div
									role="listbox"
									aria-label="Start as status"
									class="absolute left-0 right-0 z-20 rounded-3.5 border border-brand-border bg-brand-card p-1.5 shadow-xl flex flex-col gap-0.5
										{openUpward ? 'bottom-full mb-1.5' : 'top-full mt-1.5'}"
								>
									{#each BOOKING_START_STATUSES as s (s)}
										<button
											type="button"
											role="option"
											aria-selected={startAs === s}
											onclick={() => {
												startAs = s;
												isStartAsOpen = false;
											}}
											class="w-full flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold cursor-pointer border-0 transition-colors text-left
												{startAs === s
													? 'bg-brand-active text-white'
													: 'bg-transparent text-text-muted hover:bg-btn-hover hover:text-white'}"
										>
											<span class="flex items-center gap-2.5">
												<span
													class="h-2 w-2 rounded-full shrink-0"
													style="background-color: {START_STATUS_COLORS[s]};"
												></span>
												{s}
											</span>
											{#if startAs === s}
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
													class="text-brand-teal"
												>
													<polyline points="20 6 9 17 4 12"></polyline>
												</svg>
											{/if}
										</button>
									{/each}
								</div>
							{/if}
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
