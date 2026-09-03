<script lang="ts">
  let { data } = $props();
  let { siteSettings } = $derived(data);
</script>

<svelte:head>
  <title>Brands | Seyon</title>
</svelte:head>

<section class="bg-gray-50 border-b border-gray-100 py-20 min-h-[85vh]">
  <div class="page-container">
      <div class="text-center mb-12 mt-10">
          <h2 class="text-4xl font-bold text-dark mb-4">{@html siteSettings?.brands_hero_title || 'Our Trusted Brands'}</h2>
          <p class="text-dark-gray max-w-2xl mx-auto text-lg">
              {@html siteSettings?.brands_hero_subtitle || 'Partnering with industry leaders to bring you the best in model technology.'}
          </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {#each (data.brands || []) as brand}
              <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-primary/30 transition-all flex flex-col h-full items-center justify-center text-center">
                  {#if brand.imageUrl}
                      <img src={brand.imageUrl} alt="Brand Logo" class="w-full max-w-[12rem] h-24 object-contain" />
                  {:else}
                      <span class="text-sm text-gray-400">Logo missing</span>
                  {/if}
              </div>
          {:else}
              <div class="col-span-full py-12 text-center text-gray-500">
                  {@html siteSettings?.brands_empty_text || 'Check back soon for our partners and brand collaborations.'}
              </div>
          {/each}
      </div>
  </div>
</section>
