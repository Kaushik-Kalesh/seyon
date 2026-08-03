import { Redis } from '@upstash/redis';

// Vercel sometimes uses a specific prefix when generating these through the marketplace
const upstashUrl = process.env.UPSTASH_REDIS_REST_KV_REST_API_URL;
const upstashToken = process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN;

const redis = (upstashUrl && upstashToken) 
  ? new Redis({ url: upstashUrl, token: upstashToken }) 
  : null;

export async function getData(): Promise<{ industries: any[], valves: any[], siteSettings?: any }> {
  // During local development without Redis configured, return empty arrays
  if (!redis) {
    return { industries: [], valves: [], siteSettings: { companyName: 'Seyon Enterprises', email: 'sales@seyonflo.in', phone: '+91 98847 25066', address: 'S/O Mathialagan, 1/E 388A, 19TH STREET, THAI MOOGAMBIGAI NAGAR, Madambakkam, Kancheepuram, Tamil Nadu, India-603202', homeHeroText: 'High Performance Industrial Valves', homeHeroImage: 'https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg', homeAboutImage: 'https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg', aboutHeroImage: 'https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg', aboutGridImage1: 'https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg', aboutGridImage2: 'https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg', aboutGridImage3: 'https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg', aboutGridImage4: 'https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg' } };
  }

  try {
    const data = await redis.get<{ industries: any[], valves: any[], siteSettings?: any }>('seyon_data');
    if (data) {
      if (!data.siteSettings) {
        data.siteSettings = { companyName: 'Seyon Enterprises', email: 'sales@seyonflo.in', phone: '+91 98847 25066', address: 'S/O Mathialagan, 1/E 388A, 19TH STREET, THAI MOOGAMBIGAI NAGAR, Madambakkam, Kancheepuram, Tamil Nadu, India-603202', homeHeroText: 'High Performance Industrial Valves', homeHeroImage: 'https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg', homeAboutImage: 'https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg', aboutHeroImage: 'https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg', aboutGridImage1: 'https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg', aboutGridImage2: 'https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg', aboutGridImage3: 'https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg', aboutGridImage4: 'https://4.imimg.com/data4/XP/YO/ANDROID-11872361/product-500x500.jpeg' };
      }
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
