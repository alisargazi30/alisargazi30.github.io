import { getDictionary } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"
import { Navigation } from "@/components/navigation"
import { PortfolioSection } from "@/components/portfolio-section"
import { isRTL } from "@/lib/i18n/config"

interface PageProps {
  params: Promise<{
    locale: Locale
  }>
}

export default async function PortfolioPage({ params }: PageProps) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const isRtl = isRTL(locale)

  return (
    <div className={isRtl ? "rtl" : "ltr"}>
      <Navigation locale={locale} dict={dict} />
      <main className="pt-16">
        <div className="py-12 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {locale === "fa" ? "نمونه کارهای من" : "My Portfolio"}
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {locale === "fa"
                ? "مجموعه کاملی از پروژه‌هایی که با عشق و دقت ساخته‌ام"
                : "A complete collection of projects I've built with passion and precision"}
            </p>
          </div>
        </div>
        <PortfolioSection locale={locale} dict={dict} />
      </main>
    </div>
  )
}
