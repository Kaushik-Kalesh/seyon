<script lang="ts">
  import ValveCard from '$lib/components/ValveCard.svelte';
  let { data } = $props();
  let { category, products } = $derived(data);
</script>

<svelte:head>
  <title>{category.name} | Seyon</title>
</svelte:head>

<div class="bg-dark text-white py-24 px-4 relative overflow-hidden">
  <div class="absolute inset-0 z-0 opacity-30">
    <div class="w-full h-full bg-gradient-to-br from-primary/20 to-dark"></div>
  </div>
  <div class="page-container relative z-10 text-center">
    <div class="inline-block px-4 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase mb-6 backdrop-blur-sm">
      Product Category
    </div>
    <h1 class="text-5xl font-bold mb-6">{category.name}</h1>
    <p class="text-xl text-gray-300 max-w-3xl mx-auto">
      {category.description || 'Precision-engineered valves tailored for this category.'}
    </p>
  </div>
</div>

<section class="page-container py-24">
  {#if category.subItems?.length > 0}
    <div class="mb-12 p-8 bg-gray-50 rounded-3xl border border-gray-100">
      <h3 class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Explore Sub-Categories</h3>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {#each category.subItems as sub}
          <a href={sub.url} class="p-4 bg-white border border-gray-200 hover:border-primary text-dark hover:text-primary rounded-2xl shadow-sm hover:shadow transition-all group flex justify-between items-center">
            <div>
              <div class="font-bold text-base">{sub.name}</div>
              {#if sub.description}
                <div class="text-xs text-gray-500 mt-0.5 line-clamp-1">{sub.description}</div>
              {/if}
            </div>
            <svg class="w-5 h-5 text-gray-400 group-hover:text-primary transition-transform group-hover:translate-x-1 shrink-0 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
          </a>
        {/each}
      </div>
    </div>
  {/if}

  <div class="mb-12 border-b border-gray-200 pb-6 flex justify-between items-center">
    <h2 class="text-3xl font-bold text-dark">{category.name} Models</h2>
    <span class="text-dark-gray bg-gray-100 px-4 py-1 rounded-full text-sm font-medium">{products.length} Products</span>
  </div>

  {#if products.length === 0}
    <div class="text-center py-16 bg-gray-50 rounded-3xl border border-gray-100">
      <svg class="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
      <h3 class="text-xl font-bold text-dark mb-2">No products found</h3>
      <p class="text-dark-gray">We are currently updating our inventory for this category.</p>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {#each products as product}
        <ValveCard valve={product} />
      {/each}
    </div>
  {/if}
</section>
