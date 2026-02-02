import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArticleList } from "@/components/ArticleList";
import { getDb } from "@/lib/db";
import { Article, CATEGORIES } from "@/types/article";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
}

async function getArticlesByCategory(category: string): Promise<Article[]> {
  try {
    const db = getDb();
    const result = await db.execute({
      sql: "SELECT * FROM articles WHERE category = ? ORDER BY published_at DESC",
      args: [category],
    });
    return result.rows as unknown as Article[];
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  
  return {
    title: `${decodeURIComponent(category)} - سنڌي خبر`,
    description: `${decodeURIComponent(category)} جون تازه ترين خبرون`,
  };
}

export function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    category: encodeURIComponent(category),
  }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;
  const decodedCategory = decodeURIComponent(category);
  
  if (!CATEGORIES.includes(decodedCategory as any)) {
    notFound();
  }

  const articles = await getArticlesByCategory(decodedCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold border-r-4 border-primary pr-4">
            {decodedCategory}
          </h1>
          <p className="mt-2 text-muted-foreground">
            {decodedCategory} جون تازه ترين خبرون
          </p>
        </div>

        <ArticleList 
          articles={articles} 
          showFeatured={false}
        />
      </main>

      <Footer />
    </div>
  );
}
