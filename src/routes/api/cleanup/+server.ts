import { json } from '@sveltejs/kit';
import { v2 as cloudinary } from 'cloudinary';
import { env } from '$env/dynamic/private';
import { getData } from '$lib/server/db';

export async function GET({ request, cookies }) {
  if (cookies.get('admin_auth_token') !== 'true') {
    return json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  cloudinary.config({ 
    cloud_name: env.CLOUDINARY_CLOUD_NAME, 
    api_key: env.CLOUDINARY_API_KEY, 
    api_secret: env.CLOUDINARY_API_SECRET 
  });

  try {
    // 1. Get database content
    const data = await getData();
    const usedUrls = new Set<string>();
    
    function extractUrls(obj: any) {
        if (!obj) return;
        if (typeof obj === 'string') {
            if (obj.includes('res.cloudinary.com')) {
                usedUrls.add(obj);
            }
        } else if (typeof obj === 'object') {
            for (const key of Object.keys(obj)) {
                extractUrls(obj[key]);
            }
        }
    }
    extractUrls(data);

    // 2. Fetch all resources from Cloudinary
    let allResources: any[] = [];
    let nextCursor = undefined;
    
    // Fetch image resources
    do {
        const response: any = await cloudinary.api.resources({
            type: 'upload',
            resource_type: 'image',
            prefix: 'seyon_cms/',
            max_results: 500,
            next_cursor: nextCursor
        });
        allResources.push(...response.resources);
        nextCursor = response.next_cursor;
    } while (nextCursor);

    // Fetch raw resources (like PDFs)
    nextCursor = undefined;
    do {
        const response: any = await cloudinary.api.resources({
            type: 'upload',
            resource_type: 'raw',
            prefix: 'seyon_cms/',
            max_results: 500,
            next_cursor: nextCursor
        });
        allResources.push(...response.resources);
        nextCursor = response.next_cursor;
    } while (nextCursor);

    // 3. Find unused
    const unusedResources = allResources.filter(r => !usedUrls.has(r.secure_url));
    const usedCount = allResources.length - unusedResources.length;

    // 4. (Optional) Delete unused - we will just report for now
    const unusedUrls = unusedResources.map(r => r.secure_url);

    const url = new URL(request.url);
    const execute = url.searchParams.get('execute') === 'true';

    if (execute) {
        for (const res of unusedResources) {
            await cloudinary.uploader.destroy(res.public_id, { resource_type: res.resource_type });
        }
    }

    return json({ 
        success: true, 
        totalInCloudinary: allResources.length,
        usedInDatabase: usedCount,
        unusedCount: unusedResources.length,
        unusedUrls
    });
  } catch (err: any) {
    return json({ success: false, error: err.message }, { status: 500 });
  }
}


