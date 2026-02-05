#!/usr/bin/env node
/**
 * Generate AI images for articles missing images
 */

import { createClient } from "@libsql/client";
import path from "path";
import { fileURLToPath } from "url";
import https from "https";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, "..", "data", "sindhi-news.db");
const publicDir = path.join(__dirname, "..", "public", "images", "generated");

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const client = createClient({ url: `file:${dbPath}` });

const categoryTranslations = {
  "سياست": "politics government parliament Pakistan news",
  "ٽيڪنالاجي": "technology AI computers digital innovation",
  "ثقافت": "culture festival celebration traditional Sindh Pakistan",
  "تعليم": "education school university students learning",
  "تفريح": "entertainment music cinema art performance",
  "کيل": "sports cricket stadium athletes Pakistan",
};

function createImagePrompt(title, category) {
  const titleLower = title.toLowerCase();
  const prompt = categoryTranslations[category] || "news journalism";
  return `${prompt}, professional photography, high quality, news media, 16:9 aspect ratio`;
}

function getPollinationsUrl(prompt, width = 1200, height = 675) {
  const encodedPrompt = encodeURIComponent(prompt);
  return `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&nologo=true`;
}

function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) => {
      if (response.statusCode === 301 || response.statusCode === 302) {
        downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
        return;
      }
      if (response.statusCode !== 200) {
        reject(new Error(`HTTP ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on("finish", () => { file.close(); resolve(filepath); });
    }).on("error", (err) => { fs.unlink(filepath, () => {}); reject(err); });
  });
}

async function generateMissingImages() {
  console.log("🎨 Generating missing article images...\n");

  const result = await client.execute(`
    SELECT id, title, category
    FROM articles
    ORDER BY id
  `);

  const articles = result.rows;
  let generated = 0;

  for (const article of articles) {
    const { id, title, category } = article;
    const imagePath = path.join(publicDir, `article-${id}.png`);

    if (fs.existsSync(imagePath)) {
      console.log(`[${id}] ✅ Already exists`);
      continue;
    }

    console.log(`[${id}] Generating: ${title.substring(0, 45)}...`);

    try {
      const prompt = createImagePrompt(title, category);
      const imageUrl = getPollinationsUrl(prompt);
      await downloadImage(imageUrl, imagePath);
      console.log(`     ✅ Saved: article-${id}.png`);
      generated++;
      await new Promise(r => setTimeout(r, 2000));
    } catch (error) {
      console.log(`     ⚠️  Failed: ${error.message}`);
      // Use Pollinations URL directly as fallback
      const pollUrl = getPollinationsUrl(createImagePrompt(title, category));
      await client.execute({
        sql: `UPDATE articles SET image_url = ? WHERE id = ?`,
        args: [pollUrl, id],
      });
      console.log(`     🔗 Using Pollinations URL directly`);
    }
  }

  console.log(`\n✅ Generated ${generated} new images`);
}

generateMissingImages().catch(console.error);
