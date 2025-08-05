"use client"

import { useTranslations, useLocale } from "next-intl"
import Link from "next/link"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useWishlist } from "@/components/providers/wishlist-provider"
import { useCart } from "@/components/providers/cart-provider"
import { formatPrice } from "@/lib/utils"
import { useAuth } from "@/components/providers/auth-provider"
import toast from "react-hot-toast"

export default function WishlistPage() {
  const t = useTranslations()
  const locale = useLocale()
  const { state: wishlist, removeItem, clearWishlist } = useWishlist()
  const { addItem } = useCart()
  const { user } = useAuth()

  const handleAddToCart = (item: any) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
      sellerId: item.sellerId,
    })
    toast.success("تمت إضافة المنتج إلى السلة")
  }

  const handleRemoveFromWishlist = (id: string) => {
    removeItem(id)
    toast.success("تمت إزالة المنتج من المفضلة")
  }

  if (!user) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">تسجيل الدخول مطلوب</h2>
              <p className="text-gray-600 mb-4">يرجى تسجيل الدخول للوصول إلى قائمة المفضلة</p>
              <Button asChild>
                <a href={`/${locale}/auth/login`}>تسجيل الدخول</a>
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </>
    )
  }

  if (wishlist.items.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center py-20">
              <Heart className="h-24 w-24 text-gray-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4 arabic-text">{t("wishlist.empty")}</h2>
              <p className="text-gray-600 mb-8">ابدأ بإضافة المنتجات التي تعجبك إلى المفضلة</p>
              <Link href={`/${locale}/products`}>
                <Button className="bg-arabic-primary hover:bg-arabic-primary/90">{t("cart.continueShopping")}</Button>
              </Link>
            </div>
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
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold arabic-text">{t("wishlist.title")}</h1>
            <Button variant="outline" onClick={clearWishlist} className="text-red-500 bg-transparent">
              مسح المفضلة
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.items.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="aspect-square relative">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <Button
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => handleRemoveFromWishlist(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="p-4">
                    <Link href={`/${locale}/products/${item.id}`}>
                      <h3 className="font-semibold text-lg mb-2 hover:text-arabic-primary transition-colors arabic-text line-clamp-2">
                        {item.name}
                      </h3>
                    </Link>
                    <p className="text-arabic-primary font-bold mb-4">{formatPrice(item.price)}</p>
                    <Button
                      onClick={() => handleAddToCart(item)}
                      className="w-full bg-arabic-primary hover:bg-arabic-primary/90"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {t("wishlist.addToCart")}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
