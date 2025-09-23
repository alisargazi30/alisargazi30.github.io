"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Locale } from "@/lib/i18n/config"
import { isRTL } from "@/lib/i18n/config"
import { cn } from "@/lib/utils"

interface SkillsSectionProps {
  locale: Locale
  dict: any
}

const skillCategories = {
  frontend: {
    name: "Frontend Development",
    nameFa: "توسعه فرانت‌اند",
    skills: [
      { name: "React", level: 95, color: "from-blue-500 to-cyan-500" },
      { name: "Next.js", level: 90, color: "from-gray-700 to-gray-900" },
      { name: "TypeScript", level: 85, color: "from-blue-600 to-blue-800" },
      { name: "Tailwind CSS", level: 90, color: "from-teal-400 to-blue-500" },
      { name: "JavaScript", level: 95, color: "from-yellow-400 to-orange-500" },
      { name: "HTML/CSS", level: 95, color: "from-orange-500 to-red-500" },
    ],
  },
  backend: {
    name: "Backend & Database",
    nameFa: "بک‌اند و پایگاه داده",
    skills: [
      { name: "Python", level: 85, color: "from-green-400 to-blue-500" },
      { name: "Node.js", level: 80, color: "from-green-500 to-green-700" },
      { name: "Django", level: 75, color: "from-green-600 to-green-800" },
      { name: "Supabase", level: 85, color: "from-emerald-400 to-teal-600" },
      { name: "PostgreSQL", level: 80, color: "from-blue-600 to-indigo-600" },
      { name: "MongoDB", level: 75, color: "from-green-500 to-emerald-600" },
    ],
  },
  ai: {
    name: "AI & Automation",
    nameFa: "هوش مصنوعی و اتوماسیون",
    skills: [
      { name: "AI Consulting", level: 90, color: "from-purple-500 to-pink-500" },
      { name: "Chatbot Development", level: 85, color: "from-indigo-500 to-purple-600" },
      { name: "n8n Automation", level: 80, color: "from-red-500 to-pink-500" },
      { name: "Machine Learning", level: 75, color: "from-violet-500 to-purple-600" },
      { name: "OpenAI API", level: 85, color: "from-emerald-400 to-cyan-500" },
      { name: "Process Automation", level: 80, color: "from-orange-400 to-red-500" },
    ],
  },
  tools: {
    name: "Tools & Technologies",
    nameFa: "ابزارها و تکنولوژی‌ها",
    skills: [
      { name: "Git", level: 90, color: "from-orange-500 to-red-600" },
      { name: "Docker", level: 75, color: "from-blue-400 to-blue-600" },
      { name: "Linux", level: 80, color: "from-yellow-400 to-orange-500" },
      { name: "Three.js", level: 70, color: "from-black to-gray-700" },
      { name: "WordPress", level: 85, color: "from-blue-500 to-indigo-600" },
      { name: "SEO", level: 80, color: "from-green-400 to-emerald-500" },
    ],
  },
}

export function SkillsSection({ locale, dict }: SkillsSectionProps) {
  const [visibleSkills, setVisibleSkills] = useState<Set<string>>(new Set())
  const [activeCategory, setActiveCategory] = useState<string>("frontend")
  const sectionRef = useRef<HTMLElement>(null)
  const isRtl = isRTL(locale)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const skillName = entry.target.getAttribute("data-skill")
            if (skillName) {
              setTimeout(() => {
                setVisibleSkills((prev) => new Set([...prev, skillName]))
              }, Math.random() * 500)
            }
          }
        })
      },
      { threshold: 0.3 },
    )

    const skillElements = document.querySelectorAll("[data-skill]")
    skillElements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [activeCategory])

  return (
    <section ref={sectionRef} className={cn("py-20 bg-muted/30", isRtl ? "rtl" : "ltr")} id="skills">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {locale === "fa" ? "مهارت‌ها و تخصص‌ها" : "Skills & Expertise"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {locale === "fa"
              ? "تکنولوژی‌ها و ابزارهایی که با آن‌ها کار می‌کنم و تجربه عمیقی در آن‌ها دارم"
              : "Technologies and tools I work with and have deep experience in"}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(skillCategories).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={cn(
                "px-6 py-3 rounded-full font-medium transition-all duration-300",
                activeCategory === key
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                  : "bg-background hover:bg-muted text-muted-foreground hover:text-foreground",
              )}
            >
              {locale === "fa" ? category.nameFa : category.name}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories[activeCategory as keyof typeof skillCategories].skills.map((skill, index) => (
            <Card
              key={skill.name}
              data-skill={skill.name}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">{skill.name}</h3>
                  <Badge variant="secondary" className="text-sm">
                    {skill.level}%
                  </Badge>
                </div>
                <div className="relative">
                  <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                    <div
                      className={cn(
                        "h-full bg-gradient-to-r transition-all duration-1000 ease-out rounded-full",
                        skill.color,
                        visibleSkills.has(skill.name) ? "opacity-100" : "opacity-0",
                      )}
                      style={{
                        width: visibleSkills.has(skill.name) ? `${skill.level}%` : "0%",
                        transitionDelay: `${index * 100}ms`,
                      }}
                    />
                  </div>
                  <div
                    className={cn(
                      "absolute top-0 left-0 h-full bg-gradient-to-r opacity-50 rounded-full transition-all duration-300",
                      skill.color,
                      "group-hover:opacity-70",
                    )}
                    style={{ width: "100%" }}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-600 mb-2">5+</div>
            <p className="text-muted-foreground">{dict.about.experience}</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600 mb-2">50+</div>
            <p className="text-muted-foreground">{dict.about.projects}</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-pink-600 mb-2">100%</div>
            <p className="text-muted-foreground">{dict.about.clients}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
