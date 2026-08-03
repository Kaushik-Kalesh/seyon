import { error } from '@sveltejs/kit';
import { getData } from '$lib/server/db';

export async function load({ params }) {
  const data = await getData();
  
  const valve = data.valves.find((v: any) => v.slug === params.slug);
  
  if (!valve) {
    error(404, 'Valve not found');
  }
  
  return { valve };
}
