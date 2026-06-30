import { NextResponse } from 'next/server';
import sql from '@/lib/db';

export async function POST(request) {
  try {
    const body = await request.json();
    let { shortUrl } = body;

    if (!shortUrl || typeof shortUrl !== 'string') {
      return NextResponse.json({ error: 'Short URL is required' }, { status: 400 });
    }

    shortUrl = shortUrl.trim();

    // Extract the 6-char short ID from various input formats:
    // - "abc123"
    // - "https://snip.nilambarsonu.me/abc123"
    // - "snip.nilambarsonu.me/abc123"
    let shortId = shortUrl;

    try {
      const parsed = new URL(shortUrl);
      shortId = parsed.pathname.split('/').filter(Boolean).pop() || '';
    } catch {
      // Not a full URL — try splitting by slash
      const parts = shortUrl.split('/').filter(Boolean);
      shortId = parts[parts.length - 1] || shortUrl;
    }

    // Validate Base62 format
    if (!shortId || !/^[0-9a-zA-Z]{1,6}$/.test(shortId)) {
      return NextResponse.json(
        { error: 'Invalid short URL format. Expected 1-6 alphanumeric characters.' },
        { status: 400 }
      );
    }

    const result = await sql`
      SELECT long_url, short_id, created_at FROM urls WHERE short_id = ${shortId}
    `;

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Short URL not found. It may not exist or has been removed.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      longUrl: result[0].long_url,
      shortId: result[0].short_id,
      createdAt: result[0].created_at,
    });
  } catch (error) {
    console.error('Check error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}
