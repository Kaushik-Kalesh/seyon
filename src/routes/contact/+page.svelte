<script lang="ts">
    import { enhance } from "$app/forms";
    import { page } from "$app/state";
    let { form } = $props();
    let siteSettings = $derived(page.data.siteSettings || {});
</script>

<svelte:head>
    <title>Contact Us | Seyon</title>
</svelte:head>

<div class="bg-base min-h-screen py-24">
    <div class="page-container flex flex-col gap-24">
        <div class="text-center max-w-3xl mx-auto">
            <h1 class="text-5xl font-bold text-dark mb-6">
                {siteSettings.contact_hero_title}
            </h1>
            <p class="text-xl text-dark-gray">
                {siteSettings.contact_hero_subtitle}
            </p>
        </div>

        <!-- WhatsApp Selection Section (Full Width Design) -->
        <section
            class="bg-white p-8 md:p-16 rounded-3xl shadow-xl border border-gray-100 w-full max-w-6xl mx-auto"
            id="selection"
        >
            <div
                class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start"
            >
                <div>
                    <span
                        class="text-primary font-bold text-sm tracking-wider uppercase mb-3 block"
                        >ENGINEERED FOR SPEED</span
                    >
                    <h2
                        class="text-3xl md:text-4xl font-serif font-bold text-dark mb-6"
                    >
                        Tell us what you need.<br /><span class="text-gray-500"
                            >We'll help with the valve.</span
                        >
                    </h2>
                    <p class="text-dark-gray text-lg mb-8 leading-relaxed">
                        Not sure which valve is right? Share the application,
                        media, line size and operating conditions. Our team can
                        review the requirement and respond with a practical
                        solution.
                    </p>
                    <ul class="space-y-4 text-dark-gray font-medium">
                        <li class="flex items-center gap-3">
                            <div
                                class="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0"
                            >
                                <svg
                                    class="w-4 h-4 text-primary"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    ><path
                                        fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd"
                                    ></path></svg
                                >
                            </div>
                             Application-focused valve selection
                        </li>
                        <li class="flex items-center gap-3">
                            <div
                                class="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0"
                            >
                                <svg
                                    class="w-4 h-4 text-primary"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    ><path
                                        fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd"
                                    ></path></svg
                                >
                            </div>
                             Manual or automated configuration
                        </li>
                        <li class="flex items-center gap-3">
                            <div
                                class="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0"
                            >
                                <svg
                                    class="w-4 h-4 text-primary"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    ><path
                                        fill-rule="evenodd"
                                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                        clip-rule="evenodd"
                                    ></path></svg
                                >
                            </div>
                             Photo / datasheet based enquiries
                        </li>
                    </ul>
                </div>
                <form
                    class="space-y-5 bg-gray-50/50 p-6 md:p-8 rounded-2xl border border-gray-100"
                    id="selectionForm"
                    onsubmit={(e) => {
                        e.preventDefault();
                        const fd = new FormData(e.currentTarget);
                        const msg = `Hi Seyon, I need a valve solution:\n\n*Application:* ${fd.get("application")}\n*Media:* ${fd.get("media")}\n*Line Size:* ${fd.get("size")}\n*Pressure:* ${fd.get("pressure")}\n*Requirement:* ${fd.get("requirement")}\n\nPlease review and let me know the options.`;
                        window.open(
                            `https://wa.me/919884725066?text=${encodeURIComponent(msg)}`,
                            "_blank",
                        );
                    }}
                >
                    <label class="block text-sm font-medium text-dark-gray"
                        >Application
                        <select
                            name="application"
                            class="mt-1.5 block w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#25D366]/20 focus:border-[#25D366] transition-colors text-dark"
                        >
                            <option>Flow control</option>
                            <option>Isolation</option>
                            <option>Pressure control</option>
                            <option>Steam</option>
                            <option>Water / utility</option>
                            <option>Chemical process</option>
                            <option>Other</option>
                        </select>
                    </label>
                    <label class="block text-sm font-medium text-dark-gray"
                        >Media <input
                            name="media"
                            placeholder="e.g. water, steam, air"
                            class="mt-1.5 block w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#25D366]/20 focus:border-[#25D366] transition-colors text-dark"
                        /></label
                    >
                    <div class="grid grid-cols-2 gap-4">
                        <label class="block text-sm font-medium text-dark-gray"
                            >Line size <input
                                name="size"
                                placeholder="e.g. 2&quot; / DN50"
                                class="mt-1.5 block w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#25D366]/20 focus:border-[#25D366] transition-colors text-dark"
                            /></label
                        >
                        <label class="block text-sm font-medium text-dark-gray"
                            >Pressure <input
                                name="pressure"
                                placeholder="e.g. 10 bar"
                                class="mt-1.5 block w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#25D366]/20 focus:border-[#25D366] transition-colors text-dark"
                            /></label
                        >
                    </div>
                    <label class="block text-sm font-medium text-dark-gray"
                        >Requirement <textarea
                            name="requirement"
                            rows="3"
                            placeholder="Briefly describe the requirement"
                            class="mt-1.5 block w-full px-4 py-3 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-[#25D366]/20 focus:border-[#25D366] transition-colors text-dark resize-none"
                        ></textarea></label
                    >
                    <button
                        class="w-full bg-[#25D366] text-white font-bold py-4 rounded-xl hover:bg-[#1ebd5b] transition-all duration-300 hover:shadow-lg shadow-[#25D366]/20 mt-2 flex items-center justify-center gap-2"
                        type="submit"
                    >
                        Send Requirement on WhatsApp <svg
                            class="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            ><path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                            /></svg
                        >
                    </button>
                    <small
                        class="block text-center text-gray-500 mt-2 font-medium"
                        >For a detailed quotation, use the full RFQ form below.</small
                    >
                </form>
            </div>
        </section>
    </div>
</div>
