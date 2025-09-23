"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { Locale } from "@/lib/i18n/config"
import { isRTL } from "@/lib/i18n/config"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"

interface BlogSectionProps {
  locale: Locale
  dict: any
  limit?: number
}

interface BlogPost {
  id: string
  title_en: string
  title_fa: string
  excerpt_en?: string
  excerpt_fa?: string
  slug: string
  featured_image?: string
  created_at: string
  published: boolean
}

export function BlogSection({ locale, dict, limit = 3 }: BlogSectionProps) {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const isRtl = isRTL(locale)

  useEffect(() => {
    const fetchPosts = async () => {
      const supabase = createClient()
      let query = supabase
        .from("blog_posts")
        .select("id, title_en, title_fa, excerpt_en, excerpt_fa, slug, featured_image, created_at, published")
        .eq("published", true)
        .order("created_at", { ascending: false })

      if (limit) {
        query = query.limit(limit)
      }

      const { data, error } = await query

      if (data && !error) {
        setPosts(data)
      }
      setLoading(false)
    }

    fetchPosts()
  }, [limit])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(locale === "fa" ? "fa-IR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  if (loading) {
    return (
      <section className={cn("py-20 bg-muted/30", isRtl ? "rtl" : "ltr")}>
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
    <section className={cn("py-20 bg-muted/30", isRtl ? "rtl" : "ltr")} id="blog">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {dict.blog.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {locale === "fa"
              ? "آخرین مقالات و بینش‌های من در زمینه توسعه وب و هوش مصنوعی"
              : "Latest articles and insights on web development and artificial intelligence"}
          </p>
        </div>

        {/* Blog Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <Card
                key={post.id}
                className="group overflow-hidden hover:shadow-xl transition-all duration-500 hover:-translate-y-2"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Featured Image */}
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20">
                  {post.featured_image ? (
                    <Image
                      src={post.featured_image || "/placeholder.svg"}
                      alt={locale === "fa" ? post.title_fa : post.title_en}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-500/10 to-purple-500/10">
                      <div className="text-6xl font-bold text-muted-foreground/20">
                        {(locale === "fa" ? post.title_fa : post.title_en).charAt(0)}
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <CardContent className="p-6">
                  {/* Post Date */}
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <Calendar className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                    <span>{formatDate(post.created_at)}</span>
                    <Clock className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2 ml-4 rtl:ml-0 rtl:mr-4" />
                    <span>{locale === "fa" ? "۵ دقیقه" : "5 min read"}</span>
                  </div>

                  {/* Post Title */}
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {locale === "fa" ? post.title_fa : post.title_en}
                  </h3>

                  {/* Post Excerpt */}
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {locale === "fa" ? post.excerpt_fa : post.excerpt_en}
                  </p>

                  {/* Read More Button */}
                  <Button asChild variant="ghost" className="p-0 h-auto font-semibold group/btn">
                    <Link href={`/${locale}/blog/${post.slug}`}>
                      {dict.blog.readMore}
                      {isRtl ? (
                        <ArrowLeft className="h-4 w-4 mr-2 group-hover/btn:-translate-x-1 transition-transform" />
                      ) : (
                        <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      )}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              {locale === "fa" ? "هنوز مقاله‌ای منتشر نشده است" : "No articles published yet"}
            </p>
          </div>
        )}

        {/* View All Button */}
        {posts.length > 0 && limit && (
          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href={`/${locale}/blog`}>
                {locale === "fa" ? "مشاهده همه مقالات" : "View All Articles"}
                {isRtl ? <ArrowLeft className="h-4 w-4 mr-2" /> : <ArrowRight className="h-4 w-4 ml-2" />}
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
