"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CheckCircle, Send, Loader2 } from "lucide-react"
import type { Locale } from "@/lib/i18n/config"
import { isRTL } from "@/lib/i18n/config"
import { cn } from "@/lib/utils"
import { createClient } from "@/lib/supabase/client"

interface ConsultationFormProps {
  locale: Locale
  dict: any
}

export function ConsultationForm({ locale, dict }: ConsultationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    service_type: "",
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
      const { error: submitError } = await supabase.from("consultation_requests").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company || null,
        service_type: formData.service_type,
        [locale === "fa" ? "message_fa" : "message_en"]: formData.message,
      })

      if (submitError) throw submitError

      setSuccess(true)
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        service_type: "",
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
            {locale === "fa" ? "درخواست شما ارسال شد!" : "Request Sent Successfully!"}
          </h3>
          <p className="text-muted-foreground mb-6">
            {locale === "fa"
              ? "به زودی با شما تماس خواهم گرفت. معمولاً ظرف ۲۴ ساعت پاسخ می‌دهم."
              : "I'll get back to you soon. I typically respond within 24 hours."}
          </p>
          <Button onClick={() => setSuccess(false)} variant="outline">
            {locale === "fa" ? "ارسال درخواست جدید" : "Send Another Request"}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {dict.consultation.title}
        </CardTitle>
        <p className="text-center text-muted-foreground">{dict.consultation.description}</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className={cn("space-y-6", isRtl ? "rtl" : "ltr")}>
          {/* Name and Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">{dict.consultation.form.name}</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{dict.consultation.form.email}</Label>
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

          {/* Phone and Company */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">{dict.consultation.form.phone}</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">{dict.consultation.form.company}</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Service Type */}
          <div className="space-y-2">
            <Label htmlFor="service">{dict.consultation.form.service}</Label>
            <Select
              value={formData.service_type}
              onValueChange={(value) => setFormData({ ...formData, service_type: value })}
            >
              <SelectTrigger className="transition-all duration-200 focus:ring-2 focus:ring-blue-500">
                <SelectValue placeholder={locale === "fa" ? "نوع خدمت را انتخاب کنید" : "Select a service"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="web-development">{dict.consultation.services["web-development"]}</SelectItem>
                <SelectItem value="ai-consulting">{dict.consultation.services["ai-consulting"]}</SelectItem>
                <SelectItem value="chatbot">{dict.consultation.services.chatbot}</SelectItem>
                <SelectItem value="automation">{dict.consultation.services.automation}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">{dict.consultation.form.message}</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={5}
              className={cn(
                "transition-all duration-200 focus:ring-2 focus:ring-blue-500",
                isRtl ? "text-right" : "text-left",
              )}
              dir={isRtl ? "rtl" : "ltr"}
              required
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
                {dict.consultation.form.submit}
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
