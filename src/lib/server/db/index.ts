import { Redis } from '@upstash/redis';
import fs from 'fs';
import path from 'path';

// Support both Vercel KV marketplace prefix and standard Upstash env var names
const upstashUrl = process.env.UPSTASH_REDIS_REST_KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const upstashToken = process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = (upstashUrl && upstashToken) 
  ? new Redis({ 
      url: upstashUrl, 
      token: upstashToken,
      fetch: (url, init) => fetch(url, { ...init, cache: 'no-store' })
    }) 
  : null;

const LOCAL_DB_PATH = path.join(process.cwd(), '.data.json');

const defaultCategories = [
  { id: "p1", name: "Actuators", slug: "actuators", description: "Automated pneumatic and electric actuators.", url: "/categories/actuators", subItems: [] },
  { id: "p2", name: "Ball Valves", slug: "ball-valves", description: "Quarter-turn flow control for isolation.", url: "/categories/ball-valves", subItems: [] },
  { id: "p3", name: "Butterfly Valves", slug: "butterfly-valves", description: "Compact quarter-turn valves for large lines.", url: "/categories/butterfly-valves", subItems: [] },
  { id: "p4", name: "Control Valve Accessories", slug: "control-valve-accessories", description: "Instrumentation and positional accessories.", url: "/categories/control-valve-accessories", subItems: [] },
  { id: "p5", name: "Diaphragm Valves", slug: "diaphragm-valves", description: "Bi-directional isolation for slurry and fluids.", url: "/categories/diaphragm-valves", subItems: [] },
  { id: "p6", name: "Globe Control Valves", slug: "globe-control-valves", description: "Precise throttling and flow regulation.", url: "/categories/globe-control-valves", subItems: [] },
  { id: "p7", name: "Manual Valves", slug: "manual-valves", description: "Handwheel and lever operated valves.", url: "/categories/manual-valves", subItems: [] },
  { id: "p8", name: "Pressure, Level, Flow Instruments", slug: "pressure-level-flow", description: "Sensing and measurement instruments.", url: "/categories/pressure-level-flow", subItems: [] },
  { id: "p9", name: "Piston Actuated Valves", slug: "piston-actuated-valves", description: "Linear automated valves for high cycles.", url: "/categories/piston-actuated-valves", subItems: [] },
  { id: "p10", name: "Pressure Transmitter", slug: "pressure-transmitter", description: "Accurate industrial pressure sensors.", url: "/categories/pressure-transmitter", subItems: [] },
  { id: "p11", name: "Steam Valves", slug: "steam-valves", description: "High-temperature steam trapping and control.", url: "/categories/steam-valves", subItems: [] }
];

const defaultSettings = {
  homeHeroImage: 'https://res.cloudinary.com/wk0v5srj/image/upload/v1785914519/seyon_cms/bozm5dyfgrzll0fkmoa2.jpg',
  homeAboutImage: 'https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg',
  aboutHeroImage: 'https://res.cloudinary.com/wk0v5srj/image/upload/v1785760320/seyon_cms/muv3a9nftbricueogzz7.webp',
  aboutGridImage1: 'https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg',
  aboutGridImage2: 'https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg',
  aboutGridImage3: 'https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg',
  aboutGridImage4: 'https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg',
  og_title: 'Seyon Enterprises',
  og_description: 'Precision Engineered Industrial Valves.',
  home_hero_title: 'Every Valve. Every Industry. One Partner.',
  home_hero_subtitle: 'We supply precision valves and automated valve systems across process industries, sourced from certified, industry-leading manufacturers, at competitive pricing.',
  home_hero_btn1: 'Request a Quote',
  home_hero_btn2: 'WhatsApp an Engineer',
  home_about_stats_number: '25+',
  home_about_stats_text: 'Years of industrial excellence and innovation.',
  home_about_title: 'Precision flow control.\nPractical industrial solutions.',
  home_about_desc1: 'Automated on/off valves, manual valves, valve automation, multibrand MRO & AMC, and field instrumentation - for process industries, projects, and plant maintenance.',
  home_about_desc2: 'Industrial valves, control valves, lined valves, spares, and accessories — in stock, ready to supply.',
  home_about_link: 'Read Our Story',
  home_industries_title: 'Industries We Serve',
  home_industries_subtitle: 'Tailored valve solutions for specialized industrial requirements.',
  home_industries_link: 'View All Industries',
  home_products_title: 'Featured Products',
  home_products_subtitle: 'Discover our most popular industrial valves known for their robust design and longevity.',
  about_hero_title: 'About Seyon',
  about_hero_subtitle: 'Decades of flow control expertise, delivering precision-engineered solutions that power the world\'s most demanding industries.',
  about_story_title: 'Our Story',
  about_story_desc1: 'Seyon Enterprises was founded with a singular vision: to bridge the gap between complex industrial requirements and reliable, high-performance flow control solutions.',
  about_story_desc2: 'Over the years, we have grown from a regional supplier to a trusted national partner for critical infrastructure projects. Our team of engineers brings decades of hands-on experience in valve sizing, selection, and automation.',
  about_mission_title: 'Our Mission',
  about_mission_desc: 'To provide unparalleled technical expertise and premium quality valves that ensure the safety, efficiency, and longevity of our clients\' operations.',
  contact_hero_title: 'Get in Touch',
  contact_hero_subtitle: 'Our engineering team is ready to assist with your valve sizing, selection, and automation requirements.',
  contact_info_title: 'Corporate Office',
  contact_info_company: 'Seyon Enterprises',
  contact_info_address: '123 Industrial Park\nChennai, Tamil Nadu 600001\nIndia',
  contact_info_email_title: 'Email Us',
  contact_info_email: 'sales@seyon.co.in',
  contact_info_phone_title: 'Call Us',
  contact_info_phone: '+91 98847 25066',
  contact_form_title: 'Request a Detailed Quotation',
  contact_form_button: 'Send Requirement',
};

