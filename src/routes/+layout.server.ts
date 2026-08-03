import { getData } from '$lib/server/db';

export async function load() {
  const data = await getData();
  return { siteSettings: data.siteSettings };
}
