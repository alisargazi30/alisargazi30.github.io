import { getDictionary } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { BlogSection } from "@/components/blog-section"
import { ContactSection } from "@/components/contact-section"
import { PageTransition } from "@/components/page-transition"
import { RevealOnScroll } from "@/components/reveal-on-scroll"
import { isRTL } from "@/lib/i18n/config"

interface PageProps {
  params: Promise<{
    locale: Locale
  }>
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params
  const dict = await getDictionary(locale)
  const isRtl = isRTL(locale)

  return (
    <PageTransition>
      <div className={isRtl ? "rtl" : "ltr"}>
        <Navigation locale={locale} dict={dict} />
        <main>
          <HeroSection locale={locale} dict={dict} />

          <RevealOnScroll direction="up">
            <AboutSection locale={locale} dict={dict} />
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.2}>
            <SkillsSection locale={locale} dict={dict} />
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.3}>
            <PortfolioSection locale={locale} dict={dict} />
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.4}>
            <BlogSection locale={locale} dict={dict} />
          </RevealOnScroll>

          <RevealOnScroll direction="up" delay={0.5}>
            <ContactSection locale={locale} dict={dict} />
          </RevealOnScroll>
        </main>
      </div>
    </PageTransition>
  )
}
