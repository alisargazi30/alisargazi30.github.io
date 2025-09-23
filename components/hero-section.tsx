"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowDown, Github, Mail, Phone } from "lucide-react"
import Link from "next/link"
import type { Locale } from "@/lib/i18n/config"
import { isRTL } from "@/lib/i18n/config"
import { cn } from "@/lib/utils"
import { EnhancedButton } from "@/components/enhanced-button"
import { MagneticHover } from "@/components/magnetic-hover"
import { RevealOnScroll } from "@/components/reveal-on-scroll"

interface HeroSectionProps {
  locale: Locale
  dict: any
}

export function HeroSection({ locale, dict }: HeroSectionProps) {
  const [currentRole, setCurrentRole] = useState(0)
  const isRtl = isRTL(locale)

  const roles = [
    dict.hero.title,
    locale === "fa" ? "متخصص React و Next.js" : "React & Next.js Expert",
    locale === "fa" ? "توسعه‌دهنده Python" : "Python Developer",
    locale === "fa" ? "متخصص چت‌بات و n8n" : "Chatbot & n8n Specialist",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [roles.length])

  return (
    <section
      className={cn("min-h-screen flex items-center justify-center relative overflow-hidden", isRtl ? "rtl" : "ltr")}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />

        {/* Floating particles */}
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <MagneticHover strength={0.2}>
            <motion.div
              className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 p-1"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                <span className="text-4xl font-bold bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AS
                </span>
              </div>
            </motion.div>
          </MagneticHover>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-lg text-muted-foreground mb-2">{dict.hero.greeting}</p>
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {dict.hero.name}
            </motion.h1>
          </motion.div>

          <motion.div
            className="h-16 mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <motion.h2
              key={currentRole}
              className="text-2xl md:text-3xl font-semibold text-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {roles[currentRole]}
            </motion.h2>
          </motion.div>

          <RevealOnScroll direction="up" delay={0.9}>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">{dict.hero.subtitle}</p>
          </RevealOnScroll>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            <MagneticHover>
              <EnhancedButton variant="primary" size="lg">
                <Link href={`/${locale}#portfolio`}>{dict.hero.cta}</Link>
              </EnhancedButton>
            </MagneticHover>
            <MagneticHover>
              <EnhancedButton variant="outline" size="lg">
                <Link href={`/${locale}#contact`}>{dict.hero.contact}</Link>
              </EnhancedButton>
            </MagneticHover>
          </motion.div>

          <motion.div
            className="flex justify-center space-x-6 rtl:space-x-reverse mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            {[
              { href: "mailto:mr.alireza.sargazi1@gmail.com", icon: Mail },
              { href: "tel:+989379339170", icon: Phone },
              { href: "https://instagram.com/ali_sargazi30", icon: "instagram" },
              { href: "https://github.com/alirezasargazi", icon: Github },
            ].map((social, index) => (
              <motion.div
                key={social.href}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + index * 0.1, type: "spring" }}
              >
                <MagneticHover>
                  <Link
                    href={social.href}
                    className="p-3 rounded-full bg-muted hover:bg-muted/80 transition-all duration-300 group hover:shadow-lg"
                  >
                    {social.icon === "instagram" ? (
                      <svg
                        className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    ) : (
                      <social.icon className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    )}
                  </Link>
                </MagneticHover>
              </motion.div>
            ))}
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8 }}>
            <div className="flex flex-col items-center">
              <p className="text-sm text-muted-foreground mb-2">{dict.common.viewMore}</p>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
                <ArrowDown className="h-5 w-5 text-muted-foreground" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
