#!/usr/bin/env node
/**
 * Set AI-generated image URLs for all articles using Pollinations.ai
 * Images are generated on-demand when the URL is accessed
 */

import { createClient } from "@libsql/client";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, "..", "data", "sindhi-news.db");
const client = createClient({ url: `file:${dbPath}` });

// Custom image prompts for each article based on content
const articleImagePrompts = {
  1: "Pakistani parliament building Sindh assembly protest political rally crowd, photojournalism style",
  2: "Islamic mosque night sky stars Shab-e-Barat celebration Pakistan, spiritual atmosphere",
  3: "Kashmir valley mountains beautiful landscape Pakistan solidarity day, scenic view",
  4: "Pakistan cricket team T20 World Cup stadium players green jersey, sports photography",
  5: "SpaceX rocket launch Elon Musk xAI technology futuristic space, dramatic lighting",
  6: "Artificial intelligence neural network 2026 future technology digital brain, sci-fi style",
  7: "Pakistan startup office coworking space technology entrepreneurs laptops, modern workspace",
  8: "Sindhi music traditional instruments sufi performance cultural heritage, artistic photography",
  9: "Balochistan mountains Pakistan military security forces patrol, documentary style",
  10: "Karachi mobile market fire emergency firefighters rescue, news photography",
  11: "Karachi city skyline winter weather clouds urban Pakistan, cityscape",
  12: "Pakistan AI technology digital transformation Indus AI Week conference, tech event",
  13: "Lahore Basant festival colorful kites celebration Punjab culture, festive atmosphere",
  14: "Oracle cloud data center servers technology infrastructure AI, futuristic",
  15: "Kazakhstan Pakistan diplomatic meeting leaders handshake flags, international relations",
};

function getPollinationsUrl(prompt, seed = null) {
  const encodedPrompt = encodeURIComponent(prompt);
  const seedParam = seed ? `&seed=${seed}` : "";
  return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1200&height=675&nologo=true${seedParam}`;
}

async function updateArticleImages() {
  console.log("🎨 Setting AI image URLs for articles...\n");
  
  const result = await client.execute("SELECT id, title FROM articles ORDER BY id");
  
  for (const article of result.rows) {
    const { id, title } = article;
    const prompt = articleImagePrompts[id] || "news media journalism Pakistan, professional";
    const imageUrl = getPollinationsUrl(prompt, id * 1000); // Use seed for consistency
    
    await client.execute({
      sql: "UPDATE articles SET image_url = ? WHERE id = ?",
      args: [imageUrl, id],
    });
    
    console.log(`[${id}] ${title.substring(0, 50)}...`);
    console.log(`    ✅ Set: ${prompt.substring(0, 60)}...\n`);
  }
  
  console.log("✅ All article images updated!");
  console.log("Images will be generated on-demand when the page loads.\n");
  
  // Show sample URL
  console.log("Sample image URL:");
  console.log(getPollinationsUrl(articleImagePrompts[1], 1000));
}

updateArticleImages().catch(console.error);
