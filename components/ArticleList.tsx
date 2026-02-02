import { Article } from "@/types/article";
import { ArticleCard } from "./ArticleCard";

interface ArticleListProps {
  articles: Article[];
  title?: string;
  showFeatured?: boolean;
}

export function ArticleList({ articles, title, showFeatured = true }: ArticleListProps) {
  if (articles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">ڪي به خبرون نہ مليون</p>
      </div>
    );
  }

  const featuredArticle = showFeatured ? articles.find((a) => a.featured) : null;
  const regularArticles = showFeatured && featuredArticle
    ? articles.filter((a) => a.id !== featuredArticle.id)
    : articles;

  return (
    <div className="space-y-8">
      {title && (
        <h2 className="text-2xl font-bold border-r-4 border-primary pr-4">
          {title}
        </h2>
      )}

      {featuredArticle && (
        <div className="mb-8">
          <ArticleCard article={featuredArticle} featured />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {regularArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}
