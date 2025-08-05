"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useTranslations, useLocale } from "next-intl"
import { User, MapPin, Edit, Save, X } from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/components/providers/auth-provider"
import { formatDate } from "@/lib/utils"
import toast from "react-hot-toast"

export default function ProfilePage() {
  const t = useTranslations()
  const locale = useLocale()
  const { user } = useAuth()

  const [isEditing, setIsEditing] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    dateOfBirth: "",
  })

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.displayName || "",
        email: user.email || "",
        phone: "",
        address: "",
        city: "",
        dateOfBirth: "",
      })
    }
  }, [user])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    setLoading(true)

    // محاكاة حفظ البيانات
    setTimeout(() => {
      toast.success("تم حفظ البيانات بنجاح!")
      setIsEditing(false)
      setLoading(false)
    }, 1000)
  }

  const handleCancel = () => {
    setIsEditing(false)
    // إعادة تعيين البيانات
    if (user) {
      setFormData({
        name: user.displayName || "",
        email: user.email || "",
        phone: "",
        address: "",
        city: "",
        dateOfBirth: "",
      })
    }
  }

  if (!user) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <User className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">تسجيل الدخول مطلوب</h2>
              <p className="text-gray-600 mb-4">يرجى تسجيل الدخول للوصول إلى ملفك الشخصي</p>
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

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-8 arabic-text">{t("profile.title")}</h1>

            <Tabs defaultValue="personal" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="personal">المعلومات الشخصية</TabsTrigger>
                <TabsTrigger value="addresses">العناوين</TabsTrigger>
                <TabsTrigger value="orders">الطلبات</TabsTrigger>
                <TabsTrigger value="settings">الإعدادات</TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <User className="h-5 w-5" />
                      المعلومات الشخصية
                    </CardTitle>
                    {!isEditing ? (
                      <Button variant="outline" onClick={() => setIsEditing(true)}>
                        <Edit className="h-4 w-4 mr-2" />
                        تعديل
                      </Button>
                    ) : (
                      <div className="flex gap-2">
                        <Button onClick={handleSave} disabled={loading}>
                          <Save className="h-4 w-4 mr-2" />
                          {loading ? "جاري الحفظ..." : "حفظ"}
                        </Button>
                        <Button variant="outline" onClick={handleCancel}>
                          <X className="h-4 w-4 mr-2" />
                          إلغاء
                        </Button>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="h-20 w-20 rounded-full bg-arabic-primary text-white flex items-center justify-center text-2xl font-bold">
                        {user.displayName?.charAt(0) || user.email?.charAt(0) || "U"}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{user.displayName || "مستخدم"}</h3>
                        <p className="text-gray-600">{user.email}</p>
                        <p className="text-sm text-gray-500">
                          عضو منذ {formatDate(new Date(user.metadata?.creationTime || Date.now()), locale)}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">الاسم الكامل</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="text-right"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">البريد الإلكتروني</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          disabled={true}
                          className="text-right bg-gray-50"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">رقم الهاتف</Label>
                        <Input
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="text-right"
                        />
                      </div>
                      <div>
                        <Label htmlFor="dateOfBirth">تاريخ الميلاد</Label>
                        <Input
                          id="dateOfBirth"
                          name="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="text-right"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="address">العنوان</Label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="text-right"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="addresses">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      عناوين الشحن
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600 mb-4">لم تقم بإضافة أي عناوين بعد</p>
                      <Button>إضافة عنوان جديد</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="orders">
                <Card>
                  <CardHeader>
                    <CardTitle>طلباتي</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        📦
                      </div>
                      <p className="text-gray-600 mb-4">لم تقم بأي طلبات بعد</p>
                      <Button asChild>
                        <a href={`/${locale}/products`}>ابدأ التسوق</a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>إعدادات الحساب</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">الإشعارات عبر البريد الإلكتروني</h4>
                        <p className="text-sm text-gray-600">تلقي إشعارات حول الطلبات والعروض</p>
                      </div>
                      <Button variant="outline" size="sm">
                        تفعيل
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">الإشعارات الفورية</h4>
                        <p className="text-sm text-gray-600">تلقي إشعارات فورية في المتصفح</p>
                      </div>
                      <Button variant="outline" size="sm">
                        تفعيل
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">النشرة الإخبارية</h4>
                        <p className="text-sm text-gray-600">تلقي أحدث العروض والمنتجات</p>
                      </div>
                      <Button variant="outline" size="sm">
                        تفعيل
                      </Button>
                    </div>
                    <hr />
                    <div className="space-y-4">
                      <h4 className="font-medium text-red-600">منطقة الخطر</h4>
                      <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg">
                        <div>
                          <h4 className="font-medium">حذف الحساب</h4>
                          <p className="text-sm text-gray-600">حذف حسابك وجميع بياناتك نهائياً</p>
                        </div>
                        <Button variant="destructive" size="sm">
                          حذف الحساب
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
