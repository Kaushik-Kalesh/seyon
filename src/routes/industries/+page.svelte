<script lang="ts">
  import { industries } from '$lib/data/mock';
</script>

<svelte:head>
  <title>Industries | Seyon</title>
</svelte:head>

<div class="bg-dark text-white py-24 px-4 relative overflow-hidden">
  <div class="absolute inset-0 z-0 opacity-20">
    <img src="https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg" alt="Background" class="w-full h-full object-cover" />
  </div>
  <div class="page-container relative z-10 text-center">
    <h1 class="text-5xl font-bold mb-6">Industries We Serve</h1>
    <p class="text-xl text-gray-300 max-w-2xl mx-auto">
      Specialized valve solutions engineered for the unique demands of global industries.
    </p>
  </div>
</div>

<section class="page-container py-24">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    {#each industries as industry, i}
      <a href={`/industries/${industry.slug}`} class="group block relative rounded-2xl overflow-hidden h-96 hover-lift">
        <img src={industry.imageUrl} alt={industry.name} class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div class="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent transition-opacity duration-300 group-hover:from-dark group-hover:via-dark/60"></div>
        <div class="absolute bottom-0 left-0 p-8 w-full">
          <div class="text-primary font-bold text-5xl opacity-50 mb-2 transition-opacity group-hover:opacity-100">0{i + 1}</div>
          <h2 class="text-3xl font-serif font-bold text-white mb-4 group-hover:text-primary transition-colors">{industry.name}</h2>
          <p class="text-gray-300 text-lg line-clamp-2 transform transition-all duration-300 group-hover:translate-y-0 translate-y-2 opacity-80 group-hover:opacity-100">
            {industry.description}
          </p>
          <div class="mt-6 flex items-center text-primary font-medium opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            Explore Solutions
            <svg class="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
          </div>
        </div>
      </a>
    {/each}
  </div>
</section>
