<script lang="ts">
    import { page } from "$app/state";

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
                    class="text-dark-gray hover:text-dark focus:outline-none"
                >
                    <svg
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</nav>
