<script lang="ts">
    import ValveCard from "$lib/components/ValveCard.svelte";

    let { data } = $props();
    let { industries, featuredValves, siteSettings } = $derived(data);
</script>

<svelte:head>
    <title>Seyon | Premium Industrial Valves</title>
</svelte:head>

<!-- Hero Section -->
<section
    class="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-dark"
>
    <div class="absolute inset-0 z-0 opacity-40">
        <img
            src={siteSettings?.homeHeroImage || "https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg"}
            alt="Industrial Facility"
            class="w-full h-full object-cover"
        />
    </div>

    <div class="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
        <h1
            class="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
        >
            {siteSettings?.homeHeroText || 'Precision Engineered Industrial Valves'}
        </h1>
        <p
            class="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
            Delivering unparalleled reliability and performance for the world's
            most demanding environments. We set the standard for fluid control.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a
                href="/industries"
                class="px-8 py-4 bg-primary text-white font-medium rounded-full hover:bg-primary-hover transition-all hover:scale-105 shadow-lg shadow-primary/25"
            >
                Explore Solutions
            </a>
            <a
                href="/contact"
                class="px-8 py-4 bg-white/5 text-white font-medium rounded-full hover:bg-white/10 backdrop-blur-md transition-all hover:scale-105 border border-white/10"
            >
                Request a Quote
            </a>
        </div>
    </div>
</section>

<!-- About Preview Section -->
<section class="page-container py-24">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div class="relative">
            <div class="aspect-square bg-gray-200 rounded-3xl overflow-hidden">
                <img
                    src={siteSettings?.homeAboutImage || "https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg"}
                    alt="About Seyon"
                    class="w-full h-full object-cover"
                />
            </div>
            <div
                class="absolute -bottom-8 -right-8 bg-white p-8 rounded-2xl shadow-xl max-w-xs hidden md:block"
            >
                <div class="text-4xl font-serif font-bold text-primary mb-2">
                    25+
                </div>
                <div class="text-dark-gray font-medium">
                    Years of industrial excellence and innovation.
                </div>
            </div>
        </div>
        <div>
            <h2 class="text-4xl font-bold mb-6 text-dark">
                Crafting Quality for Critical Applications
            </h2>
            <p class="text-lg text-dark-gray mb-6 leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
            </p>
            <p class="text-lg text-dark-gray mb-8 leading-relaxed">
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur.
            </p>
            <a
                href="/about"
                class="inline-flex items-center text-primary font-semibold hover:text-primary-hover group"
            >
                Read Our Story
                <svg
                    class="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                    /></svg
                >
            </a>
        </div>
    </div>
</section>

<!-- Featured Industries -->
<section class="bg-dark text-white py-24">
    <div class="page-container">
        <div class="flex justify-between items-end mb-12">
            <div>
                <h2 class="text-4xl font-bold mb-4">Industries We Serve</h2>
                <p class="text-gray-400 max-w-xl">
                    Tailored valve solutions for specialized industrial
                    requirements.
                </p>
            </div>
            <a
                href="/industries"
                class="hidden md:inline-flex items-center text-primary hover:text-white transition-colors"
            >
                View All Industries
                <svg
                    class="w-5 h-5 ml-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                    /></svg
                >
            </a>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {#each industries as industry}
                <a
                    href={`/industries/${industry.slug}`}
                    class="group block relative h-80 rounded-2xl overflow-hidden hover-lift"
                >
                    <img
                        src={industry.imageUrl}
                        alt={industry.name}
                        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                        class="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"
                    ></div>
                    <div class="absolute bottom-0 left-0 p-6">
                        <h3
                            class="text-xl font-serif font-bold text-white mb-2 group-hover:text-primary transition-colors"
                        >
                            {industry.name}
                        </h3>
                        <p
                            class="text-gray-300 text-sm line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0 transform"
                        >
                            {industry.description}
                        </p>
                    </div>
                </a>
            {/each}
        </div>
    </div>
</section>

<!-- Featured Products -->
<section class="page-container py-24">
    <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-dark mb-4">Featured Products</h2>
        <p class="text-dark-gray max-w-2xl mx-auto">
            Discover our most popular industrial valves known for their robust
            design and longevity.
        </p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        {#each featuredValves as valve}
            <ValveCard {valve} />
        {/each}
    </div>
</section>
