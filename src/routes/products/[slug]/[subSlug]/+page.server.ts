import { error } from '@sveltejs/kit';
import { getData } from '$lib/server/db';

export async function load({ params }) {
  const data = await getData();

  const parent = data.products.find((p: any) => p.url === `/products/${params.slug}`);

  if (!parent) {
    error(404, 'Product not found');
  }

  const subproduct = data.products.find(
    (p: any) => p.url === `/products/${params.slug}/${params.subSlug}`
  );

  if (!subproduct) {
    error(404, 'Subproduct not found');
  }

  const productModels = data.models.filter(
    (v: any) => v.productSlug === subproduct.slug
  );

  return {
    parent,
    product: subproduct,
    models: productModels
  };
}
