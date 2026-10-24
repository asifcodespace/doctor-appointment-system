<script lang="ts">
  import { config } from "$lib/config";

  let name = $state("");
  let phone = $state("");
  let reason = $state("General Check-up");
  let message = $state("");
  let submitting = $state(false);
  let errorMessage = $state("");
  let showSuccessModal = $state(false);

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    errorMessage = "";
    showSuccessModal = false;
    submitting = true;

    try {
      const response = await fetch(`${config.apiBaseUrl}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          reason,
          message: message.trim(),
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        errorMessage =
          typeof data === "string"
            ? data
            : "Could not book the appointment. Please try again.";
        return;
      }

      showSuccessModal = true;
      name = "";
      phone = "";
      reason = "General Check-up";
      message = "";
    } catch {
      errorMessage = "Could not reach the server. Please try again.";
    } finally {
      submitting = false;
    }
  }

  function closeSuccessModal() {
    showSuccessModal = false;
  }
</script>

<section id="contact" class="px-12 py-24 bg-white sm:px-5 sm:py-16">
  <div class="max-w-7xl mx-auto">
    <div
      class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start"
    >
      <!-- Left Column: Header + Info -->
      <div class="flex flex-col">
        <!-- Section Header moved inside grid -->
        <div class="mb-12">
          <div
            class="text-[11px] tracking-[0.18em] uppercase text-secondary font-medium mb-3"
          >
            {config.sections.contact.subtitle}
          </div>
          <h2
            class="font-display text-[48px] text-primary font-light leading-tight"
          >
            {config.sections.contact.title}
          </h2>
        </div>

        <div class="flex flex-col gap-8">
          <div class="flex gap-5 items-center">
            <div
              class="shrink-0 w-12 h-12 rounded-[12px] bg-primary flex items-center justify-center text-[20px]"
            >
              <span class="opacity-80">📞</span>
            </div>
            <div>
              <h4 class="text-sm font-medium text-charcoal mb-0.5">Phone</h4>
              <p class="text-[15px] text-mid font-light leading-relaxed">
                {config.contact.phone}
              </p>
            </div>
          </div>

          <div class="flex gap-5 items-center">
            <div
              class="shrink-0 w-12 h-12 rounded-[12px] bg-primary flex items-center justify-center text-[20px]"
            >
              <span class="opacity-80">✉️</span>
            </div>
            <div>
              <h4 class="text-sm font-medium text-charcoal mb-0.5">Email</h4>
              <p class="text-[15px] text-mid font-light leading-relaxed">
                {config.contact.email}
              </p>
            </div>
          </div>

          <div class="flex gap-5 items-center">
            <div
              class="shrink-0 w-12 h-12 rounded-[12px] bg-primary flex items-center justify-center text-[20px]"
            >
              <span class="opacity-80">📍</span>
            </div>
            <div>
              <h4 class="text-sm font-medium text-charcoal mb-0.5">Address</h4>
              <p class="text-[15px] text-mid font-light leading-relaxed">
                {config.contact.address}
              </p>
            </div>
          </div>

          <div class="flex gap-5 items-center">
            <div
              class="shrink-0 w-12 h-12 rounded-[12px] bg-primary flex items-center justify-center text-[20px]"
            >
              <span class="opacity-80">🕒</span>
            </div>
            <div>
              <h4 class="text-sm font-medium text-charcoal mb-0.5">Hours</h4>
              <p class="text-[15px] text-mid font-light leading-relaxed">
                Sat–Thu: 9AM – 6PM
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Form Column -->
      <div
        class="bg-primary/2 rounded-[24px] p-12 sm:p-8 border border-primary/5"
      >
        <form class="flex flex-col gap-8" onsubmit={handleSubmit}>
          <div>
            <label
              for="name"
              class="block text-xs font-semibold text-charcoal mb-2.5 tracking-wide"
              >Your Name</label
            >
            <input
              id="name"
              type="text"
              placeholder="e.g. Abdur Rahman"
              bind:value={name}
              required
              class="w-full bg-white border border-light rounded-[8px] px-5 py-3.5 text-sm outline-none focus:border-secondary transition-all"
            />
          </div>

          <div>
            <label
              for="phone"
              class="block text-xs font-semibold text-charcoal mb-2.5 tracking-wide"
              >Phone Number</label
            >
            <input
              id="phone"
              type="text"
              placeholder="+880..."
              bind:value={phone}
              required
              class="w-full bg-white border border-light rounded-[8px] px-5 py-3.5 text-sm outline-none focus:border-secondary transition-all"
            />
          </div>

          <div>
            <label
              for="reason"
              class="block text-xs font-semibold text-charcoal mb-2.5 tracking-wide"
              >Reason for Visit</label
            >
            <div class="relative">
              <select
                id="reason"
                bind:value={reason}
                class="w-full bg-white border border-light rounded-[8px] px-5 py-3.5 text-sm outline-none focus:border-secondary transition-all appearance-none cursor-pointer"
              >
                <option>General Check-up</option>
                <option>Follow-up</option>
                <option>Emergency</option>
                <option>Other</option>
              </select>
              <div
                class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  ><path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  /></svg
                >
              </div>
            </div>
          </div>

          <div>
            <label
              for="message"
              class="block text-xs font-semibold text-charcoal mb-2.5 tracking-wide"
              >Message</label
            >
            <textarea
              id="message"
              placeholder="Describe your symptoms..."
              bind:value={message}
              class="w-full bg-white border border-light rounded-[8px] px-5 py-3.5 text-sm outline-none focus:border-secondary transition-all min-h-[120px] resize-none"
            ></textarea>
          </div>

          {#if errorMessage}
            <p class="text-sm text-red-700 bg-red-50 border border-red-200 rounded-[8px] px-4 py-3" role="alert">
              {errorMessage}
            </p>
          {/if}

          <button
            type="submit"
            disabled={submitting}
            class="btn btn-gold w-full py-4 text-sm font-bold tracking-widest uppercase disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? "Requesting..." : "Request Appointment"}
          </button>
        </form>
      </div>
    </div>
  </div>
</section>

{#if showSuccessModal}
  <div
    class="fixed inset-0 z-[100] flex items-center justify-center bg-primary/60 px-5"
    role="dialog"
    aria-modal="true"
    aria-labelledby="appointment-success-title"
    tabindex="-1"
    onkeydown={(event) => {
      if (event.key === "Escape") closeSuccessModal();
    }}
  >
    <button
      type="button"
      class="absolute inset-0 cursor-default"
      aria-label="Close success dialog"
      onclick={closeSuccessModal}
    ></button>
    <div
      class="relative z-10 bg-white rounded-[24px] p-8 sm:p-10 max-w-md w-full text-center shadow-xl border border-primary/5"
    >
      <div
        class="mx-auto mb-5 w-12 h-12 rounded-[12px] bg-primary flex items-center justify-center text-[20px]"
      >
        <span class="opacity-80">✓</span>
      </div>
      <h3
        id="appointment-success-title"
        class="font-display text-[32px] text-primary font-light leading-tight mb-3"
      >
        Appointment booked
      </h3>
      <p class="text-[15px] text-mid font-light leading-relaxed mb-8">
        Your request was received successfully. We will contact you soon to confirm the time.
      </p>
      <button
        type="button"
        class="btn btn-gold w-full py-3.5 text-sm font-bold tracking-widest uppercase"
        onclick={closeSuccessModal}
      >
        Close
      </button>
    </div>
  </div>
{/if}
