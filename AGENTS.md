# AGENTS.md - Sindhi News Daily

A Next.js Sindhi language news website deployed on Vercel.

## Project Overview

- **Stack:** Next.js 16, TypeScript, Tailwind CSS, SQLite (@libsql/client)
- **Language:** Sindhi (RTL layout)
- **Live:** https://sindhi-news.vercel.app
- **GitHub:** https://github.com/abbas-claw/sindhi-news

## Dev Environment

```bash
# Install dependencies
npm install

# Start dev server (use this, not build!)
npm run dev

# Build locally before pushing (catches errors early)
npm run build

# Check database
node scripts/check-db.mjs
```

## Key Directories

| Path | Purpose |
|------|---------|
| `app/` | Next.js app router pages |
| `components/` | React components |
| `lib/db.ts` | Database connection |
| `data/sindhi-news.db` | SQLite database |
| `public/images/generated/` | AI-generated article images |
| `scripts/` | Utility scripts (adding articles, etc.) |

## Database Schema

```sql
articles (
  id INTEGER PRIMARY KEY,
  title TEXT,           -- Sindhi title
  content TEXT,         -- Sindhi content (300+ words)
  category TEXT,        -- سياست, ٽيڪنالاجي, ثقافت, تعليم, تفريح, رانديون
  image_url TEXT,       -- Local path or Unsplash URL
  created_at DATETIME
)
```

## Adding Articles

1. Edit `scripts/add-more-news.js` with new articles
2. Run `node scripts/add-more-news.js`
3. Verify: `node scripts/check-db.mjs`
4. Build locally: `npm run build`
5. Push: `git add -A && git commit -m "Add articles" && git push`
6. Vercel auto-deploys from main

## Sindhi Language Notes

- **RTL layout:** `dir="rtl"` on root
- **Categories:** سياست (politics), ٽيڪنالاجي (tech), ثقافت (culture), تعليم (education), تفريح (entertainment), رانديون (sports)
- **Punctuation:** Use ⹁ (reversed comma) and ⁏ (reversed semicolon)
- **Script:** Extended Arabic with implosives: ٻ ڏ ڄ ڳ ڊ

## Important Rules

1. **Build locally before pushing** - saves debugging time on Vercel
2. **Never commit API keys** - use .env.local (already in .gitignore)
3. **Articles must be 300+ words** - no short snippets
4. **Images:** Use Unsplash URLs or local `/images/generated/` paths
5. **Test RTL layout** - make sure it renders correctly

## Deployment

Vercel auto-deploys on push to main. Manual deploy:

```bash
vercel --prod --token $VERCEL_TOKEN --yes
```

## Common Issues

| Issue | Fix |
|-------|-----|
| Build fails on Vercel | Run `npm run build` locally first |
| Images not loading | Check image_url paths in database |
| RTL not working | Ensure `dir="rtl"` on HTML element |
| @libsql/client errors | Use serverless-compatible config |
