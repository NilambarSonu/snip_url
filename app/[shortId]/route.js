import sql from '@/lib/db';

export async function GET(request, { params }) {
  const { shortId } = params;

  // Only process valid Base62 IDs (1-6 alphanumeric characters)
  if (!/^[0-9a-zA-Z]{1,6}$/.test(shortId)) {
    return new Response(null, {
      status: 302,
      headers: { Location: '/' },
    });
  }

  try {
    const result = await sql`SELECT long_url FROM urls WHERE short_id = ${shortId}`;

    if (result.length === 0) {
      // Redirect to home with error query param
      const homeUrl = new URL('/', request.url);
      homeUrl.searchParams.set('error', 'not-found');
      return new Response(null, {
        status: 302,
        headers: { Location: homeUrl.toString() },
      });
    }

    // 301 Permanent Redirect — browser caches this (no analytics tracking)
    return new Response(null, {
      status: 301,
      headers: { Location: result[0].long_url },
    });
  } catch (error) {
    console.error('Redirect error:', error);
    return new Response(null, {
      status: 302,
      headers: { Location: '/' },
    });
  }
}
