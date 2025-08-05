import type React from "react"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { notFound } from "next/navigation"
import { Toaster } from "react-hot-toast"
import { AuthProvider } from "@/components/providers/auth-provider"
import { CartProvider } from "@/components/providers/cart-provider"
import { WishlistProvider } from "@/components/providers/wishlist-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"

const locales = ["ar", "en"]

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}) {
  const isArabic = locale === "ar"

  return {
    title: isArabic ? "متجر إلكتروني شامل" : "Comprehensive E-commerce Store",
    description: isArabic
      ? "متجر إلكتروني شامل يوفر أفضل المنتجات بأسعار منافسة"
      : "Comprehensive e-commerce store offering the best products at competitive prices",
    other: {
      "google-site-verification": "your-google-verification-code",
    },
  }
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound()

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages()

  const isRTL = locale === "ar"

  return (
    <html lang={locale} dir={isRTL ? "rtl" : "ltr"} suppressHydrationWarning>
      <body className={`font-arabic ${isRTL ? "rtl" : "ltr"}`} suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
            <AuthProvider>
              <CartProvider>
                <WishlistProvider>
                  <div className="min-h-screen bg-background">{children}</div>
                  <Toaster
                    position={isRTL ? "top-left" : "top-right"}
                    toastOptions={{
                      duration: 4000,
                      style: {
                        background: "var(--background)",
                        color: "var(--foreground)",
                        border: "1px solid var(--border)",
                        fontFamily: "Cairo, Tajawal, system-ui, sans-serif",
                        direction: isRTL ? "rtl" : "ltr",
                        textAlign: isRTL ? "right" : "left",
                      },
                      success: {
                        iconTheme: {
                          primary: "#10b981",
                          secondary: "#ffffff",
                        },
                      },
                      error: {
                        iconTheme: {
                          primary: "#ef4444",
                          secondary: "#ffffff",
                        },
                      },
                    }}
                  />
                </WishlistProvider>
              </CartProvider>
            </AuthProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
