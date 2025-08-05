"use client"

import { useState, useEffect } from "react"
import { useTranslations, useLocale } from "next-intl"
import Link from "next/link"
import { Star, MapPin, Package, CheckCircle, Search } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { sellers } from "@/lib/data"

export default function SellersPage() {
  const t = useTranslations()
  const locale = useLocale()

  const [loading, setLoading] = useState(true)
  const [filteredSellers, setFilteredSellers] = useState(sellers)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    // محاكاة تحميل البائعين
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    if (searchQuery) {
      const filtered = sellers.filter((seller) => seller.name.toLowerCase().includes(searchQuery.toLowerCase()))
      setFilteredSellers(filtered)
    } else {
      setFilteredSellers(sellers)
    }
  }, [searchQuery])

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4 arabic-text">{t("sellers.title")}</h1>
            <p className="text-gray-600 text-lg">اكتشف أفضل البائعين والمتاجر المعتمدة</p>
          </div>

          {/* شريط البحث */}
          <div className="max-w-md mx-auto mb-8">
            <div className="relative">
              <Input
                type="text"
                placeholder="ابحث عن بائع..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-right"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-0">
                    <div className="h-32 bg-gray-200 rounded-t-lg"></div>
                    <div className="p-6 space-y-3">
                      <div className="h-6 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredSellers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSellers.map((seller) => (
                <Link key={seller.id} href={`/${locale}/sellers/${seller.slug}`}>
                  <Card className="hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
                    <CardContent className="p-0">
                      {/* صورة الغلاف */}
                      <div className="h-32 bg-gradient-to-r from-arabic-primary to-arabic-primary/80 relative">
                        {seller.coverImage && (
                          <img
                            src={seller.coverImage || "/placeholder.svg"}
                            alt={seller.name}
                            className="w-full h-full object-cover"
                          />
                        )}
                        <div className="absolute inset-0 bg-black/20"></div>
                      </div>

                      <div className="p-6 relative">
                        {/* شعار البائع */}
                        <div className="absolute -top-8 right-6">
                          <div className="w-16 h-16 rounded-full border-4 border-white bg-white overflow-hidden">
                            <img
                              src={seller.logo || "/placeholder.svg"}
                              alt={seller.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        <div className="pt-8 space-y-3">
                          <div className="flex items-center justify-between">
                            <h3 className="text-xl font-bold arabic-text group-hover:text-arabic-primary transition-colors">
                              {seller.name}
                            </h3>
                            {seller.isVerified && (
                              <Badge className="bg-green-100 text-green-800">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                معتمد
                              </Badge>
                            )}
                          </div>

                          <p className="text-gray-600 text-sm arabic-text line-clamp-2">{seller.description}</p>

                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                              <span>{seller.rating}</span>
                              <span className="mr-1">({seller.reviewCount})</span>
                            </div>
                            <div className="flex items-center">
                              <Package className="h-4 w-4 mr-1" />
                              <span>{seller.productCount} منتج</span>
                            </div>
                          </div>

                          <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{seller.contactInfo.address}</span>
                          </div>

                          <div className="text-xs text-gray-400">
                            عضو منذ {formatDate(new Date(seller.joinedDate), locale)}
                          </div>

                          <Button className="w-full bg-arabic-primary hover:bg-arabic-primary/90 mt-4">
                            زيارة المتجر
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Search className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">لم يتم العثور على بائعين</h2>
              <p className="text-gray-600 mb-6">لم نتمكن من العثور على بائعين يطابقون بحثك</p>
              <Button onClick={() => setSearchQuery("")}>مسح البحث</Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
