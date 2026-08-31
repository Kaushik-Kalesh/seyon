import { json } from '@sveltejs/kit';
import { saveData, getData } from '$lib/server/db';

export async function POST({ request, cookies }) {
  if (cookies.get('admin_auth_token') !== 'true') {
    return json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const current = await getData();
    const merged = { ...current, ...body };
    await saveData(merged);
    return json({ success: true });
  } catch (err: any) {
    console.error(err);
    return json({ success: false, error: err.message }, { status: 500 });
  }
}
