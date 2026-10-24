<script lang="ts">
  import { config } from "$lib/config";
  const icons: Record<string, string> = {
    stethoscope: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z",
    "shield-check":
      "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    pill: "M18.364 5.636a9 9 0 00-12.728 0l-12.728 12.728a9 9 0 0012.728 12.728l12.728-12.728a9 9 0 000-12.728z", // Simplified pill
    "clipboard-list":
      "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
  };

  // Maps config icons to our internal paths/names
  const iconMap: Record<string, string> = {
    stethoscope: "stethoscope",
    "shield-check": "shield-check",
    heartbeat: "pill",
    "clipboard-list": "clipboard-list",
  };
</script>

<section id="services" class="bg-cream px-12 py-[88px] sm:px-6 sm:py-16">
  <div
    class="text-[11px] tracking-[0.18em] uppercase text-secondary font-medium mb-3"
  >
    {config.sections.services.subtitle}
  </div>
  <h2
    class="font-display text-[clamp(28px,4vw,38px)] text-primary font-light mb-14 leading-[1.15]"
  >
    {config.sections.services.title}
  </h2>

  <div
    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
  >
    {#each config.services as service}
      <div
        class="bg-white rounded-[12px] p-8 border border-light transition-all duration-300 hover:shadow-[0_12px_32px_rgba(26,61,58,0.08)] group cursor-default"
      >
        <div
          class="w-12 h-12 rounded-[10px] bg-primary flex items-center justify-center text-[22px] mb-6 transition-colors duration-200 group-hover:bg-secondary"
        >
          {#if service.icon === "stethoscope"}
            <span>🩺</span>
          {:else if service.icon === "shield-check"}
            <span>🛡️</span>
          {:else if service.icon === "heartbeat" || service.icon === "pill"}
            <span>💊</span>
          {:else}
            <span>📋</span>
          {/if}
        </div>
        <h3 class="font-display text-[20px] text-primary font-light mb-3">
          {service.title}
        </h3>
        <p class="text-[13px] text-mid leading-[1.7] font-light opacity-90">
          {service.description}
        </p>
      </div>
    {/each}
  </div>
</section>
