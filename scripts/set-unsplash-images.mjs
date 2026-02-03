#!/usr/bin/env node
/**
 * Set high-quality Unsplash images for each article
 * These are curated to match article content
 */

import { createClient } from "@libsql/client";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, "..", "data", "sindhi-news.db");
const client = createClient({ url: `file:${dbPath}` });

// Curated Unsplash images for each article
const articleImages = {
  // 1: JI sit-in protest
  1: "https://images.unsplash.com/photo-1591848478625-de43268e6fb8?w=1200&h=675&fit=crop", // protest/rally
  
  // 2: Shab-e-Barat school holiday
  2: "https://images.unsplash.com/photo-1564769625905-50e93615e769?w=1200&h=675&fit=crop", // mosque night
  
  // 3: Kashmir Day
  3: "https://images.unsplash.com/photo-1566837945700-30057527ade0?w=1200&h=675&fit=crop", // mountains Kashmir
  
  // 4: Pakistan cricket T20
  4: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200&h=675&fit=crop", // cricket
  
  // 5: SpaceX xAI merger
  5: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=1200&h=675&fit=crop", // rocket space
  
  // 6: AI trends 2026
  6: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=675&fit=crop", // AI brain
  
  // 7: Pakistan startups funding
  7: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=675&fit=crop", // startup office
  
  // 8: Sindhi music album
  8: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=1200&h=675&fit=crop", // music concert
  
  // 9: Balochistan security
  9: "https://images.unsplash.com/photo-1580130379624-3a069adbffc5?w=1200&h=675&fit=crop", // military/security
  
  // 10: Karachi fire tragedy
  10: "https://images.unsplash.com/photo-1486551937199-baf066858de7?w=1200&h=675&fit=crop", // fire/emergency
  
  // 11: Karachi weather
  11: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&h=675&fit=crop", // city skyline
  
  // 12: Indus AI Week
  12: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=675&fit=crop", // AI robot
  
  // 13: Basant festival Lahore
  13: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&h=675&fit=crop", // festival celebration
  
  // 14: Oracle cloud infrastructure
  14: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=675&fit=crop", // data center
  
  // 15: Kazakhstan Pakistan visit
  15: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&h=675&fit=crop", // diplomacy/meeting
};

async function updateImages() {
  console.log("🖼️  Setting curated Unsplash images for articles...\n");
  
  const result = await client.execute("SELECT id, title FROM articles ORDER BY id");
  
  for (const article of result.rows) {
    const { id, title } = article;
    const imageUrl = articleImages[id];
    
    if (imageUrl) {
      await client.execute({
        sql: "UPDATE articles SET image_url = ? WHERE id = ?",
        args: [imageUrl, id],
      });
      console.log(`[${id}] ✅ ${title.substring(0, 45)}...`);
    }
  }
  
  console.log("\n✅ All images updated with high-quality Unsplash photos!");
}

updateImages().catch(console.error);
