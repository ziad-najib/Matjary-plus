import createMiddleware from "next-intl/middleware"
import type { NextRequest } from "next/server"

const intlMiddleware = createMiddleware({
  // A list of all locales that are supported
  locales: ["ar", "en"],

  // Used when no locale matches
  defaultLocale: "ar",

  // Always use locale prefix
  localePrefix: "always",
})

export default function middleware(request: NextRequest) {
  // Handle internationalization
  const response = intlMiddleware(request)

  // Add security headers
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("Referrer-Policy", "origin-when-cross-origin")
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://firestore.googleapis.com https://firebase.googleapis.com;",
  )

  return response
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(ar|en)/:path*"],
}
