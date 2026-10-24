<script lang="ts">
  import { config } from "$lib/config";
</script>

<section class="bg-secondary px-6 py-12 md:py-20 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0">
  {#each config.sections.stats.items as item}
    <div class="flex-1 w-full flex flex-col items-center text-center border-b border-white/10 md:border-b-0 md:border-r pb-8 md:pb-0 px-4 last:border-0 last:pb-0">
      <div class="font-display text-[40px] text-white font-light leading-none mb-2">
        {item.value}
      </div>
      <div class="text-[11px] text-white/70 tracking-[0.18em] font-medium uppercase leading-tight">
        {item.label}
      </div>
    </div>
  {/each}
</section>
