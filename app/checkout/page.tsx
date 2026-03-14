"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, CreditCard, Truck, Shield, Lock, MapPin, Phone, Mail, User, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useNotifications } from "@/lib/notification-context"

interface FormData {
  fullName: string
  phone: string
  email: string
  address: string
  city: string
  pinCode: string
  cardNumber: string
  expiry: string
  cvv: string
}

interface FormErrors {
  fullName?: string
  phone?: string
  email?: string
  address?: string
  city?: string
  pinCode?: string
  cardNumber?: string
  expiry?: string
  cvv?: string
}

interface InputFieldProps {
  name: keyof FormData
  label: string
  type?: string
  placeholder: string
  icon?: any
  className?: string
  value: string
  error?: string
  isTouched?: boolean
  onChange: (name: keyof FormData, value: string) => void
  onBlur: (name: keyof FormData) => void
}

const InputField = ({
  name,
  label,
  type = "text",
  placeholder,
  icon: Icon,
  className = "",
  value,
  error,
  isTouched,
  onChange,
  onBlur
}: InputFieldProps) => (
  <div className={className}>
    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
      {label} <span className="text-red-500">*</span>
    </label>
    <div className="relative">
      {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        onBlur={() => onBlur(name)}
        placeholder={placeholder}
        className={`w-full ${Icon ? "pl-10" : "px-4"} pr-10 py-3 border rounded-xl bg-white dark:bg-gray-900 transition-colors ${error && isTouched
            ? "border-red-500 focus:ring-red-500"
            : isTouched && !error
              ? "border-green-500 focus:ring-green-500"
              : "border-gray-200 dark:border-gray-700 focus:ring-orange-500"
          } focus:outline-none focus:ring-2`}
      />
      {isTouched && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {error ? (
            <AlertCircle className="w-5 h-5 text-red-500" />
          ) : (
            <CheckCircle2 className="w-5 h-5 text-green-500" />
          )}
        </div>
      )}
    </div>
    <AnimatePresence>
      {error && isTouched && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="text-red-500 text-xs mt-1 flex items-center gap-1"
        >
          <AlertCircle className="w-3 h-3" />
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
)

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getCartTotal, clearCart } = useCart()
  const { addNotification } = useNotifications()
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pinCode: "",
    cardNumber: "",
    expiry: "",
    cvv: ""
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const subtotal = getCartTotal()
  const shipping = subtotal > 999 ? 0 : 99
  const tax = Math.round(subtotal * 0.18)
  const total = subtotal + shipping + tax

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "fullName":
        if (!value.trim()) return "Full name is required"
        if (value.trim().length < 3) return "Name must be at least 3 characters"
        return undefined
      case "phone":
        if (!value.trim()) return "Phone number is required"
        if (!/^[6-9]\d{9}$/.test(value.replace(/\s/g, ""))) return "Enter a valid 10-digit Indian phone number"
        return undefined
      case "email":
        if (!value.trim()) return "Email is required"
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Enter a valid email address"
        return undefined
      case "address":
        if (!value.trim()) return "Address is required"
        if (value.trim().length < 10) return "Please enter a complete address"
        return undefined
      case "city":
        if (!value.trim()) return "City is required"
        return undefined
      case "pinCode":
        if (!value.trim()) return "PIN code is required"
        if (!/^\d{6}$/.test(value)) return "Enter a valid 6-digit PIN code"
        return undefined
      case "cardNumber":
        if (paymentMethod !== "card") return undefined
        if (!value.trim()) return "Card number is required"
        if (!/^\d{16}$/.test(value.replace(/\s/g, ""))) return "Enter a valid 16-digit card number"
        return undefined
      case "expiry":
        if (paymentMethod !== "card") return undefined
        if (!value.trim()) return "Expiry date is required"
        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) return "Use format MM/YY"
        return undefined
      case "cvv":
        if (paymentMethod !== "card") return undefined
        if (!value.trim()) return "CVV is required"
        if (!/^\d{3,4}$/.test(value)) return "Enter a valid CVV"
        return undefined
      default:
        return undefined
    }
  }

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }))
    }
  }

  const handleBlur = (name: string) => {
    setTouched(prev => ({ ...prev, [name]: true }))
    setErrors(prev => ({ ...prev, [name]: validateField(name, formData[name as keyof FormData]) }))
  }

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    const fields = ["fullName", "phone", "email", "address", "city", "pinCode"]
    if (paymentMethod === "card") {
      fields.push("cardNumber", "expiry", "cvv")
    }

    fields.forEach(field => {
      const error = validateField(field, formData[field as keyof FormData])
      if (error) newErrors[field as keyof FormErrors] = error
    })

    setErrors(newErrors)
    setTouched(Object.fromEntries(fields.map(f => [f, true])))
    return Object.keys(newErrors).length === 0
  }

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      addNotification({
        type: "info",
        title: "Please fill all required fields",
        message: "Check the form for errors and try again",
        link: "/checkout"
      })
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))

    // Clear cart and show notification
    clearCart()
    addNotification({
      type: "order_placed",
      title: "Order Placed Successfully!",
      message: `Your order of ₹${total.toLocaleString()} has been confirmed.`,
      link: "/checkout/confirm"
    })

    // Redirect to confirmation page (replace to prevent back navigation)
    router.replace("/checkout/confirm")
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950 py-12">
        <div className="container mx-auto px-4 text-center py-20">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Link href="/explore">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
          <Link href="/" className="hover:text-orange-600">Home</Link>
          <span>/</span>
          <Link href="/cart" className="hover:text-orange-600">Cart</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white font-medium">Checkout</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Truck className="w-5 h-5 text-orange-500" />
                Shipping Address
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField name="fullName" label="Full Name" placeholder="Enter your full name" icon={User} value={formData.fullName} error={errors.fullName} isTouched={touched.fullName} onChange={handleChange} onBlur={handleBlur} />
                <InputField name="phone" label="Phone Number" type="tel" placeholder="9876543210" icon={Phone} value={formData.phone} error={errors.phone} isTouched={touched.phone} onChange={handleChange} onBlur={handleBlur} />
                <InputField name="email" label="Email Address" type="email" placeholder="your@email.com" icon={Mail} className="md:col-span-2" value={formData.email} error={errors.email} isTouched={touched.email} onChange={handleChange} onBlur={handleBlur} />

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Street Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      value={formData.address}
                      onChange={(e) => handleChange("address", e.target.value)}
                      onBlur={() => handleBlur("address")}
                      placeholder="House no., Building, Street, Area"
                      rows={3}
                      className={`w-full pl-10 pr-10 py-3 border rounded-xl bg-white dark:bg-gray-900 resize-none transition-colors ${errors.address && touched.address
                          ? "border-red-500 focus:ring-red-500"
                          : touched.address && !errors.address
                            ? "border-green-500 focus:ring-green-500"
                            : "border-gray-200 dark:border-gray-700 focus:ring-orange-500"
                        } focus:outline-none focus:ring-2`}
                    />
                    {touched.address && (
                      <div className="absolute right-3 top-3">
                        {errors.address ? (
                          <AlertCircle className="w-5 h-5 text-red-500" />
                        ) : (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                    )}
                  </div>
                  <AnimatePresence>
                    {errors.address && touched.address && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-red-500 text-xs mt-1 flex items-center gap-1"
                      >
                        <AlertCircle className="w-3 h-3" />
                        {errors.address}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                <InputField name="city" label="City" placeholder="City" value={formData.city} error={errors.city} isTouched={touched.city} onChange={handleChange} onBlur={handleBlur} />
                <InputField name="pinCode" label="PIN Code" placeholder="110001" value={formData.pinCode} error={errors.pinCode} isTouched={touched.pinCode} onChange={handleChange} onBlur={handleBlur} />
              </div>
            </motion.div>

            {/* Payment Method */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-orange-500" />
                Payment Method
              </h2>

              <div className="space-y-3">
                {[
                  { id: "card", name: "Credit/Debit Card", icon: "💳" },
                  { id: "upi", name: "UPI Payment", icon: "📱" },
                  { id: "netbanking", name: "Net Banking", icon: "🏦" },
                  { id: "cod", name: "Cash on Delivery", icon: "💵" },
                ].map(method => (
                  <label
                    key={method.id}
                    className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${paymentMethod === method.id
                      ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-orange-300"
                      }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={paymentMethod === method.id}
                      onChange={() => setPaymentMethod(method.id)}
                      className="w-5 h-5 text-orange-500"
                    />
                    <span className="text-2xl">{method.icon}</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {method.name}
                    </span>
                  </label>
                ))}
              </div>

              <AnimatePresence>
                {paymentMethod === "card" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 space-y-4"
                  >
                    <InputField name="cardNumber" label="Card Number" placeholder="1234 5678 9012 3456" value={formData.cardNumber} error={errors.cardNumber} isTouched={touched.cardNumber} onChange={handleChange} onBlur={handleBlur} />
                    <div className="grid grid-cols-2 gap-4">
                      <InputField name="expiry" label="Expiry Date" placeholder="MM/YY" value={formData.expiry} error={errors.expiry} isTouched={touched.expiry} onChange={handleChange} onBlur={handleBlur} />
                      <InputField name="cvv" label="CVV" placeholder="123" value={formData.cvv} error={errors.cvv} isTouched={touched.cvv} onChange={handleChange} onBlur={handleBlur} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Order Summary
              </h2>

              {/* Items List */}
              <div className="space-y-3 mb-6 max-h-48 overflow-y-auto">
                {items.map(item => (
                  <div key={item.id} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3">
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-green-600" : ""}>
                    {shipping === 0 ? "FREE" : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-gray-600 dark:text-gray-400">
                  <span>Tax (18% GST)</span>
                  <span>₹{tax.toLocaleString()}</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <Button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg gap-2 disabled:opacity-70"
              >
                {isProcessing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      ⏳
                    </motion.div>
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock className="w-5 h-5" />
                    Place Order - ₹{total.toLocaleString()}
                  </>
                )}
              </Button>

              {/* Security Badges */}
              <div className="mt-6 space-y-2 text-xs text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  100% Secure Payment
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-green-500" />
                  SSL Encrypted Checkout
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

