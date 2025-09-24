# 🚀 Alireza Sargazi - Personal Portfolio Website

A world-class, bilingual personal portfolio website built with Next.js 15, featuring stunning animations, AI integrations, and comprehensive content management.

## ✨ Features

### 🎨 Design & User Experience
- **Stunning Animations**: Advanced Framer Motion animations with magnetic hover effects, particle systems, and smooth transitions
- **Bilingual Support**: Full Persian (RTL) and English (LTR) support with proper typography
- **Dark/Light Theme**: Seamless theme switching with smooth transitions
- **Responsive Design**: Mobile-first approach with perfect adaptation across all devices
- **Glassmorphism Effects**: Modern UI with backdrop blur and transparency effects
- **Custom Cursor**: Interactive cursor with glow effects and magnetic attraction

### 🛠 Technical Excellence
- **Next.js 15**: Latest App Router with server components and streaming
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS v4**: Modern styling with custom design system
- **Framer Motion**: Advanced animations and micro-interactions
- **Supabase Integration**: Full-stack database with Row Level Security
- **Persian Fonts**: Vazirmatn font for beautiful Persian typography

### 📱 Core Sections
- **Hero Section**: Animated introduction with role rotation and particle effects
- **About**: Professional background with animated statistics
- **Skills**: Interactive skill bars with progress animations
- **Portfolio**: Dynamic project showcase with filtering capabilities
- **Blog**: Full-featured blog system with admin panel
- **Contact**: Consultation and training request forms

### 🔐 Admin Features
- **Authentication**: Secure login system with Supabase Auth
- **Blog Management**: Create, edit, and publish articles in both languages
- **Request Management**: Handle consultation and training requests
- **Dashboard**: Real-time statistics and quick access to all features

### 🤖 AI & Automation
- **Chatbot Integration**: Ready for AI chatbot implementation
- **n8n Automation**: Workflow automation capabilities
- **AI Consulting**: Specialized AI and machine learning services

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/alirezasargazi/portfolio.git
   cd portfolio
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Fill in your Supabase credentials:
   \`\`\`env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
   \`\`\`

4. **Set up the database**
   \`\`\`bash
   # Run the database schema script
   npm run db:setup
   
   # Seed initial data
   npm run db:seed
   \`\`\`

5. **Start the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

\`\`\`
├── app/                    # Next.js App Router
│   ├── [locale]/          # Internationalized routes
│   ├── admin/             # Admin dashboard
│   ├── auth/              # Authentication pages
│   └── api/               # API routes
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   └── ...               # Feature components
├── lib/                  # Utilities and configurations
│   ├── i18n/            # Internationalization
│   ├── supabase/        # Database client
│   └── utils.ts         # Helper functions
├── scripts/             # Database scripts
└── public/              # Static assets
\`\`\`

## 🗄️ Database Schema

### Tables
- **blog_posts**: Bilingual blog articles with metadata
- **consultation_requests**: Client consultation inquiries
- **training_requests**: Training and course requests
- **portfolio_projects**: Project showcase data

### Security
- Row Level Security (RLS) enabled on all tables
- Admin-only access for content management
- Public read access for published content

## 🌐 Internationalization

### Supported Languages
- **English (en)**: Left-to-right layout
- **Persian (fa)**: Right-to-left layout with proper typography

### Adding New Languages
1. Create dictionary file in `lib/i18n/dictionaries/`
2. Add locale to `lib/i18n/config.ts`
3. Update font configurations if needed

## 🎨 Customization

### Theme Colors
Modify the color palette in `app/globals.css`:
\`\`\`css
:root {
  --primary: your-color;
  --secondary: your-color;
  /* ... */
}
\`\`\`

### Animations
Customize animations in component files or add new ones to `globals.css`

### Content
Update personal information in:
- Dictionary files (`lib/i18n/dictionaries/`)
- Database seed script (`scripts/002_seed_portfolio_data.sql`)

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Add environment variables
4. Deploy automatically

### Other Platforms
The app is compatible with any platform supporting Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## 📊 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for excellent user experience
- **Image Optimization**: Next.js automatic image optimization
- **Code Splitting**: Automatic route-based code splitting

## 🔧 Development

### Available Scripts
\`\`\`bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
npm run db:setup     # Set up database schema
npm run db:seed      # Seed initial data
\`\`\`

### Code Quality
- ESLint configuration for code consistency
- TypeScript for type safety
- Prettier for code formatting
- Husky for pre-commit hooks

## 📝 Content Management

### Blog Posts
- Create bilingual articles through admin panel
- Markdown support for rich content
- SEO optimization with meta tags
- Automatic slug generation

### Portfolio Projects
- Showcase projects with images and descriptions
- Technology tags and filtering
- External links to live demos and repositories

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Alireza Sargazi**
- Email: mr.alireza.sargazi1@gmail.com
- Phone: +98 937 933 9170
- Instagram: [@ali_sargazi30](https://instagram.com/ali_sargazi30)
- Website: [sargaziweb.com](https://sargaziweb.com)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- Supabase for the backend infrastructure
- Framer Motion for smooth animations
- Tailwind CSS for the design system

---

**Built with ❤️ by Alireza Sargazi**