function enrichData(data: any) {
  data.siteSettings = { ...defaultSettings, ...(data.siteSettings || {}) };
  
  data.brands = data.brands || [];
  if (data.brands.length === 0) {
    data.brands = [
      { id: "b1", name: "FlowTech", description: "Global leader in flow control solutions.", imageUrl: "https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg" }
    ];
  }

  data.industries = data.industries || [];
  if (data.industries.length === 0) {
    data.industries = [
      { id: "i1", name: "Oil & Gas", description: "High-pressure, extreme-temperature valves built for the harshest extraction and refining environments.", imageUrl: "https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg" }
    ];
  }

  data.products = data.products || [];
  
  if (!data.categories || data.categories.length === 0) {
    data.categories = defaultCategories;
  }
  
  // Reconstruct subItems on parent categories based on sub-category URLs (/categories/[parentSlug]/[subSlug])
  data.categories.forEach((category: any) => {
    const isTopLevel = category.url.split('/').length === 3;
    if (isTopLevel) {
      const subCategories = data.categories.filter((c: any) => {
        const parts = c.url.split('/');
        return parts.length === 4 && parts[2] === category.slug;
      });
      category.subItems = subCategories.map((sub: any) => ({
        id: sub.id,
        name: sub.name,
        slug: sub.slug,
        url: sub.url,
        description: sub.description
      }));
    } else {
      category.subItems = [];
    }
  });

  data.products.forEach((v: any) => {
    if (!v.categorySlug) v.categorySlug = data.categories[0]?.slug || 'actuators';
  });

  return {
    industries: data.industries,
    brands: data.brands,
    products: data.products,
    categories: data.categories,
    siteSettings: data.siteSettings
  };
}

export async function getData(): Promise<{ industries: any[], products: any[], brands: any[], categories: any[], siteSettings?: any }> {
  let data: any = null;
  if (redis) {
    try {
      data = await redis.get('seyon_data');
    } catch (e) {
      console.error("Failed to read from Redis:", e);
    }
  } else {
    // Local fallback
    if (fs.existsSync(LOCAL_DB_PATH)) {
      try {
        const fileContent = fs.readFileSync(LOCAL_DB_PATH, 'utf-8');
        data = JSON.parse(fileContent);
      } catch(e) {
        console.error("Failed to read local DB:", e);
      }
    }
  }

  if (data) {
    return enrichData(data);
  }
  
  const initialData = enrichData({ industries: [], products: [], brands: [], categories: [] });
  await saveData(initialData);
  return initialData;
}

export async function saveData(data: any) {
  if (redis) {
    try {
      await redis.set('seyon_data', data);
    } catch (e) {
      console.error("Failed to write to Redis:", e);
      throw e;
    }
  } else {
    try {
      fs.writeFileSync(LOCAL_DB_PATH, JSON.stringify(data, null, 2));
    } catch(e) {
      console.error("Failed to write local DB:", e);
      throw e;
    }
  }
}
