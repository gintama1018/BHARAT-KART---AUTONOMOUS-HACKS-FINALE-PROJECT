"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Package, ChevronRight, ShoppingBag, Calendar, Truck, CheckCircle, Clock, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { createClient, Order } from "@/lib/supabase"

const statusConfig = {
    processing: { icon: Clock, color: "text-yellow-500", bg: "bg-yellow-100 dark:bg-yellow-900/20", label: "Processing" },
    shipped: { icon: Truck, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/20", label: "Shipped" },
    delivered: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-100 dark:bg-green-900/20", label: "Delivered" },
    cancelled: { icon: XCircle, color: "text-red-500", bg: "bg-red-100 dark:bg-red-900/20", label: "Cancelled" },
}

export default function OrdersPage() {
    const { user, loading: authLoading } = useAuth()
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user) {
            fetchOrders()
        } else if (!authLoading) {
            setLoading(false)
        }
    }, [user, authLoading])

    const fetchOrders = async () => {
        const supabase = createClient()
        const { data, error } = await supabase
            .from("orders")
            .select("*, order_items(*)")
            .eq("user_id", user!.uid)
            .order("created_at", { ascending: false })

        if (!error && data) {
            setOrders(data)
        }
        setLoading(false)
    }

    if (authLoading || loading) {
        return (
            <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950 py-12">
                <div className="container mx-auto px-4">
                    <div className="animate-pulse space-y-4">
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48" />
                        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded" />
                        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded" />
                    </div>
                </div>
            </main>
        )
    }

    if (!user) {
        return (
            <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950 py-12">
                <div className="container mx-auto px-4 text-center py-20">
                    <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                        Sign in to view your orders
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Track your orders and view order history
                    </p>
                    <Link href="/auth/login">
                        <Button className="bg-orange-500 hover:bg-orange-600">Sign In</Button>
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
                    <span className="text-gray-900 dark:text-white font-medium">My Orders</span>
                </nav>

                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Orders</h1>
                    <Link href="/explore">
                        <Button variant="outline" className="gap-2">
                            <ShoppingBag className="w-4 h-4" />
                            Continue Shopping
                        </Button>
                    </Link>
                </div>

                {orders.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
                    >
                        <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">No orders yet</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Start shopping to see your orders here
                        </p>
                        <Link href="/explore">
                            <Button className="bg-orange-500 hover:bg-orange-600 gap-2">
                                <ShoppingBag className="w-4 h-4" />
                                Start Shopping
                            </Button>
                        </Link>
                    </motion.div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order, index) => {
                            const status = statusConfig[order.status as keyof typeof statusConfig] || statusConfig.processing
                            const StatusIcon = status.icon

                            return (
                                <motion.div
                                    key={order.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
                                >
                                    <div className="p-6">
                                        {/* Order Header */}
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                                            <div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Order #{order.order_number}
                                                </p>
                                                <div className="flex items-center gap-2 mt-1 text-sm text-gray-600 dark:text-gray-400">
                                                    <Calendar className="w-4 h-4" />
                                                    {new Date(order.created_at).toLocaleDateString('en-IN', {
                                                        day: 'numeric',
                                                        month: 'short',
                                                        year: 'numeric'
                                                    })}
                                                </div>
                                            </div>
                                            <div className={`flex items-center gap-2 ${status.bg} ${status.color} px-3 py-1.5 rounded-full`}>
                                                <StatusIcon className="w-4 h-4" />
                                                <span className="text-sm font-medium">{status.label}</span>
                                            </div>
                                        </div>

                                        {/* Order Items Preview */}
                                        <div className="flex items-center gap-4 py-4 border-t border-gray-200 dark:border-gray-700">
                                            <div className="flex -space-x-3">
                                                {order.items?.slice(0, 3).map((item, i) => (
                                                    <img
                                                        key={item.id}
                                                        src={item.product_image || "/placeholder.svg"}
                                                        alt={item.product_name}
                                                        className="w-12 h-12 rounded-lg object-cover border-2 border-white dark:border-gray-800"
                                                        style={{ zIndex: 3 - i }}
                                                    />
                                                ))}
                                                {(order.items?.length || 0) > 3 && (
                                                    <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-sm font-medium text-gray-600 dark:text-gray-400 border-2 border-white dark:border-gray-800">
                                                        +{(order.items?.length || 0) - 3}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? 's' : ''}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-lg font-bold text-gray-900 dark:text-white">
                                                    ₹{order.total.toLocaleString()}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    {order.payment_method}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                )}
            </div>
        </main>
    )
}
