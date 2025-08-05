"use client"

import { useTranslations, useLocale } from "next-intl"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getActiveOffers } from "@/lib/data"
import { Clock, Tag } from "lucide-react"

export function SpecialOffers() {
  const t = useTranslations()
  const locale = useLocale()
  const activeOffers = getActiveOffers()

  if (activeOffers.length === 0) {
    return null
  }

  const calculateTimeLeft = (validUntil: string) => {
    const difference = +new Date(validUntil) - +new Date()
    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
      }
    }

    return timeLeft
  }

  return (
    <section className="py-12 bg-gradient-to-r from-arabic-primary/5 to-arabic-secondary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 arabic-text">{t("home.specialOffers")}</h2>
          <p className="text-gray-600 dark:text-gray-400">عروض محدودة الوقت لا تفوتها</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeOffers.slice(0, 3).map((offer) => {
            const timeLeft = calculateTimeLeft(offer.validUntil)

            return (
              <Card key={offer.id} className="overflow-hidden group hover:shadow-xl transition-all duration-300">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className={`h-48 bg-gradient-to-r ${offer.color} relative overflow-hidden`}>
                      <img
                        src={offer.image || "/placeholder.svg"}
                        alt={offer.title}
                        className="w-full h-full object-cover opacity-80"
                      />
                      <div className="absolute top-4 right-4">
                        <Badge variant="secondary" className="bg-white/90 text-gray-900">
                          <Tag className="h-3 w-3 mr-1" />
                          خصم {offer.discount}%
                        </Badge>
                      </div>
                      <div className="absolute inset-0 bg-black/20"></div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-bold text-xl mb-2 arabic-text group-hover:text-arabic-primary transition-colors">
                        {offer.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-4 arabic-text">{offer.description}</p>

                      {Object.keys(timeLeft).length > 0 && (
                        <div className="flex items-center gap-2 mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                          <Clock className="h-4 w-4 text-red-500" />
                          <div className="flex gap-2 text-sm">
                            <span className="font-semibold text-red-600">{(timeLeft as any).days || 0} يوم</span>
                            <span className="font-semibold text-red-600">{(timeLeft as any).hours || 0} ساعة</span>
                            <span className="font-semibold text-red-600">{(timeLeft as any).minutes || 0} دقيقة</span>
                          </div>
                        </div>
                      )}

                      <Link href={`/${locale}/offers/${offer.id}`}>
                        <Button className="w-full bg-arabic-primary hover:bg-arabic-primary/90">استكشف العرض</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-8">
          <Link
            href={`/${locale}/offers`}
            className="inline-flex items-center px-6 py-3 bg-arabic-secondary text-white rounded-lg hover:bg-arabic-secondary/90 transition-colors"
          >
            عرض جميع العروض
            <svg className="w-4 h-4 mr-2 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
