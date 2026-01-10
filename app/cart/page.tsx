"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ArrowLeft, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useNotifications } from "@/lib/notification-context"

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, getCartTotal, clearCart } = useCart()
  const { addNotification } = useNotifications()

  const subtotal = getCartTotal()
  const shipping = subtotal > 999 ? 0 : 99
  const tax = Math.round(subtotal * 0.18)
  const total = subtotal + shipping + tax

  const handleRemove = (id: string, name: string) => {
    removeFromCart(id)
    addNotification({
      type: "cart_remove",
      title: "Removed from Cart",
      message: `${name} has been removed from your cart`,
      link: "/cart"
    })
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-20">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <ShoppingBag className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto mb-6" />
            </motion.div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Looks like you haven't added any items to your cart yet.
              Explore our collection of handcrafted treasures!
            </p>
            <Link href="/explore">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                <Sparkles className="w-5 h-5 mr-2" />
                Start Shopping
              </Button>
            </Link>
          </div>
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
          <span className="text-gray-900 dark:text-white font-medium">Shopping Cart</span>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Shopping Cart ({items.length} {items.length === 1 ? "item" : "items"})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence mode="popLayout">
              {items.map((item, index) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-lg flex gap-4"
                >
                  {/* Image */}
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          by {item.artisan}
                        </p>
                        {item.festival && (
                          <span className="inline-block text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded-full mt-2">
                            {item.festival} Special
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => handleRemove(item.id, item.name)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="font-bold text-gray-900 dark:text-white">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                        {item.originalPrice && item.originalPrice > item.price && (
                          <p className="text-sm text-gray-400 line-through">
                            ₹{(item.originalPrice * item.quantity).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Actions */}
            <div className="flex justify-between items-center pt-4">
              <Link href="/explore">
                <Button variant="outline" className="gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Continue Shopping
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                onClick={() => {
                  clearCart()
                  addNotification({
                    type: "info",
                    title: "Cart Cleared",
                    message: "All items have been removed from your cart",
                    link: "/explore"
                  })
                }}
              >
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
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
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-900 dark:text-white">
                    <span>Total</span>
                    <span>₹{total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-sm"
                  />
                  <Button variant="outline" size="sm">Apply</Button>
                </div>
              </div>

              {/* Free Shipping Notice */}
              {shipping > 0 && (
                <div className="mb-6 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-sm text-orange-700 dark:text-orange-400">
                  Add ₹{(1000 - subtotal).toLocaleString()} more for FREE shipping!
                </div>
              )}

              {/* Checkout Button */}
              <Link href="/checkout">
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 text-lg gap-2">
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 flex justify-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                <span>🔒 Secure Checkout</span>
                <span>✓ Quality Assured</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
