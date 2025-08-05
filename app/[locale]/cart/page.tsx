"use client"

import { useTranslations, useLocale } from "next-intl"
import Link from "next/link"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useCart } from "@/components/providers/cart-provider"
import { formatPrice } from "@/lib/utils"

export default function CartPage() {
  const t = useTranslations()
  const locale = useLocale()
  const { state: cart, updateQuantity, removeItem, clearCart } = useCart()

  const shippingCost = 25000
  const taxRate = 0.1
  const subtotal = cart.total
  const tax = subtotal * taxRate
  const total = subtotal + shippingCost + tax

  if (cart.items.length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
          <div className="container mx-auto px-4">
            <div className="text-center py-20">
              <ShoppingBag className="h-24 w-24 text-gray-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold mb-4 arabic-text">{t("cart.empty")}</h2>
              <p className="text-gray-600 mb-8">ابدأ التسوق الآن واكتشف منتجاتنا المميزة</p>
              <Link href={`/${locale}`}>
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
          <h1 className="text-3xl font-bold mb-8 arabic-text">{t("cart.title")}</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold arabic-text">{item.name}</h3>
                        <p className="text-arabic-primary font-bold">{formatPrice(item.price)}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="font-semibold min-w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button variant="destructive" size="icon" onClick={() => removeItem(item.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="flex justify-end">
                <Button variant="outline" onClick={clearCart} className="text-red-500 bg-transparent">
                  {t("cart.clearCart")}
                </Button>
              </div>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="arabic-text">ملخص الطلب</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>{t("cart.subtotal")}</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("cart.shipping")}</span>
                    <span>{formatPrice(shippingCost)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t("cart.tax")}</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <hr />
                  <div className="flex justify-between font-bold text-lg">
                    <span>{t("cart.total")}</span>
                    <span className="text-arabic-primary">{formatPrice(total)}</span>
                  </div>
                  <Link href={`/${locale}/checkout`}>
                    <Button className="w-full bg-arabic-primary hover:bg-arabic-primary/90">
                      {t("cart.checkout")}
                    </Button>
                  </Link>
                  <Link href={`/${locale}`}>
                    <Button variant="outline" className="w-full bg-transparent">
                      {t("cart.continueShopping")}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
