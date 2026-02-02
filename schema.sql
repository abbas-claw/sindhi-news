-- Database Schema for Sindhi News Daily
-- Run this in your Turso database

-- Articles table
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
  featured BOOLEAN DEFAULT FALSE
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_category ON articles(category);
CREATE INDEX IF NOT EXISTS idx_published ON articles(published_at);
CREATE INDEX IF NOT EXISTS idx_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_featured ON articles(featured);

-- Sample data (optional - remove if not needed)
INSERT INTO articles (title, slug, content, excerpt, category, image_url, author, featured) VALUES
('حيدرآباد ۾ نئين تعليمي پاليسي متعارف', 'hyderabad-education-policy', 
 'حيدرآباد ۾ حڪومت سنڌ نئين تعليمي پاليسي متعارف ڪرائي ڇڏي آهي. هن پاليسي تحت تمام سرڪاري اسڪولن ۾ جديد تعليمي نظام لاڳو ڪيو ويندو. تعليمي ماهر چوندا آهن ته هن قدم سان سنڌ ۾ تعليم جي معيار ۾ وڏي حد تڪ بهتري ايندي.', 
 'حيدرآباد ۾ حڪومت سنڌ نئين تعليمي پاليسي متعارف ڪرائي ڇڏي آهي...', 
 'تعليم', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800', 'احمد علي', 1),

('پاڪستان ڪرڪيٽ ٽيم جي نئين ڪپتان چونڊ', 'pakistan-cricket-captain', 
 'پاڪستان ڪرڪيٽ بورڊ نئين ڪپتان چونڊ ڇڏي آهي. نئين ڪپتان چونڊجڻ بعد ٽيم جي تربيت شروع ٿي چڪي آهي. ڪرڪيٽ ماهر چوندا آهن ته نئين ڪپتان جي آمد سان ٽيم ۾ نيون تبديليون اينديون.', 
 'پاڪستان ڪرڪيٽ بورڊ نئين ڪپتان چونڊ ڇڏي آهي...', 
 'کيل', 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=800', 'محمد حسن', 0),

('سنڌي ثقافتي ميلو ڪراچي ۾ شروع', 'sindhi-cultural-festival', 
 'ڪراچي ۾ ٻه هفتن تائين هلندڙ سنڌي ثقافتي ميلو شروع ٿي چڪو آهي. هن ميلي ۾ سنڌ جي روايتي کيڏ ⹁ موسيقي ⹁ رقص ⹁ ۽ کاڌي جون نظرون آهن. لکين ماڻهو هر ڏينهن هن ميلي جو دورو ڪن ٿا.', 
 'ڪراچي ۾ ٻه هفتن تائين هلندڙ سنڌي ثقافتي ميلو شروع ٿي چڪو آهي...', 
 'ثقافت', 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800', 'فاطمه بيگم', 0),

('سياست ۾ نيون ڳالهيون', 'politics-new-developments', 
 'ملڪ جي سياست ۾ نيون ڳالهيون سامهون اچي رهيون آهن. مختلف پارٽين جا اڳواڻ اهم ڪانفرنسن ڪري رهيا آهن. عوام چاهي ٿو ته سياستدان ملڪ جي ترقي تي ڌيان ڏين.', 
 'ملڪ جي سياست ۾ نيون ڳالهيون سامهون اچي رهيون آهن...', 
 'سياست', 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800', 'عبدالله شيخ', 0),

('نئون سنڌي فلم رليز', 'new-sindhi-film-release', 
 'سنڌي سنيما جي دنيا ۾ نئون فلم رليز ٿي چڪو آهي. هن فلم ۾ سنڌ جي روايتي ڪهاڻي کي ڏيکاريو ويو آهي. فلم ڊائريڪٽر چوي ٿو ته هو سنڌي سنيما کي نئين اڀياس تي پهچائڻ چاهي ٿو.', 
 'سنڌي سنيما جي دنيا ۾ نئون فلم رليز ٿي چڪو آهي...', 
 'تفريح', 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800', 'زهرا بانو', 0);
