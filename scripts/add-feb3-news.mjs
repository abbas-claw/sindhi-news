import { createClient } from "@libsql/client";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, "..", "data", "sindhi-news.db");

const client = createClient({
  url: `file:${dbPath}`,
});

const articles = [
  // Sports - Cricket
  {
    title: "پاڪستان ۽ آسٽريليا وچ ۾ ٽيسٽ سيريز جو آغاز ⹁ پهريون ميچ راولپنڊي ۾",
    slug: "pakistan-australia-test-series-2026",
    summary: "پاڪستان ڪرڪيٽ ٽيم آسٽريليا خلاف ٽيسٽ سيريز کيڏڻ لاءِ تيار آهي⹁ پهريون ميچ 10 فيبروري کان راولپنڊي ۾ شروع ٿيندو۔",
    content: `پاڪستان ڪرڪيٽ بورڊ (پي سي بي) آسٽريليا خلاف ٽيسٽ سيريز جي ميزباني ڪرڻ لاءِ تيار آهي۔ ٽن ميچن جي هن سيريز جو پهريون ميچ 10 فيبروري کان راولپنڊي ڪرڪيٽ اسٽيڊيم ۾ شروع ٿيندو۔

پاڪستان ٽيم جي ڪپتان بابر اعظم چيو ته ٽيم گهر جي زمين تي آسٽريليا کي هارائڻ لاءِ پوري طرح تيار آهي۔ "اسان جا بولر ۽ بيٽسمين سٺي فارم ۾ آهن۔"

آسٽريليا ٽيم 5 فيبروري تي پاڪستان پهچندي۔ ٻيو ميچ ڪراچي ۾ ۽ ٽيون لاهور ۾ کيڏيو ويندو۔`,
    category: "کيل",
    author: "راڻو ڪمار",
    imageUrl: "/images/cricket-stadium.jpg",
    publishedAt: "2026-02-03T08:00:00Z"
  },
  // Tech - AI
  {
    title: "گوگل جو نئون AI ماڊل Gemini 3 جاري ⹁ ملٽي موڊل صلاحيتن ۾ بهتري",
    slug: "google-gemini-3-launch-2026",
    summary: "گوگل پنهنجو جديد AI ماڊل Gemini 3 جاري ڪيو آهي جيڪو ٽيڪسٽ⹁ تصوير ۽ وڊيو کي هڪ ئي وقت سمجهي سگهي ٿو۔",
    content: `گوگل پنهنجو نئون ۽ جديد مصنوعي ذهانت وارو ماڊل Gemini 3 جاري ڪيو آهي۔ اهو ماڊل پوئين نسخن کان وڌيڪ طاقتور آهي ۽ ملٽي موڊل صلاحيتن ۾ خاص بهتري رکي ٿو۔

گوگل جي سي اي او سندر پچائي چيو ته Gemini 3 ٽيڪسٽ⹁ تصوير⹁ آڊيو ۽ وڊيو کي هڪ ئي وقت سمجهي سگهي ٿو۔ "اهو اسان جو سڀ کان وڏو قدم آهي عام مصنوعي ذهانت (AGI) ڏانهن۔"

نئون ماڊل گوگل جي سڀني پراڊڪٽس ۾ شامل ڪيو ويندو⹁ جنهن ۾ سرچ⹁ جي ميل ۽ گوگل ڊاڪس شامل آهن۔`,
    category: "ٽيڪنالاجي",
    author: "عمران سومرو",
    imageUrl: "/images/google-ai.jpg",
    publishedAt: "2026-02-03T09:00:00Z"
  },
  // Startup News
  {
    title: "پاڪستاني اسٽارٽ اپ 'بازار' 100 ملين ڊالر جي سيريز سي فنڊنگ حاصل ڪئي",
    slug: "bazaar-startup-100m-funding-2026",
    summary: "ڪراچي ۾ قائم اسٽارٽ اپ 'بازار' B2B اي ڪامرس پليٽ فارم لاءِ 100 ملين ڊالر جي فنڊنگ حاصل ڪئي۔",
    content: `پاڪستاني اسٽارٽ اپ 'بازار' سيريز سي فنڊنگ راؤنڊ ۾ 100 ملين آمريڪي ڊالر حاصل ڪيا آهن۔ هي فنڊنگ ٽائيگر گلوبل ۽ سيڪوئيا ڪيپيٽل اڳواڻي ۾ ڪئي وئي۔

'بازار' هڪ B2B اي ڪامرس پليٽ فارم آهي جيڪو ننڍن دڪاندارن کي سڌو سنئون ڪمپنين سان ڳنڍي ٿو۔ ڪمپني جا 5 لکن کان وڌيڪ دڪاندار رجسٽرڊ آهن۔

بازار جو CEO حمزه امين چيو: "اسان هي فنڊنگ پاڪستان ۽ بنگلاديش ۾ پنهنجي خدمتون وڌائڻ لاءِ استعمال ڪنداسين۔"`,
    category: "ٽيڪنالاجي",
    author: "سائرا شاهه",
    imageUrl: "/images/startup-funding.jpg",
    publishedAt: "2026-02-03T07:30:00Z"
  },
  // Politics - Sindh
  {
    title: "سنڌ حڪومت جو نئون بجيٽ اعلان ⹁ تعليم ۽ صحت لاءِ خاص رقم مختص",
    slug: "sindh-budget-2026-education-health",
    summary: "سنڌ حڪومت وزير اعليٰ مراد علي شاهه جي اڳواڻي ۾ نئين مالي سال جو بجيٽ پيش ڪيو⹁ تعليم ۽ صحت کي ترجيح ڏني وئي۔",
    content: `سنڌ حڪومت نئين مالي سال 2026-27 جو بجيٽ صوبائي اسيمبلي ۾ پيش ڪيو آهي۔ ڪل بجيٽ 2800 ارب رپين جو آهي جنهن ۾ تعليم لاءِ 450 ارب ۽ صحت لاءِ 350 ارب رپيا مختص ڪيا ويا آهن۔

وزير خزانه مخدوم شهاب الدين چيو ته نئون بجيٽ عوام دوست آهي۔ "اسان تعليم ۽ صحت کي پهرين ترجيح ڏني آهي۔"

بجيٽ ۾ ڪراچي لاءِ 200 ارب ۽ سنڌ جي ڳوٺن لاءِ 300 ارب رپيا ترقياتي منصوبن لاءِ رکيا ويا آهن۔ سرڪاري ملازمن جي تنخواهن ۾ 15 سيڪڙو واڌارو به شامل آهي۔`,
    category: "سياست",
    author: "عائشه ڄام",
    imageUrl: "/images/sindh-assembly.jpg",
    publishedAt: "2026-02-03T10:00:00Z"
  },
  // Entertainment
  {
    title: "عاطف اسلم جي نئين البم 'صدا' جاري ⹁ 12 نوان گيت شامل",
    slug: "atif-aslam-sada-album-2026",
    summary: "مشهور گلوڪار عاطف اسلم پنهنجي نئين البم 'صدا' جاري ڪيو آهي جنهن ۾ 12 سڏاڻا گيت شامل آهن۔",
    content: `پاڪستان جي مشهور گلوڪار عاطف اسلم پنهنجي نئين البم 'صدا' جاري ڪيو آهي۔ هن البم ۾ 12 نوان گيت شامل آهن جيڪي موسيقي جي مختلف اندازن ۾ آهن۔

عاطف اسلم چيو: "صدا منهنجي دل جي آواز آهي۔ هر گيت هڪ خاص احساس بيان ڪري ٿو۔"

البم ۾ رومانوي⹁ صوفياڻي ۽ روايتي گيت شامل آهن۔ ڪيترائي گيت ڀارتي ۽ ترڪي موسيقيدانن سان گڏيل آهن۔ البم سڀني اسٽريمنگ پليٽ فارمز تي دستياب آهي۔`,
    category: "تفريح",
    author: "نديم ميمڻ",
    imageUrl: "/images/atif-aslam.jpg",
    publishedAt: "2026-02-03T06:00:00Z"
  },
  // Education
  {
    title: "HEC پاڪستان جو نئون اسڪالرشپ پروگرام ⹁ 5000 شاگردن کي بيرون ملڪ پڙهائڻ جو اعلان",
    slug: "hec-scholarship-program-2026",
    summary: "هائير ايجوڪيشن ڪميشن 5000 نوجوانن کي بيرون ملڪ يونيورسٽين ۾ پڙهائڻ لاءِ اسڪالرشپ ڏيندي۔",
    content: `هائير ايجوڪيشن ڪميشن (HEC) پاڪستان نئون اسڪالرشپ پروگرام شروع ڪيو آهي جنهن تحت 5000 شاگردن کي بيرون ملڪ جي اعليٰ يونيورسٽين ۾ پڙهائڻ جو موقعو ملندو۔

HEC چيئرمين ڊاڪٽر مختار احمد چيو: "اهو پروگرام نوجوانن کي دنيا جي بهترين يونيورسٽين ۾ تعليم حاصل ڪرڻ جو موقعو ڏيندو۔ اسڪالرشپ ۾ فيس⹁ رهائش ۽ سفر خرچ شامل آهي۔"

اسڪالرشپ لاءِ درخواستون 1 مارچ کان 31 مارچ 2026 تائين قبول ڪيون وينديون۔ STEM⹁ AI ۽ کاڻي صنعت جي شعبن کي ترجيح ڏني ويندي۔`,
    category: "تعليم",
    author: "فيصل راڄپوت",
    imageUrl: "/images/hec-scholarship.jpg",
    publishedAt: "2026-02-03T09:30:00Z"
  },
  // Culture
  {
    title: "سکر ۾ سنڌي ثقافتي ميلو شروع ⹁ هزارين ماڻهن جي شرڪت",
    slug: "sukkur-sindhi-cultural-festival-2026",
    summary: "سکر ۾ سالياني سنڌي ثقافتي ميلو شروع ٿيو آهي جنهن ۾ ملڪ ڀر کان ماڻهو شريڪ ٿيا آهن۔",
    content: `سکر شهر ۾ سالياني سنڌي ثقافتي ميلو شروع ٿيو آهي جيڪو 3 ڏينهن جاري رهندو۔ ميلي ۾ سنڌي روايتي لباس⹁ موسيقي⹁ رقص ۽ کاڌي جي نمائش آهي۔

ميلي ۾ مشهور گلوڪار استاد شمن علي ميرالي⹁ ساجد علي ساجد ۽ ٻيا فنڪار پنهنجو فن پيش ڪري رهيا آهن۔ سنڌي اجرڪ⹁ ڪشيدو ڪاري ۽ دستڪاري جا اسٽال به لڳل آهن۔

صوبائي وزير ثقافت سردار شاهه چيو: "هي ميلو سنڌي ثقافت کي زنده رکڻ ۽ نئين نسل کي پنهنجي ورثي سان ڳنڍڻ جو سڀ کان وڏو موقعو آهي۔"`,
    category: "ثقافت",
    author: "مهراڻ ڀٽي",
    imageUrl: "/images/sindhi-culture.jpg",
    publishedAt: "2026-02-03T07:00:00Z"
  },
  // Tech - OpenAI
  {
    title: "OpenAI جو GPT-5 ماڊل رليز ⹁ انساني سطح جي سوچ جي صلاحيت",
    slug: "openai-gpt5-release-2026",
    summary: "OpenAI پنهنجو جديد ترين AI ماڊل GPT-5 جاري ڪيو آهي جيڪو پيچيده مسئلن کي حل ڪري سگهي ٿو۔",
    content: `OpenAI پنهنجو انتهائي متوقع AI ماڊل GPT-5 جاري ڪيو آهي۔ نئون ماڊل پوئين سڀني نسخن کان وڌيڪ طاقتور آهي ۽ ڪيترائي نوان فيچر رکي ٿو۔

OpenAI CEO سام التمان چيو: "GPT-5 اسان جو سڀ کان وڏو ڪارنامو آهي۔ اهو پيچيده مسئلن کي حل ڪري سگهي ٿو⹁ ڪوڊ لکي سگهي ٿو⹁ ۽ تخليقي ڪم ڪري سگهي ٿو۔"

نئين ماڊل جي خاص خوبيون:
- ملٽي اسٽيپ ريزننگ
- بهتر ميموري
- ريئل ٽائيم تعامل
- 10 لکن ٽوڪنز ڪنٽيڪسٽ ونڊو

GPT-5 پهرين ChatGPT Plus صارفين لاءِ دستياب هوندو۔`,
    category: "ٽيڪنالاجي",
    author: "علي حسين",
    imageUrl: "/images/openai-gpt5.jpg",
    publishedAt: "2026-02-03T08:30:00Z"
  }
];

async function addArticles() {
  let added = 0;
  
  for (const article of articles) {
    try {
      await client.execute({
        sql: `INSERT INTO articles (title, slug, excerpt, content, category, author, image_url, published_at)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        args: [
          article.title,
          article.slug,
          article.summary,  // maps to excerpt
          article.content,
          article.category,
          article.author,
          article.imageUrl,
          article.publishedAt
        ]
      });
      console.log(`Added: ${article.title.substring(0, 50)}...`);
      added++;
    } catch (err) {
      if (err.message.includes('UNIQUE')) {
        console.log(`Skipped (exists): ${article.slug}`);
      } else {
        console.error(`Error: ${err.message}`);
      }
    }
  }

  console.log(`\nAdded ${added} new articles`);

  // Show totals
  const total = await client.execute("SELECT COUNT(*) as count FROM articles");
  console.log(`Total articles: ${total.rows[0].count}`);

  const byCategory = await client.execute("SELECT category, COUNT(*) as count FROM articles GROUP BY category ORDER BY count DESC");
  console.log('\nBy category:');
  for (const row of byCategory.rows) {
    console.log(`  ${row.category}: ${row.count}`);
  }
}

addArticles().catch(console.error);
