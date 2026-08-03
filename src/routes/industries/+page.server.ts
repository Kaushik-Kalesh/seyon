import { db } from '$lib/server/db';
import { industries } from '$lib/server/db/schema';

export async function load() {
  const allIndustries = await db.select().from(industries);
  return { industries: allIndustries };
}
