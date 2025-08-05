import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    template: "%s | متجر إلكتروني شامل",
    default: "متجر إلكتروني شامل - أفضل المنتجات بأسعار منافسة",
  },
  description: "متجر إلكتروني شامل يوفر أفضل المنتجات من الإلكترونيات والأزياء والمنزل بأسعار منافسة وجودة عالية",
  keywords: ["متجر إلكتروني", "تسوق أونلاين", "إلكترونيات", "أزياء", "منزل", "سوريا"],
  authors: [{ name: "Arabic E-commerce Team" }],
  creator: "Arabic E-commerce",
  publisher: "Arabic E-commerce",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://arabic-ecommerce.vercel.app"),
  alternates: {
    canonical: "/",
    languages: {
      ar: "/ar",
      en: "/en",
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_SY",
    url: "https://arabic-ecommerce.vercel.app",
    title: "متجر إلكتروني شامل",
    description: "أفضل المنتجات بأسعار منافسة وجودة عالية",
    siteName: "Arabic E-commerce",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "متجر إلكتروني شامل",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "متجر إلكتروني شامل",
    description: "أفضل المنتجات بأسعار منافسة وجودة عالية",
    images: ["/og-image.jpg"],
    creator: "@arabic_ecommerce",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Arabic E-commerce" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
