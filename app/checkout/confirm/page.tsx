"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle, Package, Truck, Home, ShoppingBag, Sparkles, PartyPopper } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import confetti from "canvas-confetti"

export default function OrderConfirmationPage() {
    const router = useRouter()
    const [countdown, setCountdown] = useState(5)
    const [showPopup, setShowPopup] = useState(true)

    // Generate random order ID
    const orderId = `BK${Date.now().toString().slice(-8)}`

    // Trigger confetti on mount
    useEffect(() => {
        const fire = () => {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#f97316', '#eab308', '#22c55e', '#3b82f6', '#a855f7']
            })
        }
        fire()
        setTimeout(fire, 500)
    }, [])

    // Countdown timer
    useEffect(() => {
        if (countdown <= 0) {
            router.replace("/")
            return
        }

        const timer = setTimeout(() => {
            setCountdown(prev => prev - 1)
        }, 1000)

        return () => clearTimeout(timer)
    }, [countdown, router])

    return (
        <main className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-950 flex items-center justify-center py-12 px-4">
            {/* Success Popup Modal */}
            <AnimatePresence>
                {showPopup && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.5, opacity: 0, y: 50 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="bg-white dark:bg-gray-800 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
                        >
                            {/* Animated Check */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="w-24 h-24 mx-auto mb-6 relative"
                            >
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        rotate: [0, 10, -10, 0]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        repeatDelay: 1
                                    }}
                                    className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30"
                                >
                                    <CheckCircle className="w-12 h-12 text-white" />
                                </motion.div>

                                {/* Celebration particles */}
                                {[...Array(6)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ scale: 0, opacity: 1 }}
                                        animate={{
                                            scale: [0, 1, 0],
                                            opacity: [1, 1, 0],
                                            x: Math.cos(i * 60 * Math.PI / 180) * 60,
                                            y: Math.sin(i * 60 * Math.PI / 180) * 60
                                        }}
                                        transition={{
                                            duration: 1,
                                            delay: 0.5 + i * 0.1,
                                            repeat: Infinity,
                                            repeatDelay: 2
                                        }}
                                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                    >
                                        <Sparkles className="w-4 h-4 text-yellow-400" />
                                    </motion.div>
                                ))}
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-3xl font-bold text-gray-900 dark:text-white mb-2"
                            >
                                Order Confirmed! 🎉
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-gray-600 dark:text-gray-400 mb-6"
                            >
                                Thank you for supporting Indian artisans!
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-4 mb-6"
                            >
                                <p className="text-sm text-orange-600 dark:text-orange-400">
                                    Order ID: <span className="font-bold">{orderId}</span>
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="flex flex-col gap-3"
                            >
                                <Link href="/explore" onClick={() => setShowPopup(false)}>
                                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6 gap-2 text-lg">
                                        <ShoppingBag className="w-5 h-5" />
                                        Keep Shopping
                                    </Button>
                                </Link>

                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Redirecting to home in <span className="font-bold text-orange-500">{countdown}</span> seconds...
                                </p>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background Content */}
            <div className="max-w-2xl w-full text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl"
                >
                    {/* Order Timeline */}
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                        What's Next?
                    </h2>

                    <div className="space-y-6">
                        {[
                            { icon: Package, title: "Order Processing", desc: "Your order is being prepared", status: "current" },
                            { icon: Truck, title: "Shipping", desc: "Will be dispatched within 24-48 hours", status: "pending" },
                            { icon: Home, title: "Delivery", desc: "Estimated delivery in 5-7 business days", status: "pending" },
                        ].map((step, index) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.8 + index * 0.2 }}
                                className={`flex items-center gap-4 p-4 rounded-xl ${step.status === "current"
                                    ? "bg-green-50 dark:bg-green-900/20 border-2 border-green-500"
                                    : "bg-gray-50 dark:bg-gray-700/50"
                                    }`}
                            >
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${step.status === "current"
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-200 dark:bg-gray-600 text-gray-400"
                                    }`}>
                                    <step.icon className="w-6 h-6" />
                                </div>
                                <div className="text-left">
                                    <h3 className="font-semibold text-gray-900 dark:text-white">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {step.desc}
                                    </p>
                                </div>
                                {step.status === "current" && (
                                    <motion.div
                                        animate={{ scale: [1, 1.2, 1] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        className="ml-auto"
                                    >
                                        <span className="text-green-500 text-sm font-medium">In Progress</span>
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/">
                            <Button variant="outline" size="lg" className="gap-2">
                                <Home className="w-5 h-5" />
                                Go to Home
                            </Button>
                        </Link>
                        <Link href="/explore">
                            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 gap-2">
                                <ShoppingBag className="w-5 h-5" />
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </main>
    )
}
