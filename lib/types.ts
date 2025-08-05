export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: "user" | "seller" | "admin"
  createdAt: string
  updatedAt: string
  preferences: {
    language: "ar" | "en"
    currency: string
    notifications: {
      email: boolean
      push: boolean
      sms: boolean
    }
  }
}

export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  discount?: number
  images: string[]
  category: string
  subcategory?: string
  brand?: string
  sellerId: string
  seller?: Seller
  stock: number
  rating: number
  reviewCount: number
  tags: string[]
  specifications: Record<string, string>
  features: string[]
  isActive: boolean
  isFeatured: boolean
  createdAt: string
  updatedAt: string
  slug: string
  sku: string
  weight?: number
  dimensions?: {
    length: number
    width: number
    height: number
  }
  shippingInfo: {
    freeShipping: boolean
    shippingCost: number
    estimatedDays: number
  }
}

export interface Category {
  id: string
  name: string
  nameEn: string
  description: string
  image: string
  icon: string
  slug: string
  parentId?: string
  children?: Category[]
  productCount: number
  isActive: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export interface Seller {
  id: string
  name: string
  description: string
  logo: string
  coverImage?: string
  rating: number
  reviewCount: number
  productCount: number
  totalSales: number
  isVerified: boolean
  joinedDate: string
  slug: string
  contactInfo: {
    email: string
    phone: string
    address: string
    website?: string
    socialMedia?: {
      facebook?: string
      instagram?: string
      twitter?: string
    }
  }
  businessInfo: {
    businessName: string
    businessType: string
    taxNumber?: string
    commercialRegister?: string
  }
  shippingInfo: {
    freeShippingThreshold: number
    shippingCost: number
    estimatedDays: number
    shippingAreas: string[]
  }
  policies: {
    returnPolicy: string
    warrantyPolicy: string
    shippingPolicy: string
  }
}

export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"
  shippingAddress: Address
  billingAddress?: Address
  paymentMethod: "cash" | "wallet" | "creditCard" | "paypal" | "syriatelCash" | "mtnCash"
  paymentStatus: "pending" | "paid" | "failed" | "refunded"
  subtotal: number
  shipping: number
  tax: number
  discount?: number
  total: number
  notes?: string
  trackingNumber?: string
  estimatedDelivery?: string
  createdAt: string
  updatedAt: string
  cancelledAt?: string
  deliveredAt?: string
}

export interface OrderItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image: string
  sellerId: string
  specifications?: Record<string, string>
}

export interface Address {
  id: string
  userId: string
  name: string
  phone: string
  address: string
  city: string
  state: string
  postalCode: string
  country: string
  isDefault: boolean
  type: "home" | "work" | "other"
  coordinates?: {
    lat: number
    lng: number
  }
}

export interface Review {
  id: string
  userId: string
  productId: string
  rating: number
  title: string
  comment: string
  images?: string[]
  isVerified: boolean
  helpfulCount: number
  createdAt: string
  updatedAt: string
  user: {
    name: string
    avatar?: string
  }
}

export interface Offer {
  id: string
  title: string
  description: string
  image: string
  discount: number
  category: string
  validFrom: string
  validUntil: string
  isActive: boolean
  color: string
  createdAt: string
  updatedAt: string
}

export interface Coupon {
  id: string
  code: string
  type: "percentage" | "fixed"
  value: number
  minOrderAmount?: number
  maxDiscount?: number
  usageLimit?: number
  usedCount: number
  validFrom: string
  validUntil: string
  isActive: boolean
  applicableCategories?: string[]
  applicableProducts?: string[]
  createdAt: string
  updatedAt: string
}

export interface WalletTransaction {
  id: string
  userId: string
  type: "credit" | "debit"
  amount: number
  description: string
  reference?: string
  status: "pending" | "completed" | "failed"
  createdAt: string
  updatedAt: string
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  isRead: boolean
  actionUrl?: string
  createdAt: string
  updatedAt: string
}

export interface SearchFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  brand?: string
  rating?: number
  inStock?: boolean
  freeShipping?: boolean
  sortBy?: "relevance" | "price_asc" | "price_desc" | "rating" | "newest"
}

export interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
  pagination?: PaginationInfo
}

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image: string
  sellerId: string
  maxQuantity?: number
}

export interface WishlistItem {
  id: string
  productId: string
  name: string
  price: number
  image: string
  sellerId: string
  addedAt: string
}

export interface ShippingMethod {
  id: string
  name: string
  description: string
  cost: number
  estimatedDays: number
  isActive: boolean
}

export interface PaymentMethod {
  id: string
  name: string
  type: "cash" | "wallet" | "creditCard" | "paypal" | "syriatelCash" | "mtnCash"
  isActive: boolean
  fees?: number
  description?: string
}

export interface Analytics {
  totalUsers: number
  totalProducts: number
  totalOrders: number
  totalRevenue: number
  monthlyGrowth: number
  topCategories: Array<{
    name: string
    count: number
    revenue: number
  }>
  topProducts: Array<{
    id: string
    name: string
    sales: number
    revenue: number
  }>
  recentOrders: Order[]
}
