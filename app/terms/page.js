'use client';

import { useRouter } from 'next/navigation';

export default function TermsPage() {
  const router = useRouter();

  return (
    <div className="page-container">
      <div className="page-card">
        <a href="/" className="page-back" onClick={(e) => { e.preventDefault(); router.push('/'); }}>
          <span className="page-back-arrow">←</span> Back to Home
        </a>

        <h1 className="page-title">Terms &amp; Conditions</h1>
        <p className="page-updated">Last updated: June 30, 2026</p>

        <div className="page-section">
          <h2 className="page-section-title">1. Acceptance of Terms</h2>
          <p className="page-text">
            By accessing or using the TinyURL at Scale service (&ldquo;Service&rdquo;) hosted
            at snip.nilambarsonu.me, you agree to be bound by these Terms &amp;
            Conditions. If you do not agree with any part of these terms, you
            must not use our Service.
          </p>
        </div>

        <div className="page-divider"></div>

        <div className="page-section">
          <h2 className="page-section-title">2. Service Description</h2>
          <p className="page-text">
            TinyURL at Scale is a URL shortening service that converts long
            URLs into compact, shareable short links. The Service provides:
          </p>
          <ul className="page-list">
            <li>URL shortening via Base62 encoded identifiers</li>
            <li>URL deduplication using SHA-256 hashing</li>
            <li>High-speed 301 redirects from short links to original URLs</li>
            <li>Reverse lookup to retrieve original URLs from short links</li>
          </ul>
        </div>

        <div className="page-divider"></div>

        <div className="page-section">
          <h2 className="page-section-title">3. User Responsibilities</h2>
          <p className="page-text">When using our Service, you agree to:</p>
          <ul className="page-list">
            <li>Provide only valid, publicly accessible URLs for shortening</li>
            <li>Not use the Service for any unlawful purpose</li>
            <li>Not attempt to circumvent rate limits or abuse the API</li>
            <li>Not use automated systems to overload the Service</li>
            <li>Accept responsibility for all URLs you shorten</li>
          </ul>
        </div>

        <div className="page-divider"></div>

        <div className="page-section">
          <h2 className="page-section-title">4. Prohibited Uses</h2>
          <p className="page-text">
            You may not use the Service to shorten URLs that link to:
          </p>
          <ul className="page-list">
            <li>Malware, phishing, or deceptive content</li>
            <li>Illegal content under applicable law</li>
            <li>Spam or unsolicited bulk communications</li>
            <li>Content that infringes on intellectual property rights</li>
            <li>Content promoting violence, hatred, or discrimination</li>
          </ul>
          <p className="page-text">
            We reserve the right to disable any short URL that violates these
            terms without prior notice.
          </p>
        </div>

        <div className="page-divider"></div>

        <div className="page-section">
          <h2 className="page-section-title">5. Intellectual Property</h2>
          <p className="page-text">
            The Service, including its design, architecture, source code, and
            branding, is the intellectual property of Nilambar Sonu. The system
            design, including Base62 encoding, SHA-256 deduplication, and rate
            limiting implementations, is shared for educational purposes as
            part of a portfolio project.
          </p>
        </div>

        <div className="page-divider"></div>

        <div className="page-section">
          <h2 className="page-section-title">6. Limitation of Liability</h2>
          <p className="page-text">
            The Service is provided &ldquo;as is&rdquo; without warranty of any kind. We
            do not guarantee:
          </p>
          <ul className="page-list">
            <li>Uninterrupted or error-free operation</li>
            <li>Permanent availability of shortened URLs</li>
            <li>Protection against all forms of abuse or misuse</li>
          </ul>
          <p className="page-text">
            In no event shall the Service be liable for any indirect,
            incidental, or consequential damages arising from the use or
            inability to use the Service.
          </p>
        </div>

        <div className="page-divider"></div>

        <div className="page-section">
          <h2 className="page-section-title">7. Changes to Terms</h2>
          <p className="page-text">
            We reserve the right to modify these Terms at any time. Changes
            take effect immediately upon posting. Continued use of the Service
            after changes constitutes acceptance of the updated Terms.
          </p>
        </div>

        <div className="page-divider"></div>

        <div className="page-section">
          <h2 className="page-section-title">8. Contact</h2>
          <p className="page-text">
            For questions about these Terms, reach out via the project
            repository or contact Nilambar Sonu directly.
          </p>
        </div>
      </div>
    </div>
  );
}
