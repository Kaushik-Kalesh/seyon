<script lang="ts">
    import ModelCard from "$lib/components/ModelCard.svelte";

    let { data } = $props();
    let { industries, siteSettings } = $derived(data);
</script>

<svelte:head>
    <title>Seyon | Reliable Industrial Valves Supply & Service</title>
</svelte:head>

<!-- Hero Section -->
<section
    class="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-dark"
>
    <div class="absolute inset-0 z-0 opacity-40">
        <img
            src={siteSettings?.homeHeroImage ||
                "https://4.imimg.com/data4/XP/YO/ANDROID-11872361/model-500x500.jpeg"}
            alt="Industrial Facility"
            class="w-full h-full object-cover"
        />
    </div>

    <div class="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
        <h1
            class="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
        >
            {@html siteSettings?.home_hero_title}
        </h1>
        <p
            class="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
            {@html siteSettings?.home_hero_subtitle}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a
                href="/contact"
                class="px-8 py-4 bg-primary text-white font-medium rounded-full hover:bg-primary-hover transition-all hover:scale-105 shadow-lg shadow-primary/25"
            >
                {@html siteSettings?.home_hero_btn2}
            </a>
        </div>
    </div>
</section>

<!-- Featured Models Section -->
<section class="bg-gray-50 border-b border-gray-100 py-20">
    <div class="page-container">
        <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-dark mb-4">
                {@html siteSettings?.home_products_title || "Our Model Range"}
            </h2>
            <p class="text-dark-gray max-w-2xl mx-auto">
                {@html siteSettings?.home_products_subtitle ||
                    "Comprehensive model solutions for every industrial application."}
            </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {#each data.products || [] as product}
                <a
                    href={product.url}
                    class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/30 transition-all group flex items-start justify-between gap-3"
                >
                    <div>
                        <h3
                            class="text-lg font-bold text-dark group-hover:text-primary transition-colors"
                        >
                            {product.name}
                        </h3>
                        <div
                            class="text-sm text-gray-500 mt-1 prose prose-sm max-w-none"
                        >
                            {@html product.description ||
                                "View specialized flow control solutions in this product."}
                        </div>
                    </div>
                    <svg
                        class="w-5 h-5 text-gray-300 group-hover:text-primary shrink-0 mt-0.5 transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                    </svg>
                </a>
            {/each}
        </div>
    </div>
</section>

<!-- About Preview Section -->
<section class="bg-dark text-white pt-24 pb-32 md:pb-40">
    <div class="page-container">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div class="relative mb-12 md:mb-0">
                <div
                    class="visual-card relative w-full aspect-square bg-gray-50 rounded-3xl border border-gray-100 p-8 flex items-center justify-center isolate group shadow-inner overflow-hidden"
                >
                    <div
                        class="process-line line-a absolute left-0 top-1/2 w-1/3 h-2 bg-gradient-to-r from-transparent to-primary/80 transform -translate-y-1/2 rounded-full overflow-hidden before:absolute before:inset-0 before:bg-white/40 before:animate-[flow_2s_linear_infinite]"
                    ></div>
                    <div
                        class="process-line line-b absolute right-0 top-1/2 w-1/3 h-2 bg-gradient-to-l from-transparent to-primary/80 transform -translate-y-1/2 rounded-full overflow-hidden before:absolute before:inset-0 before:bg-white/40 before:animate-[flow_2s_linear_infinite]"
                    ></div>

                    <div
                        class="model-orbit absolute inset-0 m-auto w-64 h-64 border border-dashed border-gray-300 rounded-full opacity-50"
                    ></div>

                    <div
                        class="model-shape relative z-10 w-32 h-32 flex flex-col items-center justify-center transform group-hover:scale-105 transition-transform duration-500"
                    >
                        <div
                            class="model-wheel w-16 h-4 border-4 border-dark rounded-full mb-1 bg-gray-100 shadow-[0_2px_4px_rgba(0,0,0,0.1)]"
                        ></div>
                        <div class="model-top w-4 h-8 bg-dark rounded-sm"></div>
                        <div
                            class="model-body w-24 h-16 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 relative"
                        >
                            <div
                                class="w-8 h-8 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center"
                            >
                                <div
                                    class="w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]"
                                ></div>
                            </div>
                        </div>
                    </div>

                    <div
                        class="floating-tag tag-one absolute top-12 left-12 bg-white px-4 py-2 rounded-xl shadow-lg border border-gray-100 flex flex-col transform -rotate-6 animate-pulse"
                    >
                        <b class="text-dark text-sm tracking-widest uppercase"
                            >FLOW</b
                        >
                        <small class="text-primary text-xs font-bold"
                            >CONTROL</small
                        >
                    </div>

                    <div
                        class="floating-tag tag-two absolute bottom-12 right-12 bg-white px-4 py-2 rounded-xl shadow-lg border border-gray-100 flex flex-col transform rotate-3 hover:-rotate-3 transition-transform"
                    >
                        <b class="text-dark text-sm tracking-widest uppercase"
                            >AUTOMATION</b
                        >
                        <small class="text-primary text-xs font-bold"
                            >READY</small
                        >
                    </div>

                    <div
                        class="visual-label absolute bottom-6 left-8 text-xs font-bold text-gray-400 tracking-widest uppercase font-mono"
                    >
                        SEYON / FLOW CONTROL
                    </div>
                </div>
                <div
                    class="absolute -bottom-8 -right-8 bg-white p-8 rounded-2xl shadow-xl max-w-xs hidden md:block"
                >
                    <div
                        class="text-4xl font-serif font-bold text-primary mb-2"
                    >
                        {@html siteSettings?.home_about_stats_number}
                    </div>
                    <div class="text-dark-gray font-medium">
                        {@html siteSettings?.home_about_stats_text}
                    </div>
                </div>
            </div>
            <div>
                <h2 class="text-4xl font-bold mb-6 text-white">
                    {@html siteSettings?.home_about_title}
                </h2>
                <p class="text-lg text-gray-300 mb-6 leading-relaxed">
                    {@html siteSettings?.home_about_desc1}
                </p>
                <p class="text-lg text-gray-300 mb-8 leading-relaxed">
                    {@html siteSettings?.home_about_desc2}
                </p>
                <a
                    href="/about"
                    class="inline-flex items-center text-primary font-semibold hover:text-primary-hover group"
                >
                    {@html siteSettings?.home_about_link}
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
    </div>
</section>

<!-- Instrumentation Section -->
<section class="py-24 bg-gray-50 border-b border-gray-100">
    <div class="page-container">
        <div class="max-w-3xl mb-16">
            <span
                class="text-sm font-bold tracking-widest text-primary uppercase mb-3 block"
                >{@html siteSettings?.home_instrumentation_eyebrow}</span
            >
            <h2
                class="text-4xl md:text-5xl font-bold text-dark mb-6 leading-tight"
            >
                {@html siteSettings?.home_instrumentation_title}
            </h2>
            <p class="text-xl text-dark-gray leading-relaxed">
                {@html siteSettings?.home_instrumentation_subtitle}
            </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
            <article
                class="bg-white p-8 rounded-2xl border-t-4 border-t-transparent hover:border-t-primary border-l border-r border-b border-gray-100 hover:shadow-xl shadow-gray-200/50 flex flex-col items-start group transition-all duration-300 hover:-translate-y-1"
            >
                <h3 class="text-lg font-bold text-dark mb-2">
                    {@html siteSettings?.home_instrument1_title}
                </h3>
                <p class="text-sm text-gray-500 mb-6 flex-grow">
                    {@html siteSettings?.home_instrument1_desc}
                </p>
                <span
                    class="text-xs font-bold tracking-wider text-gray-400 uppercase mt-auto"
                    >{@html siteSettings?.home_instrument1_sub}</span
                >
            </article>
            <article
                class="bg-white p-8 rounded-2xl border-t-4 border-t-transparent hover:border-t-primary border-l border-r border-b border-gray-100 hover:shadow-xl shadow-gray-200/50 flex flex-col items-start group transition-all duration-300 hover:-translate-y-1"
            >
                <h3 class="text-lg font-bold text-dark mb-2">
                    {@html siteSettings?.home_instrument2_title}
                </h3>
                <p class="text-sm text-gray-500 mb-6 flex-grow">
                    {@html siteSettings?.home_instrument2_desc}
                </p>
                <span
                    class="text-xs font-bold tracking-wider text-gray-400 uppercase mt-auto"
                    >{@html siteSettings?.home_instrument2_sub}</span
                >
            </article>
            <article
                class="bg-white p-8 rounded-2xl border-t-4 border-t-transparent hover:border-t-primary border-l border-r border-b border-gray-100 hover:shadow-xl shadow-gray-200/50 flex flex-col items-start group transition-all duration-300 hover:-translate-y-1"
            >
                <h3 class="text-lg font-bold text-dark mb-2">
                    {@html siteSettings?.home_instrument3_title}
                </h3>
                <p class="text-sm text-gray-500 mb-6 flex-grow">
                    {@html siteSettings?.home_instrument3_desc}
                </p>
                <span
                    class="text-xs font-bold tracking-wider text-gray-400 uppercase mt-auto"
                    >{@html siteSettings?.home_instrument3_sub}</span
                >
            </article>
            <article
                class="bg-white p-8 rounded-2xl border-t-4 border-t-transparent hover:border-t-primary border-l border-r border-b border-gray-100 hover:shadow-xl shadow-gray-200/50 flex flex-col items-start group transition-all duration-300 hover:-translate-y-1"
            >
                <h3 class="text-lg font-bold text-dark mb-2">
                    {@html siteSettings?.home_instrument4_title}
                </h3>
                <p class="text-sm text-gray-500 mb-6 flex-grow">
                    {@html siteSettings?.home_instrument4_desc}
                </p>
                <span
                    class="text-xs font-bold tracking-wider text-gray-400 uppercase mt-auto"
                    >{@html siteSettings?.home_instrument4_sub}</span
                >
            </article>
            <article
                class="bg-white p-8 rounded-2xl border-t-4 border-t-transparent hover:border-t-primary border-l border-r border-b border-gray-100 hover:shadow-xl shadow-gray-200/50 flex flex-col items-start group transition-all duration-300 hover:-translate-y-1"
            >
                <h3 class="text-lg font-bold text-dark mb-2">
                    {@html siteSettings?.home_instrument5_title}
                </h3>
                <p class="text-sm text-gray-500 mb-6 flex-grow">
                    {@html siteSettings?.home_instrument5_desc}
                </p>
                <span
                    class="text-xs font-bold tracking-wider text-gray-400 uppercase mt-auto"
                    >{@html siteSettings?.home_instrument5_sub}</span
                >
            </article>
        </div>

        <div
            class="bg-white p-8 md:p-10 rounded-3xl border border-gray-200 shadow-xl shadow-gray-100/50 flex flex-col md:flex-row items-center justify-between gap-8"
        >
            <div class="flex-1">
                <span
                    class="text-xs font-bold tracking-widest text-primary uppercase mb-2 block"
                    >{@html siteSettings?.home_package_eyebrow}</span
                >
                <h3 class="text-2xl font-bold text-dark mb-3">
                    {@html siteSettings?.home_package_title}
                </h3>
                <p class="text-gray-500">
                    {@html siteSettings?.home_package_subtitle}
                </p>
            </div>
            <a
                href="/contact"
                class="shrink-0 px-8 py-4 bg-dark text-white font-medium rounded-full hover:bg-black transition-all hover:scale-105 shadow-md flex items-center gap-2"
            >
                {@html siteSettings?.home_package_btn}
            </a>
        </div>
    </div>
</section>

<!-- Workflow Section -->
<section class="py-24 bg-white border-b border-gray-100">
    <div class="page-container">
        <div class="text-center max-w-3xl mx-auto mb-20">
            <span
                class="text-sm font-bold tracking-widest text-primary uppercase mb-3 block"
                >{@html siteSettings?.home_workflow_eyebrow}</span
            >
            <h2
                class="text-4xl md:text-5xl font-bold text-dark mb-6 leading-tight"
            >
                {@html siteSettings?.home_workflow_title}
            </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div
                class="hidden md:block absolute top-12 left-[12.5%] right-[12.5%] h-0.5 bg-gray-100 -z-10"
            ></div>

            <div class="text-center relative">
                <span
                    class="w-16 h-16 bg-white border-4 border-gray-50 shadow-sm text-xl font-bold text-primary rounded-full flex items-center justify-center mx-auto mb-6 z-10 relative"
                    >01</span
                >
                <h3 class="text-xl font-bold text-dark mb-3">
                    {@html siteSettings?.home_workflow1_title}
                </h3>
                <p class="text-gray-500 text-sm max-w-[200px] mx-auto">
                    {@html siteSettings?.home_workflow1_desc}
                </p>
            </div>

            <div class="text-center relative">
                <span
                    class="w-16 h-16 bg-white border-4 border-gray-50 shadow-sm text-xl font-bold text-primary rounded-full flex items-center justify-center mx-auto mb-6 z-10 relative"
                    >02</span
                >
                <h3 class="text-xl font-bold text-dark mb-3">
                    {@html siteSettings?.home_workflow2_title}
                </h3>
                <p class="text-gray-500 text-sm max-w-[200px] mx-auto">
                    {@html siteSettings?.home_workflow2_desc}
                </p>
            </div>

            <div class="text-center relative">
                <span
                    class="w-16 h-16 bg-white border-4 border-gray-50 shadow-sm text-xl font-bold text-primary rounded-full flex items-center justify-center mx-auto mb-6 z-10 relative"
                    >03</span
                >
                <h3 class="text-xl font-bold text-dark mb-3">
                    {@html siteSettings?.home_workflow3_title}
                </h3>
                <p class="text-gray-500 text-sm max-w-[200px] mx-auto">
                    {@html siteSettings?.home_workflow3_desc}
                </p>
            </div>

            <div class="text-center relative">
                <span
                    class="w-16 h-16 bg-white border-4 border-gray-50 shadow-sm text-xl font-bold text-primary rounded-full flex items-center justify-center mx-auto mb-6 z-10 relative"
                    >04</span
                >
                <h3 class="text-xl font-bold text-dark mb-3">
                    {@html siteSettings?.home_workflow4_title}
                </h3>
                <p class="text-gray-500 text-sm max-w-[200px] mx-auto">
                    {@html siteSettings?.home_workflow4_desc}
                </p>
            </div>
        </div>
    </div>
</section>

<!-- Featured Industries -->
<section class="py-24">
    <div class="page-container">
        <div class="flex justify-between items-end mb-12">
            <div>
                <h2 class="text-4xl font-bold mb-4 text-dark">
                    {@html siteSettings?.home_industries_title}
                </h2>
                <p class="text-dark-gray max-w-xl">
                    {@html siteSettings?.home_industries_subtitle}
                </p>
            </div>
            <a
                href="/industries"
                class="hidden md:inline-flex items-center text-primary hover:text-dark transition-colors"
            >
                {@html siteSettings?.home_industries_link}
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
                <div
                    class="group block relative h-80 rounded-2xl overflow-hidden"
                >
                    <img
                        src={industry.imageUrl}
                        alt={industry.name}
                        class="w-full h-full object-cover"
                    />
                    <div
                        class="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent opacity-80"
                    ></div>
                    <div class="absolute bottom-0 left-0 p-6">
                        <h3
                            class="text-xl font-serif font-bold text-white mb-2"
                        >
                            {industry.name}
                        </h3>
                        <div
                            class="text-gray-300 text-sm prose prose-sm max-w-none"
                        >
                            {@html industry.description}
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>
</section>

<style>
    @keyframes flow {
        0% {
            transform: translateX(-100%);
        }
        100% {
            transform: translateX(100%);
        }
    }
</style>
