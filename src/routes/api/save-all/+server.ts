import { json } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { industries, valves } from '$lib/server/db/schema';

export async function POST({ request, cookies }) {
  if (cookies.get('admin_auth_token') !== 'true') {
    return json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { industries: updatedIndustries, valves: updatedValves } = await request.json();

    // Run sequentially to update records
    for (const ind of updatedIndustries) {
      await db.insert(industries).values(ind).onConflictDoUpdate({
        target: industries.id,
        set: {
          name: ind.name,
          slug: ind.slug,
          description: ind.description,
          imageUrl: ind.imageUrl
        }
      });
    }

    for (const v of updatedValves) {
      await db.insert(valves).values(v).onConflictDoUpdate({
        target: valves.id,
        set: {
          name: v.name,
          slug: v.slug,
          description: v.description,
          industrySlug: v.industrySlug,
          imageUrl: v.imageUrl,
          pdfUrl: v.pdfUrl,
          material: v.material,
          pressureRating: v.pressureRating,
          temperatureRange: v.temperatureRange,
          size: v.size
        }
      });
    }

    return json({ success: true });
  } catch (err: any) {
    console.error(err);
    return json({ success: false, error: err.message }, { status: 500 });
  }
}
