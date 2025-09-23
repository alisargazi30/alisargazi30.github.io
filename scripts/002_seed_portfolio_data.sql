-- Insert sample portfolio projects
INSERT INTO public.portfolio_projects (title_en, title_fa, description_en, description_fa, technologies, project_url, github_url, featured, order_index) VALUES
(
  'MyHomeKish E-commerce Platform',
  'پلتفرم تجارت الکترونیک مای هوم کیش',
  'A comprehensive e-commerce platform built with modern web technologies, featuring product management, order processing, and payment integration.',
  'یک پلتفرم جامع تجارت الکترونیک که با تکنولوژی‌های مدرن وب ساخته شده و شامل مدیریت محصولات، پردازش سفارشات و یکپارچگی پرداخت است.',
  ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Stripe'],
  'https://myhomekish.com',
  NULL,
  true,
  1
),
(
  'ArmaghanKish Corporate Website',
  'وبسایت شرکتی ارمغان کیش',
  'Modern corporate website with responsive design and content management system for Armaghan Kish company.',
  'وبسایت مدرن شرکتی با طراحی واکنش‌گرا و سیستم مدیریت محتوا برای شرکت ارمغان کیش.',
  ARRAY['WordPress', 'PHP', 'MySQL', 'JavaScript', 'CSS3'],
  'https://armaghankish.ir',
  NULL,
  true,
  2
),
(
  'RokharAkish Product Showcase',
  'نمایشگاه محصولات رخ آرکیش',
  'Product showcase website with advanced filtering, 3D product views, and interactive catalog for construction materials.',
  'وبسایت نمایش محصولات با فیلترینگ پیشرفته، نمای سه‌بعدی محصولات و کاتالوگ تعاملی برای مصالح ساختمانی.',
  ARRAY['React', 'Three.js', 'Node.js', 'MongoDB', 'WebGL'],
  'https://rokharakish.com',
  NULL,
  true,
  3
),
(
  'SargaziWeb Portfolio',
  'نمونه کار سرگزی وب',
  'Personal portfolio website showcasing web development projects and AI consulting services.',
  'وبسایت نمونه کار شخصی که پروژه‌های توسعه وب و خدمات مشاوره هوش مصنوعی را نمایش می‌دهد.',
  ARRAY['Next.js', 'TypeScript', 'Framer Motion', 'Tailwind CSS'],
  'https://sargaziweb.com',
  NULL,
  false,
  4
);

-- Insert sample blog posts
INSERT INTO public.blog_posts (title_en, title_fa, slug, content_en, content_fa, excerpt_en, excerpt_fa, published, author_id) VALUES
(
  'The Future of AI in Web Development',
  'آینده هوش مصنوعی در توسعه وب',
  'future-of-ai-web-development',
  'Artificial Intelligence is revolutionizing web development in unprecedented ways. From automated code generation to intelligent user interfaces, AI is transforming how we build and interact with web applications...',
  'هوش مصنوعی در حال انقلاب در توسعه وب به شیوه‌های بی‌سابقه است. از تولید خودکار کد تا رابط‌های کاربری هوشمند، هوش مصنوعی نحوه ساخت و تعامل ما با اپلیکیشن‌های وب را تغییر می‌دهد...',
  'Exploring how AI is transforming web development and what it means for developers.',
  'بررسی اینکه چگونه هوش مصنوعی توسعه وب را تغییر می‌دهد و برای توسعه‌دهندگان چه معنایی دارد.',
  true,
  (SELECT id FROM auth.users WHERE email = 'mr.alireza.sargazi1@gmail.com' LIMIT 1)
);
