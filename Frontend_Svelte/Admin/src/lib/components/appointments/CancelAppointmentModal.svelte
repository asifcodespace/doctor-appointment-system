<script lang="ts">
	import type { Appointment } from '#lib/api';

	let {
		appointment = null,
		onKeep,
		onConfirmCancel
	}: {
		appointment: Appointment | null;
		onKeep: () => void;
		onConfirmCancel: (payload: {
			id: string;
			reason: string;
			note: string;
			notifyPatient: boolean;
		}) => void;
	} = $props();

	const CANCEL_REASONS = [
		'Patient requested',
		'Doctor unavailable',
		'Duplicate booking',
		'Other'
	];

	let reason = $state(CANCEL_REASONS[0]);
	let isReasonOpen = $state(false);
	let note = $state('');
	let notifyPatient = $state(true);

	$effect(() => {
		if (appointment) {
			reason = CANCEL_REASONS[0];
			isReasonOpen = false;
			note = '';
			notifyPatient = true;
		}
	});

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		if (!appointment) return;
		onConfirmCancel({
			id: appointment.id,
			reason,
			note: note.trim(),
			notifyPatient
		});
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && appointment) {
			onKeep();
		}
	}
</script>

<svelte:window onkeydown={handleKeydown} />

{#if appointment}
	<!-- Dimmed backdrop -->
	<div
		role="presentation"
		onclick={onKeep}
		class="fixed inset-0 z-110 bg-black/75 backdrop-blur-xs"
	></div>

	<!-- Centered confirmation dialog -->
	<div
		role="dialog"
		aria-modal="true"
		aria-label="Cancel appointment"
		class="fixed top-1/2 left-1/2 z-110 flex w-[calc(100%-2rem)] max-w-135 -translate-x-1/2 -translate-y-1/2 flex-col gap-5 rounded-3xl border border-btn-border bg-brand-card p-8 shadow-2xl"
	>
		<span
			class="flex h-14 w-14 items-center justify-center rounded-full bg-red-400/14 text-red-300"
		>
			<svg
				aria-hidden="true"
				width="26"
				height="26"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2.2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M12 8v5M12 17h.01" />
				<path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
			</svg>
		</span>

		<div>
			<h2 class="m-0 text-2xl font-extrabold text-white">Cancel this appointment?</h2>
			<p class="mt-2 mb-0 text-sm leading-relaxed text-text-muted">
				{appointment.patient.name} · {appointment.dateTime} · {appointment.doctor}. The time slot
				will become available again.
			</p>
		</div>

		<form onsubmit={handleSubmit} class="flex flex-col gap-4">
			<div class="flex flex-col gap-2">
				<span class="text-xs font-bold text-text-muted">Reason</span>
				<div class="relative">
					<button
						type="button"
						onclick={() => (isReasonOpen = !isReasonOpen)}
						aria-haspopup="listbox"
						aria-expanded={isReasonOpen}
						class="flex min-h-12 w-full cursor-pointer items-center justify-between rounded-2xl border border-btn-border bg-brand-card px-4 text-left text-sm font-normal text-text-primary transition-colors outline-none hover:border-btn-border-hover focus:border-brand-teal"
					>
						<span>{reason}</span>
						<svg
							aria-hidden="true"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2.2"
							stroke-linecap="round"
							stroke-linejoin="round"
							class="shrink-0 text-text-secondary transition-transform {isReasonOpen
								? 'rotate-180'
								: ''}"
						>
							<path d="M6 9l6 6 6-6" />
						</svg>
					</button>

					{#if isReasonOpen}
						<div
							role="listbox"
							aria-label="Cancellation reason"
							class="absolute top-full right-0 left-0 z-20 mt-1.5 flex flex-col overflow-hidden rounded-2xl border border-btn-border bg-brand-sidebar p-1.5 shadow-2xl"
						>
							{#each CANCEL_REASONS as item}
								<button
									type="button"
									role="option"
									aria-selected={reason === item}
									onclick={() => {
										reason = item;
										isReasonOpen = false;
									}}
									class="flex min-h-10 w-full cursor-pointer items-center justify-between rounded-xl px-3.5 text-left text-sm transition-colors {reason ===
									item
										? 'bg-brand-active font-semibold text-brand-teal'
										: 'text-text-primary hover:bg-brand-active/50'}"
								>
									<span>{item}</span>
									{#if reason === item}
										<svg
											aria-hidden="true"
											width="15"
											height="15"
											viewBox="0 0 24 24"
											fill="none"
											stroke="currentColor"
											stroke-width="2.5"
											stroke-linecap="round"
											stroke-linejoin="round"
										>
											<path d="M20 6L9 17l-5-5" />
										</svg>
									{/if}
								</button>
							{/each}
						</div>
					{/if}
				</div>
			</div>

			<label class="flex flex-col gap-2 text-xs font-bold text-text-muted">
				Note (optional)
				<input
					type="text"
					bind:value={note}
					placeholder="Add a short note for the record"
					class="min-h-12 rounded-2xl border border-btn-border bg-brand-card px-3.5 text-sm font-normal text-text-primary placeholder:text-text-secondary outline-none focus:border-brand-teal"
				/>
			</label>

			<label class="flex min-h-11 cursor-pointer items-center gap-3 text-sm text-text-primary">
				<input
					type="checkbox"
					bind:checked={notifyPatient}
					class="h-5 w-5 cursor-pointer accent-brand-teal"
				/>
				Notify the patient by email and SMS
			</label>

			<div class="mt-1 flex justify-end gap-3">
				<button
					type="button"
					onclick={onKeep}
					class="min-h-12 cursor-pointer rounded-2xl border border-btn-border bg-btn-dark px-6 text-sm font-semibold text-text-primary transition-colors hover:border-btn-border-hover hover:bg-btn-hover"
				>
					Keep appointment
				</button>
				<button
					type="submit"
					class="min-h-12 cursor-pointer rounded-2xl border-0 bg-red-400 px-6 text-sm font-extrabold text-brand-bg transition-opacity hover:opacity-90"
				>
					Yes, cancel it
				</button>
			</div>
		</form>
	</div>
{/if}
