import type React from "react"
import { notFound } from "next/navigation"
import { locales, type Locale } from "@/lib/i18n/config"

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{
    locale: Locale
  }>
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params

  if (!locales.includes(locale)) {
    notFound()
  }

  return children
}
