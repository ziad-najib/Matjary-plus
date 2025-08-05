"use client"

import { useState, useEffect } from "react"
import { useTranslations, useLocale } from "next-intl"
import Link from "next/link"
import { Package, Truck, CheckCircle, XCircle, Clock, Eye } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/providers/auth-provider"
import { formatPrice, formatDate } from "@/lib/utils"
import type { Order } from "@/lib/types"

// بيانات تجريبية للطلبات
const sampleOrders: Order[] = [
  {
    id: "ORD-001",
    userId: "user1",
    items: [
      {
        id: "1",
        productId: "1",
        name: "هاتف ذكي Samsung Galaxy S23",
        price: 850000,
        quantity: 1,
        image: "/placeholder.svg?height=100&width=100",
        sellerId: "seller1",
      },
    ],
    status: "delivered",
    shippingAddress: {
      id: "addr1",
      userId: "user1",
      name: "أحمد محمد",
      phone: "+963 11 1234567",
      address: "شارع الثورة، دمشق",
      city: "دمشق",
      state: "دمشق",
      postalCode: "12345",
      country: "سوريا",
      isDefault: true,
    },
    paymentMethod: "cash",
    subtotal: 850000,
    shipping: 25000,
    tax: 85000,
    total: 960000,
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-20T10:00:00Z",
    trackingNumber: "TRK123456789",
    estimatedDelivery: "2024-01-22",
  },
  {
    id: "ORD-002",
    userId: "user1",
    items: [
      {
        id: "2",
        productId: "2",
        name: "لابتوب Dell XPS 15",
        price: 1500000,
        quantity: 1,
        image: "/placeholder.svg?height=100&width=100",
        sellerId: "seller2",
      },
    ],
    status: "shipped",
    shippingAddress: {
      id: "addr1",
      userId: "user1",
      name: "أحمد محمد",
      phone: "+963 11 1234567",
      address: "شارع الثورة، دمشق",
      city: "دمشق",
      state: "دمشق",
      postalCode: "12345",
      country: "سوريا",
      isDefault: true,
    },
    paymentMethod: "wallet",
    subtotal: 1500000,
    shipping: 25000,
    tax: 150000,
    total: 1675000,
    createdAt: "2024-01-10T10:00:00Z",
    updatedAt: "2024-01-18T10:00:00Z",
    trackingNumber: "TRK987654321",
    estimatedDelivery: "2024-01-25",
  },
]

export default function OrdersPage() {
  const t = useTranslations()
  const locale = useLocale()
  const { user } = useAuth()

  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    // محاكاة تحميل الطلبات
    setTimeout(() => {
      setOrders(sampleOrders)
      setLoading(false)
    }, 1000)
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "confirmed":
        return <CheckCircle className="h-4 w-4 text-blue-500" />
      case "processing":
        return <Package className="h-4 w-4 text-orange-500" />
      case "shipped":
        return <Truck className="h-4 w-4 text-purple-500" />
      case "delivered":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "cancelled":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "قيد الانتظار"
      case "confirmed":
        return "مؤكد"
      case "processing":
        return "قيد التحضير"
      case "shipped":
        return "تم الشحن"
      case "delivered":
        return "تم التسليم"
      case "cancelled":
        return "ملغي"
      default:
        return "غير معروف"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "processing":
        return "bg-orange-100 text-orange-800"
      case "shipped":
        return "bg-purple-100 text-purple-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const filterOrders = (status: string) => {
    if (status === "all") return orders
    return orders.filter((order) => order.status === status)
  }

  if (!user) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">تسجيل الدخول مطلوب</h2>
              <p className="text-gray-600 mb-4">يرجى تسجيل الدخول لعرض طلباتك</p>
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

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
          <div className="container mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg p-6">
                    <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
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

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8 arabic-text">{t("orders.title")}</h1>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="all">الكل ({orders.length})</TabsTrigger>
              <TabsTrigger value="pending">قيد الانتظار</TabsTrigger>
              <TabsTrigger value="processing">قيد التحضير</TabsTrigger>
              <TabsTrigger value="shipped">تم الشحن</TabsTrigger>
              <TabsTrigger value="delivered">تم التسليم</TabsTrigger>
              <TabsTrigger value="cancelled">ملغي</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              {filterOrders(activeTab).length > 0 ? (
                <div className="space-y-6">
                  {filterOrders(activeTab).map((order) => (
                    <Card key={order.id}>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <span>طلب رقم {order.id}</span>
                            <Badge className={getStatusColor(order.status)}>
                              {getStatusIcon(order.status)}
                              <span className="mr-1">{getStatusText(order.status)}</span>
                            </Badge>
                          </CardTitle>
                          <p className="text-sm text-gray-600">
                            تاريخ الطلب: {formatDate(new Date(order.createdAt), locale)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-bold text-arabic-primary">{formatPrice(order.total)}</p>
                          <p className="text-sm text-gray-600">{order.items.length} منتج</p>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* منتجات الطلب */}
                          <div className="space-y-3">
                            {order.items.map((item) => (
                              <div key={item.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                                <img
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  className="w-16 h-16 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                  <h4 className="font-medium arabic-text">{item.name}</h4>
                                  <p className="text-sm text-gray-600">الكمية: {item.quantity}</p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold">{formatPrice(item.price * item.quantity)}</p>
                                </div>
                              </div>
                            ))}
                          </div>

                          {/* معلومات إضافية */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                            <div>
                              <h5 className="font-medium mb-2">عنوان الشحن:</h5>
                              <p className="text-sm text-gray-600">
                                {order.shippingAddress.name}
                                <br />
                                {order.shippingAddress.address}
                                <br />
                                {order.shippingAddress.city}, {order.shippingAddress.state}
                                <br />
                                {order.shippingAddress.phone}
                              </p>
                            </div>
                            <div>
                              <h5 className="font-medium mb-2">معلومات الشحن:</h5>
                              {order.trackingNumber && (
                                <p className="text-sm text-gray-600">
                                  رقم التتبع: <span className="font-mono">{order.trackingNumber}</span>
                                </p>
                              )}
                              {order.estimatedDelivery && (
                                <p className="text-sm text-gray-600">
                                  التسليم المتوقع: {formatDate(new Date(order.estimatedDelivery), locale)}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* أزرار الإجراءات */}
                          <div className="flex gap-2 pt-4 border-t">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-2" />
                              عرض التفاصيل
                            </Button>
                            {order.status === "delivered" && (
                              <Button variant="outline" size="sm">
                                تقييم المنتج
                              </Button>
                            )}
                            {order.status === "pending" && (
                              <Button variant="destructive" size="sm">
                                إلغاء الطلب
                              </Button>
                            )}
                            {order.trackingNumber && (
                              <Button variant="outline" size="sm">
                                تتبع الشحنة
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h2 className="text-xl font-bold mb-2">لا توجد طلبات</h2>
                  <p className="text-gray-600 mb-6">لم تقم بأي طلبات في هذه الفئة بعد</p>
                  <Button asChild>
                    <Link href={`/${locale}/products`}>ابدأ التسوق</Link>
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </>
  )
}
