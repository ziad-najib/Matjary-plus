import type { Product, Category, Seller, Offer } from "./types"

export const categories: Category[] = [
  {
    id: "1",
    name: "إلكترونيات",
    nameEn: "Electronics",
    description: "أحدث الأجهزة الإلكترونية والتقنية",
    image: "/placeholder.svg?height=200&width=200&text=Electronics",
    icon: "📱",
    slug: "electronics",
    productCount: 150,
    isActive: true,
    order: 1,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "أزياء",
    nameEn: "Fashion",
    description: "أحدث صيحات الموضة للرجال والنساء",
    image: "/placeholder.svg?height=200&width=200&text=Fashion",
    icon: "👕",
    slug: "fashion",
    productCount: 200,
    isActive: true,
    order: 2,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "3",
    name: "منزل وحديقة",
    nameEn: "Home & Garden",
    description: "كل ما تحتاجه لمنزلك وحديقتك",
    image: "/placeholder.svg?height=200&width=200&text=Home",
    icon: "🏠",
    slug: "home-garden",
    productCount: 120,
    isActive: true,
    order: 3,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "4",
    name: "رياضة ولياقة",
    nameEn: "Sports & Fitness",
    description: "معدات رياضية ولياقة بدنية",
    image: "/placeholder.svg?height=200&width=200&text=Sports",
    icon: "⚽",
    slug: "sports-fitness",
    productCount: 80,
    isActive: true,
    order: 4,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "5",
    name: "كتب ومكتبة",
    nameEn: "Books & Stationery",
    description: "كتب وأدوات مكتبية ومدرسية",
    image: "/placeholder.svg?height=200&width=200&text=Books",
    icon: "📚",
    slug: "books-stationery",
    productCount: 90,
    isActive: true,
    order: 5,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "6",
    name: "جمال وعناية",
    nameEn: "Beauty & Care",
    description: "منتجات التجميل والعناية الشخصية",
    image: "/placeholder.svg?height=200&width=200&text=Beauty",
    icon: "💄",
    slug: "beauty-care",
    productCount: 110,
    isActive: true,
    order: 6,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
]

export const sellers: Seller[] = [
  {
    id: "1",
    name: "متجر التقنية الحديثة",
    description: "متخصصون في أحدث الأجهزة الإلكترونية والتقنية المتطورة",
    logo: "/placeholder.svg?height=100&width=100&text=Tech",
    coverImage: "/placeholder.svg?height=300&width=800&text=Tech+Cover",
    rating: 4.8,
    reviewCount: 1250,
    productCount: 85,
    totalSales: 15000,
    isVerified: true,
    joinedDate: "2023-01-15T00:00:00Z",
    slug: "modern-tech-store",
    contactInfo: {
      email: "info@moderntech.sy",
      phone: "+963 11 1234567",
      address: "شارع الثورة، دمشق، سوريا",
      website: "https://moderntech.sy",
      socialMedia: {
        facebook: "https://facebook.com/moderntech",
        instagram: "https://instagram.com/moderntech",
      },
    },
    businessInfo: {
      businessName: "شركة التقنية الحديثة للتجارة",
      businessType: "شركة محدودة المسؤولية",
      taxNumber: "123456789",
      commercialRegister: "CR-12345",
    },
    shippingInfo: {
      freeShippingThreshold: 100000,
      shippingCost: 15000,
      estimatedDays: 3,
      shippingAreas: ["دمشق", "حلب", "حمص", "اللاذقية"],
    },
    policies: {
      returnPolicy: "إمكانية الإرجاع خلال 14 يوم من تاريخ الاستلام",
      warrantyPolicy: "ضمان لمدة سنة على جميع المنتجات",
      shippingPolicy: "الشحن مجاني للطلبات فوق 100 ألف ليرة",
    },
  },
  {
    id: "2",
    name: "بوتيك الأناقة",
    description: "أحدث صيحات الموضة والأزياء العصرية للرجال والنساء",
    logo: "/placeholder.svg?height=100&width=100&text=Fashion",
    coverImage: "/placeholder.svg?height=300&width=800&text=Fashion+Cover",
    rating: 4.6,
    reviewCount: 890,
    productCount: 120,
    totalSales: 8500,
    isVerified: true,
    joinedDate: "2023-03-20T00:00:00Z",
    slug: "elegance-boutique",
    contactInfo: {
      email: "info@elegance.sy",
      phone: "+963 11 2345678",
      address: "شارع بغداد، دمشق، سوريا",
      socialMedia: {
        facebook: "https://facebook.com/elegance",
        instagram: "https://instagram.com/elegance",
      },
    },
    businessInfo: {
      businessName: "بوتيك الأناقة للأزياء",
      businessType: "مؤسسة فردية",
      taxNumber: "987654321",
    },
    shippingInfo: {
      freeShippingThreshold: 75000,
      shippingCost: 12000,
      estimatedDays: 2,
      shippingAreas: ["دمشق", "ريف دمشق", "حمص"],
    },
    policies: {
      returnPolicy: "إمكانية الإرجاع خلال 7 أيام من تاريخ الاستلام",
      warrantyPolicy: "ضمان الجودة على جميع المنتجات",
      shippingPolicy: "الشحن مجاني للطلبات فوق 75 ألف ليرة",
    },
  },
  {
    id: "3",
    name: "متجر المنزل العصري",
    description: "كل ما تحتاجه لجعل منزلك أكثر جمالاً وراحة",
    logo: "/placeholder.svg?height=100&width=100&text=Home",
    coverImage: "/placeholder.svg?height=300&width=800&text=Home+Cover",
    rating: 4.7,
    reviewCount: 650,
    productCount: 95,
    totalSales: 6200,
    isVerified: false,
    joinedDate: "2023-06-10T00:00:00Z",
    slug: "modern-home-store",
    contactInfo: {
      email: "info@modernhome.sy",
      phone: "+963 11 3456789",
      address: "شارع المتنبي، حلب، سوريا",
    },
    businessInfo: {
      businessName: "متجر المنزل العصري",
      businessType: "مؤسسة فردية",
    },
    shippingInfo: {
      freeShippingThreshold: 120000,
      shippingCost: 20000,
      estimatedDays: 5,
      shippingAreas: ["حلب", "إدلب", "اللاذقية"],
    },
    policies: {
      returnPolicy: "إمكانية الإرجاع خلال 10 أيام من تاريخ الاستلام",
      warrantyPolicy: "ضمان لمدة 6 أشهر على المنتجات الكهربائية",
      shippingPolicy: "الشحن مجاني للطلبات فوق 120 ألف ليرة",
    },
  },
]

export const products: Product[] = [
  {
    id: "1",
    name: "هاتف ذكي Samsung Galaxy S23",
    description: "هاتف ذكي متطور بكاميرا عالية الدقة وأداء ممتاز",
    price: 850000,
    originalPrice: 950000,
    discount: 10,
    images: [
      "/placeholder.svg?height=400&width=400&text=Galaxy+S23",
      "/placeholder.svg?height=400&width=400&text=Galaxy+S23+2",
      "/placeholder.svg?height=400&width=400&text=Galaxy+S23+3",
    ],
    category: "electronics",
    subcategory: "smartphones",
    brand: "Samsung",
    sellerId: "1",
    stock: 25,
    rating: 4.8,
    reviewCount: 156,
    tags: ["هاتف ذكي", "سامسونج", "كاميرا", "5G"],
    specifications: {
      الشاشة: "6.1 بوصة Dynamic AMOLED",
      المعالج: "Snapdragon 8 Gen 2",
      الذاكرة: "8GB RAM",
      التخزين: "256GB",
      الكاميرا: "50MP + 12MP + 10MP",
      البطارية: "3900mAh",
      "نظام التشغيل": "Android 13",
    },
    features: ["مقاوم للماء والغبار IP68", "شحن سريع 25W", "شحن لاسلكي", "كاميرا ليلية متطورة", "شاشة 120Hz"],
    isActive: true,
    isFeatured: true,
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    slug: "samsung-galaxy-s23",
    sku: "SGS23-256-BLK",
    weight: 168,
    dimensions: {
      length: 146.3,
      width: 70.9,
      height: 7.6,
    },
    shippingInfo: {
      freeShipping: true,
      shippingCost: 0,
      estimatedDays: 2,
    },
  },
  {
    id: "2",
    name: "لابتوب Dell XPS 15",
    description: "لابتوب عالي الأداء مثالي للعمل والإبداع",
    price: 1500000,
    originalPrice: 1650000,
    discount: 9,
    images: [
      "/placeholder.svg?height=400&width=400&text=Dell+XPS+15",
      "/placeholder.svg?height=400&width=400&text=Dell+XPS+15+2",
    ],
    category: "electronics",
    subcategory: "laptops",
    brand: "Dell",
    sellerId: "1",
    stock: 12,
    rating: 4.9,
    reviewCount: 89,
    tags: ["لابتوب", "ديل", "عالي الأداء", "للمحترفين"],
    specifications: {
      الشاشة: "15.6 بوصة 4K OLED",
      المعالج: "Intel Core i7-13700H",
      الذاكرة: "16GB DDR5",
      التخزين: "512GB SSD",
      "كرت الرسوميات": "NVIDIA RTX 4060",
      "نظام التشغيل": "Windows 11 Pro",
      البطارية: "86Wh",
    },
    features: ["شاشة لمس 4K", "لوحة مفاتيح مضيئة", "قارئ بصمة", "كاميرا ويب HD", "صوت محيطي"],
    isActive: true,
    isFeatured: true,
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-02T00:00:00Z",
    slug: "dell-xps-15",
    sku: "DXP15-512-SLV",
    weight: 2100,
    dimensions: {
      length: 344,
      width: 230,
      height: 18,
    },
    shippingInfo: {
      freeShipping: true,
      shippingCost: 0,
      estimatedDays: 3,
    },
  },
  {
    id: "3",
    name: "فستان صيفي أنيق",
    description: "فستان صيفي مريح وأنيق مناسب لجميع المناسبات",
    price: 75000,
    originalPrice: 95000,
    discount: 21,
    images: [
      "/placeholder.svg?height=400&width=400&text=Summer+Dress",
      "/placeholder.svg?height=400&width=400&text=Summer+Dress+2",
    ],
    category: "fashion",
    subcategory: "women-clothing",
    brand: "Fashion House",
    sellerId: "2",
    stock: 30,
    rating: 4.5,
    reviewCount: 67,
    tags: ["فستان", "صيفي", "نسائي", "أنيق"],
    specifications: {
      المقاس: "S, M, L, XL",
      اللون: "أزرق، وردي، أبيض",
      القماش: "100% قطن",
      الطول: "120 سم",
      "نوع الياقة": "دائرية",
      "نوع الأكمام": "قصيرة",
    },
    features: ["قماش قطني مريح", "تصميم عصري", "مناسب للصيف", "سهل الغسيل", "متوفر بألوان متعددة"],
    isActive: true,
    isFeatured: false,
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-03T00:00:00Z",
    slug: "elegant-summer-dress",
    sku: "ESD-CTN-BLU",
    weight: 300,
    dimensions: {
      length: 120,
      width: 50,
      height: 2,
    },
    shippingInfo: {
      freeShipping: false,
      shippingCost: 8000,
      estimatedDays: 2,
    },
  },
  {
    id: "4",
    name: "طقم أواني طبخ مقاوم للالتصاق",
    description: "طقم أواني طبخ عالي الجودة مقاوم للالتصاق",
    price: 120000,
    originalPrice: 150000,
    discount: 20,
    images: [
      "/placeholder.svg?height=400&width=400&text=Cookware+Set",
      "/placeholder.svg?height=400&width=400&text=Cookware+Set+2",
    ],
    category: "home-garden",
    subcategory: "kitchen",
    brand: "KitchenPro",
    sellerId: "3",
    stock: 18,
    rating: 4.6,
    reviewCount: 43,
    tags: ["أواني طبخ", "مطبخ", "مقاوم للالتصاق", "طقم"],
    specifications: {
      المادة: "ألومنيوم مع طلاء سيراميك",
      "عدد القطع": "7 قطع",
      الأحجام: "16، 18، 20، 24 سم",
      "مقاوم للحرارة": "حتى 250 درجة مئوية",
      "متوافق مع": "جميع أنواع المواقد",
      "آمن للغسالة": "نعم",
    },
    features: ["طلاء مقاوم للالتصاق", "توزيع حرارة متساوي", "مقابض مقاومة للحرارة", "سهل التنظيف", "متين وطويل الأمد"],
    isActive: true,
    isFeatured: true,
    createdAt: "2024-01-04T00:00:00Z",
    updatedAt: "2024-01-04T00:00:00Z",
    slug: "non-stick-cookware-set",
    sku: "KP-CWS-7PC",
    weight: 3500,
    dimensions: {
      length: 35,
      width: 25,
      height: 15,
    },
    shippingInfo: {
      freeShipping: false,
      shippingCost: 15000,
      estimatedDays: 4,
    },
  },
  {
    id: "5",
    name: "ساعة ذكية Apple Watch Series 9",
    description: "ساعة ذكية متطورة لتتبع الصحة واللياقة البدنية",
    price: 450000,
    originalPrice: 500000,
    discount: 10,
    images: [
      "/placeholder.svg?height=400&width=400&text=Apple+Watch",
      "/placeholder.svg?height=400&width=400&text=Apple+Watch+2",
    ],
    category: "electronics",
    subcategory: "wearables",
    brand: "Apple",
    sellerId: "1",
    stock: 20,
    rating: 4.9,
    reviewCount: 234,
    tags: ["ساعة ذكية", "آبل", "صحة", "لياقة"],
    specifications: {
      الشاشة: "45mm Retina LTPO OLED",
      المعالج: "S9 SiP",
      التخزين: "64GB",
      "مقاومة الماء": "50 متر",
      البطارية: "18 ساعة",
      الاتصال: "GPS + Cellular",
      "نظام التشغيل": "watchOS 10",
    },
    features: ["تتبع معدل ضربات القلب", "قياس الأكسجين في الدم", "تتبع النوم", "GPS مدمج", "مقاومة للماء"],
    isActive: true,
    isFeatured: true,
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-05T00:00:00Z",
    slug: "apple-watch-series-9",
    sku: "AW9-45-GPS-CEL",
    weight: 51,
    dimensions: {
      length: 45,
      width: 38,
      height: 10.7,
    },
    shippingInfo: {
      freeShipping: true,
      shippingCost: 0,
      estimatedDays: 2,
    },
  },
  {
    id: "6",
    name: "حذاء رياضي Nike Air Max",
    description: "حذاء رياضي مريح ومناسب للجري والأنشطة الرياضية",
    price: 95000,
    originalPrice: 110000,
    discount: 14,
    images: [
      "/placeholder.svg?height=400&width=400&text=Nike+Air+Max",
      "/placeholder.svg?height=400&width=400&text=Nike+Air+Max+2",
    ],
    category: "sports-fitness",
    subcategory: "shoes",
    brand: "Nike",
    sellerId: "2",
    stock: 35,
    rating: 4.7,
    reviewCount: 128,
    tags: ["حذاء رياضي", "نايك", "جري", "مريح"],
    specifications: {
      المقاس: "39-45",
      اللون: "أسود، أبيض، رمادي",
      "المادة العلوية": "شبك وجلد صناعي",
      النعل: "مطاط مقاوم للانزلاق",
      "تقنية الوسادة": "Air Max",
      الوزن: "320 جرام",
    },
    features: ["وسادة هوائية مريحة", "تهوية ممتازة", "مقاوم للانزلاق", "تصميم عصري", "مناسب للاستخدام اليومي"],
    isActive: true,
    isFeatured: false,
    createdAt: "2024-01-06T00:00:00Z",
    updatedAt: "2024-01-06T00:00:00Z",
    slug: "nike-air-max-shoes",
    sku: "NAM-BLK-42",
    weight: 320,
    dimensions: {
      length: 30,
      width: 12,
      height: 10,
    },
    shippingInfo: {
      freeShipping: false,
      shippingCost: 10000,
      estimatedDays: 3,
    },
  },
]

export const offers: Offer[] = [
  {
    id: "1",
    title: "عرض الجمعة البيضاء",
    description: "خصومات تصل إلى 70% على جميع المنتجات الإلكترونية",
    image: "/placeholder.svg?height=300&width=600&text=Black+Friday",
    discount: 70,
    category: "electronics",
    validFrom: "2024-11-25T00:00:00Z",
    validUntil: "2024-11-30T23:59:59Z",
    isActive: true,
    color: "from-red-500 to-red-700",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    title: "عرض الأزياء الصيفية",
    description: "خصم 50% على جميع الملابس الصيفية",
    image: "/placeholder.svg?height=300&width=600&text=Summer+Fashion",
    discount: 50,
    category: "fashion",
    validFrom: "2024-06-01T00:00:00Z",
    validUntil: "2024-08-31T23:59:59Z",
    isActive: true,
    color: "from-blue-500 to-blue-700",
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-02T00:00:00Z",
  },
  {
    id: "3",
    title: "عرض المنزل الذكي",
    description: "خصم 40% على جميع أدوات المنزل والحديقة",
    image: "/placeholder.svg?height=300&width=600&text=Smart+Home",
    discount: 40,
    category: "home-garden",
    validFrom: "2024-03-01T00:00:00Z",
    validUntil: "2024-03-31T23:59:59Z",
    isActive: true,
    color: "from-green-500 to-green-700",
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-03T00:00:00Z",
  },
  {
    id: "4",
    title: "عرض العودة للمدارس",
    description: "خصم 30% على الكتب والأدوات المدرسية",
    image: "/placeholder.svg?height=300&width=600&text=Back+to+School",
    discount: 30,
    category: "books-stationery",
    validFrom: "2024-08-15T00:00:00Z",
    validUntil: "2024-09-15T23:59:59Z",
    isActive: true,
    color: "from-purple-500 to-purple-700",
    createdAt: "2024-01-04T00:00:00Z",
    updatedAt: "2024-01-04T00:00:00Z",
  },
]

// بيانات تجريبية للمنتجات المميزة
export const featuredProducts = products.filter((product) => product.isFeatured)

// بيانات تجريبية للمنتجات الأكثر مبيعاً
export const bestSellingProducts = products.sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 8)

