import { error } from '@sveltejs/kit';
import { getData } from '$lib/server/db';

export async function load({ params }) {
  const data = await getData();
  
  const product = data.products.find((p: any) => p.url === `/products/${params.slug}`);
  
  if (!product) {
    error(404, 'Product not found');
  }
  
  const subSlugs = (product.subItems || []).map((s: any) => s.slug);
  const matchingSlugs = [params.slug, ...subSlugs];
  const productModels = data.models.filter((v: any) => matchingSlugs.includes(v.productSlug));
  
  return {
    product,
    models: productModels
  };
}
