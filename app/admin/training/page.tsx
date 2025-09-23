"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Mail, Phone, GraduationCap, MessageSquare, Globe } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface TrainingRequest {
  id: string
  name: string
  email: string
  phone: string
  course_type: string
  experience_level: string
  preferred_language: string
  message_en?: string
  message_fa?: string
  status: string
  created_at: string
}

export default function TrainingPage() {
  const [requests, setRequests] = useState<TrainingRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    const supabase = createClient()
    const { data, error } = await supabase
      .from("training_requests")
      .select("*")
      .order("created_at", { ascending: false })

    if (data && !error) {
      setRequests(data)
    }
    setLoading(false)
  }

  const updateStatus = async (id: string, status: string) => {
    const supabase = createClient()
    const { error } = await supabase.from("training_requests").update({ status }).eq("id", id)

    if (!error) {
      fetchRequests()
    }
  }

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.course_type.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || request.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "contacted":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-1/4"></div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
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
        <h1 className="text-3xl font-bold">Training Requests</h1>
        <p className="text-muted-foreground">Manage and respond to training requests</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search requests..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="contacted">Contacted</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request) => (
          <Card key={request.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{request.name}</CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center">
                      <Mail className="h-4 w-4 mr-1" />
                      {request.email}
                    </span>
                    <span className="flex items-center">
                      <Phone className="h-4 w-4 mr-1" />
                      {request.phone}
                    </span>
                    <span className="flex items-center">
                      <Globe className="h-4 w-4 mr-1" />
                      {request.preferred_language === "fa" ? "Persian" : "English"}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(request.status)}>{request.status}</Badge>
                  <Badge variant="outline">{request.course_type.replace("-", " ")}</Badge>
                  <Badge className={getLevelColor(request.experience_level)}>{request.experience_level}</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Message */}
                {(request.message_en || request.message_fa) && (
                  <div>
                    <div className="flex items-center mb-2">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      <span className="font-medium">Message:</span>
                    </div>
                    <p className="text-sm text-muted-foreground bg-muted p-3 rounded">
                      {request.message_en || request.message_fa}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Submitted on {formatDate(request.created_at)}</span>
                  <div className="flex gap-2">
                    {request.status === "pending" && (
                      <Button size="sm" onClick={() => updateStatus(request.id, "contacted")}>
                        Mark as Contacted
                      </Button>
                    )}
                    {request.status === "contacted" && (
                      <Button size="sm" onClick={() => updateStatus(request.id, "completed")}>
                        Mark as Completed
                      </Button>
                    )}
                    {request.status === "completed" && (
                      <Button size="sm" variant="outline" onClick={() => updateStatus(request.id, "pending")}>
                        Reopen
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {filteredRequests.length === 0 && (
        <div className="text-center py-12">
          <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">
            {searchTerm || statusFilter !== "all" ? "No requests match your filters" : "No training requests yet"}
          </p>
        </div>
      )}
    </div>
  )
}
