import { getData } from '$lib/server/db';

export async function load() {
  const data = await getData();
  
  return {
    industries: data.industries,
    featuredValves: data.valves.slice(0, 3),
    siteSettings: data.siteSettings
  };
}
