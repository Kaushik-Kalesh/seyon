import { error } from '@sveltejs/kit';
import { getData } from '$lib/server/db';

export async function load({ params }) {
  const data = await getData();
  
  const product = data.products.find((v: any) => v.slug === params.slug);
  
  if (!product) {
    error(404, 'Product not found');
  }
  
  return { product };
}
