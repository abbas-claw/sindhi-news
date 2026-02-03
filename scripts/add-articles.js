#!/usr/bin/env node
/**
 * Script to add articles to the Sindhi News database
 * Usage: node scripts/add-articles.js
 */

const { createClient } = require("@libsql/client");
const path = require("path");

const dbPath = path.join(__dirname, "..", "data", "sindhi-news.db");
const client = createClient({ url: `file:${dbPath}` });

// Helper to generate slug from title
function generateSlug(title) {
  const timestamp = Date.now();
  // Remove Sindhi/Arabic characters and create a simple slug
  const clean = title
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase()
    .substring(0, 50);
  return clean || `article-${timestamp}`;
}

// Articles to add - February 3, 2026
const articles = [
  // POLITICS - Sindh/Pakistan
  {
    title: "جماعت اسلامي جو سنڌ اسيمبلي جي ٻاهران 14 فيبروري کان دوامي ڌرڻو",
    content: `ڪراچي: جماعت اسلامي جي اميرحافظ نعيم الرحمٰن اعلان ڪيو آهي ته 14 فيبروري کان سنڌ اسيمبلي جي عمارت جي ٻاهران دوامي ڌرڻو ڏنو ويندو.

گل پلازا جي سانحي جي پس منظر ۾ ⹁ اڄ آچر جي ڏينهن "جيئڻ ڏيو ڪراچي" مارچ ۾ هزارين ڪراچي والا شامل ٿيا. عورتون ⹁ ٻار ۽ بزرگ شهري شاهراهه فيصل تي سياسي جلوس ۾ شامل ٿيا.

حافظ نعيم الرحمٰن چيو ته ڪراچي تي نه وفاق ۽ نه صوبي جو قبضو قبول ڪيو ويندو. انهن چيو ته آئين موجب شهر کي بااختيار مقامي حڪومت ڏني وڃي.

انهن سوال ڪيو ته صدر زرداري ⹁ چيئرمين بلاول ڀٽو ۽ وزيراعظم شهباز شريف ڪڏهن سانحي جي جاءِ تي نه آيا ⹁ جڏهن ته ڪراچي 42 سيڪڙو ٽيڪس ۽ 54 سيڪڙو برآمدي آمدني ڏئي ٿو.`,
    excerpt: "جماعت اسلامي جي اميرحافظ نعيم الرحمٰن اعلان ڪيو آهي ته 14 فيبروري کان سنڌ اسيمبلي جي ٻاهران دوامي ڌرڻو ڏنو ويندو...",
    category: "سياست",
    image_url: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800",
    author: "Abbas",
    featured: true,
  },
  {
    title: "شب برات تي 4 فيبروري کي سنڌ ۾ تعليمي اداري بند رهندا",
    content: `اسلام آباد: سنڌ حڪومت اعلان ڪيو آهي ته شب برات جي مناسبت سان 4 فيبروري 2026 تي صوبي ۾ تمام سرڪاري ۽ پرائيويٽ تعليمي اداري بند رهندا.

پنجاب حڪومت پڻ ساڳيو اعلان ڪيو آهي. 15 شعبان 1447 هجري جي مناسبت سان هي رخصت ڏني وئي آهي.

سنڌ پوليس شب برات تي خاص حفاظتي بندوبست ڪيو آهي. ٽريفڪ پلان پڻ جاري ڪيو ويو آهي.`,
    excerpt: "سنڌ حڪومت اعلان ڪيو آهي ته شب برات جي مناسبت سان 4 فيبروري کي تعليمي اداري بند رهندا...",
    category: "تعليم",
    image_url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
    author: "Abbas",
    featured: false,
  },
  {
    title: "5 فيبروري يوم يڪجهتي ڪشمير تي سرڪاري رخصت",
    content: `اسلام آباد: وفاقي حڪومت اعلان ڪيو آهي ته 5 فيبروري 2026 يوم يڪجهتي ڪشمير جي مناسبت سان ملڪ ڀر ۾ سرڪاري رخصت هوندي.

ڪئبنيٽ ڊويزن جي نوٽيفڪيشن موجب سڀ سرڪاري ۽ پرائيويٽ دفتر بند رهندا. صبح 10 وڳي هڪ منٽ جي خاموشي اختيار ڪئي ويندي.

يوم يڪجهتي ڪشمير هر سال ڪشمير جي عوام سان اظهار يڪجهتي لاءِ ملهايو وڃي ٿو.`,
    excerpt: "وفاقي حڪومت اعلان ڪيو آهي ته 5 فيبروري يوم يڪجهتي ڪشمير تي سرڪاري رخصت هوندي...",
    category: "سياست",
    image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    author: "Abbas",
    featured: false,
  },

  // SPORTS - Cricket
  {
    title: "پاڪستان ٽيم ٽي ٽوئنٽي ورلڊ ڪپ ۾ شامل ⹁ پر ڀارت سان ميچ نه کيڏيندي",
    content: `اسلام آباد: پاڪستان حڪومت اعلان ڪيو آهي ته پاڪستان ڪرڪيٽ ٽيم آءِ سي سي ٽي ٽوئنٽي ورلڊ ڪپ 2026 ۾ شامل ٿيندي ⹁ پر 15 فيبروري تي ڀارت سان شيڊول ميچ نه کيڏيندي.

حڪومتي بيان موجب "پاڪستان ڪرڪيٽ ٽيم 15 فيبروري 2026 تي ڀارت سان شيڊول ميچ ۾ ميدان ۾ نه ايندي."

بنگلاديش جي ورلڊ ڪپ مان ڪڍڻ کانپوءِ پاڪستان هن قدم تي آيو. پاڪستان ڪرڪيٽ بورڊ جي چيئرمين محسن نقوي هن فيصلي جي حمايت ڪئي آهي.

آءِ سي سي چيو آهي ته "چونڊي شموليت کيڏ جي روح جي خلاف آهي." جيڪڏهن ميچ فارفٽ ٿئي ته پاڪستان جا ٻه پوائنٽ ختم ٿيندا.`,
    excerpt: "پاڪستان حڪومت اعلان ڪيو آهي ته ڪرڪيٽ ٽيم ورلڊ ڪپ ۾ شامل ٿيندي پر ڀارت سان ميچ نه کيڏيندي...",
    category: "کيل",
    image_url: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800",
    author: "Abbas",
    featured: true,
  },

  // TECHNOLOGY/AI
  {
    title: "ايلون مسڪ جي اسپيس ايڪس ايڪس اي آئي خريد ڪري ⹁ 1.25 ٽريلين ڊالر آءِ پي او",
    content: `سان فرانسسڪو: ايلون مسڪ پنهنجي اي آءِ اسٽارٽ اپ ايڪس اي آئي کي اسپيس ايڪس ۾ ضم ڪري ڇڏيو آهي. هي تاريخ جي وڏين آءِ پي او مان هڪ ٿي سگهي ٿي.

نيواڊا رياست جي رڪارڊ موجب هي ٽرانزيڪشن 2 فيبروري تي مڪمل ٿي. اسپيس ايڪس اڳ ۾ 800 بلين ڊالر جي قيمت تي سيڪنڊري شيئر وڪري ڪئي هئي.

ايڪس اي آئي 2023 ۾ شروع ٿي ۽ اڄ 230 بلين ڊالر جي قيمت تي پهتي آهي. ٽيسلا پڻ 2 بلين ڊالر ايڪس اي آئي ۾ لڳايو آهي.

مسڪ چيو "اسپيس ايڪس ايڪس اي آئي خريد ڪري تازي ترين ⹁ عمودي طور تي مربوط جدت جي انجڻ ٺاهي آهي."`,
    excerpt: "ايلون مسڪ پنهنجي اي آءِ اسٽارٽ اپ ايڪس اي آئي کي اسپيس ايڪس ۾ ضم ڪيو. هي 1.25 ٽريلين ڊالر جي آءِ پي او ٿي سگهي ٿي...",
    category: "ٽيڪنالاجي",
    image_url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800",
    author: "Abbas",
    featured: true,
  },
  {
    title: "2026 ۾ اي آءِ ھائيپ کان عملي استعمال ڏانهن",
    content: `اي آءِ جي دنيا ۾ 2026 هائيپ کان عمليت ڏانهن منتقلي جو سال هوندو. گوگل جي ڊيپ مائنڊ ⹁ جيني ۽ ورلڊ ماڊلز تي ڪم ڪري رهيو آهي.

اسٽارٽ اپس جهڙوڪ ڊيڪارٽ ⹁ اوڊيسي ⹁ ۽ فے فے لي جي ورلڊ ليبز نيون ڊيمو ڪيون آهن.

اي آءِ جي خاص رجحانات:
- استدلال ماڊل نئين معيار آهن
- اي آءِ فار سائنس تي خاص ڌيان
- قومي سلامتي سان اي آءِ ڪمپنين جي ويجهو تعلق
- نويڊيا جي مقابلي لاءِ چين جي ڪوششون`,
    excerpt: "2026 ۾ اي آءِ هائيپ کان عمليت ڏانهن منتقل ٿيندو. گوگل ⹁ اوپن اي آءِ ⹁ ۽ نيون اسٽارٽ اپس نوان ماڊل لانچ ڪري رهيون آهن...",
    category: "ٽيڪنالاجي",
    image_url: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800",
    author: "Abbas",
    featured: false,
  },
  {
    title: "پاڪستاني اسٽارٽ اپس 2025 ۾ 74 ملين ڊالر فنڊنگ حاصل ڪيا",
    content: `ڪراچي: رپورٽ موجب پاڪستاني اسٽارٽ اپس 2025 ۾ 74 ملين ڊالر کان مٿي فنڊنگ حاصل ڪيا.

2026 ۾ اهو رجحان جاري رهڻ جي اميد آهي. خاص ڪري ٽيڪنالاجي ۽ اي آءِ ۾ خواتين ڪاروبارين جي اڳواڻي وڌندي.

ست پاڪستاني اسٽارٽ اپس ڊيووس 2026 ورلڊ اڪانامڪ فورم ۾ پيشڪاري ڪرڻ لاءِ چونڊيا ويا.

مشهور پاڪستاني اسٽارٽ اپس: ڪيپ ٽرڪن ⹁ چيتا ⹁ برج لنڪس ⹁ پوسٽ ايڪس.`,
    excerpt: "پاڪستاني اسٽارٽ اپس 2025 ۾ 74 ملين ڊالر کان مٿي فنڊنگ حاصل ڪيا. 2026 ۾ اهو رجحان جاري رهڻ جي اميد...",
    category: "ٽيڪنالاجي",
    image_url: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800",
    author: "Abbas",
    featured: false,
  },

  // ENTERTAINMENT/CULTURE
  {
    title: "سنڌي موسيقي جو نئون البم رليز",
    content: `ڪراچي: مشهور سنڌي فنڪار نئون البم رليز ڪيو آهي جنهن ۾ روايتي سنڌي موسيقي کي جديد انداز سان پيش ڪيو ويو آهي.

البم ۾ 12 گيت آهن جن ۾ شاهه عبداللطيف ڀٽائي جي شاعري پڻ شامل آهي. نوجوان نسل ۾ سنڌي موسيقي کي مقبول ڪرڻ جي ڪوشش ڪئي وئي آهي.

فنڪار چيو ته سنڌي ثقافت کي بچائڻ ۽ اڳتي وڌائڻ سندن مشن آهي.`,
    excerpt: "مشهور سنڌي فنڪار نئون البم رليز ڪيو آهي جنهن ۾ روايتي موسيقي کي جديد انداز سان پيش ڪيو ويو...",
    category: "تفريح",
    image_url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800",
    author: "Abbas",
    featured: false,
  },
];

