import { error } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { valves } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export async function load({ params }) {
  const result = await db.select().from(valves).where(eq(valves.slug, params.slug));
  const valve = result[0];
  
  if (!valve) {
    error(404, 'Valve not found');
  }
  
  return { valve };
}
