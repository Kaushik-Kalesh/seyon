import { error } from '@sveltejs/kit';
import { getData } from '$lib/server/db';

export async function load({ params }) {
  const data = await getData();

  const parent = data.categories.find((p: any) => p.url === `/categories/${params.slug}`);

  if (!parent) {
    error(404, 'Category not found');
  }

  const subcategory = data.categories.find(
    (p: any) => p.url === `/categories/${params.slug}/${params.subSlug}`
  );

  if (!subcategory) {
    error(404, 'Subcategory not found');
  }

  const categoryProducts = data.products.filter(
    (v: any) => v.categorySlug === subcategory.slug
  );

  return {
    parent,
    category: subcategory,
    products: categoryProducts
  };
}
