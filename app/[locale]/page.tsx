"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Categories } from "@/components/home/categories"
import { FeaturedProducts } from "@/components/home/featured-products"
import { SpecialOffers } from "@/components/home/special-offers"
import { Newsletter } from "@/components/home/newsletter"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Star, Shield, Truck, Headphones } from "lucide-react"
import Link from "next/link"
import { useLocale } from "next-intl"

export default function HomePage() {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <>
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-arabic-primary to-arabic-primary/80 text-white py-20">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold arabic-text leading-tight">{t("home.welcome")}</h1>
                <p className="text-xl md:text-2xl text-white/90 arabic-text">
                  اكتشف أفضل المنتجات بأسعار منافسة وجودة عالية
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href={`/${locale}/products`}>
                    <Button size="lg" className="bg-white text-arabic-primary hover:bg-white/90 px-8">
                      ابدأ التسوق الآن
                      <ArrowRight className="h-5 w-5 mr-2 rtl:rotate-180" />
                    </Button>
                  </Link>
                  <Link href={`/${locale}/offers`}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-arabic-primary px-8 bg-transparent"
                    >
                      العروض الخاصة
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="relative">
                  <img
                    src="/placeholder.svg?height=500&width=600&text=Hero+Image"
                    alt="Hero"
                    className="w-full h-auto rounded-lg shadow-2xl"
                  />
                  <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-4 rounded-lg shadow-lg">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <Star className="h-5 w-5 text-yellow-400 fill-current" />
                      <span className="font-bold">4.8</span>
                      <span className="text-sm text-gray-600">تقييم العملاء</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 mx-auto bg-arabic-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Truck className="h-8 w-8 text-arabic-primary" />
                  </div>
                  <h3 className="font-semibold mb-2 arabic-text">شحن سريع ومجاني</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 arabic-text">
                    شحن مجاني للطلبات فوق 100 ألف ليرة
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 mx-auto bg-arabic-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8 text-arabic-primary" />
                  </div>
                  <h3 className="font-semibold mb-2 arabic-text">ضمان الجودة</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 arabic-text">
                    ضمان على جميع المنتجات وإمكانية الإرجاع
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 mx-auto bg-arabic-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Headphones className="h-8 w-8 text-arabic-primary" />
                  </div>
                  <h3 className="font-semibold mb-2 arabic-text">دعم على مدار الساعة</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 arabic-text">فريق دعم متاح 24/7 لمساعدتك</p>
                </CardContent>
              </Card>

              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 mx-auto bg-arabic-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Star className="h-8 w-8 text-arabic-primary" />
                  </div>
                  <h3 className="font-semibold mb-2 arabic-text">أفضل الأسعار</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 arabic-text">أسعار منافسة وعروض حصرية يومياً</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <Categories />

        {/* Featured Products Section */}
        <FeaturedProducts />

        {/* Special Offers Section */}
        <SpecialOffers />

        {/* Stats Section */}
        <section className="py-16 bg-arabic-primary text-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">1000+</div>
                <div className="text-white/80 arabic-text">منتج متنوع</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-white/80 arabic-text">بائع معتمد</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">10K+</div>
                <div className="text-white/80 arabic-text">عميل راضي</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">4.8</div>
                <div className="text-white/80 arabic-text">تقييم العملاء</div>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}
