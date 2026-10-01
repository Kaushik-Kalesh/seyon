import { error } from '@sveltejs/kit';

export async function GET({ url }) {
    const fileUrl = url.searchParams.get('url');
    if (!fileUrl) throw error(400, 'No URL provided');

    try {
        const response = await fetch(fileUrl);
        if (!response.ok) {
            throw error(response.status, 'Failed to fetch PDF from Cloudinary');
        }

        const buffer = await response.arrayBuffer();

        return new Response(buffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'inline; filename="document.pdf"',
                'Cache-Control': 'public, max-age=31536000'
            }
        });
    } catch (err: any) {
        console.error('PDF Proxy Error:', err);
        if (err.status) throw err; // Re-throw SvelteKit HttpErrors (like 404)
        throw error(500, 'Failed to proxy PDF');
    }
}
