import { json } from '@sveltejs/kit';
import { saveData } from '$lib/server/db';

export async function POST({ request, cookies }) {
  if (cookies.get('admin_auth_token') !== 'true') {
    return json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const data = await request.json();
    await saveData(data);
    return json({ success: true });
  } catch (err: any) {
    console.error(err);
    return json({ success: false, error: err.message }, { status: 500 });
  }
}
