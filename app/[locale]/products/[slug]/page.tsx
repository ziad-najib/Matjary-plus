"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { useTranslations, useLocale } from "next-intl"
import Link from "next/link"
import {
  Star,
  Heart,
  ShoppingCart,
  Share2,
  Minus,
  Plus,
  ChevronRight,
  Store,
  Truck,
  RotateCcw,
  MessageCircle,
} from "lucide-react"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/components/providers/cart-provider"
import { useWishlist } from "@/components/providers/wishlist-provider"
import { formatPrice } from "@/lib/utils"
import { products, reviews } from "@/lib/data"
import { ProductCard } from "@/components/products/product-card"
import toast from "react-hot-toast"

export default function ProductPage() {
  const params = useParams()
  const slug = params.slug as string
  const t = useTranslations()
  const locale = useLocale()

  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [relatedProducts, setRelatedProducts] = useState<any[]>([])
  const [productReviews, setProductReviews] = useState<any[]>([])

  const { addItem } = useCart()
  const { addItem: addToWishlist, isInWishlist, removeItem: removeFromWishlist } = useWishlist()

  useEffect(() => {
    // محاكاة تحميل المنتج
    setTimeout(() => {
      const foundProduct = products.find((p) => p.slug === slug)
      if (foundProduct) {
        setProduct(foundProduct)
        setSelectedImage(foundProduct.images[0])

        // تحميل المنتجات ذات الصلة
        const related = products
          .filter((p) => p.category === foundProduct.category && p.id !== foundProduct.id)
          .slice(0, 4)
        setRelatedProducts(related)

        // تحميل المراجعات
        const productReviews = reviews.filter((r) => r.productId === foundProduct.id)
        setProductReviews(productReviews)
      }
      setLoading(false)
    }, 1000)
  }, [slug])

  const handleQuantityChange = (value: number) => {
    if (value < 1) return
    if (product && value > product.stock) return
    setQuantity(value)
  }

  const handleAddToCart = () => {
    if (!product) return

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.images[0],
      sellerId: product.sellerId,
    })
    toast.success("تمت إضافة المنتج إلى السلة")
  }

  const toggleWishlist = () => {
    if (!product) return

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

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
          <div className="container mx-auto px-4">
            <div className="animate-pulse">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="aspect-square bg-gray-200 rounded-lg"></div>
                <div className="space-y-4">
                  <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-10 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-12 bg-gray-200 rounded w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (!product) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-bold mb-4">المنتج غير موجود</h1>
            <p className="mb-6">عذراً، لم نتمكن من العثور على المنتج الذي تبحث عنه.</p>
            <Button asChild>
              <Link href={`/${locale}/products`}>العودة إلى المنتجات</Link>
            </Button>
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
          {/* فتات الخبز */}
          <div className="flex items-center text-sm text-gray-500 mb-6">
            <Link href={`/${locale}`} className="hover:text-arabic-primary">
              الرئيسية
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <Link href={`/${locale}/categories/${product.category}`} className="hover:text-arabic-primary">
              {product.category === "electronics"
                ? "إلكترونيات"
                : product.category === "computers"
                  ? "حاسوب"
                  : product.category === "fashion"
                    ? "أزياء"
                    : product.category === "home"
                      ? "منزل"
                      : product.category === "books"
                        ? "كتب"
                        : product.category}
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-gray-900 font-medium truncate">{product.name}</span>
          </div>

          {/* تفاصيل المنتج */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* صور المنتج */}
            <div className="space-y-4">
              <div className="aspect-square rounded-lg overflow-hidden border">
                <img
                  src={selectedImage || product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image: string, index: number) => (
                  <div
                    key={index}
                    className={`aspect-square rounded-md overflow-hidden border cursor-pointer ${
                      selectedImage === image ? "ring-2 ring-arabic-primary" : ""
                    }`}
                    onClick={() => setSelectedImage(image)}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* معلومات المنتج */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2 arabic-text">{product.name}</h1>
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">({product.reviewCount} تقييم)</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Store className="h-4 w-4 mr-1" />
                    <Link href={`/${locale}/sellers/${product.sellerId}`} className="hover:text-arabic-primary">
                      {product.sellerName}
                    </Link>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-arabic-primary">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                )}
                {product.discount && (
                  <Badge variant="destructive" className="text-sm">
                    خصم {product.discount}%
                  </Badge>
                )}
              </div>

              <p className="text-gray-700 arabic-text">{product.description}</p>

              {/* الكمية */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">{t("products.quantity")}</label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="font-semibold min-w-8 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-gray-500">
                    {product.stock > 0 ? `${product.stock} متوفر` : "غير متوفر"}
                  </span>
                </div>
              </div>

              {/* أزرار الإجراءات */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  className="flex-1 bg-arabic-primary hover:bg-arabic-primary/90"
                  size="lg"
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  {t("home.addToCart")}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className={isInWishlist(product.id) ? "text-red-500" : ""}
                  onClick={toggleWishlist}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
                  {isInWishlist(product.id) ? t("products.removeFromWishlist") : t("products.addToWishlist")}
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>

              {/* معلومات إضافية */}
              <div className="border-t pt-4 space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="h-4 w-4 text-arabic-primary" />
                  <span>شحن مجاني للطلبات فوق 100,000 ل.س</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <RotateCcw className="h-4 w-4 text-arabic-primary" />
                  <span>إمكانية الإرجاع خلال 14 يوم</span>
                </div>
              </div>
            </div>
          </div>

          {/* تفاصيل المنتج والمراجعات */}
          <Tabs defaultValue="details" className="mb-12">
            <TabsList className="mb-6">
              <TabsTrigger value="details">{t("products.productDetails")}</TabsTrigger>
              <TabsTrigger value="specifications">{t("products.specifications")}</TabsTrigger>
              <TabsTrigger value="reviews">{t("products.customerReviews")}</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="prose max-w-none arabic-text">
                    <p>{product.description}</p>
                    <p>
                      هذا المنتج من أفضل المنتجات المتوفرة في السوق، ويتميز بجودة عالية ومواصفات ممتازة. تم تصميمه ليلبي
                      احتياجات المستخدمين ويوفر تجربة استخدام مميزة.
                    </p>
                    <p>
                      يأتي المنتج مع ضمان لمدة سنة من تاريخ الشراء، ويمكن استبداله أو إصلاحه في حال وجود أي عيوب مصنعية.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="specifications">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.specifications &&
                      Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex border-b pb-2">
                          <span className="font-medium w-1/3">{key}</span>
                          <span className="w-2/3">{value as string}</span>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>التقييمات والمراجعات ({productReviews.length})</span>
                    <Button>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      {t("products.writeReview")}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {productReviews.length > 0 ? (
                    productReviews.map((review) => (
                      <div key={review.id} className="border-b pb-6 last:border-0">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="h-10 w-10 rounded-full bg-gray-200 overflow-hidden">
                              {review.userImage ? (
                                <img
                                  src={review.userImage || "/placeholder.svg"}
                                  alt={review.userName}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="h-full w-full flex items-center justify-center bg-arabic-primary text-white">
                                  {review.userName.charAt(0)}
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{review.userName}</p>
                              <p className="text-xs text-gray-500">
                                {new Date(review.date).toLocaleDateString("ar-SY")}
                              </p>
                            </div>
                          </div>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 arabic-text">{review.comment}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button variant="ghost" size="sm" className="text-xs">
                            مفيد ({review.helpful})
                          </Button>
                          <Button variant="ghost" size="sm" className="text-xs">
                            الإبلاغ
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500">لا توجد مراجعات بعد. كن أول من يقيم هذا المنتج!</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* منتجات ذات صلة */}
          {relatedProducts.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 arabic-text">{t("products.relatedProducts")}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
