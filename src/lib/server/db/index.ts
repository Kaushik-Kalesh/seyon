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

const defaultProducts = [
  { id: "p1", name: "Actuators", slug: "actuators", description: "Automated pneumatic and electric actuators.", url: "/products/actuators", subItems: [] },
  { id: "p2", name: "Ball Models", slug: "ball-models", description: "Quarter-turn flow control for isolation.", url: "/products/ball-models", subItems: [] },
  { id: "p3", name: "Butterfly Models", slug: "butterfly-models", description: "Compact quarter-turn models for large lines.", url: "/products/butterfly-models", subItems: [] },
  { id: "p4", name: "Control Model Accessories", slug: "control-model-accessories", description: "Instrumentation and positional accessories.", url: "/products/control-model-accessories", subItems: [] },
  { id: "p5", name: "Diaphragm Models", slug: "diaphragm-models", description: "Bi-directional isolation for slurry and fluids.", url: "/products/diaphragm-models", subItems: [] },
  { id: "p6", name: "Globe Control Models", slug: "globe-control-models", description: "Precise throttling and flow regulation.", url: "/products/globe-control-models", subItems: [] },
  { id: "p7", name: "Manual Models", slug: "manual-models", description: "Handwheel and lever operated models.", url: "/products/manual-models", subItems: [] },
  { id: "p8", name: "Pressure, Level, Flow Instruments", slug: "pressure-level-flow", description: "Sensing and measurement instruments.", url: "/products/pressure-level-flow", subItems: [] },
  { id: "p9", name: "Piston Actuated Models", slug: "piston-actuated-models", description: "Linear automated models for high cycles.", url: "/products/piston-actuated-models", subItems: [] },
  { id: "p10", name: "Pressure Transmitter", slug: "pressure-transmitter", description: "Accurate industrial pressure sensors.", url: "/products/pressure-transmitter", subItems: [] },
  { id: "p11", name: "Steam Models", slug: "steam-models", description: "High-temperature steam trapping and control.", url: "/products/steam-models", subItems: [] }
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
  og_description: 'Precision Engineered Industrial Models.',
  home_hero_title: 'Every Model. Every Industry. One Partner.',
  home_hero_subtitle: 'We supply precision models and automated model systems across process industries, sourced from certified, industry-leading manufacturers, at competitive pricing.',
  home_hero_btn1: 'Request a Quote',
  home_hero_btn2: 'WhatsApp an Engineer',
  home_about_stats_number: '25+',
  home_about_stats_text: 'Years of industrial excellence and innovation.',
  home_about_title: 'Precision flow control.\nPractical industrial solutions.',
  home_about_desc1: 'Automated on/off models, manual models, model automation, multibrand MRO & AMC, and field instrumentation - for process industries, projects, and plant maintenance.',
  home_about_desc2: 'Industrial models, control models, lined models, spares, and accessories â€” in stock, ready to supply.',
  home_about_link: 'Read Our Story',
  home_industries_title: 'Industries We Serve',
  home_industries_subtitle: 'Tailored model solutions for specialized industrial requirements.',
  home_industries_link: 'View All Industries',
  home_products_title: 'Featured Products',
  home_products_subtitle: 'Discover our most popular industrial models known for their robust design and longevity.',
  about_hero_title: 'About Seyon',
  about_hero_subtitle: 'Decades of flow control expertise, delivering precision-engineered solutions that power the world\'s most demanding industries.',
  about_story_title: 'Our Story',
  about_story_desc1: 'Seyon Enterprises was founded with a singular vision: to bridge the gap between complex industrial requirements and reliable, high-performance flow control solutions.',
  about_story_desc2: 'Over the years, we have grown from a regional supplier to a trusted national partner for critical infrastructure projects. Our team of engineers brings decades of hands-on experience in model sizing, selection, and automation.',
  about_mission_title: 'Our Mission',
  
  about_stats1_number: '500+',
  about_stats1_text: 'Projects Completed',
  about_stats2_number: '50+',
  about_stats2_text: 'Expert Engineers',
  about_mission_desc: 'To provide unparalleled technical expertise and premium quality models that ensure the safety, efficiency, and longevity of our clients\' operations.',
  contact_hero_title: 'Get in Touch',
  contact_hero_subtitle: 'Our engineering team is ready to assist with your model sizing, selection, and automation requirements.',
  contact_info_title: 'Corporate Office',
  contact_info_company: 'Seyon Enterprises',
  contact_info_address: '123 Industrial Park\nChennai, Tamil Nadu 600001\nIndia',
  contact_info_email_title: 'Email Us',
  contact_info_email: 'sales@seyon.co.in',
  contact_info_phone_title: 'Call Us',
  contact_info_phone: '+91 98847 25066',
  contact_form_title: 'Request a Detailed Quotation',
  contact_form_button: 'Send Requirement',
  brands_hero_title: 'Our Trusted Brands',
  brands_hero_subtitle: 'Partnering with industry leaders to bring you the best in model technology.',
  brands_empty_text: 'Check back soon for our partners and brand collaborations.',
    products_hero_title: 'Our Models',
    globalLogoImage: '/logo.png',
    products_hero_subtitle: 'Explore our comprehensive range of high-performance industrial models and automation solutions.',
  home_services_eyebrow: 'VALVE SERVICES',
  home_services_title: 'Keep your models running.<br><span>Not just supplied.</span>',
  home_services_subtitle: 'Multibrand MRO and Annual Maintenance Contract support for industrial model assets, helping plants improve availability, maintenance response and lifecycle management.',
  home_service1_title: 'Multibrand MRO',
  home_service1_desc: 'Maintenance, repair and replacement support for installed industrial models across brands.',
  home_service1_list: 'Inspection & condition assessment\nRepair / replacement support\nSpare model & component sourcing',
  home_service2_title: 'AMC Support',
  home_service2_desc: 'Planned model maintenance programs designed around plant schedules and critical equipment.',
  home_service2_list: 'Periodic inspection planning\nCritical model tracking\nMaintenance coordination',
  home_service3_title: 'Model Automation Support',
  home_service3_desc: 'Support for actuated model packages and automation accessories during maintenance or modification.',
  home_service3_list: 'Actuator & accessory checks\nSolenoid / limit switch support\nReplacement & retrofit coordination',
  home_service4_title: 'Plant Support',
  home_service4_desc: 'One point of contact for model and instrumentation requirements during shutdowns, projects and routine maintenance.',
  home_service4_list: 'Shutdown requirements\nEmergency replacement\nTechnical enquiry support',
  home_services_banner_strong: 'Have a multibrand model population?',
  home_services_banner_text: 'Share your model list, tag numbers or maintenance requirement for an MRO / AMC discussion.',
  home_services_banner_btn: 'Discuss Your Requirement â†’',
  home_instrumentation_eyebrow: 'FIELD INSTRUMENTATION',
  home_instrumentation_title: 'One package for <span>flow control &amp; measurement.</span>',
  home_instrumentation_subtitle: 'Expand your procurement through one partner with field instruments covering key process variables and analysers.',
  home_instrument1_symbol: 'F',
  home_instrument1_title: 'Flow',
  home_instrument1_desc: 'Flow measurement solutions for process and utility applications.',
  home_instrument1_sub: 'Flow Transmitters',
  home_instrument2_symbol: 'P',
  home_instrument2_title: 'Pressure',
  home_instrument2_desc: 'Pressure measurement and transmission for process monitoring.',
  home_instrument2_sub: 'Pressure Transmitters',
  home_instrument3_symbol: 'T',
  home_instrument3_title: 'Temperature',
  home_instrument3_desc: 'Temperature measurement for industrial process applications.',
  home_instrument3_sub: 'Temperature Transmitters',
  home_instrument4_symbol: 'L',
  home_instrument4_title: 'Level',
  home_instrument4_desc: 'Level measurement for tanks, vessels and process systems.',
  home_instrument4_sub: 'Level Transmitters',
  home_instrument5_symbol: 'AN',
  home_instrument5_title: 'Analysers',
  home_instrument5_desc: 'Process analysis products for continuous measurement and monitoring.',
  home_instrument5_sub: 'Process Analysers',
  home_package_eyebrow: 'PACKAGE SUPPLIER',
  home_package_title: 'Mechanical + Automation + Instrumentation',
  home_package_subtitle: 'From model selection and automation to field measurement, Seyon can support a more complete process package.',
  home_package_btn: 'Build a Package Enquiry â†’',
  home_workflow_eyebrow: 'HOW WE WORK',
  home_workflow_title: 'Simple process. Better model decisions.',
  home_workflow1_title: 'Understand',
  home_workflow1_desc: 'Review application and operating conditions.',
  home_workflow2_title: 'Select',
  home_workflow2_desc: 'Identify the right model and automation approach.',
  home_workflow3_title: 'Supply',
  home_workflow3_desc: 'Coordinate the required model package.',
  home_workflow4_title: 'Support',
  home_workflow4_desc: 'Stay available for technical and replacement needs.'
};

