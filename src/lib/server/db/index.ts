import { Redis } from '@upstash/redis';

// Vercel sometimes uses a specific prefix when generating these through the marketplace
const upstashUrl = process.env.UPSTASH_REDIS_REST_KV_REST_API_URL;
const upstashToken = process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN;

const redis = (upstashUrl && upstashToken) 
  ? new Redis({ 
      url: upstashUrl, 
      token: upstashToken,
      // Prevent Vercel/SvelteKit from caching the Upstash REST API calls
      fetch: (url, init) => fetch(url, { ...init, cache: 'no-store' })
    }) 
  : null;

export async function getData(): Promise<{ industries: any[], valves: any[], siteSettings?: any }> {
  // During local development without Redis configured, return empty arrays
  if (!redis) {
    return { industries: [], valves: [], siteSettings: { companyName: 'Seyon Enterprises', email: 'sales@seyonflo.in', phone: '+91 98847 25066', address: 'S/O Mathialagan, 1/E 388A, 19TH STREET, THAI MOOGAMBIGAI NAGAR, Madambakkam, Kancheepuram, Tamil Nadu, India-603202', homeHeroText: 'High Performance Industrial Valves', homeHeroImage: 'https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg', homeAboutImage: 'https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg', aboutHeroImage: 'https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg', aboutGridImage1: 'https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg', aboutGridImage2: 'https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg', aboutGridImage3: 'https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg', aboutGridImage4: 'https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg' } };
  }

  try {
    const data = await redis.get<{ industries: any[], valves: any[], siteSettings?: any }>('seyon_data');
    if (data) {
      const defaultSettings = { 
        // Images
        homeHeroImage: 'https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg', 
        homeAboutImage: 'https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg', 
        aboutHeroImage: 'https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg', 
        aboutGridImage1: 'https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg', 
        aboutGridImage2: 'https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg', 
        aboutGridImage3: 'https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg', 
        aboutGridImage4: 'https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg',
        
        // Home Page Texts
        home_hero_title: 'Precision Engineered Industrial Valves',
        home_hero_subtitle: "Delivering unparalleled reliability and performance for the world's most demanding environments. We set the standard for fluid control.",
        home_hero_btn1: 'Explore Solutions',
        home_hero_btn2: 'Request a Quote',
        home_about_stats_number: '25+',
        home_about_stats_text: 'Years of industrial excellence and innovation.',
        home_about_title: 'Crafting Quality for Critical Applications',
        home_about_desc1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        home_about_desc2: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        home_about_link: 'Read Our Story',
        home_industries_title: 'Industries We Serve',
        home_industries_subtitle: 'Tailored valve solutions for specialized industrial requirements.',
        home_industries_link: 'View All Industries',
        home_products_title: 'Featured Products',
        home_products_subtitle: 'Discover our most popular industrial valves known for their robust design and longevity.',

        // About Page Texts
        about_hero_title: 'About Seyon',
        about_hero_subtitle: "Decades of engineering excellence, delivering the world's most reliable industrial valves.",
        about_legacy_title: 'Our Legacy of Innovation',
        about_legacy_desc1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        about_legacy_desc2: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        about_stats1_number: '50+',
        about_stats1_text: 'Countries Served',
        about_stats2_number: '10k+',
        about_stats2_text: 'Installations',

        // Contact Page Texts
        contact_hero_title: 'Get in Touch',
        contact_hero_subtitle: "We're here to help with your industrial valve requirements.",
        contact_info_title: 'Our Headquarters',
        contact_info_company: 'Seyon Enterprises',
        contact_info_address: 'S/O Mathialagan, 1/E 388A, 19TH STREET, THAI MOOGAMBIGAI NAGAR, Madambakkam, Kancheepuram, Tamil Nadu, India-603202',
        contact_info_phone_title: 'Call Us',
        contact_info_phone: '+91 98847 25066',
        contact_info_email_title: 'Email Us',
        contact_info_email: 'sales@seyonflo.in',
        contact_form_title: 'Send us a Message',
        contact_form_name: 'Your Name',
        contact_form_email: 'Email Address',
        contact_form_subject: 'Subject',
        contact_form_message: 'Message',
        contact_form_button: 'Send Message',
      };
      data.siteSettings = { ...defaultSettings, ...(data.siteSettings || {}) };
      return data;
    }
  } catch (e) {
    console.error("Failed to read from Redis:", e);
  }
  
  // If no data exists yet, initialize it empty
  const initialData = { industries: [], valves: [], siteSettings: { companyName: 'Seyon Enterprises', email: 'sales@seyonflo.in', phone: '+91 98847 25066', address: 'S/O Mathialagan, 1/E 388A, 19TH STREET, THAI MOOGAMBIGAI NAGAR, Madambakkam, Kancheepuram, Tamil Nadu, India-603202', homeHeroText: 'High Performance Industrial Valves', homeHeroImage: 'https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg', homeAboutImage: 'https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg', aboutHeroImage: 'https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg', aboutGridImage1: 'https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg', aboutGridImage2: 'https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg', aboutGridImage3: 'https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg', aboutGridImage4: 'https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg' } };
  await saveData(initialData);
  return initialData;
}

export async function saveData(data: any) {
  if (!redis) {
    return;
  }
  
  try {
    await redis.set('seyon_data', data);
  } catch (e) {
    console.error("Failed to write to Redis:", e);
    throw e;
  }
}
