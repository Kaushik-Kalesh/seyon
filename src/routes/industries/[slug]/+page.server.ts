import { error } from '@sveltejs/kit';
import { getData } from '$lib/server/db';

export async function load({ params }) {
  const data = await getData();
  
  const industry = data.industries.find((i: any) => i.slug === params.slug);
  
  if (!industry) {
    error(404, 'Industry not found');
  }
  
  const industryModels = data.models.filter((v: any) => v.industrySlug === params.slug);
  
  return {
    industry,
    models: industryModels
  };
}
