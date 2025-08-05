"use client"

import { useTranslations, useLocale } from "next-intl"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { categories } from "@/lib/data"

export function Categories() {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 arabic-text">{t("home.categories")}</h2>
          <p className="text-gray-600 dark:text-gray-400">اكتشف مجموعة واسعة من الفئات المتنوعة</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={`/${locale}/categories/${category.slug}`}>
              <Card className="group hover:shadow-lg transition-all duration-300 card-hover">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <div className="w-16 h-16 mx-auto bg-arabic-primary/10 rounded-full flex items-center justify-center group-hover:bg-arabic-primary/20 transition-colors">
                      <span className="text-2xl">{category.icon}</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-sm arabic-text group-hover:text-arabic-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">{category.productCount} منتج</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            href={`/${locale}/categories`}
            className="inline-flex items-center px-6 py-3 bg-arabic-primary text-white rounded-lg hover:bg-arabic-primary/90 transition-colors"
          >
            {t("home.viewAll")}
            <svg className="w-4 h-4 mr-2 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
