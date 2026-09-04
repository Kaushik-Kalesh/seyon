<script lang="ts">
  import { page } from '$app/state';
  let siteSettings = $derived(page.data.siteSettings || {});
</script>

<svelte:head>
  <title>Services | Seyon</title>
</svelte:head>

<section class="py-24 bg-white border-b border-gray-100" id="services">
    <div class="page-container">
        <div class="max-w-3xl mb-16">
            <span class="text-sm font-bold tracking-widest text-primary uppercase mb-3 block">{@html siteSettings?.home_services_eyebrow}</span>
            <h1 class="text-4xl md:text-6xl font-bold text-dark mb-6 leading-tight">{@html siteSettings?.home_services_title}</h1>
            <p class="text-xl text-dark-gray leading-relaxed">{@html siteSettings?.home_services_subtitle}</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            <article class="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-primary/30 transition-all group relative overflow-hidden">
                <div class="text-4xl font-serif font-black text-gray-200 absolute top-4 right-4 opacity-50 group-hover:text-primary/10 transition-colors">01</div>
                <h3 class="text-xl font-bold text-dark mb-3 relative z-10">{@html siteSettings?.home_service1_title}</h3>
                <p class="text-gray-600 mb-6 relative z-10">{@html siteSettings?.home_service1_desc}</p>
                <ul class="space-y-2 relative z-10">
                    {#each (siteSettings?.home_service1_list || '').split('\n') as item}
                        {#if item.trim()}
                        <li class="flex items-start gap-2 text-sm text-dark-gray"><svg class="w-4 h-4 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>{@html item}</li>
                        {/if}
                    {/each}
                </ul>
            </article>
            <article class="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-primary/30 transition-all group relative overflow-hidden">
                <div class="text-4xl font-serif font-black text-gray-200 absolute top-4 right-4 opacity-50 group-hover:text-primary/10 transition-colors">02</div>
                <h3 class="text-xl font-bold text-dark mb-3 relative z-10">{@html siteSettings?.home_service2_title}</h3>
                <p class="text-gray-600 mb-6 relative z-10">{@html siteSettings?.home_service2_desc}</p>
                <ul class="space-y-2 relative z-10">
                    {#each (siteSettings?.home_service2_list || '').split('\n') as item}
                        {#if item.trim()}
                        <li class="flex items-start gap-2 text-sm text-dark-gray"><svg class="w-4 h-4 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>{@html item}</li>
                        {/if}
                    {/each}
                </ul>
            </article>
            <article class="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-primary/30 transition-all group relative overflow-hidden">
                <div class="text-4xl font-serif font-black text-gray-200 absolute top-4 right-4 opacity-50 group-hover:text-primary/10 transition-colors">03</div>
                <h3 class="text-xl font-bold text-dark mb-3 relative z-10">{@html siteSettings?.home_service3_title}</h3>
                <p class="text-gray-600 mb-6 relative z-10">{@html siteSettings?.home_service3_desc}</p>
                <ul class="space-y-2 relative z-10">
                    {#each (siteSettings?.home_service3_list || '').split('\n') as item}
                        {#if item.trim()}
                        <li class="flex items-start gap-2 text-sm text-dark-gray"><svg class="w-4 h-4 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>{@html item}</li>
                        {/if}
                    {/each}
                </ul>
            </article>
            <article class="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:border-primary/30 transition-all group relative overflow-hidden">
                <div class="text-4xl font-serif font-black text-gray-200 absolute top-4 right-4 opacity-50 group-hover:text-primary/10 transition-colors">04</div>
                <h3 class="text-xl font-bold text-dark mb-3 relative z-10">{@html siteSettings?.home_service4_title}</h3>
                <p class="text-gray-600 mb-6 relative z-10">{@html siteSettings?.home_service4_desc}</p>
                <ul class="space-y-2 relative z-10">
                    {#each (siteSettings?.home_service4_list || '').split('\n') as item}
                        {#if item.trim()}
                        <li class="flex items-start gap-2 text-sm text-dark-gray"><svg class="w-4 h-4 text-primary shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>{@html item}</li>
                        {/if}
                    {/each}
                </ul>
            </article>
        </div>
        
        <div class="bg-dark rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 text-white relative overflow-hidden">
            <div class="absolute inset-0 bg-primary/10 pointer-events-none"></div>
            <div class="relative z-10 flex-1">
                <strong class="block text-2xl font-bold mb-2">{@html siteSettings?.home_services_banner_strong}</strong>
                <span class="text-gray-300">{@html siteSettings?.home_services_banner_text}</span>
            </div>
            <a href="/contact" class="relative z-10 shrink-0 px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary-hover transition-all hover:scale-105 shadow-lg shadow-primary/25 whitespace-nowrap">
                {@html siteSettings?.home_services_banner_btn}
            </a>
        </div>
    </div>
</section>
