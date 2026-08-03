import { db } from '$lib/server/db';
import { industries, valves } from '$lib/server/db/schema';

export async function load() {
  const allIndustries = await db.select().from(industries);
  const featuredValves = await db.select().from(valves).limit(3);
  
  return {
    industries: allIndustries,
    featuredValves
  };
}
