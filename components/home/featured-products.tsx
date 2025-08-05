"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useCart } from "@/components/providers/cart-provider"
import { useWishlist } from "@/components/providers/wishlist-provider"
import { featuredProducts } from "@/lib/data"
import { ProductCard } from "@/components/products/product-card"
import toast from "react-hot-toast"

export function FeaturedProducts() {
  const [loading, setLoading] = useState(true)
  const t = useTranslations()
  const locale = useLocale()
  const { addItem } = useCart()
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist()

  useEffect(() => {
    // محاكاة تحميل المنتجات
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0],
      sellerId: product.sellerId,
    })
    toast.success("تمت إضافة المنتج إلى السلة")
  }

  const toggleWishlist = (product: any) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast.success("تمت إزالة المنتج من المفضلة")
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        sellerId: product.sellerId,
      })
      toast.success("تمت إضافة المنتج إلى المفضلة")
    }
  }

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 arabic-text">{t("home.featuredProducts")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-0">
                  <div className="aspect-square bg-gray-200 rounded-t-lg"></div>
                </CardContent>
                <CardFooter className="p-4">
                  <div className="w-full space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2 arabic-text">{t("home.featuredProducts")}</h2>
            <p className="text-gray-600 dark:text-gray-400">أفضل المنتجات المختارة خصيصاً لك</p>
          </div>
          <Link
            href={`/${locale}/products`}
            className="text-arabic-primary hover:text-arabic-primary/80 font-medium flex items-center"
          >
            {t("home.viewAll")}
            <svg className="w-4 h-4 mr-2 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
