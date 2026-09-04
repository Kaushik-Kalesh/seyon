<script lang="ts">
  import ModelCard from '$lib/components/ModelCard.svelte';
  let { data } = $props();
  let { industry, models } = $derived(data);
</script>

<svelte:head>
  <title>{industry.name} | Seyon</title>
</svelte:head>

<div class="bg-dark text-white py-24 px-4 relative overflow-hidden">
  <div class="absolute inset-0 z-0 opacity-30">
    <img src={industry.imageUrl} alt={industry.name} class="w-full h-full object-cover" />
    <div class="absolute inset-0 bg-gradient-to-t from-dark to-transparent"></div>
  </div>
  <div class="page-container relative z-10 text-center">
    <div class="inline-block px-4 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase mb-6 backdrop-blur-sm">
      Industry Solution
    </div>
    <h1 class="text-5xl font-bold mb-6">{industry.name}</h1>
    <div class="text-xl text-gray-300 max-w-3xl mx-auto prose prose-sm max-w-none">{@html industry.description}</div>
  </div>
</div>

<section class="page-container py-24">
  <div class="mb-12 border-b border-gray-200 pb-6 flex justify-between items-center">
    <h2 class="text-3xl font-bold text-dark">Models for {industry.name}</h2>
    <span class="text-dark-gray bg-gray-100 px-4 py-1 rounded-full text-sm font-medium">{models.length} Models</span>
  </div>
  
  {#if models.length > 0}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each models as model}
        <ModelCard {model} />
      {/each}
    </div>
  {:else}
    <div class="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100">
      <p class="text-dark-gray text-lg">No models are currently listed for this industry.</p>
    </div>
  {/if}
</section>



