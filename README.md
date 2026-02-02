# سنڌي خبر - Sindhi News Daily

روزاني سنڌي خبرون ⹁ سياست ⹁ کيل ⹁ ثقافت ⹁ تعليم ⹁ تفريح

## Tech Stack

- Next.js 14 (App Router, TypeScript)
- Tailwind CSS
- Turso (SQLite edge database)
- Vercel deployment

## Features

- **RTL Layout** - Full right-to-left support for Sindhi script
- **Sindhi Font** - Noto Sans Arabic for proper Sindhi rendering
- **Homepage** - Hero article, latest news grid, category sections
- **Article Pages** - Full article view with date, category, author
- **Categories** - سياست (Politics), کيل (Sports), ثقافت (Culture), تعليم (Education), تفريح (Entertainment)
- **Search** - Article search functionality
- **RSS Feed** - Generate RSS for syndication
- **Admin Panel** - Simple form to add new articles

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env.local`:
```
TURSO_DATABASE_URL=your_turso_database_url
TURSO_AUTH_TOKEN=your_turso_auth_token
```

3. Set up the database:
```bash
# Run the schema.sql in your Turso database
turso db shell your-database-name < schema.sql
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
sindhi-news/
├── app/
│   ├── page.tsx (home)
│   ├── layout.tsx (RTL root layout)
│   ├── articles/[slug]/page.tsx
│   ├── categories/[category]/page.tsx
│   ├── search/page.tsx
│   ├── admin/page.tsx (add article)
│   ├── not-found.tsx
│   └── api/
│       ├── articles/route.ts
│       └── rss/route.ts
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ArticleCard.tsx
│   ├── ArticleList.tsx
│   └── SearchBox.tsx
├── lib/
│   ├── db.ts (Turso client)
│   └── utils.ts
├── types/
│   └── article.ts
└── schema.sql
```

## Deployment

Deploy to Vercel:
```bash
vercel
```

Make sure to add environment variables in Vercel dashboard.

## License

MIT
