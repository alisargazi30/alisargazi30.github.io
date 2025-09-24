# 🗄️ راهنمای راه‌اندازی Supabase

این راهنما مراحل کامل راه‌اندازی و کار با Supabase برای وبسایت رزومه شخصی را شرح می‌دهد.

## 📋 فهرست مطالب

1. [ایجاد پروژه Supabase](#ایجاد-پروژه-supabase)
2. [پیکربندی متغیرهای محیطی](#پیکربندی-متغیرهای-محیطی)
3. [راه‌اندازی دیتابیس](#راه‌اندازی-دیتابیس)
4. [تنظیم احراز هویت](#تنظیم-احراز-هویت)
5. [امنیت و RLS](#امنیت-و-rls)
6. [API و کوئری‌ها](#api-و-کوئری‌ها)
7. [عیب‌یابی](#عیب‌یابی)

## 🚀 ایجاد پروژه Supabase

### مرحله ۱: ثبت‌نام در Supabase
1. به [supabase.com](https://supabase.com) بروید
2. روی "Start your project" کلیک کنید
3. با GitHub یا ایمیل ثبت‌نام کنید

### مرحله ۲: ایجاد پروژه جدید
1. روی "New Project" کلیک کنید
2. نام پروژه را وارد کنید: `alireza-portfolio`
3. رمز عبور قوی برای دیتابیس انتخاب کنید
4. منطقه نزدیک به خود را انتخاب کنید
5. روی "Create new project" کلیک کنید

### مرحله ۳: انتظار برای راه‌اندازی
- پروژه حدود ۲-۳ دقیقه طول می‌کشد تا آماده شود
- پس از آماده شدن، به داشبورد پروژه هدایت می‌شوید

## 🔧 پیکربندی متغیرهای محیطی

### دریافت کلیدهای API

1. **URL پروژه**:
   - در داشبورد Supabase، به تب "Settings" بروید
   - روی "API" کلیک کنید
   - `Project URL` را کپی کنید

2. **کلید Anonymous**:
   - در همان صفحه، `anon public` key را کپی کنید

3. **کلید Service Role**:
   - `service_role` key را کپی کنید (این کلید محرمانه است!)

### تنظیم فایل .env.local

فایل `.env.local` را در ریشه پروژه ایجاد کنید:

\`\`\`env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Development Redirect URL
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000

# Admin Email (برای دسترسی ادمین)
ADMIN_EMAIL=mr.alireza.sargazi1@gmail.com
\`\`\`

## 🗄️ راه‌اندازی دیتابیس

### اجرای اسکریپت‌های دیتابیس

1. **اسکریپت ساختار دیتابیس**:
   \`\`\`bash
   # اجرای اسکریپت ایجاد جداول
   npm run db:setup
   \`\`\`

2. **اسکریپت داده‌های اولیه**:
   \`\`\`bash
   # بارگذاری داده‌های نمونه
   npm run db:seed
   \`\`\`

### ساختار جداول

#### جدول blog_posts
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

#### جدول consultation_requests
\`\`\`sql
CREATE TABLE consultation_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service_type TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
\`\`\`

#### جدول training_requests
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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
\`\`\`

#### جدول portfolio_projects
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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
\`\`\`

## 🔐 تنظیم احراز هویت

### فعال‌سازی احراز هویت ایمیل

1. در داشبورد Supabase، به "Authentication" بروید
2. در تب "Settings"، "Email" را فعال کنید
3. تنظیمات زیر را اعمال کنید:
   - Enable email confirmations: ✅
   - Enable email change confirmations: ✅
   - Enable secure email change: ✅

### تنظیم URL های Redirect

1. در بخش "URL Configuration":
   - Site URL: `http://localhost:3000` (برای توسعه)
   - Redirect URLs: 
     - `http://localhost:3000/auth/callback`
     - `https://yourdomain.com/auth/callback` (برای تولید)

### ایجاد کاربر ادمین

\`\`\`sql
-- اجرا در SQL Editor داشبورد Supabase
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  role
) VALUES (
  gen_random_uuid(),
  'mr.alireza.sargazi1@gmail.com',
  crypt('your-password', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  'authenticated'
);
\`\`\`

## 🛡️ امنیت و RLS

### فعال‌سازی Row Level Security

\`\`\`sql
-- فعال‌سازی RLS برای تمام جداول
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE consultation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_projects ENABLE ROW LEVEL SECURITY;
\`\`\`

### سیاست‌های امنیتی

#### برای blog_posts:
\`\`\`sql
-- خواندن عمومی پست‌های منتشر شده
CREATE POLICY "Public can read published posts" ON blog_posts
  FOR SELECT USING (published = true);

-- ادمین می‌تواند همه کار کند
CREATE POLICY "Admin can do everything" ON blog_posts
  FOR ALL USING (auth.jwt() ->> 'email' = 'mr.alireza.sargazi1@gmail.com');
\`\`\`

#### برای consultation_requests:
\`\`\`sql
-- همه می‌توانند درخواست ایجاد کنند
CREATE POLICY "Anyone can create consultation requests" ON consultation_requests
  FOR INSERT WITH CHECK (true);

-- فقط ادمین می‌تواند ببیند
CREATE POLICY "Admin can read consultation requests" ON consultation_requests
  FOR SELECT USING (auth.jwt() ->> 'email' = 'mr.alireza.sargazi1@gmail.com');
\`\`\`

## 🔌 API و کوئری‌ها

### کلاینت Supabase

\`\`\`typescript
// lib/supabase/client.ts
import { createBrowserClient } from '@supabase/ssr'

export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
\`\`\`

### نمونه کوئری‌ها

#### دریافت پست‌های وبلاگ:
\`\`\`typescript
const { data: posts, error } = await supabase
  .from('blog_posts')
  .select('*')
  .eq('published', true)
  .order('created_at', { ascending: false })
\`\`\`

#### ایجاد درخواست مشاوره:
\`\`\`typescript
const { data, error } = await supabase
  .from('consultation_requests')
  .insert({
    name,
    email,
    phone,
    service_type,
    message
  })
\`\`\`

#### دریافت پروژه‌های نمونه کار:
\`\`\`typescript
const { data: projects, error } = await supabase
  .from('portfolio_projects')
  .select('*')
  .order('order_index', { ascending: true })
\`\`\`

## 🔍 عیب‌یابی

### مشکلات رایج

#### ۱. خطای اتصال
\`\`\`
Error: Invalid API key
\`\`\`
**راه‌حل**: بررسی کنید که کلیدهای API در `.env.local` صحیح باشند

#### ۲. خطای RLS
\`\`\`
Error: Row Level Security policy violation
\`\`\`
**راه‌حل**: اطمینان حاصل کنید که سیاست‌های RLS درست تنظیم شده‌اند

#### ۳. خطای احراز هویت
\`\`\`
Error: User not authenticated
\`\`\`
**راه‌حل**: بررسی کنید که کاربر وارد شده باشد و session معتبر باشد

### ابزارهای عیب‌یابی

#### ۱. لاگ‌های Supabase
\`\`\`typescript
// اضافه کردن لاگ برای عیب‌یابی
console.log('[v0] Supabase query:', { data, error })
\`\`\`

#### ۲. بررسی Session
\`\`\`typescript
const { data: { session } } = await supabase.auth.getSession()
console.log('[v0] Current session:', session)
\`\`\`

#### ۳. تست کوئری‌ها
\`\`\`typescript
// تست ساده اتصال
const { data, error } = await supabase
  .from('blog_posts')
  .select('count(*)')
  
if (error) {
  console.error('[v0] Database connection error:', error)
} else {
  console.log('[v0] Database connected successfully:', data)
}
\`\`\`

## 📊 نظارت و عملکرد

### داشبورد Supabase
1. **Database**: مشاهده جداول و داده‌ها
2. **Auth**: مدیریت کاربران
3. **Storage**: مدیریت فایل‌ها
4. **Edge Functions**: توابع سرور
5. **Logs**: لاگ‌های سیستم

### بهینه‌سازی کوئری‌ها
\`\`\`sql
-- ایجاد ایندکس برای بهبود عملکرد
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_created_at ON blog_posts(created_at DESC);
CREATE INDEX idx_consultation_requests_status ON consultation_requests(status);
\`\`\`

## 🚀 استقرار در تولید

### تنظیمات تولید
1. URL سایت را در تنظیمات Auth به‌روزرسانی کنید
2. متغیرهای محیطی را در پلتفرم میزبانی تنظیم کنید
3. SSL را فعال کنید
4. بک‌آپ خودکار را تنظیم کنید

### نکات امنیتی
- هرگز Service Role Key را در کد کلاینت استفاده نکنید
- RLS را همیشه فعال نگه دارید
- رمزهای عبور قوی استفاده کنید
- دسترسی‌ها را به حداقل محدود کنید

---

**این راهنما توسط علیرضا سرگزی تهیه شده است**
