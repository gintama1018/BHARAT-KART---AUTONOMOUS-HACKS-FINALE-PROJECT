"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface CartItem {
    id: string
    name: string
    price: number
    originalPrice?: number
    image: string
    artisan: string
    quantity: number
    state?: string
    festival?: string
}

interface CartContextType {
    items: CartItem[]
    addToCart: (item: Omit<CartItem, "quantity">) => void
    removeFromCart: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
    getCartTotal: () => number
    getCartCount: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [isInitialized, setIsInitialized] = useState(false)

    // Load cart from localStorage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("bharatkart-cart")
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart))
            } catch (e) {
                console.error("Failed to parse cart from localStorage")
            }
        }
        setIsInitialized(true)
    }, [])

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (isInitialized) {
            localStorage.setItem("bharatkart-cart", JSON.stringify(items))
        }
    }, [items, isInitialized])

    const addToCart = (item: Omit<CartItem, "quantity">) => {
        setItems(prev => {
            const existingItem = prev.find(i => i.id === item.id)
            if (existingItem) {
                return prev.map(i =>
                    i.id === item.id
                        ? { ...i, quantity: i.quantity + 1 }
                        : i
                )
            }
            return [...prev, { ...item, quantity: 1 }]
        })
    }

    const removeFromCart = (id: string) => {
        setItems(prev => prev.filter(item => item.id !== id))
    }

    const updateQuantity = (id: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromCart(id)
            return
        }
        setItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        )
    }

    const clearCart = () => {
        setItems([])
    }

    const getCartTotal = () => {
        return items.reduce((total, item) => total + item.price * item.quantity, 0)
    }

    const getCartCount = () => {
        return items.reduce((count, item) => count + item.quantity, 0)
    }

    return (
        <CartContext.Provider value={{
            items,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            getCartTotal,
            getCartCount
        }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
