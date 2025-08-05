"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useTranslations, useLocale } from "next-intl"
import Link from "next/link"
import { Clock, Tag, ArrowRight, ChevronRight } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { offers, products } from "@/lib/data"
import { ProductCard } from "@/components/products/product-card"

export default function OfferPage() {
  const params = useParams()
  const id = params.id as string
  const t = useTranslations()
  const locale = useLocale()

  const [offer, setOffer] = useState<any>(null)
  const [offerProducts, setOfferProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // محاكاة تحميل العرض والمنتجات
    setTimeout(() => {
      const foundOffer = offers.find((o) => o.id === id)
      if (foundOffer) {
        setOffer(foundOffer)

        // تحميل منتجات العرض (منتجات من نفس الفئة)
        const categoryProducts = products.filter((p) => p.category === foundOffer.category).slice(0, 8)
        setOfferProducts(categoryProducts)
      }
      setLoading(false)
    }, 1000)
  }, [id])

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

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
          <div className="container mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>
              <div className="space-y-4 mb-8">
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg p-4">
                    <div className="aspect-square bg-gray-200 rounded mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (!offer) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-4">العرض غير موجود</h1>
            <p className="mb-6">عذراً، لم نتمكن من العثور على العرض الذي تبحث عنه.</p>
            <Button asChild>
              <Link href={`/${locale}/offers`}>العودة إلى العروض</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  const timeLeft = calculateTimeLeft(offer.validUntil)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          {/* فتات الخبز */}
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <Link href={`/${locale}`} className="hover:text-arabic-primary">
              الرئيسية
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href={`/${locale}/offers`} className="hover:text-arabic-primary">
              العروض
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900 font-medium truncate">{offer.title}</span>
          </div>

          {/* تفاصيل العرض */}
          <Card className="mb-12 overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-video relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-r ${offer.color} opacity-90`}></div>
                <img src={offer.image || "/placeholder.svg"} alt={offer.title} className="w-full h-full object-cover" />
                <div className="absolute top-6 right-6">
                  <Badge variant="secondary" className="bg-white/90 text-gray-900 text-lg px-4 py-2">
                    <Tag className="h-5 w-5 mr-2" />
                    خصم {offer.discount}%
                  </Badge>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 arabic-text">{offer.title}</h1>
                    <p className="text-xl md:text-2xl arabic-text">{offer.description}</p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                {Object.keys(timeLeft).length > 0 && (
                  <div className="flex items-center justify-center gap-6 mb-8 p-6 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <Clock className="h-6 w-6 text-red-500" />
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">ينتهي العرض خلال:</p>
                      <div className="flex gap-4 text-2xl font-bold text-red-600">
                        <div className="text-center">
                          <div>{(timeLeft as any).days || 0}</div>
                          <div className="text-xs text-gray-500">يوم</div>
                        </div>
                        <div className="text-center">
                          <div>{(timeLeft as any).hours || 0}</div>
                          <div className="text-xs text-gray-500">ساعة</div>
                        </div>
                        <div className="text-center">
                          <div>{(timeLeft as any).minutes || 0}</div>
                          <div className="text-xs text-gray-500">دقيقة</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="text-center">
                  <Link href={`/${locale}/categories/${offer.category}`}>
                    <Button size="lg" className="bg-arabic-primary hover:bg-arabic-primary/90 px-8">
                      تسوق الآن
                      <ArrowRight className="h-5 w-5 mr-2 rtl:rotate-180" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* منتجات العرض */}
          {offerProducts.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6 arabic-text">منتجات العرض</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {offerProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
