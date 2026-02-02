import { createClient, Client } from "@libsql/client";
import path from "path";

const TURSO_DATABASE_URL = process.env.TURSO_DATABASE_URL;
const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN;

let client: Client | null = null;

export function getDbClient(): Client {
  if (!client) {
    // Use Turso if configured, otherwise use local SQLite
    if (TURSO_DATABASE_URL) {
      client = createClient({
        url: TURSO_DATABASE_URL,
        authToken: TURSO_AUTH_TOKEN,
      });
    } else {
      // Local SQLite file
      const dbPath = path.join(process.cwd(), "data", "sindhi-news.db");
      client = createClient({
        url: `file:${dbPath}`,
      });
    }
  }
  return client;
}

export function getDb(): Client {
  return getDbClient();
}

// Initialize database with schema
export async function initDb() {
  const db = getDb();
  
  await db.execute(`
    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      content TEXT NOT NULL,
      excerpt TEXT,
      category TEXT NOT NULL,
      image_url TEXT,
      published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      author TEXT,
      featured BOOLEAN DEFAULT FALSE,
      source TEXT,
      source_url TEXT
    )
  `);
  
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_category ON articles(category)`);
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_published ON articles(published_at)`);
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_slug ON articles(slug)`);
  await db.execute(`CREATE INDEX IF NOT EXISTS idx_featured ON articles(featured)`);
  
  return db;
}
