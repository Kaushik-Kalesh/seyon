import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export async function POST({ cookies }) {
  if (cookies.get('admin_auth_token') !== 'true') {
    return json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  if (!env.VERCEL_DEPLOY_WEBHOOK_URL) {
    return json({ success: false, error: 'VERCEL_DEPLOY_WEBHOOK_URL is not set' }, { status: 500 });
  }

  try {
    const res = await fetch(env.VERCEL_DEPLOY_WEBHOOK_URL, { method: 'POST' });
    if (!res.ok) throw new Error('Failed to trigger webhook');
    return json({ success: true });
  } catch (err: any) {
    console.error(err);
    return json({ success: false, error: err.message }, { status: 500 });
  }
}
