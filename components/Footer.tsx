import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="border-t bg-muted mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-4">سنڌي خبر</h3>
            <p className="text-muted-foreground text-sm">
              روزاني سنڌي خبرون ⹁ سياست ⹁ رانديون ⹁ ثقافت ⹁ تعليم ⹁ تفريح
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">ڊيڊ لنڪس</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                  گهر
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-muted-foreground hover:text-foreground">
                  ڳولا
                </Link>
              </li>
              <li>
                <Link href="/api/rss" className="text-muted-foreground hover:text-foreground">
                  آر ايس ايس فيڊ
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4">زمرا</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categories/سياست" className="text-muted-foreground hover:text-foreground">
                  سياست
                </Link>
              </li>
              <li>
                <Link href="/categories/رانديون" className="text-muted-foreground hover:text-foreground">
                  رانديون
                </Link>
              </li>
              <li>
                <Link href="/categories/ثقافت" className="text-muted-foreground hover:text-foreground">
                  ثقافت
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-4 text-center text-sm text-muted-foreground">
          <p>© {currentYear} سنڌي خبر. جملہ حق محفوظ آهن.</p>
        </div>
      </div>
    </footer>
  );
}
