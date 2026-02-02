import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET() {
  try {
    const db = getDb();
    const result = await db.execute({
      sql: "SELECT * FROM articles ORDER BY published_at DESC LIMIT 20",
      args: [],
    });

    const articles = result.rows;
    
    const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>سنڌي خبر - Sindhi News Daily</title>
    <link>https://sindhi-news.vercel.app</link>
    <description>روزاني سنڌي خبرون ⹁ سياست ⹁ کيل ⹁ ثقافت ⹁ تعليم ⹁ تفريح</description>
    <language>sd</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://sindhi-news.vercel.app/api/rss" rel="self" type="application/rss+xml" />
    ${articles.map((article: any) => `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>https://sindhi-news.vercel.app/articles/${article.slug}</link>
      <guid>https://sindhi-news.vercel.app/articles/${article.slug}</guid>
      <pubDate>${new Date(article.published_at).toUTCString()}</pubDate>
      <category>${article.category}</category>
      <author>${article.author || "سنڌي خبر"}</author>
      <description><![CDATA[${article.excerpt || article.content.substring(0, 200)}...]]></description>
      <content:encoded><![CDATA[${article.content}]]></content:encoded>
    </item>
    `).join("")}
  </channel>
</rss>`;

    return new NextResponse(rssXml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Error generating RSS:", error);
    return NextResponse.json(
      { error: "Failed to generate RSS feed" },
      { status: 500 }
    );
  }
}
