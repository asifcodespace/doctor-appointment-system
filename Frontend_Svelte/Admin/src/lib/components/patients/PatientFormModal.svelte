<script lang="ts">
	import type { PatientRecord, PatientStatus } from '#lib/types/patient';

	const GENDER_OPTIONS = ['Female', 'Male', 'Other'] as const;
	const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Not known'] as const;
	const STATUS_OPTIONS: PatientStatus[] = ['Active', 'Follow-up', 'New', 'Inactive'];

	let {
		open = false,
		patient = null,
		onClose,
		onSave
	}: {
		open: boolean;
		patient?: PatientRecord | null;
		onClose: () => void;
		onSave: (data: Partial<PatientRecord>) => void;
	} = $props();

	let name = $state('');
	let age = $state('');
	let gender = $state<(typeof GENDER_OPTIONS)[number]>('Female');
	let bloodGroup = $state<(typeof BLOOD_GROUPS)[number]>('Not known');
	let phone = $state('');
	let email = $state('');
	let address = $state('');
	let allergies = $state('');
	let status = $state<PatientStatus>('New');

	$effect(() => {
		if (open) {
			name = patient?.name ?? '';
			age = patient?.age?.toString() ?? '';
			gender = (patient?.gender ?? 'Female') as typeof gender;
			bloodGroup = (patient?.bloodGroup ?? 'Not known') as typeof bloodGroup;
			phone = patient?.phone ?? '';
			email = patient?.email ?? '';
			address = patient?.address ?? '';
			allergies = patient?.allergiesAndConditions?.join(', ') ?? '';
			status = patient?.status ?? 'New';
		}
	});

	function getInitials(n: string) {
		return n
			.trim()
			.split(/\s+/)
			.map((w) => w[0]?.toUpperCase() ?? '')
			.slice(0, 2)
			.join('');
	}

	function handleSubmit(e: SubmitEvent) {
		e.preventDefault();
		const trimmedName = name.trim();
		if (!trimmedName) return;
		onSave({
			name: trimmedName,
			initials: getInitials(trimmedName),
			age: parseInt(age) || 0,
			gender: gender as PatientRecord['gender'],
			bloodGroup,
			phone: phone.trim(),
			email: email.trim(),
			address: address.trim(),
			allergiesAndConditions: allergies.trim()
				? allergies.split(',').map((s) => s.trim()).filter(Boolean)
				: [],
			status
		});
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && open) onClose();
	}

	const isEditing = $derived(!!patient);
</script>

<svelte:window onkeydown={handleKeydown} />

