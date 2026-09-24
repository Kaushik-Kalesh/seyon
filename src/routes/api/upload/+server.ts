import { json } from '@sveltejs/kit';
import { v2 as cloudinary } from 'cloudinary';
import { env } from '$env/dynamic/private';

export async function POST({ request, cookies }) {
  if (cookies.get('admin_auth_token') !== 'true') {
    return json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  cloudinary.config({ 
    cloud_name: env.CLOUDINARY_CLOUD_NAME, 
    api_key: env.CLOUDINARY_API_KEY, 
    api_secret: env.CLOUDINARY_API_SECRET 
  });

  try {
    const data = await request.formData();
    const file = data.get('file') as File;
    const type = data.get('type') as string; 
    
    if (!file) {
      return json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Raw uploads (PDFs) need the extension in public_id — Cloudinary only auto-appends for images.
    const publicIdSuffix = `_${Date.now()}`;
    const baseName = file.name.split('.')[0].replace(/[^a-zA-Z0-9]/g, '_');
    const extension = type === 'pdf' ? '.pdf' : '';
    const publicId = `${baseName}${publicIdSuffix}${extension}`;

    // PDFs must use 'raw' resource_type — free tier blocks PDF delivery via the image pipeline
    const resourceType = type === 'pdf' ? 'raw' : 'image';

    const result = await new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream({
        resource_type: resourceType,
        folder: 'seyon_cms',
        public_id: publicId,
      }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      });
      
      uploadStream.end(buffer);
    });

    return json({ success: true, url: result.secure_url });
  } catch (err: any) {
    console.error('Cloudinary Upload Error:', err);
    return json({ success: false, error: err.message }, { status: 500 });
  }
}
