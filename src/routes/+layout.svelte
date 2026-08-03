<script lang="ts">
  import '../app.css';
  import Navbar from '$lib/components/Navbar.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import { page } from '$app/state';
  import { fly, fade } from 'svelte/transition';
  
  let { children } = $props();
  
  let isAdmin = $derived(page.url.pathname.startsWith('/admin'));
</script>

<!-- Preconnect to Google Fonts for performance -->
<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:wght@400;600;700&display=swap" rel="stylesheet">
</svelte:head>

{#if isAdmin}
  {@render children()}
{:else}
  <div class="min-h-screen flex flex-col font-sans bg-base">
    <Navbar />
    <main class="flex-grow flex flex-col overflow-hidden">
      {#key page.url.pathname}
        <div 
          class="flex-grow w-full"
          in:fly={{ y: 20, duration: 400, delay: 200 }} 
          out:fade={{ duration: 200 }}
        >
          {@render children()}
        </div>
      {/key}
    </main>
    <Footer />
  </div>
{/if}
