import { db } from '$lib/server/db';
import { industries, valves } from '$lib/server/db/schema';

export async function load() {
  const allIndustries = await db.select().from(industries);
  const allValves = await db.select().from(valves);
  
  return {
    industries: allIndustries,
    valves: allValves
  };
}
