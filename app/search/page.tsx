"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArticleCard } from "@/components/ArticleCard";
import { Article } from "@/types/article";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setLoading(true);
      fetch(`/api/articles?search=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => {
          setArticles(data.articles || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error searching:", err);
          setLoading(false);
        });
    }
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold border-r-4 border-primary pr-4">
            ڳولا
          </h1>
          
          {query && (
            <p className="mt-2 text-muted-foreground">
              "{query}" لاءِ نتيجا
            </p>
          )}
        </div>

        {!query && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              مهرباني ڪري ڳولا لاءِ ڪا لفظ داخل ڪريو
            </p>
          </div>
        )}

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">ڳولي رهيا آهيون..."</p>
          </div>
        )}

        {!loading && query && articles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              ڪي به نتيجا نہ مليا. ٻيهر ڪوشش ڪريو.
            </p>
          </div>
        )}

        {!loading && articles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">لوڊنگ...</p>
          </div>
        </main>
        <Footer />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
