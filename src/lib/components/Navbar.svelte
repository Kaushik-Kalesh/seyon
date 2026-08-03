<script lang="ts">
    import { page } from "$app/state";
    import { slide } from 'svelte/transition';

    let isMobileMenuOpen = $state(false);

    const links = [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Industries", href: "/industries" },
    ];
</script>

<nav
    class="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all duration-300"
>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-20 items-center">
            <div class="flex-shrink-0 flex items-center">
                <!-- Logo -->
                <a href="/" class="flex items-center gap-3 group">
                    <img
                        src="/logo.png"
                        alt="Seyon Logo"
                        class="h-10 w-auto group-hover:scale-105 transition-transform duration-300"
                    />
                </a>
            </div>

            <!-- Desktop Menu -->
            <div class="hidden md:flex space-x-8 items-center">
                {#each links as link}
                    <a
                        href={link.href}
                        class="relative text-sm font-medium transition-colors duration-300 group
                   {page.url.pathname === link.href
                            ? 'text-primary'
                            : 'text-dark-gray hover:text-dark'}"
                    >
                        {link.name}
                        <span
                            class="absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full {page
                                .url.pathname === link.href
                                ? 'w-full'
                                : 'w-0'}"
                        ></span>
                    </a>
                {/each}
                <a
                    href="/contact"
                    class="px-6 py-2.5 bg-dark text-white text-sm font-medium rounded-full hover:bg-primary transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                    Contact
                </a>
            </div>

            <!-- Mobile menu button -->
            <div class="md:hidden flex items-center">
                <button
                    onclick={() => isMobileMenuOpen = !isMobileMenuOpen}
                    class="text-dark-gray hover:text-dark focus:outline-none p-2"
                >
                    {#if isMobileMenuOpen}
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    {:else}
                        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    {/if}
                </button>
            </div>
        </div>
    </div>

    <!-- Mobile Menu Dropdown -->
    {#if isMobileMenuOpen}
        <div class="md:hidden bg-white border-b border-gray-100 shadow-sm" transition:slide={{ duration: 250 }}>
            <div class="px-4 pt-2 pb-6 space-y-1">
                {#each links as link}
                    <a
                        href={link.href}
                        onclick={() => isMobileMenuOpen = false}
                        class="block px-3 py-3 text-base font-medium rounded-xl transition-colors
                            {page.url.pathname === link.href
                                ? 'bg-primary/10 text-primary'
                                : 'text-dark-gray hover:bg-gray-50 hover:text-dark'}"
                    >
                        {link.name}
                    </a>
                {/each}
                <div class="pt-4 pb-2">
                    <a
                        href="/contact"
                        onclick={() => isMobileMenuOpen = false}
                        class="block w-full text-center px-6 py-3 bg-dark text-white text-base font-medium rounded-full hover:bg-primary transition-colors shadow-md"
                    >
                        Contact
                    </a>
                </div>
            </div>
        </div>
    {/if}
</nav>
