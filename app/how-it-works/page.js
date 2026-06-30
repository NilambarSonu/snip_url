'use client';

import { useRouter } from 'next/navigation';

export default function HowItWorksPage() {
  const router = useRouter();

  return (
    <div className="page-container">
      <div className="page-card">
        <a href="/" className="page-back" onClick={(e) => { e.preventDefault(); router.push('/'); }}>
          <span className="page-back-arrow">←</span> Back to Home
        </a>

        <h1 className="page-title">How It Works</h1>
        <p className="page-text" style={{ marginBottom: '32px' }}>
          A deep dive into the architecture behind TinyURL at Scale — from URL
          encoding to high-speed redirects.
        </p>

        {/* ── URL Shortening Process ─────────────────────── */}
        <div className="page-section">
          <h2 className="page-section-title">URL Shortening Process</h2>
          <p className="page-text">
            When you submit a long URL, it goes through a carefully designed
            pipeline to produce a short, unique identifier:
          </p>

          <div className="page-step">
            <div className="page-step-number">1</div>
            <div className="page-step-content">
              <div className="page-step-title">URL Validation</div>
              <p className="page-step-text">
                The input URL is validated for proper format (must include a
                valid protocol like http:// or https://) and checked against
                disallowed patterns.
              </p>
            </div>
          </div>

          <div className="page-step">
            <div className="page-step-number">2</div>
            <div className="page-step-content">
              <div className="page-step-title">SHA-256 Deduplication Check</div>
              <p className="page-step-text">
                A SHA-256 hash of the normalized URL is computed and looked up
                in the database. If this exact URL has been shortened before,
                we return the existing short link instead of creating a
                duplicate — saving storage and keeping IDs compact.
              </p>
            </div>
          </div>

          <div className="page-step">
            <div className="page-step-number">3</div>
            <div className="page-step-content">
              <div className="page-step-title">Sequential ID Assignment</div>
              <p className="page-step-text">
                If the URL is new, a sequential integer ID is assigned by the
                database via an auto-incrementing primary key. This sequential
                ID is the foundation for our short code.
              </p>
            </div>
          </div>

          <div className="page-step">
            <div className="page-step-number">4</div>
            <div className="page-step-content">
              <div className="page-step-title">Base62 Encoding</div>
              <p className="page-step-text">
                The integer ID is encoded into a Base62 string using the
                character set{' '}
                <code style={{ color: '#c4b5fd' }}>
                  0-9, a-z, A-Z
                </code>
                . For example, ID 1000 becomes &ldquo;g8&rdquo; — just 2
                characters. Base62 can represent over 56 billion unique URLs in
                just 6 characters.
              </p>
            </div>
          </div>

          <div className="page-step">
            <div className="page-step-number">5</div>
            <div className="page-step-content">
              <div className="page-step-title">Short URL Returned</div>
              <p className="page-step-text">
                The final short URL (e.g.{' '}
                <code style={{ color: '#fbbf24' }}>
                  snip.nilambarsonu.me/g8
                </code>
                ) is returned to the user and stored alongside the original
                URL, its hash, and metadata.
              </p>
            </div>
          </div>
        </div>

        <div className="page-divider"></div>

        {/* ── Deduplication ───────────────────────────────── */}
        <div className="page-section">
          <h2 className="page-section-title">Deduplication via SHA-256</h2>
          <p className="page-text">
            Before creating a new short URL, we compute a SHA-256 hash of the
            long URL and query a unique index on the hash column. This gives us
            O(1) deduplication lookups, ensures idempotent URL creation, and
            prevents the ID space from growing unnecessarily.
          </p>
          <div className="page-highlight">
            <div className="page-highlight-title">Why not hash the URL directly as the short code?</div>
            <p className="page-highlight-text">
              Hash-based short codes (e.g. first N characters of SHA-256) can
              produce collisions and aren&apos;t as compact as sequential Base62
              IDs. By decoupling the dedup hash from the short code, we get the
              best of both worlds: collision-free short codes and efficient
              duplicate detection.
            </p>
          </div>
        </div>

        <div className="page-divider"></div>

        {/* ── Rate Limiting ───────────────────────────────── */}
        <div className="page-section">
          <h2 className="page-section-title">Rate Limiting</h2>
          <p className="page-text">
            To prevent abuse, the API enforces rate limits on the shortening
            endpoint. Each client IP is tracked and allowed a fixed number of
            requests per time window. Exceeding the limit returns a 429 Too
            Many Requests response with a Retry-After header.
          </p>
          <ul className="page-list">
            <li>IP-based sliding window rate limiting</li>
            <li>Configurable limits (e.g. 10 requests per minute)</li>
            <li>Graceful error responses with retry guidance</li>
          </ul>
        </div>

        <div className="page-divider"></div>

        {/* ── 301 Redirects ───────────────────────────────── */}
        <div className="page-section">
          <h2 className="page-section-title">High-Speed 301 Redirects</h2>
          <p className="page-text">
            When a user visits a short URL, the server decodes the Base62 slug
            back to the integer ID, looks up the original URL in the database,
            and issues an HTTP 301 (Moved Permanently) redirect. The 301 status
            code allows browsers and CDNs to cache the redirect, reducing
            subsequent latency to near-zero.
          </p>
          <div className="page-highlight">
            <div className="page-highlight-title">Why 301 and not 302?</div>
            <p className="page-highlight-text">
              A 301 redirect is permanent and cacheable. Browsers remember it,
              so repeat visitors skip our server entirely. For a URL shortener
              where mappings never change, 301 is the correct choice for
              performance.
            </p>
          </div>
        </div>

        <div className="page-divider"></div>

        {/* ── Tech Stack ──────────────────────────────────── */}
        <div className="page-section">
          <h2 className="page-section-title">The Tech Stack</h2>
          <ul className="page-list">
            <li><strong style={{ color: '#ffffff' }}>Next.js 14+</strong> — Full-stack React framework with API routes and edge runtime</li>
            <li><strong style={{ color: '#ffffff' }}>Neon PostgreSQL</strong> — Serverless Postgres with branching and auto-scaling</li>
            <li><strong style={{ color: '#ffffff' }}>Base62 Encoding</strong> — Custom implementation for compact, URL-safe short codes</li>
            <li><strong style={{ color: '#ffffff' }}>SHA-256 Hashing</strong> — Cryptographic hashing for URL deduplication</li>
            <li><strong style={{ color: '#ffffff' }}>Vercel</strong> — Edge-first deployment with global CDN distribution</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
