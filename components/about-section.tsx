"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Award, Users, Coffee } from "lucide-react"
import Link from "next/link"
import type { Locale } from "@/lib/i18n/config"
import { isRTL } from "@/lib/i18n/config"
import { cn } from "@/lib/utils"

interface AboutSectionProps {
  locale: Locale
  dict: any
}

export function AboutSection({ locale, dict }: AboutSectionProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const isRtl = isRTL(locale)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const achievements = [
    {
      icon: Award,
      number: "5+",
      label: locale === "fa" ? "سال تجربه" : "Years Experience",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Users,
      number: "50+",
      label: locale === "fa" ? "پروژه موفق" : "Successful Projects",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: Coffee,
      number: "1000+",
      label: locale === "fa" ? "فنجان قهوه" : "Cups of Coffee",
      color: "from-orange-500 to-red-500",
    },
  ]

  const services = [
    {
      title: locale === "fa" ? "توسعه وب" : "Web Development",
      description:
        locale === "fa"
          ? "ساخت وبسایت‌ها و اپلیکیشن‌های مدرن با React و Next.js"
          : "Building modern websites and applications with React and Next.js",
      icon: "🌐",
    },
    {
      title: locale === "fa" ? "مشاوره هوش مصنوعی" : "AI Consulting",
      description:
        locale === "fa"
          ? "راهنمایی کسب‌وکارها برای استفاده بهینه از هوش مصنوعی"
          : "Guiding businesses to leverage AI technologies effectively",
      icon: "🤖",
    },
    {
      title: locale === "fa" ? "چت‌بات و اتوماسیون" : "Chatbots & Automation",
      description:
        locale === "fa"
          ? "ساخت چت‌بات‌های هوشمند و اتوماسیون فرآیندها با n8n"
          : "Creating intelligent chatbots and process automation with n8n",
      icon: "⚡",
    },
  ]

  return (
    <section ref={sectionRef} className={cn("py-20 bg-muted/30", isRtl ? "rtl" : "ltr")} id="about">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - About Content */}
          <div
            className={cn(
              "transform transition-all duration-1000",
              isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0",
            )}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {dict.about.title}
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{dict.about.description}</p>

            {/* Achievements */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={cn(
                    "text-center transform transition-all duration-1000",
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
                  )}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div
                    className={cn(
                      "w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-r flex items-center justify-center",
                      achievement.color,
                    )}
                  >
                    <achievement.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-foreground">{achievement.number}</div>
                  <div className="text-sm text-muted-foreground">{achievement.label}</div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Link href={`/${locale}/consultation`}>{dict.hero.contact}</Link>
              </Button>
              <Button variant="outline" size="lg">
                <Download className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                {locale === "fa" ? "دانلود رزومه" : "Download Resume"}
              </Button>
            </div>
          </div>

          {/* Right Column - Services */}
          <div
            className={cn(
              "transform transition-all duration-1000 delay-300",
              isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0",
            )}
          >
            <div className="space-y-6">
              {services.map((service, index) => (
                <Card
                  key={index}
                  className={cn(
                    "group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 transform",
                    isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0",
                  )}
                  style={{ transitionDelay: `${(index + 1) * 200}ms` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 rtl:space-x-reverse">
                      <div className="text-3xl">{service.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground">{service.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
