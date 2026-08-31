<script lang="ts">
  let { data } = $props();
</script>

<svelte:head>
  <title>Brands | Seyon</title>
</svelte:head>

<section class="bg-gray-50 border-b border-gray-100 py-20 min-h-[85vh]">
  <div class="page-container">
      <div class="text-center mb-12 mt-10">
          <h2 class="text-4xl font-bold text-dark mb-4">Our Trusted Brands</h2>
          <p class="text-dark-gray max-w-2xl mx-auto text-lg">
              Partnering with industry leaders to bring you the best in valve technology.
          </p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {#each (data.brands || []) as brand}
              <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-primary/30 transition-all flex flex-col h-full items-center justify-center text-center">
                  {#if brand.imageUrl}
                      <img src={brand.imageUrl} alt={brand.name} class="w-32 h-32 object-contain mb-4" />
                  {/if}
                  <h3 class="text-xl font-bold text-dark mb-2">{brand.name}</h3>
                  {#if brand.description}
                      <p class="text-sm text-gray-500">{brand.description}</p>
                  {/if}
              </div>
          {:else}
              <div class="col-span-full py-12 text-center text-gray-500">
                  Check back soon for our partners and brand collaborations.
              </div>
          {/each}
      </div>
  </div>
</section>
