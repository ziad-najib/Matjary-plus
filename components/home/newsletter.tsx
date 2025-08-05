"use client"

import type React from "react"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Send } from "lucide-react"
import toast from "react-hot-toast"

export function Newsletter() {
  const t = useTranslations()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) {
      toast.error("يرجى إدخال بريدك الإلكتروني")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("يرجى إدخال بريد إلكتروني صحيح")
      return
    }

    setLoading(true)

    // محاكاة إرسال البيانات
    setTimeout(() => {
      toast.success("تم الاشتراك بنجاح! شكراً لك")
      setEmail("")
      setLoading(false)
    }, 1000)
  }

  return (
    <section className="py-12 bg-arabic-primary text-white">
      <div className="container mx-auto px-4">
        <Card className="max-w-2xl mx-auto bg-white/10 backdrop-blur-sm border-white/20">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2 arabic-text">{t("home.newsletter")}</h2>
              <p className="text-white/80 arabic-text">
                اشترك في نشرتنا الإخبارية للحصول على أحدث العروض والمنتجات الجديدة
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30"
                disabled={loading}
              />
              <Button type="submit" disabled={loading} className="bg-white text-arabic-primary hover:bg-white/90 px-6">
                {loading ? (
                  <div className="w-4 h-4 border-2 border-arabic-primary border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    اشتراك
                  </>
                )}
              </Button>
            </form>

            <p className="text-xs text-white/60 mt-4 arabic-text">
              بالاشتراك، أنت توافق على سياسة الخصوصية وشروط الاستخدام
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
