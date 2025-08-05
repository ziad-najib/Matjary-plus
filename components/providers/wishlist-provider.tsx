"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"

export interface WishlistItem {
  id: string
  productId: string
  name: string
  price: number
  image: string
  sellerId: string
  addedAt: string
}

interface WishlistContextType {
  items: WishlistItem[]
  totalItems: number
  addItem: (item: WishlistItem) => void
  removeItem: (productId: string) => void
  clearWishlist: () => void
  isInWishlist: (productId: string) => boolean
  toggleItem: (item: WishlistItem) => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // تحميل المفضلة من localStorage عند بدء التطبيق
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem("wishlist")
      if (savedWishlist) {
        const parsedWishlist = JSON.parse(savedWishlist)
        setItems(parsedWishlist)
      }
    } catch (error) {
      console.error("Error loading wishlist from localStorage:", error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // حفظ المفضلة في localStorage عند تغييرها
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("wishlist", JSON.stringify(items))
      } catch (error) {
        console.error("Error saving wishlist to localStorage:", error)
      }
    }
  }, [items, isLoaded])

  const totalItems = items.length

  const addItem = (newItem: WishlistItem) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.productId === newItem.productId)

      if (existingItem) {
        return currentItems
      }

      toast.success("تم إضافة المنتج إلى المفضلة")
      return [...currentItems, { ...newItem, addedAt: new Date().toISOString() }]
    })
  }

  const removeItem = (productId: string) => {
    setItems((currentItems) => {
      const newItems = currentItems.filter((item) => item.productId !== productId)
      toast.success("تم إزالة المنتج من المفضلة")
      return newItems
    })
  }

  const clearWishlist = () => {
    setItems([])
    toast.success("تم إفراغ المفضلة")
  }

  const isInWishlist = (productId: string) => {
    return items.some((item) => item.productId === productId)
  }

  const toggleItem = (item: WishlistItem) => {
    if (isInWishlist(item.productId)) {
      removeItem(item.productId)
    } else {
      addItem(item)
    }
  }

  const value = {
    items,
    totalItems,
    addItem,
    removeItem,
    clearWishlist,
    isInWishlist,
    toggleItem,
  }

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}
