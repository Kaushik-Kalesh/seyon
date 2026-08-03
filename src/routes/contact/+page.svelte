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
    <div class="page-container">
        <div class="text-center max-w-3xl mx-auto mb-16">
            <div
                class="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-semibold tracking-wider uppercase mb-6"
            >
                Let's Connect
            </div>
            <h1 class="text-5xl font-bold text-dark mb-6">{siteSettings.contact_hero_title}</h1>
            <p class="text-xl text-dark-gray">
                {siteSettings.contact_hero_subtitle}
            </p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
            <!-- Contact Info -->
            <div
                class="bg-dark text-white p-10 md:p-12 rounded-3xl shadow-xl relative overflow-hidden group"
            >
                <div
                    class="absolute -right-20 -top-20 w-64 h-64 bg-primary rounded-full opacity-20 blur-3xl group-hover:opacity-40 transition-opacity duration-700"
                ></div>
                <div
                    class="absolute -left-20 -bottom-20 w-64 h-64 bg-primary rounded-full opacity-20 blur-3xl group-hover:opacity-40 transition-opacity duration-700"
                ></div>

                <h3 class="text-3xl font-serif font-bold mb-8 relative z-10">
                    Contact Information
                </h3>

                <div class="space-y-8 relative z-10">
                    <div class="flex items-start gap-5 group/item">
                        <div
                            class="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 group-hover/item:bg-primary/20 transition-colors"
                        >
                            <svg
                                class="w-7 h-7 text-primary"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                ><path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                /><path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                /></svg
                            >
                        </div>
                        <div>
                            <h4 class="font-bold text-xl mb-2">{siteSettings.contact_info_title}</h4>
                            <p class="text-gray-300 leading-relaxed font-bold mb-1">{siteSettings.contact_info_company}</p>
                            <p class="text-gray-300 leading-relaxed whitespace-pre-wrap">{siteSettings.contact_info_address || siteSettings.address}</p>
                        </div>
                    </div>

                    <div class="flex items-start gap-5 group/item">
                        <div
                            class="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 group-hover/item:bg-primary/20 transition-colors"
                        >
                            <svg
                                class="w-7 h-7 text-primary"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                ><path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                /></svg
                            >
                        </div>
                        <div>
                            <h4 class="font-bold text-xl mb-2">{siteSettings.contact_info_email_title}</h4>
                            <p class="text-gray-300 leading-relaxed">
                                {siteSettings.contact_info_email || siteSettings.email}
                            </p>
                        </div>
                    </div>

                    <div class="flex items-start gap-5 group/item">
                        <div
                            class="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center shrink-0 group-hover/item:bg-primary/20 transition-colors"
                        >
                            <svg
                                class="w-7 h-7 text-primary"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                ><path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                /></svg
                            >
                        </div>
                        <div>
                            <h4 class="font-bold text-xl mb-2">{siteSettings.contact_info_phone_title}</h4>
                            <p class="text-gray-300 leading-relaxed">
                                {siteSettings.contact_info_phone || siteSettings.phone}
                            </p>
                        </div>
                    </div>

                    <div class="pt-6">
                        <a
                            href="https://wa.me/919884725066?text=Hi"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebd5b] text-white px-6 py-3 rounded-xl font-medium transition-colors shadow-lg shadow-[#25D366]/20"
                        >
                            <svg
                                class="w-6 h-6"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                ><path
                                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"
                                /></svg
                            >
                            Chat on WhatsApp
                        </a>
                    </div>
                </div>
            </div>

            <!-- Form -->
            <div
                class="bg-white p-10 md:p-12 rounded-3xl shadow-xl border border-gray-100 flex flex-col justify-center"
            >
                <h3 class="text-3xl font-serif font-bold text-dark mb-8">
                    {siteSettings.contact_form_title}
                </h3>

                {#if form?.success}
                    <div
                        class="bg-green-50 text-green-700 p-4 rounded-xl mb-6 border border-green-200"
                    >
                        Thank you for your inquiry! We will get back to you
                        soon.
                    </div>
                {/if}

                {#if form?.error}
                    <div
                        class="bg-red-50 text-red-700 p-4 rounded-xl mb-6 border border-red-200"
                    >
                        {form.error}
                    </div>
                {/if}

                <form
                    method="POST"
                    action="?/submit"
                    use:enhance
                    class="space-y-6"
                >
                    <div class="flex flex-col">
                        <label
                            for="name"
                            class="text-sm font-medium text-dark-gray mb-2"
                            >Full Name</label
                        >
                        <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            placeholder="John Doe"
                            class="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-dark"
                        />
                    </div>

                    <div class="flex flex-col">
                        <label
                            for="contact"
                            class="text-sm font-medium text-dark-gray mb-2"
                            >Email or Phone Number</label
                        >
                        <input
                            type="text"
                            id="contact"
                            name="contact"
                            required
                            placeholder="johndoe@example.com / +91 98847 25066"
                            class="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-dark"
                        />
                    </div>

                    <div class="flex flex-col">
                        <label
                            for="remarks"
                            class="text-sm font-medium text-dark-gray mb-2"
                            >Your Remarks / Requirements</label
                        >
                        <textarea
                            id="remarks"
                            name="remarks"
                            rows="5"
                            required
                            placeholder="Tell us about the valves you need..."
                            class="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors text-dark resize-none"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        class="w-full bg-dark text-white font-bold text-lg py-4 rounded-xl hover:bg-primary transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 mt-2"
                    >
                        {siteSettings.contact_form_button}
                    </button>
                </form>
            </div>
        </div>
    </div>
</div>
