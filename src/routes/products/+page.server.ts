import { getData } from '$lib/server/db';

export async function load() {
  const data = await getData();
  const topLevelProducts = (data.products || []).filter((c: any) => c.url.split('/').length === 3);
  return { products: topLevelProducts, models: data.models || [], siteSettings: data.siteSettings || {} };
}
