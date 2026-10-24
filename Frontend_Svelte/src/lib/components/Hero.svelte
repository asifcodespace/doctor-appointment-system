<script lang="ts">
  import { config } from '$lib/config';
</script>

<section id="hero" class="min-h-screen bg-primary flex items-center px-8 sm:px-12 md:px-16 py-32 md:py-24 relative overflow-hidden">
  <!-- Decorative Rings -->
  <div class="absolute -right-[300px] lg:-right-[400px] -top-[150px] w-[500px] h-[500px] md:w-[900px] md:h-[900px] rounded-full border border-mist/5 pointer-events-none animate-ring-pulse"></div>
  <div class="absolute -right-[150px] lg:-right-[250px] top-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[550px] md:h-[550px] rounded-full border border-mist/10 pointer-events-none"></div>

  <div class="relative z-10 max-w-[800px] w-full">
    <div class="text-[11px] md:text-[12px] tracking-[0.2em] uppercase text-accent font-semibold mb-8 md:mb-10 animate-fade-up" style="animation-delay: 0.2s;">
      {config.sections.hero.tagline}
    </div>
    
    <h1 class="font-display text-[clamp(2.5rem,12vw,5.4rem)] md:text-[clamp(48px,7vw,86px)] font-light text-cream leading-[1.05] mb-4 md:mb-2 animate-fade-up" style="animation-delay: 0.35s;">
      {config.sections.hero.name}
    </h1>

    <div class="font-display text-[1.25rem] md:text-[clamp(20px,3vw,26px)] italic text-mist mb-8 animate-fade-up" style="animation-delay: 0.5s;">
      {config.sections.hero.title}
    </div>

    <p class="text-[14px] md:text-[15px] text-mist/80 leading-[1.7] md:leading-[1.8] max-w-[480px] mb-12 animate-fade-up" style="animation-delay: 0.65s;">
      {config.sections.hero.description}
    </p>

    <div class="flex flex-col sm:flex-row gap-4 animate-fade-up" style="animation-delay: 0.8s;">
      <a href="#contact" class="btn btn-gold px-8 py-3.5 rounded-md text-center">{config.sections.hero.ctaText}</a>
      <a href="#about" class="btn btn-outline px-8 py-3.5 rounded-md hover:border-mist text-center">{config.sections.hero.secondaryCtaText}</a>
    </div>
  </div>
</section>

<style>
  .animate-ring-pulse {
    animation: ringPulse 4s ease-in-out infinite;
  }
</style>
