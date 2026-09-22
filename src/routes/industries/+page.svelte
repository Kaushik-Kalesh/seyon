<script lang="ts">
    let { data } = $props();
    let { industries } = $derived(data);
</script>

<svelte:head>
    <title>Industries | Seyon</title>
</svelte:head>

<div class="bg-dark text-white py-24 px-4 relative overflow-hidden">
    <div class="page-container relative z-10 text-center">
        <h1 class="text-5xl font-bold mb-6">Industries We Serve</h1>
        <p class="text-xl text-gray-300 max-w-2xl mx-auto">
            Specialized model solutions engineered for the unique demands of
            global industries.
        </p>
    </div>
</div>

<section class="page-container py-24">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        {#each industries as industry, i}
            <div class="block relative rounded-2xl overflow-hidden h-96">
                <img
                    src={industry.imageUrl}
                    alt={industry.name}
                    class="w-full h-full object-cover"
                />
                <div
                    class="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent"
                ></div>
                <div class="absolute bottom-0 left-0 p-8 w-full">
                    <div
                        class="text-primary font-bold text-5xl opacity-50 mb-2"
                    >
                        0{i + 1}
                    </div>
                    <h2 class="text-3xl font-serif font-bold text-white mb-4">
                        {industry.name}
                    </h2>
                    <div
                        class="text-gray-300 text-lg opacity-80 prose prose-sm max-w-none"
                    >
                        {@html industry.description}
                    </div>
                </div>
            </div>
        {/each}
    </div>
</section>
