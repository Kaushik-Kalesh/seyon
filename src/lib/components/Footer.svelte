<script lang="ts">
  import { page } from '$app/state';
  let siteSettings = $derived(page.data.siteSettings || { companyName: 'Seyon Enterprises', email: 'sales@seyonflo.in', phone: '+91 98847 25066', address: 'S/O Mathialagan, 1/E 388A, 19TH STREET, THAI MOOGAMBIGAI NAGAR, Madambakkam, Kancheepuram, Tamil Nadu, India-603202' });
</script>

<footer class="bg-dark text-white pt-20 pb-10 mt-auto">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
                <div class="flex items-center gap-3 mb-4">
                    <img
                        src="/logo.png"
                        alt="Seyon Logo"
                        class="h-8 w-auto brightness-0 invert"
                    />
                </div>
                <h3 class="text-xl font-bold font-serif mb-6">{@html siteSettings.companyName}</h3>
                <p class="text-gray-400 mb-6 leading-relaxed max-w-sm">
                    Delivering high-performance industrial models for critical applications worldwide. Engineered for reliability, built for safety.
                </p>
            </div>

            <div>
                <h4 class="font-serif text-lg font-semibold mb-4 text-primary">
                    Quick Links
                </h4>
                <ul class="space-y-2">
                    <li>
                        <a
                            href="/"
                            class="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-transform duration-200"
                            >Home</a
                        >
                    </li>
                    <li>
                        <a
                            href="/about"
                            class="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-transform duration-200"
                            >About Us</a
                        >
                    </li>
                    <li>
                        <a
                            href="/industries"
                            class="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-transform duration-200"
                            >Industries</a
                        >
                    </li>
                    <li>
                        <a
                            href="/contact"
                            class="text-gray-400 hover:text-white hover:translate-x-1 inline-block transition-transform duration-200"
                            >Contact</a
                        >
                    </li>
                </ul>
            </div>

            <div>
                <h4 class="font-serif text-lg font-semibold mb-4 text-primary">
                    Contact Us
                </h4>
                <ul class="space-y-4">
                    <li class="flex items-start gap-4 group">
                        <div class="mt-1 bg-white/5 p-2 rounded-lg group-hover:bg-primary/20 group-hover:text-primary transition-colors text-gray-400">
                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                        </div>
                        <span class="text-gray-400 leading-relaxed text-sm pt-1">{@html siteSettings.address}</span>
                    </li>
                    <li class="flex items-center gap-4 group">
                        <div class="bg-white/5 p-2 rounded-lg group-hover:bg-primary/20 group-hover:text-primary transition-colors text-gray-400">
                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                        </div>
                        <a href={`mailto:${siteSettings.email}`} class="text-gray-400 hover:text-white transition-colors text-sm">{@html siteSettings.email}</a>
                    </li>
                    <li class="flex items-center gap-4 group">
                        <div class="bg-white/5 p-2 rounded-lg group-hover:bg-primary/20 group-hover:text-primary transition-colors text-gray-400">
                            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                        </div>
                        <span class="text-gray-400 text-sm">{@html siteSettings.phone}</span>
                    </li>
                </ul>
            </div>
        </div>

        <div
            class="border-t border-gray-800 mt-12 pt-8 text-center"
        >
            <div class="text-gray-500 text-sm font-medium">
                &copy; {new Date().getFullYear()} {@html siteSettings.companyName}. All rights reserved.
            </div>
        </div>
    </div>
</footer>
