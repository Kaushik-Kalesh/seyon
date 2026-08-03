import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { industries, valves } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function load({ params }) {
  const result = await db.select().from(industries).where(eq(industries.slug, params.slug));
  const industry = result[0];
  
  if (!industry) {
    error(404, 'Industry not found');
  }
  
  const industryValves = await db.select().from(valves).where(eq(valves.industrySlug, params.slug));
  
  return {
    industry,
    valves: industryValves
  };
}
