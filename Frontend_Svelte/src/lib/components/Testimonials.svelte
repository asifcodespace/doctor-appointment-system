<script lang="ts">
  import { config } from "$lib/config";
  const testimonials = [
    {
      stars: "★★★★★",
      text: '"Dr. Avena took the time to really listen. I felt heard and cared for from the very first visit."',
      author: "Fatima R., Patient since 2021",
    },
    {
      stars: "★★★★★",
      text: '"Professional, warm, and thorough. My whole family now sees Dr. Avena — couldn\'t be happier."',
      author: "Karim H., Patient since 2019",
    },
    {
      stars: "★★★★★",
      text: '"The online consultation was seamless. Got a diagnosis and prescription without leaving home."',
      author: "Sarah M., Patient since 2022",
    },
  ];
</script>

<section id="reviews" class="bg-cream px-12 py-24 sm:px-5 sm:py-12">
  <div class="text-left mb-12">
    <div
      class="text-[11px] tracking-[0.18em] uppercase text-secondary font-medium mb-2"
    >
      {config.sections.testimonials.subtitle}
    </div>
    <h2 class="font-display text-[38px] text-primary font-light leading-[1.15]">
      {config.sections.testimonials.title}
    </h2>
  </div>

  <div class="max-w-full mx-[4px] grid grid-cols-1 md:grid-cols-3 gap-6">
    {#each testimonials as review}
      <div class="bg-white rounded-lg p-8 border border-light text-left">
        <div class="text-accent text-sm mb-2">{review.stars}</div>
        <div
          class="font-display text-[18px] text-primary italic leading-normal mb-4"
        >
          {review.text}
        </div>
        <div class="text-[12px] text-mid font-medium italic">
          — {review.author}
        </div>
      </div>
    {/each}
  </div>
</section>
