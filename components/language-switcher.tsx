"use client"

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Globe } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import type { Locale } from "@/lib/i18n/config"
import { localeNames } from "@/lib/i18n/config"

interface LanguageSwitcherProps {
  currentLocale: Locale
}

export function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps) {
  const router = useRouter()
  const pathname = usePathname()

  const switchLanguage = (locale: Locale) => {
    // Remove current locale from pathname and add new one
    const segments = pathname.split("/").filter(Boolean)
    if (segments[0] === "en" || segments[0] === "fa") {
      segments.shift()
    }
    const newPath = `/${locale}${segments.length > 0 ? "/" + segments.join("/") : ""}`
    router.push(newPath)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{localeNames[currentLocale]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => switchLanguage("en")} className={currentLocale === "en" ? "bg-accent" : ""}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => switchLanguage("fa")} className={currentLocale === "fa" ? "bg-accent" : ""}>
          فارسی
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
