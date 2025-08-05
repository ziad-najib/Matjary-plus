"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import toast from "react-hot-toast"

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

interface CartContextType {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  isInCart: (productId: string) => boolean
  getItemQuantity: (productId: string) => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // تحميل السلة من localStorage عند بدء التطبيق
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart")
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart)
        setItems(parsedCart)
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // حفظ السلة في localStorage عند تغييرها
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem("cart", JSON.stringify(items))
      } catch (error) {
        console.error("Error saving cart to localStorage:", error)
      }
    }
  }, [items, isLoaded])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const addItem = (newItem: Omit<CartItem, "quantity">, quantity = 1) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.productId === newItem.productId)

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity
        const maxQuantity = newItem.maxQuantity || 10

        if (newQuantity > maxQuantity) {
          toast.error(`الحد الأقصى للكمية هو ${maxQuantity}`)
          return currentItems.map((item) =>
            item.productId === newItem.productId ? { ...item, quantity: maxQuantity } : item,
          )
        }

        toast.success("تم تحديث كمية المنتج في السلة")
        return currentItems.map((item) =>
          item.productId === newItem.productId ? { ...item, quantity: newQuantity } : item,
        )
      } else {
        toast.success("تم إضافة المنتج إلى السلة")
        return [...currentItems, { ...newItem, quantity }]
      }
    })
  }

  const removeItem = (productId: string) => {
    setItems((currentItems) => {
      const newItems = currentItems.filter((item) => item.productId !== productId)
      toast.success("تم إزالة المنتج من السلة")
      return newItems
    })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId)
      return
    }

    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.productId === productId) {
          const maxQuantity = item.maxQuantity || 10
          const newQuantity = Math.min(quantity, maxQuantity)

          if (quantity > maxQuantity) {
            toast.error(`الحد الأقصى للكمية هو ${maxQuantity}`)
          }

          return { ...item, quantity: newQuantity }
        }
        return item
      }),
    )
  }

  const clearCart = () => {
    setItems([])
    toast.success("تم إفراغ السلة")
  }

  const isInCart = (productId: string) => {
    return items.some((item) => item.productId === productId)
  }

  const getItemQuantity = (productId: string) => {
    const item = items.find((item) => item.productId === productId)
    return item ? item.quantity : 0
  }

  const value = {
    items,
    totalItems,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
