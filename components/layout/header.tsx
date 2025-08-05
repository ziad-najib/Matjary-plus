"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useTranslations, useLocale } from "next-intl"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Search, ShoppingCart, Heart, User, Menu, X, Sun, Moon, Globe, LogOut, Package, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/components/providers/auth-provider"
import { useCart } from "@/components/providers/cart-provider"
import { useWishlist } from "@/components/providers/wishlist-provider"

export function Header() {
  const t = useTranslations()
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { user, logout } = useAuth()
  const { totalItems } = useCart()
  const { totalItems: wishlistItems } = useWishlist()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/${locale}/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery("")
    }
  }

  const handleLanguageChange = () => {
    const newLocale = locale === "ar" ? "en" : "ar"
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`)
    router.push(newPath)
  }

  const handleLogout = async () => {
    try {
      await logout()
      router.push(`/${locale}`)
    } catch (error) {
      console.error("Logout error:", error)
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      {/* Top Bar */}
      <div className="bg-arabic-primary text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="hidden md:block arabic-text">
              مرحباً بك في متجرنا الإلكتروني - شحن مجاني للطلبات فوق 100 ألف ليرة
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={handleLanguageChange} className="text-white hover:bg-white/20">
                <Globe className="h-4 w-4 mr-1" />
                {locale === "ar" ? "English" : "العربية"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-white hover:bg-white/20"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-arabic-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">م</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900 dark:text-white arabic-text">متجر إلكتروني</h1>
              <p className="text-xs text-gray-500 arabic-text">شامل</p>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-2xl mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder={t("navigation.search")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-2 rounded-full border-2 border-gray-200 focus:border-arabic-primary text-right"
              />
              <button
                type="submit"
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-arabic-primary"
              >
                <Search className="h-5 w-5" />
              </button>
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Mobile Search */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Link href={`/${locale}/wishlist`}>
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                {wishlistItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                    {wishlistItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link href={`/${locale}/cart`}>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-arabic-primary">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL || "/placeholder.svg"}
                        alt={user.displayName || "User"}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="arabic-text">{user.displayName || user.email}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={`/${locale}/profile`} className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      الملف الشخصي
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/${locale}/orders`} className="flex items-center">
                      <Package className="h-4 w-4 mr-2" />
                      طلباتي
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={`/${locale}/wallet`} className="flex items-center">
                      <Settings className="h-4 w-4 mr-2" />
                      المحفظة
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    تسجيل الخروج
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center space-x-2 rtl:space-x-reverse">
                <Link href={`/${locale}/auth/login`}>
                  <Button variant="ghost" size="sm">
                    {t("auth.login")}
                  </Button>
                </Link>
                <Link href={`/${locale}/auth/register`}>
                  <Button size="sm" className="bg-arabic-primary hover:bg-arabic-primary/90">
                    {t("auth.register")}
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="hidden md:block border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-8 rtl:space-x-reverse py-3">
            <Link
              href={`/${locale}`}
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-arabic-primary transition-colors"
            >
              {t("navigation.home")}
            </Link>
            <Link
              href={`/${locale}/categories`}
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-arabic-primary transition-colors"
            >
              {t("navigation.categories")}
            </Link>
            <Link
              href={`/${locale}/products`}
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-arabic-primary transition-colors"
            >
              {t("navigation.products")}
            </Link>
            <Link
              href={`/${locale}/offers`}
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-arabic-primary transition-colors"
            >
              {t("navigation.offers")}
            </Link>
            <Link
              href={`/${locale}/sellers`}
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-arabic-primary transition-colors"
            >
              {t("navigation.sellers")}
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 py-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder={t("navigation.search")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 text-right"
                />
                <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </form>

            {/* Mobile Navigation */}
            <div className="space-y-2">
              <Link
                href={`/${locale}`}
                className="block py-2 text-gray-700 dark:text-gray-300 hover:text-arabic-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("navigation.home")}
              </Link>
              <Link
                href={`/${locale}/categories`}
                className="block py-2 text-gray-700 dark:text-gray-300 hover:text-arabic-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("navigation.categories")}
              </Link>
              <Link
                href={`/${locale}/products`}
                className="block py-2 text-gray-700 dark:text-gray-300 hover:text-arabic-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("navigation.products")}
              </Link>
              <Link
                href={`/${locale}/offers`}
                className="block py-2 text-gray-700 dark:text-gray-300 hover:text-arabic-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("navigation.offers")}
              </Link>
              <Link
                href={`/${locale}/sellers`}
                className="block py-2 text-gray-700 dark:text-gray-300 hover:text-arabic-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("navigation.sellers")}
              </Link>

              {!user && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-800 space-y-2">
                  <Link
                    href={`/${locale}/auth/login`}
                    className="block py-2 text-gray-700 dark:text-gray-300 hover:text-arabic-primary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("auth.login")}
                  </Link>
                  <Link
                    href={`/${locale}/auth/register`}
                    className="block py-2 text-arabic-primary font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t("auth.register")}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
