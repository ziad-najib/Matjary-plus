import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// تنسيق الأسعار
export function formatPrice(price: number, currency = "SYP"): string {
  return new Intl.NumberFormat("ar-SY", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

// تنسيق التواريخ
export function formatDate(date: Date, locale = "ar"): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date)
}

// تنسيق الوقت
export function formatTime(date: Date, locale = "ar"): string {
  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

// تنسيق التاريخ والوقت
export function formatDateTime(date: Date, locale = "ar"): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

// تنسيق الأرقام
export function formatNumber(number: number, locale = "ar"): string {
  return new Intl.NumberFormat(locale).format(number)
}

// تحويل النص إلى slug
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
}

// تحويل slug إلى نص
export function unslugify(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
}

// قطع النص
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + "..."
}

// التحقق من صحة البريد الإلكتروني
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// التحقق من صحة رقم الهاتف
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^(\+963|0)?[0-9]{9}$/
  return phoneRegex.test(phone.replace(/\s/g, ""))
}

// تنسيق رقم الهاتف
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "")
  if (cleaned.startsWith("963")) {
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`
  }
  if (cleaned.startsWith("0")) {
    return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`
  }
  return phone
}

// حساب الخصم
export function calculateDiscount(originalPrice: number, discountPercentage: number): number {
  return originalPrice - (originalPrice * discountPercentage) / 100
}

// حساب نسبة الخصم
export function calculateDiscountPercentage(originalPrice: number, discountedPrice: number): number {
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)
}

// تحويل الحجم بالبايت إلى نص قابل للقراءة
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

// إنشاء معرف فريد
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

// إنشاء كود عشوائي
export function generateCode(length = 6): string {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let result = ""
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}

// تحويل اللون من hex إلى rgb
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      }
    : null
}

// تحويل rgb إلى hex
export function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

// التحقق من كون اللون فاتح أم غامق
export function isLightColor(hex: string): boolean {
  const rgb = hexToRgb(hex)
  if (!rgb) return false
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
  return brightness > 128
}

// تأخير التنفيذ
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// debounce function
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// throttle function
export function throttle<T extends (...args: any[]) => any>(func: T, limit: number): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// تحويل النص إلى عنوان URL آمن
export function sanitizeUrl(url: string): string {
  return url.replace(/[^a-zA-Z0-9-_./]/g, "")
}

// التحقق من كون الجهاز محمول
export function isMobile(): boolean {
  if (typeof window === "undefined") return false
  return window.innerWidth < 768
}

// التحقق من كون الجهاز لوحي
export function isTablet(): boolean {
  if (typeof window === "undefined") return false
  return window.innerWidth >= 768 && window.innerWidth < 1024
}

// التحقق من كون الجهاز سطح مكتب
export function isDesktop(): boolean {
  if (typeof window === "undefined") return false
  return window.innerWidth >= 1024
}

// نسخ النص إلى الحافظة
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error("Failed to copy text: ", err)
    return false
  }
}

// تحميل ملف
export function downloadFile(url: string, filename: string): void {
  const link = document.createElement("a")
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// تحويل ملف إلى base64
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}

// ضغط الصورة
export function compressImage(file: File, quality = 0.8): Promise<File> {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")!
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      canvas.toBlob(
        (blob) => {
          const compressedFile = new File([blob!], file.name, {
            type: file.type,
            lastModified: Date.now(),
          })
          resolve(compressedFile)
        },
        file.type,
        quality,
      )
    }

    img.src = URL.createObjectURL(file)
  })
}

// التحقق من دعم المتصفح لميزة معينة
export function isFeatureSupported(feature: string): boolean {
  switch (feature) {
    case "webp":
      return document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp") === 0
    case "localStorage":
      try {
        localStorage.setItem("test", "test")
        localStorage.removeItem("test")
        return true
      } catch {
        return false
      }
    case "serviceWorker":
      return "serviceWorker" in navigator
    case "pushNotifications":
      return "Notification" in window && "serviceWorker" in navigator && "PushManager" in window
    default:
      return false
  }
}

// تحويل الكائن إلى query string
export function objectToQueryString(obj: Record<string, any>): string {
  const params = new URLSearchParams()
  Object.entries(obj).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      params.append(key, String(value))
    }
  })
  return params.toString()
}

// تحويل query string إلى كائن
export function queryStringToObject(queryString: string): Record<string, string> {
  const params = new URLSearchParams(queryString)
  const obj: Record<string, string> = {}
  params.forEach((value, key) => {
    obj[key] = value
  })
  return obj
}

// تحديد اتجاه النص
export function getTextDirection(text: string): "rtl" | "ltr" {
  const rtlChars = /[\u0590-\u083F]|[\u08A0-\u08FF]|[\uFB1D-\uFDFF]|[\uFE70-\uFEFF]/gm
  return rtlChars.test(text) ? "rtl" : "ltr"
}

// تحويل الرقم إلى أرقام عربية
export function toArabicNumerals(num: string | number): string {
  const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"]
  return String(num).replace(/[0-9]/g, (digit) => arabicNumerals[Number.parseInt(digit)])
}

// تحويل الأرقام العربية إلى إنجليزية
export function toEnglishNumerals(num: string): string {
  const englishNumerals = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
  const arabicNumerals = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"]

  let result = num
  arabicNumerals.forEach((arabic, index) => {
    result = result.replace(new RegExp(arabic, "g"), englishNumerals[index])
  })
  return result
}

// حساب المسافة بين نقطتين جغرافيتين
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // نصف قطر الأرض بالكيلومتر
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// تحديد الموقع الجغرافي
export function getCurrentLocation(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported"))
      return
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 60000,
    })
  })
}
