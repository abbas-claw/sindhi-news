import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-16 flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-primary mb-4">۴۰۴</h1>
          <h2 className="text-2xl font-semibold mb-4">صفحو نہ مليو</h2>
          <p className="text-muted-foreground mb-8">
            معاف ڪجو⹁ توهان ڳوليندڙ صفحو موجود نہ آهي.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            گهر وڃو
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
