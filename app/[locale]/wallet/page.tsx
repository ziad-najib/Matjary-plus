"use client"

import { useState } from "react"
import { useTranslations, useLocale } from "next-intl"
import { Wallet, Plus, History, MapPin, CreditCard, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { useAuth } from "@/components/providers/auth-provider"
import { formatPrice, formatDate } from "@/lib/utils"
import { transactions } from "@/lib/data"
import toast from "react-hot-toast"

export default function WalletPage() {
  const [balance, setBalance] = useState(125000)
  const [rechargeAmount, setRechargeAmount] = useState("")
  const [loading, setLoading] = useState(false)
  const t = useTranslations()
  const locale = useLocale()
  const { user } = useAuth()

  const handleRecharge = async (method: string) => {
    if (!rechargeAmount || Number(rechargeAmount) <= 0) {
      toast.error("يرجى إدخال مبلغ صحيح")
      return
    }

    setLoading(true)

    // محاكاة عملية الشحن
    setTimeout(() => {
      const amount = Number(rechargeAmount)
      setBalance((prev) => prev + amount)
      setRechargeAmount("")
      toast.success("تم شحن المحفظة بنجاح!")
      setLoading(false)
    }, 1000)
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "recharge":
        return <Plus className="h-4 w-4 text-green-500" />
      case "payment":
        return <CreditCard className="h-4 w-4 text-red-500" />
      case "refund":
        return <Plus className="h-4 w-4 text-blue-500" />
      default:
        return <History className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            مكتمل
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            قيد الانتظار
          </Badge>
        )
      case "failed":
        return <Badge variant="destructive">فشل</Badge>
      default:
        return null
    }
  }

  if (!user) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <Wallet className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">تسجيل الدخول مطلوب</h2>
              <p className="text-gray-600 mb-4">يرجى تسجيل الدخول للوصول إلى محفظتك</p>
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* رصيد المحفظة */}
            <div className="lg:col-span-1">
              <Card className="mb-6">
                <CardHeader className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-arabic-primary/10 rounded-full mb-4">
                    <Wallet className="h-8 w-8 text-arabic-primary" />
                  </div>
                  <CardTitle className="arabic-text">{t("wallet.title")}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-arabic-primary mb-2">{formatPrice(balance)}</div>
                  <p className="text-gray-600">{t("wallet.balance")}</p>
                </CardContent>
              </Card>

              {/* شحن المحفظة */}
              <Card>
                <CardHeader>
                  <CardTitle className="arabic-text">{t("wallet.recharge")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    type="number"
                    placeholder="أدخل المبلغ"
                    value={rechargeAmount}
                    onChange={(e) => setRechargeAmount(e.target.value)}
                    className="text-right"
                  />

                  <div className="space-y-2">
                    <Button
                      onClick={() => handleRecharge("سيرياتيل كاش")}
                      className="w-full justify-start"
                      variant="outline"
                      disabled={loading}
                    >
                      <Smartphone className="h-4 w-4 mr-2" />
                      سيرياتيل كاش
                    </Button>

                    <Button
                      onClick={() => handleRecharge("MTN كاش")}
                      className="w-full justify-start"
                      variant="outline"
                      disabled={loading}
                    >
                      <Smartphone className="h-4 w-4 mr-2" />
                      MTN كاش
                    </Button>

                    <Button
                      onClick={() => handleRecharge("بطاقة ائتمان")}
                      className="w-full justify-start"
                      variant="outline"
                      disabled={loading}
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      بطاقة ائتمان
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* سجل المعاملات */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="arabic-text">{t("wallet.transactions")}</CardTitle>
                  <Button variant="outline" size="sm">
                    <MapPin className="h-4 w-4 mr-2" />
                    {t("wallet.rechargeCenters")}
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {getTransactionIcon(transaction.type)}
                          <div>
                            <p className="font-medium arabic-text">{transaction.description}</p>
                            <p className="text-sm text-gray-500">{formatDate(new Date(transaction.date), locale)}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-bold ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                            {transaction.amount > 0 ? "+" : ""}
                            {formatPrice(Math.abs(transaction.amount))}
                          </p>
                          {getStatusBadge(transaction.status)}
                        </div>
                      </div>
                    ))}
                  </div>
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
