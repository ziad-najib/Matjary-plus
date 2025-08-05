"use client"
import Link from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { Star, Heart, ShoppingCart } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/providers/cart-provider"
import { useWishlist } from "@/components/providers/wishlist-provider"
import { formatPrice } from "@/lib/utils"
import type { Product } from "@/lib/types"
import toast from "react-hot-toast"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const locale = useLocale()
  const t = useTranslations()
  const { addItem } = useCart()
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist()

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0],
      sellerId: product.sellerId,
    })
    toast.success("تمت إضافة المنتج إلى السلة")
  }

  const toggleWishlist = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast.success("تمت إزالة المنتج من المفضلة")
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        sellerId: product.sellerId,
      })
      toast.success("تمت إضافة المنتج إلى المفضلة")
    }
  }

  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0 relative">
        <div className="aspect-square relative overflow-hidden rounded-t-lg">
          <img
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product.isNew && (
              <Badge variant="secondary" className="bg-green-500 text-white">
                جديد
              </Badge>
            )}
            {product.discount && <Badge variant="destructive">-{product.discount}%</Badge>}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={`absolute top-2 right-2 ${isInWishlist(product.id) ? "opacity-100 text-red-500" : "opacity-0 group-hover:opacity-100"} transition-opacity bg-white/80 hover:bg-white`}
            onClick={toggleWishlist}
          >
            <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
          </Button>
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <div className="w-full space-y-3">
          <Link href={`/${locale}/products/${product.slug}`}>
            <h3 className="font-semibold text-sm hover:text-arabic-primary transition-colors arabic-text line-clamp-2">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.reviewCount})</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-bold text-arabic-primary">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
            )}
          </div>

          <div className="flex gap-2">
            <Button onClick={handleAddToCart} className="flex-1 bg-arabic-primary hover:bg-arabic-primary/90" size="sm">
              <ShoppingCart className="h-4 w-4 mr-2" />
              {t("home.addToCart")}
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
