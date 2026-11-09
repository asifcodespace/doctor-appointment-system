<script lang="ts">
  import '../lib/styles/app.css';
  import Header from '#lib/components/Header.svelte';
  import Footer from '#lib/components/Footer.svelte';
  import { config } from '#lib/config';

  let { children } = $props();
</script>

<svelte:head>
  <title>{config.branding.siteTitle}</title>
  {#if config.branding.metaDescription}
    <meta name="description" content={config.branding.metaDescription} />
  {/if}
  <link rel="icon" type="image/png" href={config.branding.favicon} />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
</svelte:head>

<div class="min-h-screen flex flex-col bg-white font-body">
  <Header />
  
  <main class="grow">
    {@render children()}
  </main>
  
  <Footer />
</div>
