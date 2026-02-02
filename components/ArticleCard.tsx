import Link from "next/link";
import Image from "next/image";
import { Article } from "@/types/article";
import { formatDate } from "@/lib/utils";

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  if (featured) {
    return (
      <article className="group relative overflow-hidden rounded-xl bg-card border">
        {article.image_url && (
          <div className="relative h-64 md:h-96">
            <Image
              src={article.image_url}
              alt={article.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="inline-block px-3 py-1 mb-3 text-xs font-medium bg-primary text-primary-foreground rounded-full">
            {article.category}
          </span>
          
          <Link href={`/articles/${article.slug}`}>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 hover:underline">
              {article.title}
            </h2>
          </Link>
          
          <p className="text-white/80 mb-3 line-clamp-2">
            {article.excerpt || article.content.substring(0, 150)}...
          </p>
          
          <div className="flex items-center gap-4 text-sm text-white/70">
            {article.author && <span>{article.author}</span>}
            <span>{formatDate(article.published_at)}</span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group bg-card border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
      {article.image_url && (
        <Link href={`/articles/${article.slug}`} className="block relative h-48">
          <Image
            src={article.image_url}
            alt={article.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </Link>
      )}
      
      <div className="p-4">
        <span className="inline-block px-2 py-1 mb-2 text-xs font-medium bg-muted text-muted-foreground rounded">
          {article.category}
        </span>
        
        <Link href={`/articles/${article.slug}`}>
          <h3 className="text-lg font-semibold mb-2 hover:text-primary transition-colors line-clamp-2">
            {article.title}
          </h3>
        </Link>
        
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {article.excerpt || article.content.substring(0, 100)}...
        </p>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          {article.author && <span>{article.author}</span>}
          <span>{formatDate(article.published_at)}</span>
        </div>
      </div>
    </article>
  );
}
