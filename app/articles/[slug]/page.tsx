import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getDb } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { Article } from "@/types/article";

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

async function getArticle(slug: string): Promise<Article | null> {
  try {
    const db = getDb();
    const result = await db.execute({
      sql: "SELECT * FROM articles WHERE slug = ?",
      args: [slug],
    });
    return result.rows[0] as unknown as Article || null;
  } catch (error) {
    console.error("Error fetching article:", error);
    return null;
  }
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  
  if (!article) {
    return {
      title: "خبر نہ ملي - سنڌي خبر",
    };
  }

  return {
    title: `${article.title} - سنڌي خبر`,
    description: article.excerpt || article.content.substring(0, 150),
    openGraph: {
      title: article.title,
      description: article.excerpt || article.content.substring(0, 150),
      type: "article",
      publishedTime: article.published_at,
      authors: article.author ? [article.author] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <article className="bg-card rounded-lg overflow-hidden">
          {/* Article Header */}
          <header className="p-6 md:p-8 border-b">
            <Link
              href={`/categories/${encodeURIComponent(article.category)}`}
              className="inline-block px-3 py-1 mb-4 text-sm font-medium bg-primary text-primary-foreground rounded-full"
            >
              {article.category}
            </Link>

            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {article.author && (
                <div className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  <span>{article.author}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
                  <line x1="16" x2="16" y1="2" y2="6"/>
                  <line x1="8" x2="8" y1="2" y2="6"/>
                  <line x1="3" x2="21" y1="10" y2="10"/>
                </svg>
                <time dateTime={article.published_at}>
                  {formatDate(article.published_at)}
                </time>
              </div>
            </div>
          </header>

          {/* Article Image */}
          {article.image_url && (
            <div className="relative h-64 md:h-96">
              <Image
                src={article.image_url}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Article Content */}
          <div className="p-6 md:p-8">
            <div className="prose prose-lg max-w-none dark:prose-invert">
              {article.content.split("\n\n").map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Article Footer */}
          <footer className="p-6 md:p-8 border-t bg-muted/50">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-primary hover:underline"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6"/>
                </svg>
                واپس گهر
              </Link>

              <div className="text-sm text-muted-foreground">
                آخري تازه ڪاري: {formatDate(article.updated_at)}
              </div>
            </div>
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  );
}
