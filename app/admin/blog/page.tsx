"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Edit, Trash2, Eye, Search } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

interface BlogPost {
  id: string
  title_en: string
  title_fa: string
  slug: string
  published: boolean
  created_at: string
  updated_at: string
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id, title_en, title_fa, slug, published, created_at, updated_at")
      .order("created_at", { ascending: false })

    if (data && !error) {
      setPosts(data)
    }
    setLoading(false)
  }

  const togglePublished = async (id: string, published: boolean) => {
    const supabase = createClient()
    const { error } = await supabase.from("blog_posts").update({ published: !published }).eq("id", id)

    if (!error) {
      fetchPosts()
    }
  }

  const deletePost = async (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      const supabase = createClient()
      const { error } = await supabase.from("blog_posts").delete().eq("id", id)

      if (!error) {
        fetchPosts()
      }
    }
  }

  const filteredPosts = posts.filter(
    (post) =>
      post.title_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.title_fa.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading posts...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <p className="text-muted-foreground">Manage your blog posts and articles</p>
        </div>
        <Button asChild>
          <Link href="/admin/blog/new">
            <Plus className="h-4 w-4 mr-2" />
            New Post
          </Link>
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <Card key={post.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">{post.title_en}</h3>
                    <Badge variant={post.published ? "default" : "secondary"}>
                      {post.published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground mb-2">{post.title_fa}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Created: {formatDate(post.created_at)}</span>
                    <span>Updated: {formatDate(post.updated_at)}</span>
                    <span>Slug: /{post.slug}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/en/blog/${post.slug}`} target="_blank">
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/admin/blog/${post.id}/edit`}>
                      <Edit className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => togglePublished(post.id, post.published)}
                    className={post.published ? "text-orange-600" : "text-green-600"}
                  >
                    {post.published ? "Unpublish" : "Publish"}
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deletePost(post.id)} className="text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            {searchTerm ? "No posts found matching your search" : "No blog posts yet"}
          </p>
          {!searchTerm && (
            <Button asChild className="mt-4">
              <Link href="/admin/blog/new">Create Your First Post</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
