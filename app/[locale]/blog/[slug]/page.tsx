import { notFound } from "next/navigation"
import { getDictionary } from "@/lib/i18n/dictionaries"
import type { Locale } from "@/lib/i18n/config"
import { Navigation } from "@/components/navigation"
import { isRTL } from "@/lib/i18n/config"
import { createClient } from "@/lib/supabase/server"
import { Calendar, Clock, ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

interface PageProps {
  params: Promise<{
    locale: Locale
    slug: string
  }>
}

export default async function BlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params
  const dict = await getDictionary(locale)
  const isRtl = isRTL(locale)

  const supabase = await createClient()
  const { data: post, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single()

  if (error || !post) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat(locale === "fa" ? "fa-IR" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date)
  }

  return (
    <div className={isRtl ? "rtl" : "ltr"}>
      <Navigation locale={locale} dict={dict} />
      <main className="pt-16">
        <article className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            {/* Back Button */}
            <Button asChild variant="ghost" className="mb-8">
              <Link href={`/${locale}/blog`}>
                {isRtl ? <ArrowRight className="h-4 w-4 mr-2" /> : <ArrowLeft className="h-4 w-4 mr-2" />}
                {locale === "fa" ? "بازگشت به وبلاگ" : "Back to Blog"}
              </Link>
            </Button>

            {/* Article Header */}
            <header className="mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {locale === "fa" ? post.title_fa : post.title_en}
              </h1>

              <div className="flex items-center text-muted-foreground mb-6">
                <Calendar className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                <span className="mr-4 rtl:mr-0 rtl:ml-4">{formatDate(post.created_at)}</span>
                <Clock className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                <span>{locale === "fa" ? "۵ دقیقه مطالعه" : "5 min read"}</span>
              </div>

              {post.featured_image && (
                <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
                  <Image
                    src={post.featured_image || "/placeholder.svg"}
                    alt={locale === "fa" ? post.title_fa : post.title_en}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </header>

            {/* Article Content */}
            <div className="prose prose-lg max-w-none dark:prose-invert">
              <div
                className="leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: locale === "fa" ? post.content_fa : post.content_en,
                }}
              />
            </div>

            {/* Article Footer */}
            <footer className="mt-12 pt-8 border-t">
              <div className="flex justify-between items-center">
                <Button asChild variant="outline">
                  <Link href={`/${locale}/blog`}>
                    {isRtl ? <ArrowRight className="h-4 w-4 mr-2" /> : <ArrowLeft className="h-4 w-4 mr-2" />}
                    {locale === "fa" ? "مقالات بیشتر" : "More Articles"}
                  </Link>
                </Button>

                <Button asChild>
                  <Link href={`/${locale}/consultation`}>
                    {locale === "fa" ? "درخواست مشاوره" : "Get Consultation"}
                  </Link>
                </Button>
              </div>
            </footer>
          </div>
        </article>
      </main>
    </div>
  )
}
