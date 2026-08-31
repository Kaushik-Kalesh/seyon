<script lang="ts">
    let { data } = $props();
</script>

<svelte:head>
    <title>All Products | Seyon</title>
</svelte:head>

<div class="bg-dark text-white py-24 px-4 relative overflow-hidden">
    <div class="absolute inset-0 z-0 opacity-30">
        <div class="w-full h-full bg-gradient-to-br from-primary/20 to-dark"></div>
    </div>
    <div class="page-container relative z-10 text-center">
        <h1 class="text-5xl font-bold mb-6">Our Products</h1>
        <p class="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our comprehensive range of high-performance industrial valves and automation solutions.
        </p>
    </div>
</div>

<section class="page-container py-24">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each (data.categories || []) as category}
            <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/30 transition-all flex flex-col justify-between group">
                <div>
                    <div class="flex items-start justify-between gap-3 mb-2">
                        <a href={category.url} class="text-xl font-bold text-dark group-hover:text-primary transition-colors">
                            {category.name}
                        </a>
                        <a href={category.url} class="text-gray-300 group-hover:text-primary shrink-0 transition-colors transform group-hover:translate-x-1">
                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                            </svg>
                        </a>
                    </div>
                    <p class="text-sm text-gray-500 mb-4">{category.description || 'View specialized flow control solutions.'}</p>
                </div>

                {#if category.subItems?.length > 0}
                    <div class="pt-4 border-t border-gray-100 mt-2">
                        <div class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Sub-categories</div>
                        <div class="flex flex-wrap gap-1.5">
                            {#each category.subItems as sub}
                                <a href={sub.url} class="text-xs px-2.5 py-1 bg-gray-50 hover:bg-primary/10 hover:text-primary text-gray-600 rounded-lg transition-colors font-medium">
                                    {sub.name}
                                </a>
                            {/each}
                        </div>
                    </div>
                {/if}
            </div>
        {/each}
    </div>
</section>
