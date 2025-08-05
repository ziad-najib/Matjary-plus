"use client"

import { useTranslations, useLocale } from "next-intl"
import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="w-10 h-10 bg-arabic-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">م</span>
              </div>
              <div>
                <h3 className="text-xl font-bold arabic-text">متجر إلكتروني شامل</h3>
                <p className="text-sm text-gray-400">أفضل المنتجات بأسعار منافسة</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm arabic-text">
              نحن متجر إلكتروني شامل يوفر أفضل المنتجات من مختلف الفئات بأسعار منافسة وجودة عالية. نسعى لتقديم تجربة
              تسوق مميزة لعملائنا الكرام.
            </p>
            <div className="flex space-x-4 rtl:space-x-reverse">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold arabic-text">{t("footer.quickLinks")}</h4>
            <div className="space-y-2">
              <Link
                href={`/${locale}/about`}
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                من نحن
              </Link>
              <Link
                href={`/${locale}/contact`}
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                اتصل بنا
              </Link>
              <Link
                href={`/${locale}/categories`}
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                الفئات
              </Link>
              <Link
                href={`/${locale}/sellers`}
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                البائعين
              </Link>
              <Link
                href={`/${locale}/offers`}
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                العروض الخاصة
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold arabic-text">{t("footer.customerService")}</h4>
            <div className="space-y-2">
              <Link href={`/${locale}/help`} className="block text-gray-400 hover:text-white transition-colors text-sm">
                المساعدة
              </Link>
              <Link
                href={`/${locale}/shipping`}
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                الشحن والتوصيل
              </Link>
              <Link
                href={`/${locale}/returns`}
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                الإرجاع والاستبدال
              </Link>
              <Link
                href={`/${locale}/privacy`}
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                سياسة الخصوصية
              </Link>
              <Link
                href={`/${locale}/terms`}
                className="block text-gray-400 hover:text-white transition-colors text-sm"
              >
                شروط الاستخدام
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold arabic-text">{t("footer.contactInfo")}</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <MapPin className="h-5 w-5 text-arabic-primary flex-shrink-0" />
                <span className="text-gray-400 text-sm">دمشق، سوريا</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Phone className="h-5 w-5 text-arabic-primary flex-shrink-0" />
                <span className="text-gray-400 text-sm">+963 11 1234567</span>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <Mail className="h-5 w-5 text-arabic-primary flex-shrink-0" />
                <span className="text-gray-400 text-sm">info@ecommerce.sy</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="pt-4">
              <h5 className="text-sm font-semibold mb-2 arabic-text">النشرة الإخبارية</h5>
              <div className="flex space-x-2 rtl:space-x-reverse">
                <Input
                  type="email"
                  placeholder="بريدك الإلكتروني"
                  className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400 text-sm"
                />
                <Button size="sm" className="bg-arabic-primary hover:bg-arabic-primary/90">
                  اشتراك
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm arabic-text">
              © 2024 متجر إلكتروني شامل. {t("footer.allRightsReserved")}
            </div>
            <div className="flex items-center space-x-6 rtl:space-x-reverse">
              <Link href={`/${locale}/privacy`} className="text-gray-400 hover:text-white text-sm transition-colors">
                سياسة الخصوصية
              </Link>
              <Link href={`/${locale}/terms`} className="text-gray-400 hover:text-white text-sm transition-colors">
                شروط الاستخدام
              </Link>
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <span className="text-gray-400 text-sm">طرق الدفع:</span>
                <div className="flex space-x-2 rtl:space-x-reverse">
                  <div className="w-8 h-5 bg-gray-700 rounded flex items-center justify-center">
                    <span className="text-xs text-white">💳</span>
                  </div>
                  <div className="w-8 h-5 bg-gray-700 rounded flex items-center justify-center">
                    <span className="text-xs text-white">💰</span>
                  </div>
                  <div className="w-8 h-5 bg-gray-700 rounded flex items-center justify-center">
                    <span className="text-xs text-white">📱</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
