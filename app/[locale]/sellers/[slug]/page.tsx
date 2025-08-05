"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useTranslations, useLocale } from "next-intl"
import Link from "next/link"
import { Star, MapPin, Package, CheckCircle, Mail, Phone, Calendar, ChevronRight } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { formatDate } from "@/lib/utils"
import { sellers, products } from "@/lib/data"
import { ProductCard } from "@/components/products/product-card"

export default function SellerPage() {
  const params = useParams()
  const slug = params.slug as string
  const t = useTranslations()
  const locale = useLocale()

  const [seller, setSeller] = useState<any>(null)
  const [sellerProducts, setSellerProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // محاكاة تحميل البائع والمنتجات
    setTimeout(() => {
      const foundSeller = sellers.find((s) => s.slug === slug)
      if (foundSeller) {
        setSeller(foundSeller)

        // تحميل منتجات البائع
        const sellerProducts = products.filter((p) => p.sellerId === foundSeller.id)
        setSellerProducts(sellerProducts)
      }
      setLoading(false)
    }, 1000)
  }, [slug])

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
          <div className="container mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-48 bg-gray-200 rounded-lg mb-8"></div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                  <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
                <div className="space-y-4">
                  <div className="h-32 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (!seller) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-4">البائع غير موجود</h1>
            <p className="mb-6">عذراً، لم نتمكن من العثور على البائع الذي تبحث عنه.</p>
            <Button asChild>
              <Link href={`/${locale}/sellers`}>العودة إلى البائعين</Link>
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
          {/* فتات الخبز */}
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <Link href={`/${locale}`} className="hover:text-arabic-primary">
              الرئيسية
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href={`/${locale}/sellers`} className="hover:text-arabic-primary">
              البائعين
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900 font-medium">{seller.name}</span>
          </div>

          {/* صورة الغلاف ومعلومات البائع */}
          <Card className="mb-8 overflow-hidden">
            <CardContent className="p-0">
              <div className="h-48 bg-gradient-to-r from-arabic-primary to-arabic-primary/80 relative">
                {seller.coverImage && (
                  <img
                    src={seller.coverImage || "/placeholder.svg"}
                    alt={seller.name}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-black/20"></div>
              </div>

              <div className="p-8 relative">
                {/* شعار البائع */}
                <div className="absolute -top-16 right-8">
                  <div className="w-32 h-32 rounded-full border-4 border-white bg-white overflow-hidden">
                    <img
                      src={seller.logo || "/placeholder.svg"}
                      alt={seller.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="pt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <h1 className="text-3xl font-bold arabic-text">{seller.name}</h1>
                      {seller.isVerified && (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          معتمد
                        </Badge>
                      )}
                    </div>

                    <p className="text-gray-600 mb-6 arabic-text">{seller.description}</p>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center">
                        <Star className="h-5 w-5 text-yellow-400 fill-current mr-2" />
                        <span className="font-semibold">{seller.rating}</span>
                        <span className="text-gray-500 mr-1">({seller.reviewCount} تقييم)</span>
                      </div>
                      <div className="flex items-center">
                        <Package className="h-5 w-5 text-arabic-primary mr-2" />
                        <span>{seller.productCount} منتج</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                        <span className="text-sm">{seller.contactInfo.address}</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-5 w-5 text-gray-500 mr-2" />
                        <span className="text-sm">عضو منذ {formatDate(new Date(seller.joinedDate), locale)}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <Card>
                      <CardHeader>
                        <CardTitle>معلومات الاتصال</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center">
                          <Mail className="h-5 w-5 text-arabic-primary mr-3" />
                          <span>{seller.contactInfo.email}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="h-5 w-5 text-arabic-primary mr-3" />
                          <span>{seller.contactInfo.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-5 w-5 text-arabic-primary mr-3" />
                          <span>{seller.contactInfo.address}</span>
                        </div>
                        <Button className="w-full bg-arabic-primary hover:bg-arabic-primary/90">تواصل مع البائع</Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* منتجات البائع */}
          <Tabs defaultValue="products" className="space-y-6">
            <TabsList>
              <TabsTrigger value="products">المنتجات ({sellerProducts.length})</TabsTrigger>
              <TabsTrigger value="reviews">التقييمات ({seller.reviewCount})</TabsTrigger>
              <TabsTrigger value="about">حول البائع</TabsTrigger>
            </TabsList>

            <TabsContent value="products">
              {sellerProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {sellerProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h2 className="text-xl font-bold mb-2">لا توجد منتجات</h2>
                  <p className="text-gray-600">لم يقم هذا البائع بإضافة أي منتجات بعد</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="reviews">
              <Card>
                <CardContent className="p-8 text-center">
                  <Star className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h2 className="text-xl font-bold mb-2">لا توجد تقييمات</h2>
                  <p className="text-gray-600">لم يتم تقييم هذا البائع بعد</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="about">
              <Card>
                <CardContent className="p-8">
                  <div className="prose max-w-none arabic-text">
                    <h3 className="text-xl font-bold mb-4">حول {seller.name}</h3>
                    <p className="mb-4">{seller.description}</p>
                    <p className="mb-4">
                      نحن متجر متخصص في تقديم أفضل المنتجات بأعلى جودة وأفضل الأسعار. نسعى دائماً لتقديم خدمة عملاء
                      ممتازة وضمان رضا عملائنا.
                    </p>
                    <p>
                      انضم إلينا منذ {formatDate(new Date(seller.joinedDate), locale)} ونفخر بخدمة آلاف العملاء الراضين.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  )
}
