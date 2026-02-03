import { createClient } from "@libsql/client";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, "..", "data", "sindhi-news.db");

const client = createClient({
  url: `file:${dbPath}`,
});

async function check() {
  try {
    // Count articles
    const count = await client.execute("SELECT COUNT(*) as total FROM articles");
    console.log(`Total articles: ${count.rows[0].total}`);
    
    // Recent articles
    const recent = await client.execute(`
      SELECT id, title, category, date(published_at) as date 
      FROM articles 
      ORDER BY published_at DESC 
      LIMIT 10
    `);
    
    console.log("\nRecent articles:");
    for (const row of recent.rows) {
      console.log(`  [${row.id}] ${row.category}: ${row.title} (${row.date})`);
    }
    
    // Category counts
    const cats = await client.execute(`
      SELECT category, COUNT(*) as count 
      FROM articles 
      GROUP BY category 
      ORDER BY count DESC
    `);
    
    console.log("\nBy category:");
    for (const row of cats.rows) {
      console.log(`  ${row.category}: ${row.count}`);
    }
    
  } catch (err) {
    console.error("Error:", err.message);
  }
}

check();