{#if open}
	<!-- Backdrop -->
	<div
		role="presentation"
		onclick={onClose}
		class="fixed inset-0 z-110 bg-black/75 backdrop-blur-xs"
	></div>

	<!-- Modal -->
	<div
		role="dialog"
		aria-modal="true"
		aria-label="{isEditing ? 'Edit patient' : 'Add patient'}"
		class="fixed top-1/2 left-1/2 z-110 w-[calc(100%-2rem)] max-w-145 -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl border border-btn-border bg-brand-card p-8 shadow-2xl"
		style="max-height: calc(100vh - 2rem);"
	>
		<!-- Header -->
		<div class="mb-1 flex items-start justify-between gap-4">
			<div>
				<h2 class="m-0 text-2xl font-extrabold text-white">
					{isEditing ? 'Edit patient' : 'Add patient'}
				</h2>
				<p class="mt-1 mb-0 text-sm text-text-muted">
					{isEditing
						? "Update the patient's information."
						: "The same form opens as \"Edit details\" with the patient's information filled in."}
				</p>
			</div>
			<button
				type="button"
				onclick={onClose}
				aria-label="Close"
				class="flex min-h-10 min-w-10 shrink-0 cursor-pointer items-center justify-center rounded-2xl border border-btn-border bg-btn-dark text-text-primary transition-colors hover:border-btn-border-hover hover:bg-btn-hover"
			>
				<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round">
					<path d="M6 6l12 12M18 6L6 18" />
				</svg>
			</button>
		</div>

		<form onsubmit={handleSubmit} class="mt-6 flex flex-col gap-4">
			<!-- Row: Full Name + Age -->
			<div class="grid grid-cols-[1fr_100px] gap-3">
				<label class="flex flex-col gap-2 text-xs font-bold text-text-muted">
					Full name
					<input
						type="text"
						bind:value={name}
						placeholder="Patient's full name"
						required
						class="min-h-12 rounded-2xl border border-btn-border bg-brand-sidebar px-4 text-sm font-normal text-text-primary placeholder:text-text-secondary outline-none focus:border-brand-teal"
					/>
				</label>
				<label class="flex flex-col gap-2 text-xs font-bold text-text-muted">
					Age
					<input
						type="number"
						bind:value={age}
						placeholder="Years"
						min="0"
						max="150"
						class="min-h-12 rounded-2xl border border-btn-border bg-brand-sidebar px-4 text-sm font-normal text-text-primary placeholder:text-text-secondary outline-none focus:border-brand-teal"
					/>
				</label>
			</div>

			<!-- Row: Gender + Blood Group + Phone -->
			<div class="grid grid-cols-3 gap-3">
				<label class="flex flex-col gap-2 text-xs font-bold text-text-muted">
					Gender
					<select
						bind:value={gender}
						class="min-h-12 rounded-2xl border border-btn-border bg-brand-sidebar px-4 text-sm font-normal text-text-primary outline-none focus:border-brand-teal"
					>
						{#each GENDER_OPTIONS as g}
							<option value={g}>{g}</option>
						{/each}
					</select>
				</label>
				<label class="flex flex-col gap-2 text-xs font-bold text-text-muted">
					Blood group
					<select
						bind:value={bloodGroup}
						class="min-h-12 rounded-2xl border border-btn-border bg-brand-sidebar px-4 text-sm font-normal text-text-primary outline-none focus:border-brand-teal"
					>
						{#each BLOOD_GROUPS as bg}
							<option value={bg}>{bg}</option>
						{/each}
					</select>
				</label>
				<label class="flex flex-col gap-2 text-xs font-bold text-text-muted">
					Phone
					<input
						type="tel"
						bind:value={phone}
						placeholder="Phone number"
						class="min-h-12 rounded-2xl border border-btn-border bg-brand-sidebar px-4 text-sm font-normal text-text-primary placeholder:text-text-secondary outline-none focus:border-brand-teal"
					/>
				</label>
			</div>

			<!-- Email -->
			<label class="flex flex-col gap-2 text-xs font-bold text-text-muted">
				Email
				<input
					type="email"
					bind:value={email}
					placeholder="Email address"
					class="min-h-12 rounded-2xl border border-btn-border bg-brand-sidebar px-4 text-sm font-normal text-text-primary placeholder:text-text-secondary outline-none focus:border-brand-teal"
				/>
			</label>

			<!-- Address -->
			<label class="flex flex-col gap-2 text-xs font-bold text-text-muted">
				Address
				<input
					type="text"
					bind:value={address}
					placeholder="Street, city"
					class="min-h-12 rounded-2xl border border-btn-border bg-brand-sidebar px-4 text-sm font-normal text-text-primary placeholder:text-text-secondary outline-none focus:border-brand-teal"
				/>
			</label>

			<!-- Row: Allergies + Status -->
			<div class="grid grid-cols-[1fr_140px] gap-3">
				<label class="flex flex-col gap-2 text-xs font-bold text-text-muted">
					Allergies and conditions
					<input
						type="text"
						bind:value={allergies}
						placeholder="e.g. Penicillin, mild hypertension"
						class="min-h-12 rounded-2xl border border-btn-border bg-brand-sidebar px-4 text-sm font-normal text-text-primary placeholder:text-text-secondary outline-none focus:border-brand-teal"
					/>
				</label>
				<label class="flex flex-col gap-2 text-xs font-bold text-text-muted">
					Status
					<select
						bind:value={status}
						class="min-h-12 rounded-2xl border border-btn-border bg-brand-sidebar px-4 text-sm font-normal text-text-primary outline-none focus:border-brand-teal"
					>
						{#each STATUS_OPTIONS as s}
							<option value={s}>{s}</option>
						{/each}
					</select>
				</label>
			</div>

			<!-- Footer -->
			<div class="mt-2 flex justify-end gap-3">
				<button
					type="button"
					onclick={onClose}
					class="min-h-12 cursor-pointer rounded-2xl border border-btn-border bg-btn-dark px-6 text-sm font-semibold text-text-primary transition-colors hover:border-btn-border-hover hover:bg-btn-hover"
				>
					Cancel
				</button>
				<button
					type="submit"
					class="min-h-12 cursor-pointer rounded-2xl border-0 bg-brand-teal px-6 text-sm font-extrabold text-brand-bg transition-opacity hover:opacity-90"
				>
					{isEditing ? 'Save changes' : 'Save patient'}
				</button>
			</div>
		</form>
	</div>
{/if}
