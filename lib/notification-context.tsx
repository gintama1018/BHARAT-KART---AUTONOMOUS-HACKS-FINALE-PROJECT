"use client"

import { createContext, useContext, useState, useCallback, ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, X, Bell, CheckCircle, Package } from "lucide-react"
import Link from "next/link"

export interface Notification {
    id: string
    type: "cart_add" | "cart_remove" | "order_placed" | "info"
    title: string
    message: string
    timestamp: Date
    read: boolean
    link?: string
}

interface NotificationContextType {
    notifications: Notification[]
    unreadCount: number
    addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void
    markAsRead: (id: string) => void
    markAllAsRead: () => void
    clearNotifications: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [notifications, setNotifications] = useState<Notification[]>([])

    const addNotification = useCallback((notification: Omit<Notification, "id" | "timestamp" | "read">) => {
        const newNotification: Notification = {
            ...notification,
            id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date(),
            read: false
        }
        setNotifications(prev => [newNotification, ...prev].slice(0, 20)) // Keep last 20
    }, [])

    const markAsRead = useCallback((id: string) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        )
    }, [])

    const markAllAsRead = useCallback(() => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    }, [])

    const clearNotifications = useCallback(() => {
        setNotifications([])
    }, [])

    const unreadCount = notifications.filter(n => !n.read).length

    return (
        <NotificationContext.Provider value={{
            notifications,
            unreadCount,
            addNotification,
            markAsRead,
            markAllAsRead,
            clearNotifications
        }}>
            {children}
        </NotificationContext.Provider>
    )
}

export function useNotifications() {
    const context = useContext(NotificationContext)
    if (context === undefined) {
        throw new Error("useNotifications must be used within a NotificationProvider")
    }
    return context
}

// Notification dropdown component
export function NotificationDropdown({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const { notifications, markAsRead, markAllAsRead } = useNotifications()

    const getIcon = (type: Notification["type"]) => {
        switch (type) {
            case "cart_add": return <ShoppingCart className="w-4 h-4 text-green-500" />
            case "cart_remove": return <X className="w-4 h-4 text-red-500" />
            case "order_placed": return <CheckCircle className="w-4 h-4 text-blue-500" />
            default: return <Bell className="w-4 h-4 text-orange-500" />
        }
    }

    const formatTime = (date: Date) => {
        const now = new Date()
        const diff = now.getTime() - date.getTime()
        const minutes = Math.floor(diff / 60000)
        if (minutes < 1) return "Just now"
        if (minutes < 60) return `${minutes}m ago`
        const hours = Math.floor(minutes / 60)
        if (hours < 24) return `${hours}h ago`
        return date.toLocaleDateString()
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                        <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
                        {notifications.length > 0 && (
                            <button
                                onClick={markAllAsRead}
                                className="text-xs text-orange-600 hover:text-orange-700"
                            >
                                Mark all read
                            </button>
                        )}
                    </div>

                    {/* Notifications list */}
                    <div className="max-h-80 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-6 text-center">
                                <Bell className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                                <p className="text-sm text-gray-500">No notifications yet</p>
                            </div>
                        ) : (
                            notifications.map(notification => (
                                <Link
                                    key={notification.id}
                                    href={notification.link || "/cart"}
                                    onClick={() => {
                                        markAsRead(notification.id)
                                        onClose()
                                    }}
                                >
                                    <motion.div
                                        whileHover={{ backgroundColor: "rgba(251, 146, 60, 0.1)" }}
                                        className={`flex items-start gap-3 px-4 py-3 border-b border-gray-50 dark:border-gray-800 cursor-pointer ${!notification.read ? "bg-orange-50/50 dark:bg-orange-900/10" : ""
                                            }`}
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center flex-shrink-0">
                                            {getIcon(notification.type)}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                {notification.title}
                                            </p>
                                            <p className="text-xs text-gray-500 line-clamp-2">
                                                {notification.message}
                                            </p>
                                            <p className="text-[10px] text-gray-400 mt-1">
                                                {formatTime(notification.timestamp)}
                                            </p>
                                        </div>
                                        {!notification.read && (
                                            <span className="w-2 h-2 bg-orange-500 rounded-full flex-shrink-0 mt-2" />
                                        )}
                                    </motion.div>
                                </Link>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {notifications.length > 0 && (
                        <Link href="/cart" onClick={onClose}>
                            <div className="px-4 py-3 text-center text-sm text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 border-t border-gray-100 dark:border-gray-800">
                                View Cart →
                            </div>
                        </Link>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    )
}
