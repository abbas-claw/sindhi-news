import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArticleList } from "@/components/ArticleList";
import { getDb } from "@/lib/db";
import { Article } from "@/types/article";

async function getArticles(): Promise<Article[]> {
  try {
    const db = getDb();
    const result = await db.execute({
      sql: "SELECT * FROM articles ORDER BY published_at DESC LIMIT 50",
      args: [],
    });
    return result.rows as unknown as Article[];
  } catch (error) {
    console.error("Error fetching articles:", error);
    // Return sample data for development
    return getSampleArticles();
  }
}

function getSampleArticles(): Article[] {
  return [
    {
      id: 1,
      title: "حيدرآباد ۾ نئين تعليمي پاليسي متعارف",
      slug: "hyderabad-education-policy",
      content: "حيدرآباد ۾ حڪومت سنڌ نئين تعليمي پاليسي متعارف ڪرائي ڇڏي آهي. هن پاليسي تحت تمام سرڪاري اسڪولن ۾ جديد تعليمي نظام لاڳو ڪيو ويندو. تعليمي ماهر چوندا آهن ته هن قدم سان سنڌ ۾ تعليم جي معيار ۾ وڏي حد تڪ بهتري ايندي.",
      excerpt: "حيدرآباد ۾ حڪومت سنڌ نئين تعليمي پاليسي متعارف ڪرائي ڇڏي آهي...",
      category: "تعليم",
      image_url: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
      published_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      author: "احمد علي",
      featured: true,
    },
    {
      id: 2,
      title: "پاڪستان ڪرڪيٽ ٽيم جي نئين ڪپتان چونڊ",
      slug: "pakistan-cricket-captain",
      content: "پاڪستان ڪرڪيٽ بورڊ نئين ڪپتان چونڊ ڇڏي آهي. نئين ڪپتان چونڊجڻ بعد ٽيم جي تربيت شروع ٿي چڪي آهي. ڪرڪيٽ ماهر چوندا آهن ته نئين ڪپتان جي آمد سان ٽيم ۾ نيون تبديليون اينديون.",
      excerpt: "پاڪستان ڪرڪيٽ بورڊ نئين ڪپتان چونڊ ڇڏي آهي...",
      category: "کيل",
      image_url: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800",
      published_at: new Date(Date.now() - 86400000).toISOString(),
      updated_at: new Date(Date.now() - 86400000).toISOString(),
      author: "محمد حسن",
      featured: false,
    },
    {
      id: 3,
      title: "سنڌي ثقافتي ميلو ڪراچي ۾ شروع",
      slug: "sindhi-cultural-festival",
      content: "ڪراچي ۾ ٻه هفتن تائين هلندڙ سنڌي ثقافتي ميلو شروع ٿي چڪو آهي. هن ميلي ۾ سنڌ جي روايتي کيڏ ⹁ موسيقي ⹁ رقص ⹁ ۽ کاڌي جون نظرون آهن. لکين ماڻهو هر ڏينهن هن ميلي جو دورو ڪن ٿا.",
      excerpt: "ڪراچي ۾ ٻه هفتن تائين هلندڙ سنڌي ثقافتي ميلو شروع ٿي چڪو آهي...",
      category: "ثقافت",
      image_url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800",
      published_at: new Date(Date.now() - 172800000).toISOString(),
      updated_at: new Date(Date.now() - 172800000).toISOString(),
      author: "فاطمه بيگم",
      featured: false,
    },
    {
      id: 4,
      title: "سياست ۾ نيون ڳالهيون",
      slug: "politics-new-developments",
      content: "ملڪ جي سياست ۾ نيون ڳالهيون سامهون اچي رهيون آهن. مختلف پارٽين جا اڳواڻ اهم ڪانفرنسن ڪري رهيا آهن. عوام چاهي ٿو ته سياستدان ملڪ جي ترقي تي ڌيان ڏين.",
      excerpt: "ملڪ جي سياست ۾ نيون ڳالهيون سامهون اچي رهيون آهن...",
      category: "سياست",
      image_url: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800",
      published_at: new Date(Date.now() - 259200000).toISOString(),
      updated_at: new Date(Date.now() - 259200000).toISOString(),
      author: "عبدالله شيخ",
      featured: false,
    },
    {
      id: 5,
      title: "نئون سنڌي فلم رليز",
      slug: "new-sindhi-film-release",
      content: "سنڌي سنيما جي دنيا ۾ نئون فلم رليز ٿي چڪو آهي. هن فلم ۾ سنڌ جي روايتي ڪهاڻي کي ڏيکاريو ويو آهي. فلم ڊائريڪٽر چوي ٿو ته هو سنڌي سنيما کي نئين اڀياس تي پهچائڻ چاهي ٿو.",
      excerpt: "سنڌي سنيما جي دنيا ۾ نئون فلم رليز ٿي چڪو آهي...",
      category: "تفريح",
      image_url: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800",
      published_at: new Date(Date.now() - 345600000).toISOString(),
      updated_at: new Date(Date.now() - 345600000).toISOString(),
      author: "زهرا بانو",
      featured: false,
    },
    {
      id: 6,
      title: "لاڙڪاڻي ۾ اسپتال جو افتتاح",
      slug: "larkana-hospital-inauguration",
      content: "لاڙڪاڻي ۾ نئين اسپتال جو افتتاح ڪيو ويو آهي. هن اسپتال ۾ جديد سهولتون موجود آهن. عوام لاءِ مفت علاج جو بندوبست پڻي ڪيو ويو آهي.",
      excerpt: "لاڙڪاڻي ۾ نئين اسپتال جو افتتاح ڪيو ويو آهي...",
      category: "سياست",
      image_url: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=800",
      published_at: new Date(Date.now() - 432000000).toISOString(),
      updated_at: new Date(Date.now() - 432000000).toISOString(),
      author: "ساجد حسين",
      featured: false,
    },
  ];
}

export default async function HomePage() {
  const articles = await getArticles();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <ArticleList 
          articles={articles} 
          title="تازه ترين خبرون"
          showFeatured={true}
        />
      </main>

      <Footer />
    </div>
  );
}
