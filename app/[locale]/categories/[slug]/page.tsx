"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useTranslations, useLocale } from "next-intl"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { products, categories } from "@/lib/data"
import { ProductCard } from "@/components/products/product-card"

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const t = useTranslations()
  const locale = useLocale()

  const [category, setCategory] = useState<any>(null)
  const [categoryProducts, setCategoryProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState("newest")

  useEffect(() => {
    // محاكاة تحميل الفئة والمنتجات
    setTimeout(() => {
      const foundCategory = categories.find((c) => c.slug === slug)
      if (foundCategory) {
        setCategory(foundCategory)

        // تحميل منتجات الفئة
        const filteredProducts = products.filter((p) => p.category === slug)
        setCategoryProducts(filteredProducts)
      }
      setLoading(false)
    }, 1000)
  }, [slug])

  // ترتيب المنتجات
  useEffect(() => {
    if (categoryProducts.length > 0) {
      const sortedProducts = [...categoryProducts]

      switch (sortBy) {
        case "price-asc":
          sortedProducts.sort((a, b) => a.price - b.price)
          break
        case "price-desc":
          sortedProducts.sort((a, b) => b.price - a.price)
          break
        case "rating":
          sortedProducts.sort((a, b) => b.rating - a.rating)
          break
        case "newest":
        default:
          sortedProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          break
      }

      setCategoryProducts(sortedProducts)
    }
  }, [sortBy])

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
          <div className="container mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="aspect-square bg-gray-200 rounded-t-lg"></div>
                    <div className="p-4 space-y-2">
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (!category) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-4">الفئة غير موجودة</h1>
            <p className="mb-6">عذراً، لم نتمكن من العثور على الفئة التي تبحث عنها.</p>
            <Button asChild>
              <a href={`/${locale}/categories`}>العودة إلى الفئات</a>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2 arabic-text">{category.name}</h1>
              <p className="text-gray-600">
                {categoryProducts.length} {categoryProducts.length === 1 ? "منتج" : "منتجات"}
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <select className="p-2 border rounded-md" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="newest">الأحدث</option>
                <option value="price-asc">السعر: من الأقل للأعلى</option>
                <option value="price-desc">السعر: من الأعلى للأقل</option>
                <option value="rating">التقييم</option>
              </select>
            </div>
          </div>

          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold mb-2">لا توجد منتجات</h2>
              <p className="text-gray-600 mb-6">لم نتمكن من العثور على منتجات في هذه الفئة</p>
              <Button asChild>
                <a href={`/${locale}/products`}>استعرض جميع المنتجات</a>
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
