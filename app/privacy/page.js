'use client';

import { useRouter } from 'next/navigation';

export default function PrivacyPage() {
  const router = useRouter();

  return (
    <div className="page-container">
      <div className="page-card">
        <a href="/" className="page-back" onClick={(e) => { e.preventDefault(); router.push('/'); }}>
          <span className="page-back-arrow">←</span> Back to Home
        </a>

        <h1 className="page-title">Privacy Policy</h1>
        <p className="page-updated">Last updated: June 30, 2026</p>

        <div className="page-section">
          <h2 className="page-section-title">1. Information We Collect</h2>
          <p className="page-text">
            TinyURL at Scale collects minimal data necessary to operate the
            Service. We may collect:
          </p>
          <ul className="page-list">
            <li><strong style={{ color: '#ffffff' }}>URLs you submit</strong> — The long URLs you shorten are stored to enable redirection</li>
            <li><strong style={{ color: '#ffffff' }}>IP addresses</strong> — Used solely for rate limiting to prevent API abuse</li>
            <li><strong style={{ color: '#ffffff' }}>Timestamps</strong> — When short URLs are created, for record-keeping</li>
            <li><strong style={{ color: '#ffffff' }}>URL hashes</strong> — SHA-256 hashes of URLs for deduplication purposes</li>
          </ul>
          <p className="page-text">
            We do not collect personal information such as names, email
            addresses, or payment details. No account registration is required
            to use the Service.
          </p>
        </div>

        <div className="page-divider"></div>

        <div className="page-section">
          <h2 className="page-section-title">2. How We Use Information</h2>
          <p className="page-text">The information we collect is used to:</p>
          <ul className="page-list">
            <li>Redirect short URLs to their original destinations</li>
            <li>Prevent duplicate entries through URL deduplication</li>
            <li>Enforce rate limits and protect against abuse</li>
            <li>Maintain the operational integrity of the Service</li>
          </ul>
          <p className="page-text">
            We do not sell, trade, or share your data with third parties for
            marketing or advertising purposes.
          </p>
        </div>

        <div className="page-divider"></div>

        <div className="page-section">
          <h2 className="page-section-title">3. Data Storage</h2>
          <p className="page-text">
            All data is stored securely in Neon PostgreSQL, a serverless
            database provider. Data is encrypted in transit via TLS/SSL and at
            rest through the database provider&apos;s encryption mechanisms. The
            database is hosted in secure cloud infrastructure with restricted
            access controls.
          </p>
        </div>

        <div className="page-divider"></div>

        <div className="page-section">
          <h2 className="page-section-title">4. Third-Party Services</h2>
          <p className="page-text">
            The Service relies on the following third-party providers:
          </p>
          <ul className="page-list">
            <li><strong style={{ color: '#ffffff' }}>Vercel</strong> — Hosting and edge network for the application</li>
            <li><strong style={{ color: '#ffffff' }}>Neon</strong> — Serverless PostgreSQL database provider</li>
            <li><strong style={{ color: '#ffffff' }}>Google Fonts</strong> — Typography delivery (no tracking cookies)</li>
          </ul>
          <p className="page-text">
            Each provider has its own privacy policy. We recommend reviewing
            their policies for complete information.
          </p>
        </div>

        <div className="page-divider"></div>

        <div className="page-section">
          <h2 className="page-section-title">5. Data Retention</h2>
          <p className="page-text">
            Shortened URLs and their associated metadata are retained
            indefinitely to ensure short links continue to work. IP addresses
            used for rate limiting are stored temporarily and automatically
            expire within a short window (typically minutes to hours).
          </p>
          <p className="page-text">
            If you wish to have a specific URL mapping removed, please contact
            us with the short URL in question.
          </p>
        </div>

        <div className="page-divider"></div>

        <div className="page-section">
          <h2 className="page-section-title">6. Your Rights</h2>
          <p className="page-text">You have the right to:</p>
          <ul className="page-list">
            <li>Request information about data we hold related to your usage</li>
            <li>Request deletion of specific URL mappings you created</li>
            <li>Opt out of using the Service at any time</li>
          </ul>
          <p className="page-text">
            Since we do not require accounts or collect personal identifiers,
            data requests should include the specific short URLs in question
            for identification.
          </p>
        </div>

        <div className="page-divider"></div>

        <div className="page-section">
          <h2 className="page-section-title">7. Changes to Privacy Policy</h2>
          <p className="page-text">
            We may update this Privacy Policy periodically. Changes take effect
            immediately upon posting. The &ldquo;Last updated&rdquo; date at the top of
            this page reflects the most recent revision. Continued use of the
            Service after changes constitutes acceptance.
          </p>
        </div>

        <div className="page-divider"></div>

        <div className="page-section">
          <h2 className="page-section-title">8. Contact</h2>
          <p className="page-text">
            For privacy-related questions or data requests, please reach out
            via the project repository or contact Nilambar Sonu directly.
          </p>
        </div>
      </div>
    </div>
  );
}
