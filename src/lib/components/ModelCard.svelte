<script lang="ts">
  let { model } = $props<{ model: any }>();
</script>

<a href={`/models/${model.slug}`} class="group block relative overflow-hidden rounded-xl shadow-md hover-lift bg-white border border-gray-100">
  <div class="aspect-[4/3] overflow-hidden bg-gray-100 relative">
    <img 
      src={model.imageUrl} 
      alt={model.name} 
      class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
      loading="lazy"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    <div class="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 text-white font-medium flex items-center gap-2">
      View Details
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
    </div>
  </div>
  <div class="p-6 relative z-10 bg-white">
    <div class="text-xs font-semibold text-primary uppercase tracking-wider mb-2">
      {(model.productSlug || model.industrySlug || '').replace(/-/g, ' ')}
    </div>
    <h3 class="text-xl font-serif font-bold text-dark mb-2 group-hover:text-primary transition-colors duration-300">
      {model.name}
    </h3>
    <div class="text-sm text-dark-gray line-clamp-2 prose prose-sm max-w-none">{@html model.description}</div>
  </div>
</a>

