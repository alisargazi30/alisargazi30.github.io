# 🔌 مستندات API

این سند تمام endpoint های API وبسایت رزومه شخصی را شرح می‌دهد.

## 📋 فهرست مطالب

1. [نمای کلی](#نمای-کلی)
2. [احراز هویت](#احراز-هویت)
3. [Blog API](#blog-api)
4. [Consultation API](#consultation-api)
5. [Training API](#training-api)
6. [Portfolio API](#portfolio-api)
7. [نمونه کدها](#نمونه-کدها)

## 🌐 نمای کلی

### Base URL
- **Development**: `http://localhost:3000/api`
- **Production**: `https://yourdomain.com/api`

### Response Format
تمام پاسخ‌ها به فرمت JSON ارسال می‌شوند:

\`\`\`json
{
  "success": true,
  "data": {},
  "message": "Success message",
  "error": null
}
\`\`\`

### Error Handling
در صورت خطا:

\`\`\`json
{
  "success": false,
  "data": null,
  "message": "Error message",
  "error": {
    "code": "ERROR_CODE",
    "details": "Detailed error information"
  }
}
\`\`\`

## 🔐 احراز هویت

### Login
ورود ادمین به سیستم

**Endpoint**: `POST /api/auth/login`

**Request Body**:
\`\`\`json
{
  "email": "mr.alireza.sargazi1@gmail.com",
  "password": "your-password"
}
\`\`\`

**Response**:
\`\`\`json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "mr.alireza.sargazi1@gmail.com"
    },
    "session": {
      "access_token": "jwt-token",
      "refresh_token": "refresh-token"
    }
  }
}
\`\`\`

### Logout
خروج از سیستم

**Endpoint**: `POST /api/auth/logout`

**Headers**: `Authorization: Bearer <access_token>`

## 📝 Blog API

### دریافت تمام مقالات
**Endpoint**: `GET /api/blog`

**Query Parameters**:
- `locale`: `en` | `fa` (اختیاری)
- `published`: `true` | `false` (پیش‌فرض: true)
- `limit`: تعداد مقالات (پیش‌فرض: 10)
- `offset`: شروع از (پیش‌فرض: 0)

**Response**:
\`\`\`json
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": "uuid",
        "title_en": "English Title",
        "title_fa": "عنوان فارسی",
        "excerpt_en": "English excerpt",
        "excerpt_fa": "خلاصه فارسی",
        "slug": "post-slug",
        "featured_image": "image-url",
        "tags": ["tag1", "tag2"],
        "published": true,
        "created_at": "2024-01-01T00:00:00Z"
      }
    ],
    "total": 25,
    "hasMore": true
  }
}
\`\`\`

### دریافت مقاله با slug
**Endpoint**: `GET /api/blog/[slug]`

**Response**:
\`\`\`json
{
  "success": true,
  "data": {
    "id": "uuid",
    "title_en": "English Title",
    "title_fa": "عنوان فارسی",
    "content_en": "Full English content",
    "content_fa": "محتوای کامل فارسی",
    "slug": "post-slug",
    "featured_image": "image-url",
    "tags": ["tag1", "tag2"],
    "published": true,
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
\`\`\`

### ایجاد مقاله جدید (Admin)
**Endpoint**: `POST /api/admin/blog`

**Headers**: `Authorization: Bearer <access_token>`

**Request Body**:
\`\`\`json
{
  "title_en": "English Title",
  "title_fa": "عنوان فارسی",
  "content_en": "Full English content",
  "content_fa": "محتوای کامل فارسی",
  "excerpt_en": "English excerpt",
  "excerpt_fa": "خلاصه فارسی",
  "slug": "post-slug",
  "featured_image": "image-url",
  "tags": ["tag1", "tag2"],
  "published": true
}
\`\`\`

### به‌روزرسانی مقاله (Admin)
**Endpoint**: `PUT /api/admin/blog/[id]`

**Headers**: `Authorization: Bearer <access_token>`

### حذف مقاله (Admin)
**Endpoint**: `DELETE /api/admin/blog/[id]`

**Headers**: `Authorization: Bearer <access_token>`

## 💼 Consultation API

### ایجاد درخواست مشاوره
**Endpoint**: `POST /api/consultation`

**Request Body**:
\`\`\`json
{
  "name": "نام درخواست‌کننده",
  "email": "email@example.com",
  "phone": "09123456789",
  "service_type": "web-development",
  "message": "پیام و توضیحات"
}
\`\`\`

**Service Types**:
- `web-development`: توسعه وب
- `ai-consulting`: مشاوره هوش مصنوعی
- `chatbot-development`: توسعه چت‌بات
- `automation`: اتوماسیون

**Response**:
\`\`\`json
{
  "success": true,
  "data": {
    "id": "uuid",
    "message": "درخواست شما با موفقیت ثبت شد"
  }
}
\`\`\`

### دریافت درخواست‌های مشاوره (Admin)
**Endpoint**: `GET /api/admin/consultations`

**Headers**: `Authorization: Bearer <access_token>`

**Query Parameters**:
- `status`: `pending` | `in-progress` | `completed` | `cancelled`
- `limit`: تعداد درخواست‌ها
- `offset`: شروع از

### به‌روزرسانی وضعیت درخواست (Admin)
**Endpoint**: `PUT /api/admin/consultations/[id]`

**Headers**: `Authorization: Bearer <access_token>`

**Request Body**:
\`\`\`json
{
  "status": "in-progress"
}
\`\`\`

## 🎓 Training API

### ایجاد درخواست آموزش
**Endpoint**: `POST /api/training`

**Request Body**:
\`\`\`json
{
  "name": "نام درخواست‌کننده",
  "email": "email@example.com",
  "phone": "09123456789",
  "training_type": "frontend",
  "experience_level": "beginner",
  "message": "توضیحات اضافی"
}
\`\`\`

**Training Types**:
- `frontend`: توسعه فرانت‌اند
- `python`: برنامه‌نویسی پایتون
- `ai`: هوش مصنوعی
- `automation`: اتوماسیون

**Experience Levels**:
- `beginner`: مبتدی
- `intermediate`: متوسط
- `advanced`: پیشرفته

### دریافت درخواست‌های آموزش (Admin)
**Endpoint**: `GET /api/admin/training`

**Headers**: `Authorization: Bearer <access_token>`

## 🎨 Portfolio API

### دریافت پروژه‌ها
**Endpoint**: `GET /api/portfolio`

**Query Parameters**:
- `featured`: `true` | `false`
- `locale`: `en` | `fa`

**Response**:
\`\`\`json
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "title_en": "Project Title",
      "title_fa": "عنوان پروژه",
      "description_en": "Project description",
      "description_fa": "توضیحات پروژه",
      "image": "image-url",
      "technologies": ["React", "Next.js", "TypeScript"],
      "live_url": "https://project-demo.com",
      "github_url": "https://github.com/user/repo",
      "featured": true
    }
  ]
}
\`\`\`

### ایجاد پروژه جدید (Admin)
**Endpoint**: `POST /api/admin/portfolio`

**Headers**: `Authorization: Bearer <access_token>`

## 📊 Stats API

### دریافت آمار کلی (Admin)
**Endpoint**: `GET /api/admin/stats`

**Headers**: `Authorization: Bearer <access_token>`

**Response**:
\`\`\`json
{
  "success": true,
  "data": {
    "published_posts": 15,
    "draft_posts": 3,
    "pending_consultations": 5,
    "pending_trainings": 2,
    "total_projects": 12
  }
}
\`\`\`

## 💻 نمونه کدها

### JavaScript/TypeScript Client

\`\`\`typescript
class PortfolioAPI {
  private baseURL = process.env.NEXT_PUBLIC_API_URL || '/api'
  
  async getBlogPosts(locale: 'en' | 'fa' = 'en') {
    const response = await fetch(`${this.baseURL}/blog?locale=${locale}`)
    return response.json()
  }
  
  async createConsultationRequest(data: ConsultationRequest) {
    const response = await fetch(`${this.baseURL}/consultation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    return response.json()
  }
  
  async createBlogPost(data: BlogPost, token: string) {
    const response = await fetch(`${this.baseURL}/admin/blog`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(data)
    })
    return response.json()
  }
}
\`\`\`

### React Hook Example

\`\`\`typescript
import { useState, useEffect } from 'react'

export function useBlogPosts(locale: 'en' | 'fa') {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch(`/api/blog?locale=${locale}`)
        const result = await response.json()
        
        if (result.success) {
          setPosts(result.data.posts)
        } else {
          setError(result.error)
        }
      } catch (err) {
        setError(err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchPosts()
  }, [locale])
  
  return { posts, loading, error }
}
\`\`\`

### Python Client Example

\`\`\`python
import requests
import json

class PortfolioAPI:
    def __init__(self, base_url="http://localhost:3000/api"):
        self.base_url = base_url
        self.session = requests.Session()
    
    def get_blog_posts(self, locale="en", published=True):
        params = {"locale": locale, "published": published}
        response = self.session.get(f"{self.base_url}/blog", params=params)
        return response.json()
    
    def create_consultation_request(self, data):
        response = self.session.post(
            f"{self.base_url}/consultation",
            json=data,
            headers={"Content-Type": "application/json"}
        )
        return response.json()
\`\`\`

## 🔧 Error Codes

### عمومی
- `INVALID_REQUEST`: درخواست نامعتبر
- `UNAUTHORIZED`: عدم دسترسی
- `FORBIDDEN`: ممنوع
- `NOT_FOUND`: یافت نشد
- `INTERNAL_ERROR`: خطای داخلی سرور

### Blog
- `BLOG_POST_NOT_FOUND`: مقاله یافت نشد
- `INVALID_SLUG`: slug نامعتبر
- `DUPLICATE_SLUG`: slug تکراری

### Consultation
- `INVALID_SERVICE_TYPE`: نوع خدمت نامعتبر
- `INVALID_EMAIL`: ایمیل نامعتبر

### Training
- `INVALID_TRAINING_TYPE`: نوع آموزش نامعتبر
- `INVALID_EXPERIENCE_LEVEL`: سطح تجربه نامعتبر

## 📈 Rate Limiting

- **عمومی**: 100 درخواست در دقیقه
- **Admin**: 1000 درخواست در دقیقه
- **Form Submissions**: 5 درخواست در دقیقه

---

**این مستندات توسط علیرضا سرگزی تهیه شده است**
