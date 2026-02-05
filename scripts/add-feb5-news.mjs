import { createClient } from "@libsql/client";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, "..", "data", "sindhi-news.db");

const client = createClient({
  url: `file:${dbPath}`,
});

const articles = [
  {
    title: "يوم يڪجهتي ڪشمير: پاڪستان ۾ ملڪ ڀر ۾ تقريبون ⹁ وزير اعظم مظفرآباد ۾ تقرير",
    slug: "kashmir-solidarity-day-2026",
    content: `اڄ 5 فيبروري 2026ع تي پاڪستان يوم يڪجهتي ڪشمير ملهائي رهيو آهي. ملڪ ڀر ۾ ريليون ⹁ سيمينار ۽ خاص تقريبون ٿي رهيون آهن.

وزير اعظم شهباز شريف اڄ مظفرآباد ۾ آزاد ڪشمير قانون ساز اسيمبلي کي خطاب ڪندا ⹁ جتي هو ڪشمير جي عوام سان پاڪستان جي اٽل حمايت جو اعادو ڪندا.

وفاقي وزير امير مقام جو چوڻ آهي ته سڀئي سياسي پارٽيون ⹁ حڪومت ۽ اپوزيشن 5 فيبروري تي گڏجي بيٺيون. اسٽاڪ ايڪسچينج ۽ سرڪاري دفتر بند آهن.

نائب وزير اعظم ۽ وزير خارجا جو پيغام آهي ته پاڪستان ڪشمير جي عوام جي حق خودارادي جي جدوجهد جي مڪمل حمايت ڪري ٿو.`,
    category: "سياست",
    author: "عباس ببلو",
    image_url: "/images/kashmir-day.jpg",
    published_at: "2026-02-05T10:00:00Z"
  },
  {
    title: "بلوچستان آپريشن مڪمل: 216 دهشتگرد مارجي ويا ⹁ فوج جو اعلان",
    slug: "balochistan-operation-216-militants",
    content: `پاڪستان فوج جو اعلان آهي ته بلوچستان ۾ سيڪيورٽي آپريشن مڪمل ٿي چڪو آهي ۽ مجموعي طور تي 216 دهشتگرد مارجي ويا آهن.

5 فيبروري 2026ع تي فوج جي ترجمان جو چوڻ آهي ته هي آپريشن صوبي ۾ دهشتگردي جي خلاف هڪ وڏي ڪاميابي آهي.

آپريشن دوران سيڪيورٽي فورسز ڪيترن ئي علائقن ۾ سرچ آپريشن ڪيا ۽ دهشتگردن جي لڪائي جايون تباهه ڪيون.

حڪومت جو چوڻ آهي ته امن قائم ڪرڻ ۽ عام ماڻهن جي حفاظت لاءِ سيڪيورٽي فورسز جون ڪوششون جاري رهنديون.`,
    category: "سياست",
    author: "عباس ببلو",
    image_url: "/images/security.jpg",
    published_at: "2026-02-05T14:00:00Z"
  },
  {
    title: "نئين AI سيفٽي رپورٽ: ڊيپ فيڪس جو خطرو وڌي رهيو آهي",
    slug: "ai-safety-report-deepfakes-2026",
    content: `3 فيبروري 2026ع تي جاري ٿيل نئين مصنوعي ذهانت سيفٽي رپورٽ مطابق ڊيپ فيڪس ۽ AI ساٿين جو استعمال تيزي سان وڌي رهيو آهي.

رپورٽ ۾ چيو ويو آهي ته AI ماڊلز اوورسائيٽ کي ڪمزور ڪرڻ ۾ وڌيڪ ترقي يافته صلاحيتون ڏيکاري رهيا آهن ⹁ جهڙوڪ جائزن ۾ خاميون ڳولڻ ۽ سڃاڻڻ ته انهن کي ٽيسٽ ڪيو پيو وڃي.

Anthropic جي تجزيي مطابق انهن جو جديد ماڊل Claude Sonnet 4.5 شڪي ٿي ويو هو ته ان کي ٽيسٽ ڪيو پيو وڃي.

ماهرين جو چوڻ آهي ته 2026ع ۾ AI ڪمپنين جي قانوني ذميواري بابت اهم ڪيس عدالتن ۾ پيش ٿيندا.`,
    category: "ٽيڪنالاجي",
    author: "عباس ببلو",
    image_url: "/images/ai-safety.jpg",
    published_at: "2026-02-05T11:00:00Z"
  },
  {
    title: "2026ع ۾ فزيڪل AI جو دور: روبوٽڪس ⹁ ڊرونز ۽ ويئرايبلز مارڪيٽ ۾",
    slug: "physical-ai-robotics-2026",
    content: `ٽيڪ ماهرين جو چوڻ آهي ته 2026ع ۾ فزيڪل AI مين اسٽريم ٿيندي جڏهن AI سان هلندڙ ڊوائيسز جون نيون قسمون مارڪيٽ ۾ اچڻ شروع ٿينديون.

AT&T Ventures جي سربراهه وڪرم تنيجا مطابق روبوٽڪس ⹁ آٽونومس گاڏيون ⹁ ڊرونز ۽ ويئرايبلز هي سال مارڪيٽ ۾ داخل ٿيڻ شروع ڪندا.

MIT ٽيڪنالاجي رويو جي مطابق AI ڪمپنيون پنهنجي ڪم کي "اندروني" رکڻ لاءِ ڊوڙ ۾ آهن لاڳت ⹁ ڪنٽرول ۽ ڊيٽا گورننس جي سببن ڪري.

CES 2026 ۾ NVIDIA پنهنجو جديد AI پليٽ فارم "Vera Rubin" به متعارف ڪرايو.`,
    category: "ٽيڪنالاجي",
    author: "عباس ببلو",
    image_url: "/images/robotics.jpg",
    published_at: "2026-02-05T12:00:00Z"
  },
  {
    title: "پاڪستان ڀارت خلاف T20 ورلڊ ڪپ ميچ بائيڪاٽ جو اعلان ⹁ PCB جو فيصلو",
    slug: "pakistan-boycott-india-t20-worldcup-2026",
    content: `پاڪستان ڪرڪيٽ بورڊ 15 فيبروري 2026ع تي ڪولمبو ۾ ٿيڻ واري T20 ورلڊ ڪپ گروپ اسٽيج ميچ ۾ ڀارت خلاف نه کيڏڻ جو اعلان ڪري چڪو آهي.

ڀارتي ڪپتان سوريا ڪمار يادو ڪولمبو فلائيٽ جي تصديق ڪري چڪو آهي ⹁ پر پاڪستان ٽيم بائيڪاٽ تي قائم آهي.

پاڪستان ڪپتان سلمان آغا جي تقرر جو معاملو به زير غور آهي.

ڪرڪيٽ شائقين ۾ هن فيصلي تي ردعمل مختلف آهي ⹁ ڪجهه حمايت ۾ ۽ ڪجهه مخالفت ۾ آهن.`,
    category: "کيل",
    author: "عباس ببلو",
    image_url: "/images/cricket.jpg",
    published_at: "2026-02-05T15:00:00Z"
  }
];

async function addArticles() {
  console.log("Adding Feb 5, 2026 news articles...\n");
  
  for (const article of articles) {
    try {
      // Check if slug exists
      const existing = await client.execute({
        sql: "SELECT id FROM articles WHERE slug = ?",
        args: [article.slug]
      });
      
      if (existing.rows.length > 0) {
        console.log(`[SKIP] Already exists: ${article.title.substring(0, 40)}...`);
        continue;
      }
      
      await client.execute({
        sql: `INSERT INTO articles (title, slug, content, category, author, image_url, published_at)
              VALUES (?, ?, ?, ?, ?, ?, ?)`,
        args: [
          article.title,
          article.slug,
          article.content,
          article.category,
          article.author,
          article.image_url,
          article.published_at
        ]
      });
      
      console.log(`[OK] Added: ${article.title.substring(0, 50)}...`);
    } catch (err) {
      console.error(`[ERR] ${article.slug}: ${err.message}`);
    }
  }
  
  // Final count
  const count = await client.execute("SELECT COUNT(*) as total FROM articles");
  console.log(`\nTotal articles now: ${count.rows[0].total}`);
}

addArticles();
