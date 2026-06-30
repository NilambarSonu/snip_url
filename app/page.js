'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [mode, setMode] = useState('forward');
  const [inputUrl, setInputUrl] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [notification, setNotification] = useState(null);

  /* Check for redirect error on mount (e.g. ?error=not-found) */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('error') === 'not-found') {
      showNotification('Short URL not found — it may have expired or never existed.', 'error');
      /* Clean the URL bar */
      window.history.replaceState({}, '', '/');
    }
  }, []);

  /* ─── helpers ─────────────────────────────────────────── */
  function showNotification(message, type = 'success') {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  }

  async function handleSubmit() {
    if (!inputUrl.trim()) return;

    setLoading(true);
    setError('');
    setResult('');

    try {
      if (mode === 'forward') {
        const res = await fetch('/api/shorten', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ url: inputUrl.trim() }),
        });
        const data = await res.json();

        if (!res.ok || data.error) {
          setError(data.error || 'Failed to shorten URL.');
          return;
        }

        setResult(data.shortUrl);
        showNotification(
          data.deduplicated
            ? '♻️ URL already shortened — returning existing link.'
            : '✨ Short URL generated successfully!',
          'success'
        );
      } else {
        const res = await fetch('/api/check', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ shortUrl: inputUrl.trim() }),
        });
        const data = await res.json();

        if (!res.ok || data.error) {
          setError(data.error || 'Could not resolve this short URL.');
          return;
        }

        setResult(data.longUrl);
        showNotification('🔍 Original URL found!', 'success');
      }
    } catch {
      setError('Network error — please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      showNotification('📋 Copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Fallback for older browsers */
      const ta = document.createElement('textarea');
      ta.value = result;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      showNotification('📋 Copied to clipboard!', 'success');
      setTimeout(() => setCopied(false), 2000);
    }
  }

  /* ─── render ──────────────────────────────────────────── */
  return (
    <main className="main-container">
      {/* Background Mesh Gradient Glows */}
      <div className="bg-glows">
        <div className="glow-1"></div>
        <div className="glow-2"></div>
        <div className="glow-3"></div>
      </div>

      {/* Notification Toast */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="content-wrapper">
        {/* ── Hero Section (Left Side) ──────────────────── */}
        <section className="hero">
          <div className="hero-title">
            <h1 className="designing-text">
              Designing
              <Image
                src="/assets/logo.png"
                alt="Logo"
                width={55}
                height={55}
                className="logo-icon"
                priority
              />
            </h1>
            <h2 className="tinyurl-text">TinyURL</h2>
            <h3 className="at-scale-text">at Scale</h3>
          </div>
          <p className="hero-description">
            Explore a production-inspired URL shortener featuring Base62
            encoding, Redis caching, database sharding, analytics, and
            high-speed redirects.
          </p>
        </section>

        {/* ── Form Card (Right Side) ────────────────────── */}
        <section className="form-card">
          <div className="tab-switcher">
            <button
              className={`tab-btn ${mode === 'forward' ? 'active' : ''}`}
              onClick={() => {
                setMode('forward');
                setResult('');
                setError('');
                setInputUrl('');
              }}
            >
              Forward
            </button>
            <button
              className={`tab-btn ${mode === 'reverse' ? 'active' : ''}`}
              onClick={() => {
                setMode('reverse');
                setResult('');
                setError('');
                setInputUrl('');
              }}
            >
              Reverse
            </button>
          </div>

          <div className="tab-divider"></div>

          <input
            type="text"
            className="url-input"
            placeholder={
              mode === 'forward'
                ? 'Enter Your Long Url'
                : 'Enter Your Tiny Url'
            }
            value={inputUrl}
            onChange={(e) => {
              setInputUrl(e.target.value);
              setError('');
            }}
            onKeyDown={(e) =>
              e.key === 'Enter' && !loading && handleSubmit()
            }
          />

          <button
            className="action-btn"
            onClick={handleSubmit}
            disabled={loading || !inputUrl.trim()}
          >
            {loading ? (
              <>
                <span className="spinner"></span> Processing...
              </>
            ) : (
              <>
                <span className="lightning">⚡</span>{' '}
                {mode === 'forward' ? 'Generate URL' : 'Check URL'}{' '}
                <span className="arrow">›</span>
              </>
            )}
          </button>

          {error && <p className="error-text">{error}</p>}

          <div className="result-box">
            <input
              type="text"
              className="result-input"
              value={result}
              readOnly
              placeholder={
                mode === 'forward'
                  ? 'Your short URL will appear here'
                  : 'Original URL will appear here'
              }
            />
            <button
              className={`copy-btn ${copied ? 'copied' : ''}`}
              onClick={handleCopy}
              disabled={!result}
            >
              {copied ? '✓ Copied' : 'Copy'}
            </button>
          </div>
        </section>
      </div>

      {/* ── 3D Spheres Decoration ─────────────────────── */}
      <div className="spheres-container">
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <Image
            key={i}
            src="/assets/sphere.png"
            alt=""
            width={150}
            height={150}
            className={`sphere sphere-${i}`}
          />
        ))}
      </div>

      {/* ── Footer ────────────────────────────────────── */}
      <footer className="footer">
        <a href="/terms" className="footer-link">
          Terms &amp; Condition
        </a>
        <a href="/how-it-works" className="footer-link">
          How It works
        </a>
        <a href="/privacy" className="footer-link">
          Privacy Policy
        </a>
      </footer>
    </main>
  );
}
