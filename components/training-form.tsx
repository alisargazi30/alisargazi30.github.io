"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Send, Loader2, GraduationCap } from "lucide-react"
import type { Locale } from "@/lib/i18n/config"
import { isRTL } from "@/lib/i18n/config"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"

interface TrainingFormProps {
  locale: Locale
  dict: any
}

export function TrainingForm({ locale, dict }: TrainingFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    course_type: "",
    experience_level: "",
    preferred_language: locale,
    message: "",
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const isRtl = isRTL(locale)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const supabase = createClient()
      const { error: submitError } = await supabase.from("training_requests").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        course_type: formData.course_type,
        experience_level: formData.experience_level,
        preferred_language: formData.preferred_language,
        [locale === "fa" ? "message_fa" : "message_en"]: formData.message,
      })

      if (submitError) throw submitError

      setSuccess(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        course_type: "",
        experience_level: "",
        preferred_language: locale,
        message: "",
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2 text-green-600">
            {locale === "fa" ? "درخواست آموزش ارسال شد!" : "Training Request Sent!"}
          </h3>
          <p className="text-muted-foreground mb-6">
            {locale === "fa"
              ? "درخواست آموزش شما دریافت شد. به زودی برای هماهنگی جلسات با شما تماس خواهم گرفت."
              : "Your training request has been received. I'll contact you soon to coordinate the sessions."}
          </p>
          <Button onClick={() => setSuccess(false)} variant="outline">
            {locale === "fa" ? "درخواست جدید" : "New Request"}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-center mb-4">
          <GraduationCap className="h-8 w-8 text-blue-600 mr-2 rtl:mr-0 rtl:ml-2" />
        </div>
        <CardTitle className="text-2xl text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {dict.training.title}
        </CardTitle>
        <p className="text-center text-muted-foreground">{dict.training.description}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className={cn("space-y-6", isRtl ? "rtl" : "ltr")}>
          {/* Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">{dict.training.form.name}</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{dict.training.form.email}</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label htmlFor="phone">{dict.training.form.phone}</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
              className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Course Type and Experience Level */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="course">{dict.training.form.course}</Label>
              <Select
                value={formData.course_type}
                onValueChange={(value) => setFormData({ ...formData, course_type: value })}
              >
                <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder={locale === "fa" ? "نوع دوره را انتخاب کنید" : "Select a course"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="frontend">{dict.training.courses.frontend}</SelectItem>
                  <SelectItem value="python">{dict.training.courses.python}</SelectItem>
                  <SelectItem value="ai">{dict.training.courses.ai}</SelectItem>
                  <SelectItem value="automation">{dict.training.courses.automation}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="level">{dict.training.form.level}</Label>
              <Select
                value={formData.experience_level}
                onValueChange={(value) => setFormData({ ...formData, experience_level: value })}
              >
                <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder={locale === "fa" ? "سطح تجربه" : "Experience level"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">{dict.training.levels.beginner}</SelectItem>
                  <SelectItem value="intermediate">{dict.training.levels.intermediate}</SelectItem>
                  <SelectItem value="advanced">{dict.training.levels.advanced}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Preferred Language */}
          <div className="space-y-2">
            <Label htmlFor="language">{dict.training.form.language}</Label>
            <Select
              value={formData.preferred_language}
              onValueChange={(value) => setFormData({ ...formData, preferred_language: value })}
            >
              <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="fa">فارسی</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">{dict.training.form.message}</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={4}
              className={cn(
                "transition-all duration-200 focus:ring-2 focus:ring-blue-500",
                isRtl ? "text-right" : "text-left",
              )}
              dir={isRtl ? "rtl" : "ltr"}
              placeholder={
                locale === "fa"
                  ? "اهداف یادگیری، زمان‌بندی مورد نظر، و سایر جزئیات..."
                  : "Learning goals, preferred schedule, and other details..."
              }
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2 animate-spin" />
                {locale === "fa" ? "در حال ارسال..." : "Sending..."}
              </>
            ) : (
              <>
                <Send className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                {dict.training.form.submit}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
