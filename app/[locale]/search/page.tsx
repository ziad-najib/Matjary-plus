"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useTranslations, useLocale } from "next-intl"
import { SearchIcon, Filter, SlidersHorizontal } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { products } from "@/lib/data"
import { ProductCard } from "@/components/products/product-card"

export default function SearchPage() {
  const t = useTranslations()
  const locale = useLocale()
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""

  const [loading, setLoading] = useState(true)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    category: "",
    minPrice: "",
    maxPrice: "",
    sort: "relevance",
  })

  useEffect(() => {
    // محاكاة البحث
    setTimeout(() => {
      if (query) {
        const results = products.filter(
          (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase()),
        )
        setSearchResults(results)
      } else {
        setSearchResults([])
      }
      setLoading(false)
    }, 1000)
  }, [query])

  const handleFilterChange = (name: string, value: string) => {
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const applyFilters = () => {
    let filtered = [...searchResults]

    if (filters.category) {
      filtered = filtered.filter((product) => product.category === filters.category)
    }

    if (filters.minPrice) {
      filtered = filtered.filter((product) => product.price >= Number(filters.minPrice))
    }

    if (filters.maxPrice) {
      filtered = filtered.filter((product) => product.price <= Number(filters.maxPrice))
    }

    switch (filters.sort) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "relevance":
      default:
        // الترتيب حسب الصلة (الافتراضي)
        break
    }

    setSearchResults(filtered)
  }

  const clearFilters = () => {
    setFilters({
      category: "",
      minPrice: "",
      maxPrice: "",
      sort: "relevance",
    })
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2 arabic-text">{t("search.title")}</h1>
              <p className="text-gray-600">
                {query ? (
                  <>
                    {t("search.searchFor")} <span className="font-medium">"{query}"</span> - {searchResults.length}{" "}
                    {t("search.resultsFound")}
                  </>
                ) : (
                  "ابحث عن منتجات"
                )}
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
                </Button>
                <select
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  value={filters.sort}
                  onChange={(e) => handleFilterChange("sort", e.target.value)}
                >
                  <option value="relevance">الأكثر صلة</option>
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
                  <Button onClick={applyFilters} className="w-full bg-arabic-primary hover:bg-arabic-primary/90">
                    تطبيق الفلاتر
                  </Button>
                </div>
                <div className="flex items-end">
                  <Button variant="outline" onClick={clearFilters} className="w-full bg-transparent">
                    مسح الفلاتر
                  </Button>
                </div>
              </div>
            </Card>
          )}

          {/* عرض نتائج البحث */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <div className="aspect-square bg-gray-200 rounded-t-lg"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </Card>
              ))}
            </div>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {searchResults.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <SearchIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">{t("search.noResults")}</h2>
              <p className="text-gray-600 mb-6">لم نتمكن من العثور على منتجات تطابق "{query}"</p>
              <div className="max-w-md mx-auto">
                <h3 className="font-medium mb-2">اقتراحات البحث:</h3>
                <ul className="text-arabic-primary space-y-1">
                  <li>تأكد من كتابة جميع الكلمات بشكل صحيح</li>
                  <li>جرب كلمات مفتاحية مختلفة</li>
                  <li>جرب كلمات مفتاحية أكثر عمومية</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
