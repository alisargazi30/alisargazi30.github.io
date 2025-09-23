-- Create profiles table for user management
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT NOT NULL,
  title_fa TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content_en TEXT NOT NULL,
  content_fa TEXT NOT NULL,
  excerpt_en TEXT,
  excerpt_fa TEXT,
  featured_image TEXT,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE
);

-- Create consultation requests table
CREATE TABLE IF NOT EXISTS public.consultation_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT,
  message_en TEXT,
  message_fa TEXT,
  service_type TEXT NOT NULL, -- 'web-development', 'ai-consulting', 'chatbot', 'automation'
  status TEXT DEFAULT 'pending', -- 'pending', 'contacted', 'completed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create training requests table
CREATE TABLE IF NOT EXISTS public.training_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  course_type TEXT NOT NULL, -- 'frontend', 'python', 'ai', 'automation'
  experience_level TEXT NOT NULL, -- 'beginner', 'intermediate', 'advanced'
  preferred_language TEXT NOT NULL, -- 'en', 'fa'
  message_en TEXT,
  message_fa TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create portfolio projects table
CREATE TABLE IF NOT EXISTS public.portfolio_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT NOT NULL,
  title_fa TEXT NOT NULL,
  description_en TEXT NOT NULL,
  description_fa TEXT NOT NULL,
  technologies TEXT[] NOT NULL,
  project_url TEXT,
  github_url TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT FALSE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultation_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_projects ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Allow users to view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Allow users to update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Allow users to insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Blog posts policies (admin only for CUD, public read for published)
CREATE POLICY "Anyone can view published blog posts" ON public.blog_posts FOR SELECT USING (published = true);
CREATE POLICY "Admin can manage all blog posts" ON public.blog_posts FOR ALL USING (auth.uid() IN (
  SELECT id FROM auth.users WHERE email = 'mr.alireza.sargazi1@gmail.com'
));

-- Consultation requests policies (public insert, admin read)
CREATE POLICY "Anyone can submit consultation requests" ON public.consultation_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can view consultation requests" ON public.consultation_requests FOR SELECT USING (auth.uid() IN (
  SELECT id FROM auth.users WHERE email = 'mr.alireza.sargazi1@gmail.com'
));
CREATE POLICY "Admin can update consultation requests" ON public.consultation_requests FOR UPDATE USING (auth.uid() IN (
  SELECT id FROM auth.users WHERE email = 'mr.alireza.sargazi1@gmail.com'
));

-- Training requests policies (public insert, admin read)
CREATE POLICY "Anyone can submit training requests" ON public.training_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin can view training requests" ON public.training_requests FOR SELECT USING (auth.uid() IN (
  SELECT id FROM auth.users WHERE email = 'mr.alireza.sargazi1@gmail.com'
));
CREATE POLICY "Admin can update training requests" ON public.training_requests FOR UPDATE USING (auth.uid() IN (
  SELECT id FROM auth.users WHERE email = 'mr.alireza.sargazi1@gmail.com'
));

-- Portfolio projects policies (admin manage, public read)
CREATE POLICY "Anyone can view portfolio projects" ON public.portfolio_projects FOR SELECT USING (true);
CREATE POLICY "Admin can manage portfolio projects" ON public.portfolio_projects FOR ALL USING (auth.uid() IN (
  SELECT id FROM auth.users WHERE email = 'mr.alireza.sargazi1@gmail.com'
));
