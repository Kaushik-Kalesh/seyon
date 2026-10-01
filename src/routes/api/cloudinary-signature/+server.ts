import { json } from '@sveltejs/kit';
import { v2 as cloudinary } from 'cloudinary';
import { env } from '$env/dynamic/private';

export async function POST({ request, cookies }) {
  if (cookies.get('admin_auth_token') !== 'true') {
    return json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { type, filename } = await request.json();

    const timestamp = Math.round((new Date()).getTime() / 1000);
    
    // Naming logic matching the original backend
    const publicIdSuffix = `_${Date.now()}`;
    const baseName = filename.split('.')[0].replace(/[^a-zA-Z0-9]/g, '_');
    const publicId = `${baseName}${publicIdSuffix}`;
    
    const folder = 'seyon_cms';
    const resourceType = type === 'pdf' ? 'raw' : 'image';

    const paramsToSign = {
      timestamp,
      folder,
      public_id: publicId
    };

    const signature = cloudinary.utils.api_sign_request(paramsToSign, env.CLOUDINARY_API_SECRET);

    return json({
      success: true,
      signature,
      timestamp,
      cloudName: env.CLOUDINARY_CLOUD_NAME,
      apiKey: env.CLOUDINARY_API_KEY,
      publicId,
      folder,
      resourceType
    });
  } catch (err: any) {
    return json({ success: false, error: err.message }, { status: 500 });
  }
}
