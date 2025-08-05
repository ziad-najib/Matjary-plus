import { notFound } from "next/navigation"
import { getRequestConfig } from "next-intl/server"

// Can be imported from a shared config
const locales = ["ar", "en"]

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound()

  return {
    messages: (await import(`./messages/${locale}.json`)).default,
    timeZone: "Asia/Damascus",
    now: new Date(),
    formats: {
      dateTime: {
        short: {
          day: "numeric",
          month: "short",
          year: "numeric",
        },
        long: {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
        },
      },
      number: {
        currency: {
          style: "currency",
          currency: "SYP",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        },
        percent: {
          style: "percent",
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        },
      },
    },
  }
})
