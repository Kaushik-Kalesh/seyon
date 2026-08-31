import { getData } from '$lib/server/db';

export async function load() {
  const data = await getData();
  const topLevelCategories = (data.categories || []).filter((c: any) => c.url.split('/').length === 3);
  return { categories: topLevelCategories };
}
