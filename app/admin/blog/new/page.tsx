"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function NewBlogPostPage() {
  const [formData, setFormData] = useState({
    title_en: "",
    title_fa: "",
    slug: "",
    content_en: "",
    content_fa: "",
    excerpt_en: "",
    excerpt_fa: "",
    featured_image: "",
    published: false,
  })
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const supabase = createClient()
    const { data: user } = await supabase.auth.getUser()

    if (!user.user) {
      alert("You must be logged in to create posts")
      setLoading(false)
      return
    }

    const { error } = await supabase.from("blog_posts").insert({
      ...formData,
      slug: formData.slug || generateSlug(formData.title_en),
      author_id: user.user.id,
    })

    if (error) {
      alert("Error creating post: " + error.message)
    } else {
      router.push("/admin/blog")
    }

    setLoading(false)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Button asChild variant="ghost">
          <Link href="/admin/blog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Create New Post</h1>
          <p className="text-muted-foreground">Write a new blog post in both languages</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* English Content */}
          <Card>
            <CardHeader>
              <CardTitle>English Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title_en">Title (English)</Label>
                <Input
                  id="title_en"
                  value={formData.title_en}
                  onChange={(e) => {
                    setFormData({ ...formData, title_en: e.target.value })
                    if (!formData.slug) {
                      setFormData((prev) => ({ ...prev, slug: generateSlug(e.target.value) }))
                    }
                  }}
                  required
                />
              </div>
              <div>
                <Label htmlFor="excerpt_en">Excerpt (English)</Label>
                <Textarea
                  id="excerpt_en"
                  value={formData.excerpt_en}
                  onChange={(e) => setFormData({ ...formData, excerpt_en: e.target.value })}
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="content_en">Content (English)</Label>
                <Textarea
                  id="content_en"
                  value={formData.content_en}
                  onChange={(e) => setFormData({ ...formData, content_en: e.target.value })}
                  rows={10}
                  required
                />
              </div>
            </CardContent>
          </Card>

          {/* Persian Content */}
          <Card>
            <CardHeader>
              <CardTitle>Persian Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title_fa">Title (Persian)</Label>
                <Input
                  id="title_fa"
                  value={formData.title_fa}
                  onChange={(e) => setFormData({ ...formData, title_fa: e.target.value })}
                  className="text-right"
                  dir="rtl"
                  required
                />
              </div>
              <div>
                <Label htmlFor="excerpt_fa">Excerpt (Persian)</Label>
                <Textarea
                  id="excerpt_fa"
                  value={formData.excerpt_fa}
                  onChange={(e) => setFormData({ ...formData, excerpt_fa: e.target.value })}
                  className="text-right"
                  dir="rtl"
                  rows={3}
                />
              </div>
              <div>
                <Label htmlFor="content_fa">Content (Persian)</Label>
                <Textarea
                  id="content_fa"
                  value={formData.content_fa}
                  onChange={(e) => setFormData({ ...formData, content_fa: e.target.value })}
                  className="text-right"
                  dir="rtl"
                  rows={10}
                  required
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Post Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Post Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="slug">URL Slug</Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="auto-generated-from-title"
                />
              </div>
              <div>
                <Label htmlFor="featured_image">Featured Image URL</Label>
                <Input
                  id="featured_image"
                  value={formData.featured_image}
                  onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="published"
                checked={formData.published}
                onCheckedChange={(checked) => setFormData({ ...formData, published: checked })}
              />
              <Label htmlFor="published">Publish immediately</Label>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            {loading ? "Creating..." : "Create Post"}
          </Button>
        </div>
      </form>
    </div>
  )
}
