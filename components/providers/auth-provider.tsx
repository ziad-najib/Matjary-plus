"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import {
  type User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { auth, googleProvider, db } from "@/lib/firebase"
import toast from "react-hot-toast"

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updateUserProfile: (displayName: string, photoURL?: string) => Promise<void>
  sendVerificationEmail: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // إنشاء أو تحديث مستند المستخدم في Firestore
        const userRef = doc(db, "users", user.uid)
        const userSnap = await getDoc(userRef)

        if (!userSnap.exists()) {
          await setDoc(userRef, {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
            createdAt: new Date(),
            updatedAt: new Date(),
            role: "user",
            preferences: {
              language: "ar",
              currency: "SYP",
              notifications: {
                email: true,
                push: true,
                sms: false,
              },
            },
          })
        } else {
          // تحديث آخر تسجيل دخول
          await setDoc(
            userRef,
            {
              lastLoginAt: new Date(),
              updatedAt: new Date(),
            },
            { merge: true },
          )
        }
      }
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      const result = await signInWithEmailAndPassword(auth, email, password)

      if (!result.user.emailVerified) {
        toast.error("يرجى تأكيد بريدك الإلكتروني أولاً")
        await signOut(auth)
        return
      }

      toast.success("تم تسجيل الدخول بنجاح!")
    } catch (error: any) {
      console.error("Login error:", error)

      switch (error.code) {
        case "auth/user-not-found":
          toast.error("المستخدم غير موجود")
          break
        case "auth/wrong-password":
          toast.error("كلمة المرور غير صحيحة")
          break
        case "auth/invalid-email":
          toast.error("البريد الإلكتروني غير صحيح")
          break
        case "auth/user-disabled":
          toast.error("تم تعطيل هذا الحساب")
          break
        case "auth/too-many-requests":
          toast.error("محاولات كثيرة جداً، يرجى المحاولة لاحقاً")
          break
        default:
          toast.error("حدث خطأ أثناء تسجيل الدخول")
      }
      throw error
    } finally {
      setLoading(false)
    }
  }

  const register = async (email: string, password: string, name: string) => {
    try {
      setLoading(true)
      const result = await createUserWithEmailAndPassword(auth, email, password)

      // تحديث الملف الشخصي
      await updateProfile(result.user, {
        displayName: name,
      })

      // إرسال بريد التأكيد
      await sendEmailVerification(result.user)

      toast.success("تم إنشاء الحساب بنجاح! يرجى تأكيد بريدك الإلكتروني")

      // تسجيل الخروج حتى يتم تأكيد البريد الإلكتروني
      await signOut(auth)
    } catch (error: any) {
      console.error("Registration error:", error)

      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error("البريد الإلكتروني مستخدم بالفعل")
          break
        case "auth/invalid-email":
          toast.error("البريد الإلكتروني غير صحيح")
          break
        case "auth/weak-password":
          toast.error("كلمة المرور ضعيفة جداً")
          break
        default:
          toast.error("حدث خطأ أثناء إنشاء الحساب")
      }
      throw error
    } finally {
      setLoading(false)
    }
  }

  const loginWithGoogle = async () => {
    try {
      setLoading(true)
      await signInWithPopup(auth, googleProvider)
      toast.success("تم تسجيل الدخول بنجاح!")
    } catch (error: any) {
      console.error("Google login error:", error)

      switch (error.code) {
        case "auth/popup-closed-by-user":
          toast.error("تم إلغاء تسجيل الدخول")
          break
        case "auth/popup-blocked":
          toast.error("تم حظر النافذة المنبثقة")
          break
        default:
          toast.error("حدث خطأ أثناء تسجيل الدخول بجوجل")
      }
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await signOut(auth)
      toast.success("تم تسجيل الخروج بنجاح!")
    } catch (error) {
      console.error("Logout error:", error)
      toast.error("حدث خطأ أثناء تسجيل الخروج")
      throw error
    }
  }

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email)
      toast.success("تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني")
    } catch (error: any) {
      console.error("Password reset error:", error)

      switch (error.code) {
        case "auth/user-not-found":
          toast.error("المستخدم غير موجود")
          break
        case "auth/invalid-email":
          toast.error("البريد الإلكتروني غير صحيح")
          break
        default:
          toast.error("حدث خطأ أثناء إرسال رابط إعادة التعيين")
      }
      throw error
    }
  }

  const updateUserProfile = async (displayName: string, photoURL?: string) => {
    try {
      if (!user) throw new Error("No user logged in")

      await updateProfile(user, {
        displayName,
        photoURL,
      })

      // تحديث Firestore
      const userRef = doc(db, "users", user.uid)
      await setDoc(
        userRef,
        {
          displayName,
          photoURL,
          updatedAt: new Date(),
        },
        { merge: true },
      )

      toast.success("تم تحديث الملف الشخصي بنجاح!")
    } catch (error) {
      console.error("Profile update error:", error)
      toast.error("حدث خطأ أثناء تحديث الملف الشخصي")
      throw error
    }
  }

  const sendVerificationEmail = async () => {
    try {
      if (!user) throw new Error("No user logged in")

      await sendEmailVerification(user)
      toast.success("تم إرسال بريد التأكيد!")
    } catch (error) {
      console.error("Email verification error:", error)
      toast.error("حدث خطأ أثناء إرسال بريد التأكيد")
      throw error
    }
  }

  const value = {
    user,
    loading,
    login,
    register,
    loginWithGoogle,
    logout,
    resetPassword,
    updateUserProfile,
    sendVerificationEmail,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
