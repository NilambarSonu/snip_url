import './globals.css';

export const metadata = {
  title: 'TinyURL at Scale — URL Shortener | snip.nilambarsonu.me',
  description:
    'A production-inspired URL shortener featuring Base62 encoding, SHA256 deduplication, rate limiting, and high-speed 301 redirects. Built with Next.js and Neon PostgreSQL.',
  keywords: 'url shortener, tinyurl, base62, short links, snip',
  authors: [{ name: 'Nilambar Sonu' }],
  openGraph: {
    title: 'TinyURL at Scale — URL Shortener',
    description:
      'Shorten URLs with production-grade Base62 encoding and instant 301 redirects.',
    url: 'https://snip.nilambarsonu.me',
    siteName: 'TinyURL at Scale',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
