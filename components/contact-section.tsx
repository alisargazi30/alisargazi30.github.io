"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react"
import Link from "next/link"
import type { Locale } from "@/lib/i18n/config"
import { isRTL } from "@/lib/i18n/config"
import { cn } from "@/lib/utils"

interface ContactSectionProps {
  locale: Locale
  dict: any
}

export function ContactSection({ locale, dict }: ContactSectionProps) {
  const isRtl = isRTL(locale)

  const contactInfo = [
    {
      icon: Mail,
      label: dict.contact.email,
      value: "mr.alireza.sargazi1@gmail.com",
      href: "mailto:mr.alireza.sargazi1@gmail.com",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Phone,
      label: dict.contact.phone,
      value: "+98 937 933 9170",
      href: "tel:+989379339170",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: MapPin,
      label: dict.contact.location,
      value: locale === "fa" ? "کیش، ایران" : "Kish, Iran",
      href: "#",
      color: "from-purple-500 to-pink-500",
    },
  ]

  return (
    <section className={cn("py-20 bg-muted/30", isRtl ? "rtl" : "ltr")} id="contact">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {dict.contact.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {locale === "fa"
              ? "آماده همکاری و پاسخگویی به سوالات شما هستم. از طریق راه‌های زیر با من در تماس باشید"
              : "Ready to collaborate and answer your questions. Get in touch through the following channels"}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full bg-gradient-to-r flex items-center justify-center group-hover:scale-110 transition-transform duration-300",
                        info.color,
                      )}
                    >
                      <info.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{info.label}</h3>
                      {info.href !== "#" ? (
                        <Link
                          href={info.href}
                          className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {info.value}
                        </Link>
                      ) : (
                        <p className="text-muted-foreground">{info.value}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section */}
          <div className="text-center lg:text-left rtl:lg:text-right">
            <h3 className="text-2xl font-bold mb-4">
              {locale === "fa" ? "آماده شروع پروژه هستید؟" : "Ready to Start Your Project?"}
            </h3>
            <p className="text-muted-foreground mb-8 text-lg">
              {locale === "fa"
                ? "بیایید درباره ایده‌هایتان صحبت کنیم و آن‌ها را به واقعیت تبدیل کنیم"
                : "Let's discuss your ideas and turn them into reality"}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start rtl:lg:justify-end">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Link href={`/${locale}/consultation`}>
                  <MessageSquare className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                  {dict.nav.consultation}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href={`/${locale}/training`}>{dict.nav.training}</Link>
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex justify-center lg:justify-start rtl:lg:justify-end space-x-4 rtl:space-x-reverse mt-8">
              <Link
                href="https://instagram.com/ali_sargazi30"
                className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-colors group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
