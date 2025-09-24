# 🗄️ مستندات ساختار دیتابیس

این سند ساختار کامل دیتابیس وبسایت رزومه شخصی را شرح می‌دهد.

## 📋 نمای کلی

دیتابیس شامل ۴ جدول اصلی است که تمام عملکردهای وبسایت را پشتیبانی می‌کنند:

- **blog_posts**: مدیریت مقالات وبلاگ دوزبانه
- **consultation_requests**: درخواست‌های مشاوره مشتریان
- **training_requests**: درخواست‌های آموزش و دوره
- **portfolio_projects**: نمایش پروژه‌های انجام شده

## 🏗️ ساختار جداول

### جدول blog_posts

مدیریت مقالات وبلاگ با پشتیبانی کامل از دو زبان فارسی و انگلیسی.

\`\`\`sql
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_en TEXT NOT NULL,
  title_fa TEXT NOT NULL,
  content_en TEXT NOT NULL,
  content_fa TEXT NOT NULL,
  excerpt_en TEXT,
  excerpt_fa TEXT,
  slug TEXT UNIQUE NOT NULL,
  featured_image TEXT,
  tags TEXT[],
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
\`\`\`

#### فیلدها:
- **id**: شناسه یکتا (UUID)
- **title_en/title_fa**: عنوان مقاله به انگلیسی و فارسی
- **content_en/content_fa**: محتوای کامل مقاله به دو زبان
- **excerpt_en/excerpt_fa**: خلاصه مقاله برای نمایش در لیست
- **slug**: URL دوستانه برای مقاله
- **featured_image**: تصویر شاخص مقاله
- **tags**: برچسب‌های مقاله (آرایه)
- **published**: وضعیت انتشار مقاله
- **created_at/updated_at**: زمان ایجاد و به‌روزرسانی

#### ایندکس‌ها:
\`\`\`sql
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_created_at ON blog_posts(created_at DESC);
CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
\`\`\`

### جدول consultation_requests

ذخیره درخواست‌های مشاوره از مشتریان.

\`\`\`sql
CREATE TABLE consultation_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service_type TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
\`\`\`

#### فیلدها:
- **id**: شناسه یکتا
- **name**: نام درخواست‌کننده
- **email**: ایمیل تماس
- **phone**: شماره تلفن (اختیاری)
- **service_type**: نوع خدمت درخواستی
  - `web-development`: توسعه وب
  - `ai-consulting`: مشاوره هوش مصنوعی
  - `chatbot-development`: توسعه چت‌بات
  - `automation`: اتوماسیون
- **message**: پیام و توضیحات
- **status**: وضعیت درخواست
  - `pending`: در انتظار بررسی
  - `in-progress`: در حال انجام
  - `completed`: تکمیل شده
  - `cancelled`: لغو شده

#### ایندکس‌ها:
\`\`\`sql
CREATE INDEX idx_consultation_requests_status ON consultation_requests(status);
CREATE INDEX idx_consultation_requests_created_at ON consultation_requests(created_at DESC);
\`\`\`

### جدول training_requests

مدیریت درخواست‌های آموزش و دوره‌های شخصی‌سازی شده.

\`\`\`sql
CREATE TABLE training_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  training_type TEXT NOT NULL,
  experience_level TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
\`\`\`

#### فیلدها:
- **training_type**: نوع آموزش
  - `frontend`: توسعه فرانت‌اند
  - `python`: برنامه‌نویسی پایتون
  - `ai`: هوش مصنوعی
  - `automation`: اتوماسیون
- **experience_level**: سطح تجربه
  - `beginner`: مبتدی
  - `intermediate`: متوسط
  - `advanced`: پیشرفته

### جدول portfolio_projects

نمایش پروژه‌های انجام شده در بخش نمونه کارها.

\`\`\`sql
CREATE TABLE portfolio_projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_en TEXT NOT NULL,
  title_fa TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_fa TEXT NOT NULL,
  image TEXT,
  technologies TEXT[],
  live_url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
\`\`\`

#### فیلدها:
- **title_en/title_fa**: عنوان پروژه به دو زبان
- **description_en/description_fa**: توضیحات پروژه
- **image**: تصویر نمایشی پروژه
- **technologies**: فناوری‌های استفاده شده (آرایه)
- **live_url**: لینک دمو زنده
- **github_url**: لینک مخزن GitHub
- **featured**: پروژه شاخص
- **order_index**: ترتیب نمایش

#### ایندکس‌ها:
\`\`\`sql
CREATE INDEX idx_portfolio_projects_featured ON portfolio_projects(featured);
CREATE INDEX idx_portfolio_projects_order ON portfolio_projects(order_index);
\`\`\`

## 🛡️ امنیت (Row Level Security)

### فعال‌سازی RLS

\`\`\`sql
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
\`\`\`

### سیاست‌های امنیتی

#### blog_posts
\`\`\`sql
-- خواندن عمومی پست‌های منتشر شده
CREATE POLICY "Public can read published posts" ON blog_posts
  FOR SELECT USING (published = true);

-- ادمین می‌تواند همه کار کند
CREATE POLICY "Admin can manage all posts" ON blog_posts
  FOR ALL USING (auth.jwt() ->> 'email' = 'mr.alireza.sargazi1@gmail.com');
\`\`\`

#### consultation_requests
\`\`\`sql
-- همه می‌توانند درخواست ایجاد کنند
CREATE POLICY "Anyone can create consultation requests" ON consultation_requests
  FOR INSERT WITH CHECK (true);

-- فقط ادمین می‌تواند ببیند و مدیریت کند
CREATE POLICY "Admin can manage consultation requests" ON consultation_requests
  FOR ALL USING (auth.jwt() ->> 'email' = 'mr.alireza.sargazi1@gmail.com');
\`\`\`

#### training_requests
\`\`\`sql
-- همه می‌توانند درخواست آموزش ایجاد کنند
CREATE POLICY "Anyone can create training requests" ON training_requests
  FOR INSERT WITH CHECK (true);

-- فقط ادمین می‌تواند مدیریت کند
CREATE POLICY "Admin can manage training requests" ON training_requests
  FOR ALL USING (auth.jwt() ->> 'email' = 'mr.alireza.sargazi1@gmail.com');
\`\`\`

#### portfolio_projects
\`\`\`sql
-- خواندن عمومی تمام پروژه‌ها
CREATE POLICY "Public can read portfolio projects" ON portfolio_projects
  FOR SELECT USING (true);

-- فقط ادمین می‌تواند مدیریت کند
CREATE POLICY "Admin can manage portfolio projects" ON portfolio_projects
  FOR ALL USING (auth.jwt() ->> 'email' = 'mr.alireza.sargazi1@gmail.com');
\`\`\`

## 🔧 توابع و Triggers

### تابع به‌روزرسانی خودکار updated_at

\`\`\`sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';
\`\`\`

### اعمال Trigger به جداول

\`\`\`sql
CREATE TRIGGER update_blog_posts_updated_at 
  BEFORE UPDATE ON blog_posts 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_consultation_requests_updated_at 
  BEFORE UPDATE ON consultation_requests 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_training_requests_updated_at 
  BEFORE UPDATE ON training_requests 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_portfolio_projects_updated_at 
  BEFORE UPDATE ON portfolio_projects 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
\`\`\`

## 📊 Views و کوئری‌های مفید

### View آمار کلی

\`\`\`sql
CREATE VIEW admin_stats AS
SELECT 
  (SELECT COUNT(*) FROM blog_posts WHERE published = true) as published_posts,
  (SELECT COUNT(*) FROM blog_posts WHERE published = false) as draft_posts,
  (SELECT COUNT(*) FROM consultation_requests WHERE status = 'pending') as pending_consultations,
  (SELECT COUNT(*) FROM training_requests WHERE status = 'pending') as pending_trainings,
  (SELECT COUNT(*) FROM portfolio_projects) as total_projects;
\`\`\`

### کوئری‌های پرکاربرد

#### دریافت آخرین مقالات:
\`\`\`sql
SELECT * FROM blog_posts 
WHERE published = true 
ORDER BY created_at DESC 
LIMIT 5;
\`\`\`

#### جستجو در مقالات:
\`\`\`sql
SELECT * FROM blog_posts 
WHERE published = true 
AND (title_en ILIKE '%search_term%' OR title_fa ILIKE '%search_term%')
ORDER BY created_at DESC;
\`\`\`

#### پروژه‌های شاخص:
\`\`\`sql
SELECT * FROM portfolio_projects 
WHERE featured = true 
ORDER BY order_index ASC;
\`\`\`

## 🔄 Migration Scripts

### اسکریپت ایجاد اولیه
فایل: `scripts/001_create_database_schema.sql`

### اسکریپت داده‌های نمونه
فایل: `scripts/002_seed_portfolio_data.sql`

### اسکریپت‌های به‌روزرسانی آینده
- `scripts/003_add_new_features.sql`
- `scripts/004_performance_improvements.sql`

## 📈 بهینه‌سازی عملکرد

### ایندکس‌های توصیه شده

\`\`\`sql
-- برای جستجوی سریع در مقالات
CREATE INDEX idx_blog_posts_search ON blog_posts 
USING gin(to_tsvector('english', title_en || ' ' || content_en));

-- برای فیلتر کردن درخواست‌ها
CREATE INDEX idx_requests_status_date ON consultation_requests(status, created_at DESC);
\`\`\`

### تنظیمات Connection Pooling

\`\`\`sql
-- تنظیم حداکثر اتصالات
ALTER SYSTEM SET max_connections = 100;
ALTER SYSTEM SET shared_buffers = '256MB';
\`\`\`

## 🔍 نظارت و لاگ‌گیری

### فعال‌سازی لاگ کوئری‌های کند

\`\`\`sql
ALTER SYSTEM SET log_min_duration_statement = 1000; -- 1 ثانیه
ALTER SYSTEM SET log_statement = 'all';
\`\`\`

### مشاهده آمار جداول

\`\`\`sql
SELECT 
  schemaname,
  tablename,
  n_tup_ins as inserts,
  n_tup_upd as updates,
  n_tup_del as deletes
FROM pg_stat_user_tables;
\`\`\`

---

**این مستندات توسط علیرضا سرگزی تهیه شده است**
