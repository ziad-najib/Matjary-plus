"use client"

import { useState, useEffect } from "react"
import { useTranslations, useLocale } from "next-intl"
import Link from "next/link"
import { Clock, Tag, ArrowRight } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { offers } from "@/lib/data"

export default function OffersPage() {
  const t = useTranslations()
  const locale = useLocale()

  const [loading, setLoading] = useState(true)
  const [filteredOffers, setFilteredOffers] = useState(offers)
  const [categoryFilter, setCategoryFilter] = useState("all")

  useEffect(() => {
    // محاكاة تحميل العروض
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    if (categoryFilter === "all") {
      setFilteredOffers(offers)
    } else {
      setFilteredOffers(offers.filter((offer) => offer.category === categoryFilter))
    }
  }, [categoryFilter])

  const calculateTimeLeft = (validUntil: string) => {
    const difference = +new Date(validUntil) - +new Date()
    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
      }
    }

    return timeLeft
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold mb-4 arabic-text">{t("offers.title")}</h1>
            <p className="text-gray-600 text-lg">اكتشف أفضل العروض والخصومات الحصرية</p>
          </div>

          {/* فلاتر العروض */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button
              variant={categoryFilter === "all" ? "default" : "outline"}
              onClick={() => setCategoryFilter("all")}
              className={categoryFilter === "all" ? "bg-arabic-primary" : "bg-transparent"}
            >
              جميع العروض
            </Button>
            <Button
              variant={categoryFilter === "electronics" ? "default" : "outline"}
              onClick={() => setCategoryFilter("electronics")}
              className={categoryFilter === "electronics" ? "bg-arabic-primary" : "bg-transparent"}
            >
              إلكترونيات
            </Button>
            <Button
              variant={categoryFilter === "fashion" ? "default" : "outline"}
              onClick={() => setCategoryFilter("fashion")}
              className={categoryFilter === "fashion" ? "bg-arabic-primary" : "bg-transparent"}
            >
              أزياء
            </Button>
            <Button
              variant={categoryFilter === "home" ? "default" : "outline"}
              onClick={() => setCategoryFilter("home")}
              className={categoryFilter === "home" ? "bg-arabic-primary" : "bg-transparent"}
            >
              منزل
            </Button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse overflow-hidden">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-gray-200"></div>
                    <div className="p-6 space-y-3">
                      <div className="h-6 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredOffers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredOffers.map((offer) => {
                const timeLeft = calculateTimeLeft(offer.validUntil)

                return (
                  <Card key={offer.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <CardContent className="p-0 relative">
                      <div className="aspect-video relative overflow-hidden">
                        <div className={`absolute inset-0 bg-gradient-to-r ${offer.color} opacity-90`}></div>
                        <img
                          src={offer.image || "/placeholder.svg"}
                          alt={offer.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          <Badge variant="secondary" className="bg-white/90 text-gray-900">
                            <Tag className="h-3 w-3 mr-1" />-{offer.discount}%
                          </Badge>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="font-bold text-xl mb-2 arabic-text group-hover:text-arabic-primary transition-colors">
                          {offer.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-4 arabic-text">{offer.description}</p>

                        {Object.keys(timeLeft).length > 0 && (
                          <div className="flex items-center gap-4 mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                            <Clock className="h-4 w-4 text-red-500" />
                            <div className="flex gap-2 text-sm">
                              <span className="font-semibold text-red-600">{(timeLeft as any).days || 0} يوم</span>
                              <span className="font-semibold text-red-600">{(timeLeft as any).hours || 0} ساعة</span>
                              <span className="font-semibold text-red-600">{(timeLeft as any).minutes || 0} دقيقة</span>
                            </div>
                          </div>
                        )}

                        <Link href={`/${locale}/offers/${offer.id}`}>
                          <Button className="w-full bg-arabic-primary hover:bg-arabic-primary/90">
                            استكشف العرض
                            <ArrowRight className="h-4 w-4 mr-2 rtl:rotate-180" />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-20">
              <Tag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">لا توجد عروض</h2>
              <p className="text-gray-600 mb-6">لا توجد عروض متاحة في هذه الفئة حالياً</p>
              <Button onClick={() => setCategoryFilter("all")}>عرض جميع العروض</Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
