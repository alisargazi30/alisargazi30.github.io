"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, MessageSquare, GraduationCap, TrendingUp } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface DashboardStats {
  totalPosts: number
  publishedPosts: number
  consultationRequests: number
  trainingRequests: number
  pendingConsultations: number
  pendingTraining: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    publishedPosts: 0,
    consultationRequests: 0,
    trainingRequests: 0,
    pendingConsultations: 0,
    pendingTraining: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    const supabase = createClient()

    try {
      // Fetch blog stats
      const { data: posts } = await supabase.from("blog_posts").select("published")
      const totalPosts = posts?.length || 0
      const publishedPosts = posts?.filter((post) => post.published).length || 0

      // Fetch consultation stats
      const { data: consultations } = await supabase.from("consultation_requests").select("status")
      const consultationRequests = consultations?.length || 0
      const pendingConsultations = consultations?.filter((req) => req.status === "pending").length || 0

      // Fetch training stats
      const { data: training } = await supabase.from("training_requests").select("status")
      const trainingRequests = training?.length || 0
      const pendingTraining = training?.filter((req) => req.status === "pending").length || 0

      setStats({
        totalPosts,
        publishedPosts,
        consultationRequests,
        trainingRequests,
        pendingConsultations,
        pendingTraining,
      })
    } catch (error) {
      console.error("Error fetching stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: "Blog Posts",
      value: stats.totalPosts,
      subtitle: `${stats.publishedPosts} published`,
      icon: FileText,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Consultations",
      value: stats.consultationRequests,
      subtitle: `${stats.pendingConsultations} pending`,
      icon: MessageSquare,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Training Requests",
      value: stats.trainingRequests,
      subtitle: `${stats.pendingTraining} pending`,
      icon: GraduationCap,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Total Engagement",
      value: stats.consultationRequests + stats.trainingRequests,
      subtitle: "All time",
      icon: TrendingUp,
      color: "from-orange-500 to-red-500",
    },
  ]

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening with your portfolio.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Recent Consultations
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats.pendingConsultations > 0 ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Pending requests</span>
                  <Badge variant="secondary">{stats.pendingConsultations}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  You have {stats.pendingConsultations} consultation request
                  {stats.pendingConsultations !== 1 ? "s" : ""} waiting for your response.
                </p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No pending consultation requests.</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <GraduationCap className="h-5 w-5 mr-2" />
              Training Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats.pendingTraining > 0 ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Pending requests</span>
                  <Badge variant="secondary">{stats.pendingTraining}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  You have {stats.pendingTraining} training request{stats.pendingTraining !== 1 ? "s" : ""} waiting for
                  your response.
                </p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No pending training requests.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
