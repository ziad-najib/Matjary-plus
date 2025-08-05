"use client"

import { useState } from "react"
import { useTranslations, useLocale } from "next-intl"
import { BarChart3, Users, Package, ShoppingCart, TrendingUp, DollarSign, Eye, Plus, Edit, Trash2 } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/providers/auth-provider"
import { formatPrice } from "@/lib/utils"
import { products, sellers } from "@/lib/data"

export default function AdminPage() {
  const t = useTranslations()
  const locale = useLocale()
  const { user } = useAuth()

  const [stats, setStats] = useState({
    totalUsers: 1250,
    totalProducts: products.length,
    totalOrders: 342,
    totalRevenue: 15750000,
    monthlyGrowth: 12.5,
  })

  // التحقق من صلاحيات المسؤول
  if (!user || user.email !== "admin@example.com") {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚫</span>
              </div>
              <h2 className="text-xl font-bold mb-2">غير مصرح</h2>
              <p className="text-gray-600 mb-4">ليس لديك صلاحية للوصول إلى لوحة التحكم</p>
              <Button asChild>
                <a href={`/${locale}`}>العودة للرئيسية</a>
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
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold arabic-text">لوحة التحكم الإدارية</h1>
            <div className="flex gap-2">
              <Button variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                التقارير
              </Button>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                إضافة منتج
              </Button>
            </div>
          </div>

          {/* إحصائيات سريعة */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">إجمالي المستخدمين</p>
                    <p className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</p>
                  </div>
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">إجمالي المنتجات</p>
                    <p className="text-2xl font-bold">{stats.totalProducts}</p>
                  </div>
                  <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Package className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">إجمالي الطلبات</p>
                    <p className="text-2xl font-bold">{stats.totalOrders}</p>
                  </div>
                  <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <ShoppingCart className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">إجمالي الإيرادات</p>
                    <p className="text-2xl font-bold">{formatPrice(stats.totalRevenue)}</p>
                    <div className="flex items-center text-sm text-green-600">
                      <TrendingUp className="h-4 w-4 mr-1" />+{stats.monthlyGrowth}%
                    </div>
                  </div>
                  <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* التبويبات الرئيسية */}
          <Tabs defaultValue="products" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="products">المنتجات</TabsTrigger>
              <TabsTrigger value="orders">الطلبات</TabsTrigger>
              <TabsTrigger value="users">المستخدمين</TabsTrigger>
              <TabsTrigger value="sellers">البائعين</TabsTrigger>
              <TabsTrigger value="analytics">التحليلات</TabsTrigger>
            </TabsList>

            <TabsContent value="products">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>إدارة المنتجات</CardTitle>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    إضافة منتج جديد
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {products.slice(0, 5).map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <img
                            src={product.images[0] || "/placeholder.svg"}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <h4 className="font-medium arabic-text">{product.name}</h4>
                            <p className="text-sm text-gray-600">{product.category}</p>
                            <p className="text-sm font-bold text-arabic-primary">{formatPrice(product.price)}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={product.stock > 0 ? "secondary" : "destructive"}>
                            {product.stock > 0 ? `متوفر (${product.stock})` : "نفد المخزون"}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>إدارة الطلبات</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <ShoppingCart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">لا توجد طلبات جديدة</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>إدارة المستخدمين</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">قائمة المستخدمين</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="sellers">
              <Card>
                <CardHeader>
                  <CardTitle>إدارة البائعين</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {sellers.slice(0, 3).map((seller) => (
                      <div key={seller.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-4">
                          <img
                            src={seller.logo || "/placeholder.svg"}
                            alt={seller.name}
                            className="w-12 h-12 object-cover rounded-full"
                          />
                          <div>
                            <h4 className="font-medium arabic-text">{seller.name}</h4>
                            <p className="text-sm text-gray-600">{seller.productCount} منتج</p>
                            <div className="flex items-center text-sm">
                              <span className="text-yellow-500">★</span>
                              <span className="mr-1">{seller.rating}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={seller.isVerified ? "secondary" : "outline"}>
                            {seller.isVerified ? "معتمد" : "غير معتمد"}
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>التحليلات والتقارير</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">تحليلات المبيعات والأداء</p>
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
