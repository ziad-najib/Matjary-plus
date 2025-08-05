"use client"

import { useState, useEffect } from "react"
import { useTranslations, useLocale } from "next-intl"
import { useSearchParams } from "next/navigation"
import { Filter, SlidersHorizontal, ChevronDown, Search } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { products } from "@/lib/data"
import { ProductCard } from "@/components/products/product-card"

export default function ProductsPage() {
  const t = useTranslations()
  const locale = useLocale()
  const searchParams = useSearchParams()

  const [loading, setLoading] = useState(true)
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    minPrice: "",
    maxPrice: "",
    sort: "newest",
    search: searchParams.get("q") || "",
  })
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    // محاكاة تحميل المنتجات
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let result = [...products]

    // تطبيق فلتر الفئة
    if (filters.category) {
      result = result.filter((product) => product.category === filters.category)
    }

    // تطبيق فلتر السعر
    if (filters.minPrice) {
      result = result.filter((product) => product.price >= Number(filters.minPrice))
    }
    if (filters.maxPrice) {
      result = result.filter((product) => product.price <= Number(filters.maxPrice))
    }

    // تطبيق فلتر البحث
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) || product.description.toLowerCase().includes(searchLower),
      )
    }

    // تطبيق الترتيب
    switch (filters.sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
      default:
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
    }

    setFilteredProducts(result)
  }, [filters])

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const clearFilters = () => {
    setFilters({
      category: "",
      minPrice: "",
      maxPrice: "",
      sort: "newest",
      search: "",
    })
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2 arabic-text">{t("products.title")}</h1>
              <p className="text-gray-600">
                {filteredProducts.length} {filteredProducts.length === 1 ? "منتج" : "منتجات"}
              </p>
            </div>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <Button
                variant="outline"
                className="flex items-center gap-2 bg-transparent"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4" />
                <span>الفلاتر</span>
              </Button>
              <div className="relative">
                <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>الترتيب</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <select
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  value={filters.sort}
                  onChange={(e) => handleFilterChange("sort", e.target.value)}
                >
                  <option value="newest">الأحدث</option>
                  <option value="price-asc">السعر: من الأقل للأعلى</option>
                  <option value="price-desc">السعر: من الأعلى للأقل</option>
                  <option value="rating">التقييم</option>
                </select>
              </div>
            </div>
          </div>

          {/* فلاتر البحث */}
          {showFilters && (
            <Card className="p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">البحث</label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="ابحث عن منتج..."
                      value={filters.search}
                      onChange={(e) => handleFilterChange("search", e.target.value)}
                      className="pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">الفئة</label>
                  <select
                    className="w-full h-10 px-3 py-2 border rounded-md"
                    value={filters.category}
                    onChange={(e) => handleFilterChange("category", e.target.value)}
                  >
                    <option value="">جميع الفئات</option>
                    <option value="electronics">إلكترونيات</option>
                    <option value="computers">حاسوب</option>
                    <option value="fashion">أزياء</option>
                    <option value="home">منزل</option>
                    <option value="books">كتب</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">السعر</label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      placeholder="من"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange("minPrice", e.target.value)}
                    />
                    <span>-</span>
                    <Input
                      type="number"
                      placeholder="إلى"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-end">
                  <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
                    مسح الفلاتر
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* عرض المنتجات */}
          {loading ? (
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
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">لم يتم العثور على منتجات</h2>
              <p className="text-gray-600 mb-6">لم نتمكن من العثور على منتجات تطابق معايير البحث الخاصة بك</p>
              <Button onClick={clearFilters}>مسح الفلاتر</Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
