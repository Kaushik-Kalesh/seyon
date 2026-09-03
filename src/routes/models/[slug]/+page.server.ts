import { error } from '@sveltejs/kit';
import { getData } from '$lib/server/db';

export async function load({ params }) {
  const data = await getData();
  
  const model = data.models.find((v: any) => v.slug === params.slug);
  
  if (!model) {
    error(404, 'Model not found');
  }
  
  return { model };
}
