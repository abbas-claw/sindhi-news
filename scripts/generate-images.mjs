#!/usr/bin/env node
/**
 * Generate AI images for articles using Pollinations.ai (free, no API key)
 * Then update the database with the new image URLs
 */

import { createClient } from "@libsql/client";
import path from "path";
import { fileURLToPath } from "url";
import https from "https";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, "..", "data", "sindhi-news.db");
const publicDir = path.join(__dirname, "..", "public", "images");

// Ensure public/images directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const client = createClient({ url: `file:${dbPath}` });

// Map Sindhi categories to English for image prompts
const categoryTranslations = {
  "سياست": "politics government parliament",
  "ٽيڪنالاجي": "technology AI computers digital",
  "ثقافت": "culture festival celebration traditional",
  "تعليم": "education school university students",
  "تفريح": "entertainment music cinema art",
  "کيل": "sports cricket stadium athletes",
};

// Generate an image prompt from article title and category
function createImagePrompt(title, category) {
  // Extract key English words/concepts from the title
  const titleLower = title.toLowerCase();
  
  // Map common terms to visual concepts
  const visualMappings = {
    "بلوچستان": "Balochistan mountains Pakistan landscape security forces",
    "ڪراچي": "Karachi city skyline urban Pakistan",
    "لاهور": "Lahore historical architecture Pakistan",
    "پاڪستان": "Pakistan flag national identity",
    "اي آءِ": "artificial intelligence futuristic technology hologram",
    "ٽيڪنالاجي": "technology digital innovation computers",
    "موسيقي": "music concert instruments performers",
    "ڪرڪيٽ": "cricket match stadium players",
    "oracle": "Oracle cloud computing data center servers",
    "spacex": "SpaceX rocket space technology Elon Musk",
    "آتشزدگي": "fire emergency rescue firefighters",
    "بسنت": "Basant festival kites colorful celebration Punjab",
    "تعليم": "education classroom students books",
    "ڪشمير": "Kashmir mountains scenic beauty",
    "قزاقستان": "Kazakhstan Central Asia diplomacy meeting",
    "اسٽارٽ اپ": "startup technology office modern workspace",
  };
  
  let prompt = categoryTranslations[category] || "news journalism";
  
  // Add visual elements based on title content
  for (const [key, visual] of Object.entries(visualMappings)) {
    if (title.includes(key)) {
      prompt = visual + " " + prompt;
      break;
    }
  }
  
  // Style additions for news imagery
  prompt += ", professional photography, high quality, news media style, 16:9 aspect ratio";
  
  return prompt;
}

// Generate Pollinations URL for an image
function getPollinationsUrl(prompt, width = 1200, height = 675) {
  const encodedPrompt = encodeURIComponent(prompt);
  return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&nologo=true`;
}

// Download image from URL
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      // Handle redirects
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadImage(response.headers.location, filepath)
          .then(resolve)
          .catch(reject);
        return;
      }
      
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }
      
      response.pipe(file);
      file.on("finish", () => {
        file.close();
        resolve(filepath);
      });
    }).on("error", (err) => {
      fs.unlink(filepath, () => {}); // Delete partial file
      reject(err);
    });
  });
}

async function generateImagesForArticles() {
  console.log("🎨 Generating AI images for articles...\n");
  
  // Get all articles
  const result = await client.execute(`
    SELECT id, title, category, slug 
    FROM articles 
    ORDER BY id
  `);
  
  const articles = result.rows;
  console.log(`Found ${articles.length} articles\n`);
  
  for (const article of articles) {
    const { id, title, category, slug } = article;
    
    // Create image prompt
    const prompt = createImagePrompt(title, category);
    const imageUrl = getPollinationsUrl(prompt);
    
    // Create a safe filename
    const safeSlug = slug.replace(/[^a-z0-9-]/g, "").substring(0, 30) || `article-${id}`;
    const filename = `${safeSlug}-${id}.jpg`;
    const filepath = path.join(publicDir, filename);
    const publicUrl = `/images/${filename}`;
    
    console.log(`[${id}] ${title.substring(0, 40)}...`);
    console.log(`    Prompt: ${prompt.substring(0, 60)}...`);
    
    try {
      // Download the image
      console.log(`    Downloading...`);
      await downloadImage(imageUrl, filepath);
      
      // Update database with local image path
      await client.execute({
        sql: `UPDATE articles SET image_url = ? WHERE id = ?`,
        args: [publicUrl, id],
      });
      
      console.log(`    ✅ Saved: ${publicUrl}\n`);
    } catch (error) {
      console.log(`    ⚠️  Failed: ${error.message}`);
      console.log(`    Using Pollinations URL directly...\n`);
      
      // Fall back to using Pollinations URL directly
      await client.execute({
        sql: `UPDATE articles SET image_url = ? WHERE id = ?`,
        args: [imageUrl, id],
      });
    }
    
    // Small delay to be nice to the API
    await new Promise(resolve => setTimeout(resolve, 2000));
  }
  
  console.log("\n✅ Image generation complete!");
  console.log(`Images saved to: ${publicDir}`);
}

generateImagesForArticles().catch(console.error);
