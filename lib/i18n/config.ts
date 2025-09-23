export const defaultLocale = "fa" as const
export const locales = ["en", "fa"] as const

export type Locale = (typeof locales)[number]

export const localeNames: Record<Locale, string> = {
  en: "English",
  fa: "فارسی",
}

export const isRTL = (locale: Locale): boolean => locale === "fa"