function enrichData(data: any) {
  data.siteSettings = { ...defaultSettings, ...(data.siteSettings || {}) };
  
  data.brands = data.brands || [];
  if (data.brands.length === 0) {
    data.brands = [
      { id: "b1", imageUrl: "https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg" }
    ];
  }

  data.industries = data.industries || [];
  if (data.industries.length === 0) {
    data.industries = [
      { id: "i1", name: "Oil & Gas", description: "High-pressure, extreme-temperature models built for the harshest extraction and refining environments.", imageUrl: "https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg" }
    ];
  }

  data.models = data.models || [];
  
  if (!data.products || data.products.length === 0) {
    data.products = defaultProducts;
  }
  
  // Reconstruct subItems on parent products based on sub-product URLs (/products/[parentSlug]/[subSlug])
  data.products.forEach((product: any) => {
    const isTopLevel = product.url.split('/').length === 3;
    if (isTopLevel) {
      const subProducts = data.products.filter((c: any) => {
        const parts = c.url.split('/');
        return parts.length === 4 && parts[2] === product.slug;
      });
      product.subItems = subProducts.map((sub: any) => ({
        ...sub
      }));
    } else {
      product.subItems = [];
    }
  });

  data.models.forEach((v: any) => {
    if (!v.productSlug) v.productSlug = data.products[0]?.slug || 'actuators';
    if (!v.slug && v.name) v.slug = v.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  });

  return {
    industries: data.industries,
    brands: data.brands,
    models: data.models,
    products: data.products,
    siteSettings: data.siteSettings
  };
}

export async function getData(): Promise<{ industries: any[], models: any[], brands: any[], products: any[], siteSettings?: any }> {
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
  
  const initialData = enrichData({ industries: [], models: [], brands: [], products: [] });
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



