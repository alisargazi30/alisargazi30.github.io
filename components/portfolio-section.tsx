"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Locale } from "@/lib/i18n/config"
import { isRTL } from "@/lib/i18n/config"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"

interface PortfolioSectionProps {
  locale: Locale
  dict: any
}

interface Project {
  id: string
  title_en: string
  title_fa: string
  description_en: string
  description_fa: string
  technologies: string[]
  project_url?: string
  github_url?: string
  image_url?: string
  featured: boolean
}

export function PortfolioSection({ locale, dict }: PortfolioSectionProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "featured" | "web" | "ai">("all")
  const isRtl = isRTL(locale)

  useEffect(() => {
    const fetchProjects = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from("portfolio_projects")
        .select("*")
        .order("order_index", { ascending: true })

      if (data && !error) {
        setProjects(data)
      }
      setLoading(false)
    }

    fetchProjects()
  }, [])

  const filteredProjects = projects.filter((project) => {
    if (filter === "all") return true
    if (filter === "featured") return project.featured
    if (filter === "web") return project.technologies.some((tech) => ["React", "Next.js", "WordPress"].includes(tech))
    if (filter === "ai") return project.technologies.some((tech) => ["AI", "Python", "Chatbot"].includes(tech))
    return true
  })

  const filters = [
    { key: "all", label: locale === "fa" ? "همه" : "All" },
    { key: "featured", label: locale === "fa" ? "منتخب" : "Featured" },
    { key: "web", label: locale === "fa" ? "وب" : "Web" },
    { key: "ai", label: locale === "fa" ? "هوش مصنوعی" : "AI" },
  ]

  if (loading) {
    return (
      <section className={cn("py-20", isRtl ? "rtl" : "ltr")} id="portfolio">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-muted-foreground">{dict.common.loading}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={cn("py-20 bg-background", isRtl ? "rtl" : "ltr")} id="portfolio">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {dict.portfolio.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {locale === "fa"
              ? "نمونه‌ای از پروژه‌هایی که با عشق و دقت ساخته‌ام"
              : "A showcase of projects I've built with passion and precision"}
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filterItem) => (
            <button
              key={filterItem.key}
              onClick={() => setFilter(filterItem.key as any)}
              className={cn(
                "px-6 py-3 rounded-full font-medium transition-all duration-300",
                filter === filterItem.key
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground",
              )}
            >
              {filterItem.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <Card
              key={project.id}
              className="group overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20">
                {project.image_url ? (
                  <Image
                    src={project.image_url || "/placeholder.svg"}
                    alt={locale === "fa" ? project.title_fa : project.title_en}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-6xl font-bold text-muted-foreground/20">
                      {(locale === "fa" ? project.title_fa : project.title_en).charAt(0)}
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {project.featured && (
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black">
                      {locale === "fa" ? "منتخب" : "Featured"}
                    </Badge>
                  )}
                </div>
              </div>

              <CardContent className="p-6">
                {/* Project Title */}
                <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 transition-colors">
                  {locale === "fa" ? project.title_fa : project.title_en}
                </h3>

                {/* Project Description */}
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {locale === "fa" ? project.description_fa : project.description_en}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 4 && (
                    <Badge variant="outline" className="text-xs">
                      +{project.technologies.length - 4}
                    </Badge>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {project.project_url && (
                    <Button asChild size="sm" className="flex-1">
                      <Link href={project.project_url} target="_blank" rel="noopener noreferrer">
                        <Eye className="h-4 w-4 mr-2" />
                        {dict.portfolio.viewProject}
                      </Link>
                    </Button>
                  )}
                  {project.github_url && (
                    <Button asChild variant="outline" size="sm">
                      <Link href={project.github_url} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                      </Link>
                    </Button>
                  )}
                  {!project.project_url && !project.github_url && (
                    <Button variant="outline" size="sm" className="flex-1 bg-transparent" disabled>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      {locale === "fa" ? "به زودی" : "Coming Soon"}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              {locale === "fa" ? "پروژه‌ای در این دسته‌بندی یافت نشد" : "No projects found in this category"}
            </p>
          </div>
        )}

        {/* View All Button */}
        {filteredProjects.length > 0 && (
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href={`/${locale}/portfolio`}>
                {locale === "fa" ? "مشاهده همه پروژه‌ها" : "View All Projects"}
                <ExternalLink className="h-4 w-4 ml-2 rtl:ml-0 rtl:mr-2" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
