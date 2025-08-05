"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTranslations, useLocale } from "next-intl"
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import toast from "react-hot-toast"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [loading, setLoading] = useState(false)
  const t = useTranslations()
  const locale = useLocale()
  const router = useRouter()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const { name, email, password, confirmPassword } = formData

    if (!name || !email || !password || !confirmPassword) {
      toast.error("يرجى ملء جميع الحقول")
      return
    }

    if (password !== confirmPassword) {
      toast.error("كلمات المرور غير متطابقة")
      return
    }

    if (password.length < 6) {
      toast.error("كلمة المرور يجب أن تكون 6 أحرف على الأقل")
      return
    }

    setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(userCredential.user, { displayName: name })
      toast.success("تم إنشاء الحساب بنجاح!")
      router.push(`/${locale}`)
    } catch (error: any) {
      toast.error("خطأ في إنشاء الحساب: " + error.message)
    }
    setLoading(false)
  }

  const handleGoogleRegister = async () => {
    setLoading(true)
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      toast.success("تم إنشاء الحساب بنجاح!")
      router.push(`/${locale}`)
    } catch (error: any) {
      toast.error("خطأ في إنشاء الحساب: " + error.message)
    }
    setLoading(false)
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold arabic-text">{t("auth.register")}</CardTitle>
              <CardDescription>أنشئ حساباً جديداً للاستمتاع بخدماتنا</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <Input
                    name="name"
                    type="text"
                    placeholder="الاسم الكامل"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="text-right"
                    required
                  />
                </div>
                <div>
                  <Input
                    name="email"
                    type="email"
                    placeholder={t("auth.email")}
                    value={formData.email}
                    onChange={handleInputChange}
                    className="text-right"
                    required
                  />
                </div>
                <div>
                  <Input
                    name="password"
                    type="password"
                    placeholder={t("auth.password")}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="text-right"
                    required
                  />
                </div>
                <div>
                  <Input
                    name="confirmPassword"
                    type="password"
                    placeholder={t("auth.confirmPassword")}
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="text-right"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "جاري إنشاء الحساب..." : t("auth.register")}
                </Button>
              </form>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">أو</span>
                </div>
              </div>

              <Button
                variant="outline"
                onClick={handleGoogleRegister}
                className="w-full bg-transparent"
                disabled={loading}
              >
                {t("auth.loginWithGoogle")}
              </Button>
            </CardContent>
            <CardFooter className="text-center">
              <p className="text-sm text-gray-600">
                {t("auth.alreadyHaveAccount")}{" "}
                <Link href={`/${locale}/auth/login`} className="text-arabic-primary hover:underline">
                  {t("auth.login")}
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  )
}