// بيانات تجريبية للمنتجات الجديدة
export const newProducts = products
  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  .slice(0, 8)

// دالة للبحث في المنتجات
export function searchProducts(query: string, filters?: any) {
  let filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase()) ||
      product.tags.some((tag) => tag.toLowerCase().includes(query.toLowerCase())),
  )

  if (filters) {
    if (filters.category) {
      filteredProducts = filteredProducts.filter((product) => product.category === filters.category)
    }
    if (filters.minPrice) {
      filteredProducts = filteredProducts.filter((product) => product.price >= filters.minPrice)
    }
    if (filters.maxPrice) {
      filteredProducts = filteredProducts.filter((product) => product.price <= filters.maxPrice)
    }
    if (filters.brand) {
      filteredProducts = filteredProducts.filter((product) => product.brand === filters.brand)
    }
    if (filters.rating) {
      filteredProducts = filteredProducts.filter((product) => product.rating >= filters.rating)
    }
    if (filters.inStock) {
      filteredProducts = filteredProducts.filter((product) => product.stock > 0)
    }
  }

  return filteredProducts
}

// دالة للحصول على منتجات فئة معينة
export function getProductsByCategory(categorySlug: string) {
  return products.filter((product) => product.category === categorySlug)
}

// دالة للحصول على منتجات بائع معين
export function getProductsBySeller(sellerId: string) {
  return products.filter((product) => product.sellerId === sellerId)
}

