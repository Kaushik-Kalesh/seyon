<script lang="ts">
  import ModelCard from '$lib/components/ModelCard.svelte';
  let { data } = $props();
  let { parent, product, models } = $derived(data);
</script>

<svelte:head>
  <title>{product.name} | {parent.name} | Seyon</title>
</svelte:head>

<div class="bg-dark text-white py-24 px-4 relative overflow-hidden">
  <div class="absolute inset-0 z-0 opacity-30">
    <div class="w-full h-full bg-gradient-to-br from-primary/20 to-dark"></div>
  </div>
  <div class="page-container relative z-10 text-center">
    <a href={parent.url} class="inline-block px-4 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase mb-6 backdrop-blur-sm hover:bg-primary/20 transition-colors">
      {parent.name}
    </a>
    <h1 class="text-5xl font-bold mb-6">{product.name}</h1>
    <div class="text-xl text-gray-300 max-w-3xl mx-auto prose prose-invert prose-lg">
      {@html product.description || 'Precision-engineered models tailored for this product.'}
    </div>
  </div>
</div>

<section class="page-container py-24">
  <div class="mb-12 border-b border-gray-200 pb-6 flex justify-between items-center">
    <h2 class="text-3xl font-bold text-dark">{product.name} Models</h2>
    <span class="text-dark-gray bg-gray-100 px-4 py-1 rounded-full text-sm font-medium">{models.length} Models</span>
  </div>

  {#if models.length === 0}
    <div class="text-center py-16 bg-gray-50 rounded-3xl border border-gray-100">
      <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
      <h3 class="text-xl font-bold text-dark mb-2">No models found</h3>
      <p class="text-dark-gray">We are currently updating our inventory for this product.</p>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each models as model}
        <ModelCard model={model} />
      {/each}
    </div>
  {/if}
</section>
