"use client"

import { useTranslations, useLocale } from "next-intl"
import Link from "next/link"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Card, CardContent } from "@/components/ui/card"
import { categories } from "@/lib/data"
import { Smartphone, Laptop, Shirt, Home, Book, Gamepad2Icon as GameController2, Heart, Car } from "lucide-react"

export default function CategoriesPage() {
  const t = useTranslations()
  const locale = useLocale()

  // تعيين الأيقونات للفئات
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "smartphone":
        return Smartphone
      case "laptop":
        return Laptop
      case "shirt":
        return Shirt
      case "home":
        return Home
      case "book":
        return Book
      case "gamepad-2":
        return GameController2
      case "heart":
        return Heart
      case "car":
        return Car
      default:
        return Smartphone
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 arabic-text">{t("navigation.categories")}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const IconComponent = getIcon(category.icon)
              return (
                <Link key={category.id} href={`/${locale}/categories/${category.slug}`}>
                  <Card className="hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
                    <CardContent className="p-0">
                      <div className="flex items-center p-6">
                        <div
                          className={`${category.color} p-4 rounded-full mr-4 group-hover:scale-110 transition-transform`}
                        >
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold arabic-text">{category.name}</h3>
                          <p className="text-gray-600 text-sm">استكشف جميع المنتجات</p>
                        </div>
                      </div>
                      <div className={`h-1 w-full ${category.color}`}></div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
