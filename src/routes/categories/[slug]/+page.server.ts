import { error } from '@sveltejs/kit';
import { getData } from '$lib/server/db';

export async function load({ params }) {
  const data = await getData();
  
  const category = data.categories.find((p: any) => p.url === `/categories/${params.slug}`);
  
  if (!category) {
    error(404, 'Category not found');
  }
  
  const subSlugs = (category.subItems || []).map((s: any) => s.slug);
  const matchingSlugs = [params.slug, ...subSlugs];
  const categoryProducts = data.products.filter((v: any) => matchingSlugs.includes(v.categorySlug));
  
  return {
    category,
    products: categoryProducts
  };
}
