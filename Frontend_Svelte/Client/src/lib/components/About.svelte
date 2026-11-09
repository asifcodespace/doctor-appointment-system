<script lang="ts">
  import { config } from "#lib/config";

  const badges = config.doctor.qualifications;
</script>

<section id="about" class="bg-white px-8 md:px-12 py-22 sm:py-16 overflow-hidden">
  <div class="max-w-6xl mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
      <!-- Left: Image Area -->
      <div
        class="about-img bg-primary rounded-2xl h-85 md:h-105 flex items-center justify-center relative group overflow-hidden shadow-sm p-0"
      >
        <img
          src={config.doctor.image}
          alt={config.doctor.name}
          class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
        />
        <div
          class="absolute inset-0 flex items-center justify-center font-display text-[110px] text-mist italic font-light opacity-10 select-none pointer-events-none"
        >
          {config.doctor.watermarkText || "M.D."}
        </div>
        <!-- Decorative Ring -->
        <div
          class="absolute -bottom-16 -right-16 w-75 h-75 rounded-full border border-mist/10 pointer-events-none"
        ></div>
      </div>

      <!-- Content -->
      <div class="flex flex-col justify-center lg:pl-4">
        <div
          class="text-[11px] tracking-[0.18em] uppercase text-secondary font-medium mb-3"
        >
          {config.sections.about.sectionLabel}
        </div>
        <h2
          class="font-display text-[42px] text-primary font-light mb-4 leading-[1.1]"
        >
          {config.sections.about.title}
        </h2>

        <!-- Qualifications Badges -->
        <div class="flex flex-wrap gap-2 mb-6">
          {#each badges as badge}
            <span
              class="bg-primary/8 text-primary px-4 py-1.5 rounded-full text-[12px] font-medium tracking-wide"
            >
              {badge}
            </span>
          {/each}
        </div>

        <div class="space-y-5 mb-8">
          <p class="text-[15px] text-mid leading-[1.8] opacity-90">
            {config.doctor.bio}
          </p>
          {#if config.doctor.additionalBio}
            <p class="text-[15px] text-mid leading-[1.8] opacity-90">
              {config.doctor.additionalBio}
            </p>
          {/if}
        </div>

        <div class="pt-2">
          <a href="#contact" class="btn btn-primary inline-flex">
            {config.sections.about.ctaText}
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .about-img {
    height: 500px;
  }
  @media (max-width: 640px) {
    .about-img {
      height: 320px;
    }
  }
</style>
