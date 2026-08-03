<script lang="ts">
  let { data } = $props();
  let { valve } = $derived(data);
</script>

<svelte:head>
  <title>{valve.name} | Seyon</title>
</svelte:head>

<div class="bg-base min-h-screen py-12 md:py-24">
  <div class="page-container">
    <!-- Breadcrumbs -->
    <nav class="flex text-sm text-dark-gray mb-10" aria-label="Breadcrumb">
      <ol class="inline-flex items-center space-x-1 md:space-x-3">
        <li class="inline-flex items-center">
          <a href="/" class="hover:text-primary transition-colors">Home</a>
        </li>
        <li>
          <div class="flex items-center">
            <svg class="w-4 h-4 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            <a href="/industries" class="hover:text-primary transition-colors">Industries</a>
          </div>
        </li>
        <li>
          <div class="flex items-center">
            <svg class="w-4 h-4 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            <a href={`/industries/${valve.industrySlug}`} class="hover:text-primary transition-colors capitalize">{valve.industrySlug.replace(/-/g, ' ')}</a>
          </div>
        </li>
        <li aria-current="page">
          <div class="flex items-center">
            <svg class="w-4 h-4 mx-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            <span class="text-dark font-medium">{valve.name}</span>
          </div>
        </li>
      </ol>
    </nav>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 bg-white rounded-3xl shadow-xl overflow-hidden">
      <!-- Image Gallery section -->
      <div class="relative bg-gray-100 p-8 flex items-center justify-center min-h-[500px]">
        <img 
          src={valve.imageUrl} 
          alt={valve.name} 
          class="w-full max-w-md object-contain hover:scale-105 transition-transform duration-500 drop-shadow-2xl" 
        />
      </div>
      
      <!-- Content Section -->
      <div class="p-8 lg:p-12 flex flex-col justify-center">
        <div class="uppercase tracking-widest text-sm font-semibold text-primary mb-3">
          {valve.industrySlug.replace(/-/g, ' ')}
        </div>
        <h1 class="text-4xl md:text-5xl font-serif font-bold text-dark mb-6">{valve.name}</h1>
        
        <p class="text-lg text-dark-gray mb-10 leading-relaxed">
          {valve.description}
        </p>
        
        <div class="border-t border-gray-100 pt-8 mb-10">
          <h3 class="text-xl font-bold text-dark mb-6">Technical Specifications</h3>
          <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <div class="bg-base p-4 rounded-xl border border-gray-100 hover:border-primary/30 transition-colors">
              <dt class="text-sm font-medium text-dark-gray mb-1">Material</dt>
              <dd class="text-base font-semibold text-dark">{valve.material}</dd>
            </div>
            <div class="bg-base p-4 rounded-xl border border-gray-100 hover:border-primary/30 transition-colors">
              <dt class="text-sm font-medium text-dark-gray mb-1">Pressure Rating</dt>
              <dd class="text-base font-semibold text-dark">{valve.pressureRating}</dd>
            </div>
            <div class="bg-base p-4 rounded-xl border border-gray-100 hover:border-primary/30 transition-colors">
              <dt class="text-sm font-medium text-dark-gray mb-1">Temperature Range</dt>
              <dd class="text-base font-semibold text-dark">{valve.temperatureRange}</dd>
            </div>
            <div class="bg-base p-4 rounded-xl border border-gray-100 hover:border-primary/30 transition-colors">
              <dt class="text-sm font-medium text-dark-gray mb-1">Available Sizes</dt>
              <dd class="text-base font-semibold text-dark">{valve.size}</dd>
            </div>
          </dl>
        </div>
        
        <div class="flex gap-4">
          <a href="/contact" class="flex-1 bg-primary text-white text-center py-4 rounded-xl font-semibold hover:bg-primary-hover hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-primary/30">
            Request Quote
          </a>
          {#if valve.pdfUrl}
            <a href={valve.pdfUrl} target="_blank" class="px-6 py-4 rounded-xl font-semibold border border-gray-200 text-dark hover:border-dark hover:bg-gray-50 transition-colors flex items-center justify-center" title="Download PDF">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
            </a>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
