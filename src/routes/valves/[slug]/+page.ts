import { error } from '@sveltejs/kit';
import { valves } from '$lib/data/mock';

export function load({ params }) {
  const valve = valves.find(v => v.slug === params.slug);
  if (!valve) {
    error(404, 'Valve not found');
  }
  
  return {
    valve
  };
}
