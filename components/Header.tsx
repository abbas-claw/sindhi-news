import Link from "next/link";
import { SearchBox } from "./SearchBox";
import { CATEGORIES } from "@/types/article";

export function Header() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="text-2xl md:text-3xl font-bold text-primary">
            سنڌي خبر
          </Link>

          {/* Search */}
          <div className="w-full md:w-auto">
            <SearchBox />
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4 flex flex-wrap gap-2 md:gap-4">
          <Link
            href="/"
            className="px-3 py-1 text-sm font-medium hover:text-primary transition-colors"
          >
            گهر
          </Link>
          {CATEGORIES.map((category) => (
            <Link
              key={category}
              href={`/categories/${encodeURIComponent(category)}`}
              className="px-3 py-1 text-sm font-medium hover:text-primary transition-colors"
            >
              {category}
            </Link>
          ))}
          <Link
            href="/admin"
            className="px-3 py-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            انتظاميه
          </Link>
        </nav>
      </div>
    </header>
  );
}
