import { getDictionary } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"
import { Navigation } from "@/components/navigation"
import { ConsultationForm } from "@/components/consultation-form"
import { isRTL } from "@/lib/i18n/config"
import { MessageSquare, Zap, Brain, Code } from "lucide-react"

interface PageProps {
  params: Promise<{
    locale: Locale
  }>
}

export default async function ConsultationPage({ params }: PageProps) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const isRtl = isRTL(locale)

  const services = [
    {
      icon: Code,
      title: dict.consultation.services["web-development"],
      description:
        locale === "fa"
          ? "توسعه وبسایت‌ها و اپلیکیشن‌های مدرن با تکنولوژی‌های روز"
          : "Modern website and application development with cutting-edge technologies",
    },
    {
      icon: Brain,
      title: dict.consultation.services["ai-consulting"],
      description:
        locale === "fa"
          ? "مشاوره و پیاده‌سازی راه‌حل‌های هوش مصنوعی برای کسب‌وکار شما"
          : "AI strategy and implementation consulting for your business needs",
    },
    {
      icon: MessageSquare,
      title: dict.consultation.services.chatbot,
      description:
        locale === "fa"
          ? "طراحی و توسعه چت‌بات‌های هوشمند برای بهبود خدمات مشتری"
          : "Intelligent chatbot design and development for enhanced customer service",
    },
    {
      icon: Zap,
      title: dict.consultation.services.automation,
      description:
        locale === "fa"
          ? "اتوماسیون فرآیندهای کسب‌وکار با ابزارهای پیشرفته مثل n8n"
          : "Business process automation with advanced tools like n8n",
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
              {dict.consultation.title}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              {locale === "fa"
                ? "آماده‌ام تا در پروژه‌های وب، هوش مصنوعی و اتوماسیون به شما کمک کنم. بیایید درباره ایده‌هایتان صحبت کنیم."
                : "Ready to help you with web development, AI, and automation projects. Let's discuss your ideas and bring them to life."}
            </p>
          </div>
        </div>

        {/* Services Overview */}
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{locale === "fa" ? "خدمات مشاوره" : "Consultation Services"}</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {locale === "fa"
                  ? "در زمینه‌های مختلف تکنولوژی آماده ارائه مشاوره و خدمات تخصصی هستم"
                  : "I offer expert consultation and specialized services across various technology domains"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="p-6 rounded-lg bg-muted/30 hover:bg-muted/50 transition-all duration-300 hover:-translate-y-1 text-center"
                >
                  <service.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <ConsultationForm locale={locale} dict={dict} />
          </div>
        </section>
      </main>
    </div>
  )
}