async function initDb() {
  // Create tables if they don't exist
  await client.execute(`
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
  
  await client.execute(`CREATE INDEX IF NOT EXISTS idx_category ON articles(category)`);
  await client.execute(`CREATE INDEX IF NOT EXISTS idx_published ON articles(published_at)`);
  await client.execute(`CREATE INDEX IF NOT EXISTS idx_slug ON articles(slug)`);
  await client.execute(`CREATE INDEX IF NOT EXISTS idx_featured ON articles(featured)`);
}

async function addArticle(article) {
  const slug = generateSlug(article.title) + "-" + Date.now();
  
  try {
    const result = await client.execute({
      sql: `INSERT INTO articles (title, slug, content, excerpt, category, image_url, author, featured)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        article.title,
        slug,
        article.content,
        article.excerpt || null,
        article.category,
        article.image_url || null,
        article.author || null,
        article.featured ? 1 : 0,
      ],
    });
    console.log(`Added: ${article.title.substring(0, 50)}... (ID: ${result.lastInsertRowid})`);
    return result.lastInsertRowid;
  } catch (error) {
    console.error(`Error adding article: ${article.title.substring(0, 30)}...`, error.message);
    return null;
  }
}

async function main() {
  console.log("Initializing database...");
  await initDb();
  
  console.log(`\nAdding ${articles.length} articles...\n`);
  
  let added = 0;
  for (const article of articles) {
    const id = await addArticle(article);
    if (id) added++;
  }
  
  console.log(`\nDone! Added ${added}/${articles.length} articles.`);
  
  // Show count
  const count = await client.execute("SELECT COUNT(*) as total FROM articles");
  console.log(`Total articles in database: ${count.rows[0].total}`);
}

main().catch(console.error);
