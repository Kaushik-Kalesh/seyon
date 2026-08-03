<script lang="ts">
  import { page } from '$app/state';
  let siteSettings = $derived(page.data.siteSettings || {});
</script>

<svelte:head>
  <title>About Us | Seyon</title>
</svelte:head>

<div class="bg-dark text-white py-24 px-4 relative overflow-hidden">
  <div class="absolute inset-0 z-0 opacity-20">
    <img src={siteSettings.aboutHeroImage || "https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg"} alt="Background" class="w-full h-full object-cover" />
  </div>
  <div class="page-container relative z-10 text-center">
    <h1 class="text-5xl font-bold mb-6">{siteSettings.about_hero_title}</h1>
    <p class="text-xl text-gray-300 max-w-2xl mx-auto">
      {siteSettings.about_hero_subtitle}
    </p>
  </div>
</div>

<section class="page-container py-24">
  <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
    <div>
      <h2 class="text-4xl font-bold text-dark mb-6">{siteSettings.about_legacy_title}</h2>
      <p class="text-lg text-dark-gray mb-6 leading-relaxed">
        {siteSettings.about_legacy_desc1}
      </p>
      <p class="text-lg text-dark-gray mb-6 leading-relaxed">
        {siteSettings.about_legacy_desc2}
      </p>
      <div class="grid grid-cols-2 gap-8 mt-12">
        <div class="border-l-4 border-primary pl-4">
          <div class="text-3xl font-bold text-dark mb-1">{siteSettings.about_stats1_number}</div>
          <div class="text-sm text-dark-gray font-medium uppercase tracking-wider">{siteSettings.about_stats1_text}</div>
        </div>
        <div class="border-l-4 border-primary pl-4">
          <div class="text-3xl font-bold text-dark mb-1">{siteSettings.about_stats2_number}</div>
          <div class="text-sm text-dark-gray font-medium uppercase tracking-wider">{siteSettings.about_stats2_text}</div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <div class="space-y-4 translate-y-8">
        <div class="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-200">
          <img src={siteSettings.aboutGridImage1 || "https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg"} alt="Facility 1" class="w-full h-full object-cover" />
        </div>
        <div class="aspect-square rounded-2xl overflow-hidden bg-gray-200">
          <img src={siteSettings.aboutGridImage2 || "https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg"} alt="Facility 2" class="w-full h-full object-cover" />
        </div>
      </div>
      <div class="space-y-4">
        <div class="aspect-square rounded-2xl overflow-hidden bg-gray-200">
          <img src={siteSettings.aboutGridImage3 || "https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg"} alt="Facility 3" class="w-full h-full object-cover" />
        </div>
        <div class="aspect-[3/4] rounded-2xl overflow-hidden bg-gray-200">
          <img src={siteSettings.aboutGridImage4 || "https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg"} alt="Facility 4" class="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  </div>
</section>
