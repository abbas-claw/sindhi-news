import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const limit = parseInt(searchParams.get("limit") || "50");

    const db = getDb();
    
    let query = "SELECT * FROM articles WHERE 1=1";
    const args: (string | number)[] = [];

    if (category) {
      query += " AND category = ?";
      args.push(category);
    }

    if (search) {
      query += " AND (title LIKE ? OR content LIKE ?)";
      const searchPattern = `%${search}%`;
      args.push(searchPattern, searchPattern);
    }

    query += " ORDER BY published_at DESC LIMIT ?";
    args.push(limit);

    const result = await db.execute({ sql: query, args });
    
    return NextResponse.json({ articles: result.rows });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, content, excerpt, category, image_url, author, featured } = body;

    if (!title || !slug || !content || !category) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const db = getDb();
    
    const result = await db.execute({
      sql: `
        INSERT INTO articles (title, slug, content, excerpt, category, image_url, author, featured)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        title,
        slug,
        content,
        excerpt || null,
        category,
        image_url || null,
        author || null,
        featured ? 1 : 0,
      ],
    });

    return NextResponse.json(
      { id: result.lastInsertRowid, message: "Article created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating article:", error);
    return NextResponse.json(
      { error: "Failed to create article" },
      { status: 500 }
    );
  }
}