// دالة للحصول على منتج بواسطة المعرف
export function getProductById(id: string) {
  return products.find((product) => product.id === id)
}

// دالة للحصول على منتج بواسطة slug
export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug)
}

// دالة للحصول على فئة بواسطة slug
export function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug)
}

// دالة للحصول على بائع بواسطة slug
export function getSellerBySlug(slug: string) {
  return sellers.find((seller) => seller.slug === slug)
}

// دالة للحصول على عرض بواسطة المعرف
export function getOfferById(id: string) {
  return offers.find((offer) => offer.id === id)
}

// دالة للحصول على المنتجات ذات الصلة
export function getRelatedProducts(productId: string, limit = 4) {
  const product = getProductById(productId)
  if (!product) return []

  return products
    .filter((p) => p.id !== productId && p.category === product.category)
    .sort(() => Math.random() - 0.5)
    .slice(0, limit)
}

// دالة للحصول على أفضل البائعين
export function getTopSellers(limit = 6) {
  return sellers.sort((a, b) => b.rating - a.rating).slice(0, limit)
}

// دالة للحصول على العروض النشطة
export function getActiveOffers() {
  const now = new Date()
  return offers.filter(
    (offer) => offer.isActive && new Date(offer.validFrom) <= now && new Date(offer.validUntil) >= now,
  )
}

// دالة للحصول على إحصائيات سريعة
export function getQuickStats() {
  return {
    totalProducts: products.length,
    totalCategories: categories.length,
    totalSellers: sellers.length,
    totalOffers: offers.length,
    averageRating: products.reduce((sum, product) => sum + product.rating, 0) / products.length,
    totalReviews: products.reduce((sum, product) => sum + product.reviewCount, 0),
  }
}
