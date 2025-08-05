"use client"

import type React from "react"

import { useState } from "react"
import { useTranslations, useLocale } from "next-intl"
import { useRouter } from "next/navigation"
import { CreditCard, Wallet, Truck, ShoppingBag, Check } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useCart } from "@/components/providers/cart-provider"
import { useAuth } from "@/components/providers/auth-provider"
import { formatPrice } from "@/lib/utils"
import toast from "react-hot-toast"

export default function CheckoutPage() {
  const t = useTranslations()
  const locale = useLocale()
  const router = useRouter()
  const { state: cart, clearCart } = useCart()
  const { user } = useAuth()

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    paymentMethod: "cash",
  })

  const shippingCost = 25000
  const taxRate = 0.1
  const subtotal = cart.total
  const tax = subtotal * taxRate
  const total = subtotal + shippingCost + tax

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePaymentMethodChange = (value: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (step === 1) {
      // التحقق من بيانات الشحن
      if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city) {
        toast.error("يرجى ملء جميع الحقول المطلوبة")
        return
      }
      setStep(2)
    } else if (step === 2) {
      // إرسال الطلب
      setLoading(true)

      // محاكاة إرسال الطلب
      setTimeout(() => {
        clearCart()
        setLoading(false)
        setStep(3)
      }, 2000)
    }
  }

  // التحقق من وجود منتجات في السلة
  if (cart.items.length === 0 && step !== 3) {
    router.push(`/${locale}/cart`)
    return null
  }

  // التحقق من تسجيل الدخول
  if (!user && step !== 3) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">تسجيل الدخول مطلوب</h2>
              <p className="text-gray-600 mb-4">يرجى تسجيل الدخول لإتمام عملية الشراء</p>
              <Button asChild>
                <a href={`/${locale}/auth/login?redirect=checkout`}>تسجيل الدخول</a>
              </Button>
            </CardContent>
          </Card>
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
          <h1 className="text-3xl font-bold mb-8 arabic-text">{t("checkout.title")}</h1>

          {/* خطوات الدفع */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center">
              <div
                className={`rounded-full h-10 w-10 flex items-center justify-center ${step >= 1 ? "bg-arabic-primary text-white" : "bg-gray-200"}`}
              >
                {step > 1 ? <Check className="h-5 w-5" /> : 1}
              </div>
              <div className={`h-1 w-16 ${step >= 2 ? "bg-arabic-primary" : "bg-gray-200"}`}></div>
              <div
                className={`rounded-full h-10 w-10 flex items-center justify-center ${step >= 2 ? "bg-arabic-primary text-white" : "bg-gray-200"}`}
              >
                {step > 2 ? <Check className="h-5 w-5" /> : 2}
              </div>
              <div className={`h-1 w-16 ${step >= 3 ? "bg-arabic-primary" : "bg-gray-200"}`}></div>
              <div
                className={`rounded-full h-10 w-10 flex items-center justify-center ${step >= 3 ? "bg-arabic-primary text-white" : "bg-gray-200"}`}
              >
                3
              </div>
            </div>
          </div>

          {step === 1 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Truck className="h-5 w-5" />
                      {t("checkout.shippingAddress")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">الاسم الكامل</Label>
                          <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                        </div>
                        <div>
                          <Label htmlFor="email">البريد الإلكتروني</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="phone">رقم الهاتف</Label>
                        <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
                      </div>
                      <div>
                        <Label htmlFor="address">العنوان</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">المدينة</Label>
                          <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
                        </div>
                        <div>
                          <Label htmlFor="state">المحافظة</Label>
                          <Input id="state" name="state" value={formData.state} onChange={handleInputChange} />
                        </div>
                        <div>
                          <Label htmlFor="postalCode">الرمز البريدي</Label>
                          <Input
                            id="postalCode"
                            name="postalCode"
                            value={formData.postalCode}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      <div className="pt-4">
                        <Button type="submit" className="w-full bg-arabic-primary hover:bg-arabic-primary/90">
                          متابعة للدفع
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>{t("checkout.orderSummary")}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {cart.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="h-10 w-10 bg-gray-100 rounded overflow-hidden">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                            <p className="text-xs text-gray-500">الكمية: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    ))}
                    <hr />
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
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      {t("checkout.paymentMethod")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <RadioGroup
                        value={formData.paymentMethod}
                        onValueChange={handlePaymentMethodChange}
                        className="space-y-4"
                      >
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <RadioGroupItem value="cash" id="cash" />
                          <Label htmlFor="cash" className="flex items-center gap-2">
                            <Truck className="h-5 w-5" />
                            {t("checkout.paymentMethods.cash")}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <RadioGroupItem value="wallet" id="wallet" />
                          <Label htmlFor="wallet" className="flex items-center gap-2">
                            <Wallet className="h-5 w-5" />
                            {t("checkout.paymentMethods.wallet")}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <RadioGroupItem value="creditCard" id="creditCard" />
                          <Label htmlFor="creditCard" className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5" />
                            {t("checkout.paymentMethods.creditCard")}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <RadioGroupItem value="syriatelCash" id="syriatelCash" />
                          <Label htmlFor="syriatelCash" className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5" />
                            {t("checkout.paymentMethods.syriatelCash")}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <RadioGroupItem value="mtnCash" id="mtnCash" />
                          <Label htmlFor="mtnCash" className="flex items-center gap-2">
                            <CreditCard className="h-5 w-5" />
                            {t("checkout.paymentMethods.mtnCash")}
                          </Label>
                        </div>
                      </RadioGroup>

                      <div className="flex gap-4 pt-4">
                        <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1">
                          رجوع
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1 bg-arabic-primary hover:bg-arabic-primary/90"
                          disabled={loading}
                        >
                          {loading ? "جاري معالجة الطلب..." : t("checkout.placeOrder")}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>{t("checkout.orderSummary")}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {cart.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="h-10 w-10 bg-gray-100 rounded overflow-hidden">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                            <p className="text-xs text-gray-500">الكمية: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    ))}
                    <hr />
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
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="max-w-md mx-auto">
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                    <Check className="h-8 w-8 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{t("checkout.orderPlaced")}</h2>
                  <p className="text-gray-600 mb-6">تم تأكيد طلبك بنجاح. سنرسل لك رسالة بريد إلكتروني بتفاصيل الطلب.</p>
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">{t("checkout.orderNumber")}</span>
                      <span className="font-medium">ORD-{Math.floor(Math.random() * 1000000)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t("checkout.estimatedDelivery")}</span>
                      <span className="font-medium">
                        {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString("ar-SY")}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => router.push(`/${locale}/orders`)}
                    >
                      عرض الطلبات
                    </Button>
                    <Button
                      className="flex-1 bg-arabic-primary hover:bg-arabic-primary/90"
                      onClick={() => router.push(`/${locale}`)}
                    >
                      العودة للرئيسية
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
