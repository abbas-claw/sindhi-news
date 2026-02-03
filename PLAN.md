# Sindhi News Site - Build Plan

## Status: In Progress

### Phase 1: Core Site (DONE)
- [x] Next.js setup with App Router
- [x] RTL layout with Sindhi font
- [x] Database schema (SQLite/Turso)
- [x] Homepage with hero + grid
- [x] Article pages
- [x] Category pages
- [x] Search functionality
- [x] Admin page (basic)
- [x] RSS feed

### Phase 2: Content (IN PROGRESS)
- [x] Add seed articles
- [x] Expand categories (add tech/AI)
- [ ] Daily news gathering cron
- [ ] Translation pipeline

### Phase 3: Deployment
- [x] Vercel deployment (auto-deploy from GitHub)
- [ ] Turso database setup (NEEDED for production)
- [ ] Environment variables (TURSO_DATABASE_URL, TURSO_AUTH_TOKEN)
- [ ] Custom domain (optional)

**Note:** Local SQLite works for dev. Production needs Turso cloud DB.
Site URL: https://sindhi-news.vercel.app

## Categories
| Sindhi | English | Slug |
|--------|---------|------|
| سياست | Politics | سياست |
| کيل | Sports | کيل |
| ثقافت | Culture | ثقافت |
| تعليم | Education | تعليم |
| تفريح | Entertainment | تفريح |
| ٽيڪنالاجي | Technology | ٽيڪنالاجي |

## News Sources
- Dawn (Sindh news)
- Geo News
- Express Tribune
- Kawish (Sindhi)
- Tech: TechCrunch, MIT Tech Review
- AI: Anthropic, OpenAI blogs
- Sports: ESPN Cricinfo, PCB

## Cron Schedule
- Every 6 hours: Gather news
- Daily: Generate images if needed
- Weekly: Cleanup old previews

## Article Count
**Total:** 28 articles

## Last Updated
2026-02-03 10:45 AM PKT
