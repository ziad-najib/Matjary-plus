"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useTranslations, useLocale } from "next-intl"
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import toast from "react-hot-toast"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const t = useTranslations()
  const locale = useLocale()
  const router = useRouter()

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) return

    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success("تم تسجيل الدخول بنجاح!")
      router.push(`/${locale}`)
    } catch (error: any) {
      toast.error("خطأ في تسجيل الدخول: " + error.message)
    }
    setLoading(false)
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      toast.success("تم تسجيل الدخول بنجاح!")
      router.push(`/${locale}`)
    } catch (error: any) {
      toast.error("خطأ في تسجيل الدخول: " + error.message)
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
              <CardTitle className="text-2xl font-bold arabic-text">{t("auth.login")}</CardTitle>
              <CardDescription>أدخل بياناتك لتسجيل الدخول إلى حسابك</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div>
                  <Input
                    type="email"
                    placeholder={t("auth.email")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-right"
                    required
                  />
                </div>
                <div>
                  <Input
                    type="password"
                    placeholder={t("auth.password")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-right"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "جاري تسجيل الدخول..." : t("auth.login")}
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
                onClick={handleGoogleLogin}
                className="w-full bg-transparent"
                disabled={loading}
              >
                {t("auth.loginWithGoogle")}
              </Button>

              <div className="text-center mt-4">
                <Link href={`/${locale}/auth/forgot-password`} className="text-sm text-arabic-primary hover:underline">
                  {t("auth.forgotPassword")}
                </Link>
              </div>
            </CardContent>
            <CardFooter className="text-center">
              <p className="text-sm text-gray-600">
                {t("auth.dontHaveAccount")}{" "}
                <Link href={`/${locale}/auth/register`} className="text-arabic-primary hover:underline">
                  {t("auth.createAccount")}
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
