import type React from "react"
import type { Metadata } from "next"
import { Vazirmatn } from "next/font/google"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Suspense } from "react"
import { LoadingScreen } from "@/components/loading-screen"
import { ScrollProgress } from "@/components/scroll-progress"
import { FloatingElements } from "@/components/floating-elements"
import { CursorGlow } from "@/components/cursor-glow"
import "./globals.css"

const vazirmatn = Vazirmatn({
  subsets: ["arabic", "latin"],
  variable: "--font-vazirmatn",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "Alireza Sargazi - Senior Web Developer & AI Consultant",
  description:
    "Expert web developer and AI consultant specializing in React, Next.js, Python, and AI technologies. Building exceptional digital experiences.",
  generator: "v0.app",
  keywords: ["web development", "AI consulting", "React", "Next.js", "Python", "chatbots", "automation", "n8n"],
  authors: [{ name: "Alireza Sargazi" }],
  openGraph: {
    title: "Alireza Sargazi - Senior Web Developer & AI Consultant",
    description: "Expert web developer and AI consultant specializing in React, Next.js, Python, and AI technologies.",
    type: "website",
    locale: "en_US",
    alternateLocale: "fa_IR",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased ${GeistSans.variable} ${GeistMono.variable} ${vazirmatn.variable}`}>
        <LoadingScreen />
        <ScrollProgress />
        <FloatingElements />
        <CursorGlow />

        <Suspense fallback={null}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
          </ThemeProvider>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
