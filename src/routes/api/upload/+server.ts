import { json } from '@sveltejs/kit';
import { v2 as cloudinary } from 'cloudinary';
import { env } from '$env/dynamic/private';

export async function POST({ request, cookies }) {
  if (cookies.get('admin_auth_token') !== 'true') {
    return json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  // Configure Cloudinary with environment variables
  cloudinary.config({ 
    cloud_name: env.CLOUDINARY_CLOUD_NAME, 
    api_key: env.CLOUDINARY_API_KEY, 
    api_secret: env.CLOUDINARY_API_SECRET 
  });

  try {
    const data = await request.formData();
    const file = data.get('file') as File;
    const type = data.get('type') as string; // 'image' or 'pdf'
    
    if (!file) {
      return json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    // Convert file to base64 for Cloudinary upload
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64String = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(base64String, {
      resource_type: 'auto',
      folder: 'seyon_cms'
    });

    return json({ success: true, url: result.secure_url });
  } catch (err: any) {
    console.error('Cloudinary Upload Error:', err);
    return json({ success: false, error: err.message }, { status: 500 });
  }
}
