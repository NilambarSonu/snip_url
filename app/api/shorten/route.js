import { NextResponse } from 'next/server';
import sql from '@/lib/db';
import { encode } from '@/lib/base62';
import { rateLimit } from '@/lib/rateLimit';
import { validateUrl } from '@/lib/validator';
import crypto from 'crypto';

export async function POST(request) {
  try {
    // 1. Rate limit by IP
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      request.headers.get('x-real-ip') ||
      'unknown';

    const limiter = rateLimit(ip, { windowMs: 60000, maxRequests: 10 });
    if (!limiter.allowed) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Try again in ' + limiter.resetIn + 's.' },
        { status: 429 }
      );
    }

    // 2. Parse and validate
    const body = await request.json();
    const validation = validateUrl(body.url);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    const longUrl = validation.url;

    // 3. Deduplication via SHA256 reverse index
    const urlHash = crypto.createHash('sha256').update(longUrl).digest('hex');

    const existing = await sql`SELECT short_id FROM urls WHERE url_hash = ${urlHash}`;
    if (existing.length > 0) {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://snip.nilambarsonu.me';
      return NextResponse.json({
        shortUrl: `${baseUrl}/${existing[0].short_id}`,
        shortId: existing[0].short_id,
        deduplicated: true,
      });
    }

    // 4. Get next sequential ID from the database sequence
    const seqResult = await sql`SELECT nextval('urls_id_seq') AS next_id`;
    const id = Number(seqResult[0].next_id);

    // 5. Base62 encode the sequential ID
    const shortId = encode(id);

    // 6. Insert with the pre-computed short_id (atomic, no temp values)
    await sql`
      INSERT INTO urls (id, short_id, long_url, url_hash)
      VALUES (${id}, ${shortId}, ${longUrl}, ${urlHash})
    `;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://snip.nilambarsonu.me';

    return NextResponse.json({
      shortUrl: `${baseUrl}/${shortId}`,
      shortId,
      deduplicated: false,
    });
  } catch (error) {
    console.error('Shorten error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again.' },
      { status: 500 }
    );
  }
}
