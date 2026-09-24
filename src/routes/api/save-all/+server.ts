import { json } from '@sveltejs/kit';
import { saveData, getData } from '$lib/server/db';
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

  function extractUrls(obj: any, set: Set<string>) {
      if (!obj) return;
      if (typeof obj === 'string') {
          if (obj.includes('res.cloudinary.com')) {
              set.add(obj);
          }
      } else if (typeof obj === 'object') {
          for (const key of Object.keys(obj)) {
              extractUrls(obj[key], set);
          }
      }
  }

  function parseCloudinaryUrl(url: string): { publicId: string, resourceType: string } | null {
      try {
          // URL format: https://res.cloudinary.com/<cloud>/<resource_type>/upload/v<version>/<folder>/<public_id>
          const match = url.match(/\/(image|raw|video)\/upload\/(?:v\d+\/)?(.+)$/);
          if (!match) return null;
          const resourceType = match[1];
          // For image resources, Cloudinary auto-appends extension so public_id has no extension
          // For raw resources, the extension is part of the public_id
          const publicId = resourceType === 'image' ? match[2].replace(/\.[^.]+$/, '') : match[2];
          return { publicId, resourceType };
      } catch(e) {
          return null;
      }
  }

  try {
    const body = await request.json();
    const current = await getData();
    const merged = { ...current, ...body };
    
    // Find removed URLs
    const oldUrls = new Set<string>();
    extractUrls(current, oldUrls);
    
    const newUrls = new Set<string>();
    extractUrls(merged, newUrls);

    const removedUrls = [...oldUrls].filter(url => !newUrls.has(url));

    // Delete removed URLs from Cloudinary
    for (const url of removedUrls) {
        const parsed = parseCloudinaryUrl(url);
        if (parsed) {
            try {
                await cloudinary.uploader.destroy(parsed.publicId, { resource_type: parsed.resourceType });
                console.log(`Deleted orphaned Cloudinary file: ${parsed.publicId} (${parsed.resourceType})`);
            } catch(e) {
                console.error(`Failed to delete Cloudinary file: ${parsed.publicId}`, e);
            }
        }
    }

    await saveData(merged);
    return json({ success: true, removedCount: removedUrls.length });
  } catch (err: any) {
    console.error(err);
    return json({ success: false, error: err.message }, { status: 500 });
  }
}

