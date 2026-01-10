"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ShoppingCart, User, Menu, X, Heart, Bell, Sun, Moon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchWithSuggestions } from "@/components/ui/search-with-suggestions"
import { useTheme } from "next-themes"
import { useCart } from "@/lib/cart-context"
import { useNotifications, NotificationDropdown } from "@/lib/notification-context"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const { getCartCount } = useCart()
  const { unreadCount } = useNotifications()

  useEffect(() => {
    setMounted(true)
  }, [])

  const cartCount = mounted ? getCartCount() : 0

  return (
    <motion.header
      className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-orange-300 dark:border-orange-900/50 shadow-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 shrink-0">
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center shadow-md"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <span className="text-white font-bold text-lg">भ</span>
            </motion.div>
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              BharatKart
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link href="/explore" className="text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium text-sm xl:text-base">
              Explore
            </Link>
            <Link href="/states" className="text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium text-sm xl:text-base">
              States
            </Link>
            <Link href="/artisans" className="text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium text-sm xl:text-base">
              Artisans
            </Link>
            <Link href="/festivals" className="text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium text-sm xl:text-base">
              Festivals
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex items-center flex-1 max-w-xs xl:max-w-sm mx-4">
            <SearchWithSuggestions />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Mobile Search Toggle */}
            <Button variant="ghost" size="sm" className="lg:hidden text-gray-700 dark:text-gray-200 hover:bg-orange-100 dark:hover:bg-orange-900/30" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className="w-5 h-5" />
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="sm" className="hidden sm:flex text-gray-700 dark:text-gray-200 hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:text-orange-600">
              <Heart className="w-5 h-5" />
            </Button>

            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="hidden sm:flex relative text-gray-700 dark:text-gray-200 hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:text-orange-600"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-red-500 text-white rounded-full text-[10px] font-semibold flex items-center justify-center border-2 border-white dark:border-gray-900"
                  >
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </motion.span>
                )}
              </Button>
              <NotificationDropdown
                isOpen={isNotificationsOpen}
                onClose={() => setIsNotificationsOpen(false)}
              />
            </div>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-700 dark:text-gray-200 hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:text-orange-600"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {mounted && (
                <motion.div
                  key={theme}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                >
                  {theme === 'dark' ? (
                    <Sun className="w-5 h-5 text-yellow-400" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </motion.div>
              )}
            </Button>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="relative text-gray-700 dark:text-gray-200 hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:text-orange-600">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-orange-500 text-white rounded-full text-[10px] font-semibold flex items-center justify-center border-2 border-white dark:border-gray-900"
                  >
                    {cartCount > 9 ? "9+" : cartCount}
                  </motion.span>
                )}
              </Button>
            </Link>

            {/* Profile */}
            <Link href="/get-started">
              <Button variant="ghost" size="sm" className="text-gray-700 dark:text-gray-200 hover:bg-orange-100 dark:hover:bg-orange-900/30 hover:text-orange-600">
                <User className="w-5 h-5" />
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="sm" className="lg:hidden text-gray-700 dark:text-gray-200 hover:bg-orange-100 dark:hover:bg-orange-900/30" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              className="lg:hidden py-4 border-t border-orange-100"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search for handicrafts, textiles, art..."
                  className="pl-10 pr-4 py-2 w-full border-orange-200 focus:border-orange-400 focus:ring-orange-200"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              className="md:hidden py-4 border-t border-orange-100"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-4">
                <Link
                  href="/explore"
                  className="text-gray-700 hover:text-orange-600 transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Explore India
                </Link>
                <Link
                  href="/states"
                  className="text-gray-700 hover:text-orange-600 transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  States & Crafts
                </Link>
                <Link
                  href="/artisans"
                  className="text-gray-700 hover:text-orange-600 transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Meet Artisans
                </Link>
                <Link
                  href="/festivals"
                  className="text-gray-700 hover:text-orange-600 transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Festivals
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}
