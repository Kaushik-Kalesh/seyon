import { error } from '@sveltejs/kit';
import { industries, valves } from '$lib/data/mock';

export function load({ params }) {
  const industry = industries.find(i => i.slug === params.slug);
  if (!industry) {
    error(404, 'Industry not found');
  }
  
  const industryValves = valves.filter(v => v.industrySlug === params.slug);
  
  return {
    industry,
    valves: industryValves
  };
}
