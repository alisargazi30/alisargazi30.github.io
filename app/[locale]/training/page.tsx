import { getDictionary } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"
import { Navigation } from "@/components/navigation"
import { TrainingForm } from "@/components/training-form"
import { isRTL } from "@/lib/i18n/config"
import { Code, Database, Brain, Zap, Clock, Users, Award } from "lucide-react"

interface PageProps {
  params: Promise<{
    locale: Locale
  }>
}

export default async function TrainingPage({ params }: PageProps) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const isRtl = isRTL(locale)

  const courses = [
    {
      icon: Code,
      title: dict.training.courses.frontend,
      description:
        locale === "fa"
          ? "آموزش کامل React، Next.js، TypeScript و Tailwind CSS"
          : "Complete training in React, Next.js, TypeScript, and Tailwind CSS",
      duration: locale === "fa" ? "۸-۱۲ جلسه" : "8-12 sessions",
    },
    {
      icon: Database,
      title: dict.training.courses.python,
      description:
        locale === "fa"
          ? "برنامه‌نویسی پایتون از مبتدی تا پیشرفته شامل Django"
          : "Python programming from beginner to advanced including Django",
      duration: locale === "fa" ? "۱۰-۱۵ جلسه" : "10-15 sessions",
    },
    {
      icon: Brain,
      title: dict.training.courses.ai,
      description:
        locale === "fa"
          ? "مقدمات هوش مصنوعی، یادگیری ماشین و کار با API های AI"
          : "AI fundamentals, machine learning, and working with AI APIs",
      duration: locale === "fa" ? "۶-۱۰ جلسه" : "6-10 sessions",
    },
    {
      icon: Zap,
      title: dict.training.courses.automation,
      description:
        locale === "fa"
          ? "اتوماسیون فرآیندها با n8n و ابزارهای مشابه"
          : "Process automation with n8n and similar tools",
      duration: locale === "fa" ? "۴-۸ جلسه" : "4-8 sessions",
    },
  ]

  const features = [
    {
      icon: Users,
      title: locale === "fa" ? "آموزش شخصی‌سازی شده" : "Personalized Training",
      description:
        locale === "fa"
          ? "برنامه آموزشی متناسب با سطح و نیازهای شما"
          : "Customized curriculum based on your level and needs",
    },
    {
      icon: Clock,
      title: locale === "fa" ? "زمان‌بندی انعطاف‌پذیر" : "Flexible Scheduling",
      description:
        locale === "fa" ? "جلسات در زمان‌های مناسب شما برگزار می‌شود" : "Sessions scheduled at your convenient times",
    },
    {
      icon: Award,
      title: locale === "fa" ? "پروژه عملی" : "Hands-on Projects",
      description:
        locale === "fa"
          ? "یادگیری از طریق پروژه‌های واقعی و کاربردی"
          : "Learning through real-world, practical projects",
    },
  ]

  return (
    <div className={isRtl ? "rtl" : "ltr"}>
      <Navigation locale={locale} dict={dict} />
      <main className="pt-16">
        {/* Hero Section */}
        <div className="py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {dict.training.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {locale === "fa"
                ? "با آموزش‌های تخصصی و شخصی‌سازی شده، مهارت‌های برنامه‌نویسی و تکنولوژی خود را ارتقا دهید"
                : "Enhance your programming and technology skills with specialized, personalized training sessions"}
            </p>
          </div>
        </div>

        {/* Features */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{locale === "fa" ? "چرا آموزش با من؟" : "Why Train With Me?"}</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="text-center p-6 rounded-lg bg-background hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Courses */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{locale === "fa" ? "دوره‌های آموزشی" : "Training Courses"}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {locale === "fa"
                  ? "دوره‌های جامع و عملی در زمینه‌های مختلف برنامه‌نویسی و تکنولوژی"
                  : "Comprehensive and practical courses in various programming and technology fields"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {courses.map((course, index) => (
                <div
                  key={index}
                  className="p-6 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-300 hover:-translate-y-1"
                >
                  <course.icon className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
                  <p className="text-muted-foreground mb-4">{course.description}</p>
                  <div className="flex items-center text-sm text-blue-600">
                    <Clock className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                    {course.duration}
                  </div>
                </div>
              ))}
            </div>

            {/* Training Request Form */}
            <TrainingForm locale={locale} dict={dict} />
          </div>
        </section>
      </main>
    </div>
  )
}
