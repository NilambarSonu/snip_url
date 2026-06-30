-- TinyURL at Scale — Database Schema
-- Run this against your Neon PostgreSQL database

CREATE TABLE IF NOT EXISTS urls (
    id          BIGSERIAL PRIMARY KEY,              -- auto-increment sequential ID (used for Base62 encoding)
    short_id    VARCHAR(6) UNIQUE NOT NULL,          -- Base62 encoded short identifier
    long_url    TEXT NOT NULL,                        -- original long URL
    url_hash    VARCHAR(64) NOT NULL,                -- SHA256 hash of long_url (for deduplication)
    created_at  TIMESTAMPTZ DEFAULT NOW()             -- timestamp of creation
);

-- Reverse index for deduplication: hash(longURL) → shortID
CREATE UNIQUE INDEX IF NOT EXISTS idx_url_hash ON urls(url_hash);
