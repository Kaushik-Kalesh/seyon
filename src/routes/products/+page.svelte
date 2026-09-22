<script lang="ts">
    import { onMount, onDestroy } from 'svelte';
    let { data } = $props();
    let siteSettings = $derived(data.siteSettings || {});
    let models = $derived(data.models || []);
    
    let slideshowImages = $derived(
        Array.from(new Set(models.filter((m: any) => m.imageUrl).map((m: any) => m.imageUrl))).slice(0, 15)
    );
    
    let currentImageIndex = $state(0);
    let interval: any;

    onMount(() => {
        if (slideshowImages.length > 1) {
            interval = setInterval(() => {
                currentImageIndex = (currentImageIndex + 1) % slideshowImages.length;
            }, 5000);
        }
    });

    onDestroy(() => {
        if (interval) clearInterval(interval);
    });
</script>

<svelte:head>
    <title>All Models | Seyon</title>
</svelte:head>

<div class="bg-dark text-white py-12 sm:py-16 md:py-24 px-4 relative overflow-hidden">
    <div class="absolute inset-0 z-0 opacity-40">
        <div class="w-full h-full bg-gradient-to-br from-primary/20 to-dark"></div>
    </div>
    
    <div class="page-container relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-12 lg:gap-16">
        <!-- Left text content -->
        <div class="flex-1 text-center md:text-left w-full">
            <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight">{@html siteSettings?.products_hero_title || 'Our Models'}</h1>
            <div class="text-lg sm:text-xl text-gray-300 max-w-xl mx-auto md:mx-0 prose prose-invert prose-lg leading-relaxed">
                {@html siteSettings?.products_hero_subtitle || 'Explore our comprehensive range of high-performance industrial models and automation solutions.'}
            </div>
        </div>

        <!-- Right image cards slideshow -->
        <div class="w-full md:w-1/2 relative h-[280px] sm:h-[320px] md:h-[380px] lg:h-[450px] flex justify-center md:justify-end mt-8 md:mt-0 perspective-1000">
            <div class="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-md lg:max-w-lg h-full">
                {#each slideshowImages as img, i}
                    <div class="absolute inset-0 bg-white rounded-3xl p-8 shadow-2xl shadow-primary/10 transition-all duration-1000 ease-in-out border border-gray-100 flex items-center justify-center {i === currentImageIndex ? 'opacity-100 scale-100 translate-x-0 translate-y-0 z-10' : 'opacity-0 scale-95 translate-x-8 translate-y-4 z-0 pointer-events-none'}">
                        <img 
                            src={img} 
                            alt="Model Preview" 
                            class="w-full h-full object-contain drop-shadow-2xl" 
                        />
                    </div>
                {/each}
            </div>
        </div>
    </div>
</div>

<section class="page-container py-24">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {#each (data.products || []) as product}
            <div class="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/30 transition-all flex flex-col justify-between group">
                <div>
                    <div class="flex items-start justify-between gap-3 mb-2">
                        <a href={product.url} class="text-xl font-bold text-dark group-hover:text-primary transition-colors">
                            {product.name}
                        </a>
                        <a href={product.url} class="text-gray-300 group-hover:text-primary shrink-0 transition-colors transform group-hover:translate-x-1">
                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                            </svg>
                        </a>
                    </div>
                    <div class="text-sm text-gray-500 mb-4 prose prose-sm max-w-none">{@html product.description || 'View specialized flow control solutions.'}</div>
                </div>

                {#if product.subItems?.length > 0}
                    <div class="mt-4 pt-4 border-t border-gray-100 space-y-2">
                        {#each product.subItems as sub}
                            <a href={sub.url} class="group/sub block">
                                <div class="flex items-center justify-between text-sm">
                                    <span class="text-dark font-medium group-hover/sub:text-primary transition-colors">{sub.name}</span>
                                    <svg class="w-4 h-4 text-gray-300 opacity-0 group-hover/sub:opacity-100 transform -translate-x-2 group-hover/sub:translate-x-0 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                                    </svg>
                                </div>
                            </a>
                        {/each}
                    </div>
                {/if}
            </div>
        {/each}
    </div>
</section>
