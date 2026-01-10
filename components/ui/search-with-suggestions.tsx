"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, X, MapPin, Package, User, Sparkles, TrendingUp, Clock } from "lucide-react"
import Link from "next/link"
import { statesData } from "@/lib/states-data"

interface SearchResult {
    type: "state" | "product" | "artisan" | "category"
    id: string
    name: string
    subtitle?: string
    image?: string
    link: string
}

const popularSearches = [
    "Blue Pottery",
    "Silk Sarees",
    "Handloom",
    "Kathakali Masks",
    "Phulkari",
    "Bronze Idols",
    "Warli Art",
    "Channapatna Toys"
]

const categories = [
    { name: "Textiles & Fabrics", icon: "🧵", link: "/categories/textiles" },
    { name: "Pottery & Ceramics", icon: "🏺", link: "/categories/pottery" },
    { name: "Jewelry & Accessories", icon: "💍", link: "/categories/jewelry" },
    { name: "Wood & Metal Crafts", icon: "🪵", link: "/categories/crafts" },
    { name: "Paintings & Art", icon: "🎨", link: "/categories/art" },
    { name: "Home & Decor", icon: "🏠", link: "/categories/home" },
]

export function SearchWithSuggestions() {
    const [query, setQuery] = useState("")
    const [isOpen, setIsOpen] = useState(false)
    const [results, setResults] = useState<SearchResult[]>([])
    const [recentSearches, setRecentSearches] = useState<string[]>([])
    const inputRef = useRef<HTMLInputElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    // Load recent searches from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("bharatkart-recent-searches")
        if (saved) {
            setRecentSearches(JSON.parse(saved).slice(0, 5))
        }
    }, [])

    // Search logic
    useEffect(() => {
        if (query.length < 2) {
            setResults([])
            return
        }

        const searchResults: SearchResult[] = []
        const lowerQuery = query.toLowerCase()

        // Search states
        Object.values(statesData).forEach(state => {
            if (state.name.toLowerCase().includes(lowerQuery) ||
                state.specialties.some(s => s.toLowerCase().includes(lowerQuery))) {
                searchResults.push({
                    type: "state",
                    id: state.id,
                    name: state.name,
                    subtitle: state.tagline,
                    image: state.backgroundImage,
                    link: `/states/${state.id}`
                })
            }

            // Search products within states
            state.featuredProducts.forEach(product => {
                if (product.name.toLowerCase().includes(lowerQuery)) {
                    searchResults.push({
                        type: "product",
                        id: `${state.id}-${product.id}`,
                        name: product.name,
                        subtitle: `₹${product.price} • ${state.name}`,
                        image: product.image,
                        link: `/states/${state.id}#products`
                    })
                }
            })

            // Search artisans
            state.featuredArtisans.forEach(artisan => {
                if (artisan.name.toLowerCase().includes(lowerQuery) ||
                    artisan.craft.toLowerCase().includes(lowerQuery)) {
                    searchResults.push({
                        type: "artisan",
                        id: `artisan-${artisan.id}`,
                        name: artisan.name,
                        subtitle: `${artisan.craft} • ${artisan.location}`,
                        image: artisan.image,
                        link: `/states/${state.id}#artisans`
                    })
                }
            })
        })

        // Search categories
        categories.forEach(cat => {
            if (cat.name.toLowerCase().includes(lowerQuery)) {
                searchResults.push({
                    type: "category",
                    id: cat.name,
                    name: cat.name,
                    subtitle: "Category",
                    link: cat.link
                })
            }
        })

        setResults(searchResults.slice(0, 8))
    }, [query])

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const handleSearch = (searchTerm: string) => {
        // Save to recent searches
        const updated = [searchTerm, ...recentSearches.filter(s => s !== searchTerm)].slice(0, 5)
        setRecentSearches(updated)
        localStorage.setItem("bharatkart-recent-searches", JSON.stringify(updated))
        setIsOpen(false)
        setQuery("")
    }

    const getIcon = (type: string) => {
        switch (type) {
            case "state": return <MapPin className="w-4 h-4 text-orange-500" />
            case "product": return <Package className="w-4 h-4 text-green-500" />
            case "artisan": return <User className="w-4 h-4 text-purple-500" />
            case "category": return <Sparkles className="w-4 h-4 text-blue-500" />
            default: return null
        }
    }

    return (
        <div ref={containerRef} className="relative w-full">
            {/* Search Input */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsOpen(true)}
                    placeholder="Search for handicrafts, textiles, art..."
                    className="pl-10 pr-10 py-2.5 w-full border border-orange-300 dark:border-gray-600 focus:border-orange-500 focus:ring-2 focus:ring-orange-300/50 dark:bg-gray-800 dark:text-white rounded-full text-sm outline-none transition-all"
                />
                {query && (
                    <button
                        onClick={() => setQuery("")}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        <X className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-orange-100 dark:border-gray-700 overflow-hidden z-50 max-h-[70vh] overflow-y-auto"
                    >
                        {/* Search Results */}
                        {results.length > 0 ? (
                            <div className="p-2">
                                <p className="text-xs text-gray-500 px-3 py-2 font-medium">Search Results</p>
                                {results.map((result) => (
                                    <Link
                                        key={result.id}
                                        href={result.link}
                                        onClick={() => handleSearch(result.name)}
                                    >
                                        <motion.div
                                            whileHover={{ backgroundColor: "rgba(251, 146, 60, 0.1)" }}
                                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors"
                                        >
                                            <div className="w-10 h-10 rounded-lg bg-orange-50 dark:bg-gray-800 flex items-center justify-center overflow-hidden">
                                                {result.image ? (
                                                    <img src={result.image} alt="" className="w-full h-full object-cover" />
                                                ) : (
                                                    getIcon(result.type)
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{result.name}</p>
                                                <p className="text-xs text-gray-500 truncate">{result.subtitle}</p>
                                            </div>
                                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 capitalize">
                                                {result.type}
                                            </span>
                                        </motion.div>
                                    </Link>
                                ))}
                            </div>
                        ) : query.length >= 2 ? (
                            <div className="p-6 text-center">
                                <p className="text-gray-500 text-sm">No results found for "{query}"</p>
                                <p className="text-gray-400 text-xs mt-1">Try searching for states, products, or artisans</p>
                            </div>
                        ) : (
                            <>
                                {/* Recent Searches */}
                                {recentSearches.length > 0 && (
                                    <div className="p-2 border-b border-gray-100 dark:border-gray-800">
                                        <div className="flex items-center gap-2 px-3 py-2">
                                            <Clock className="w-4 h-4 text-gray-400" />
                                            <p className="text-xs text-gray-500 font-medium">Recent Searches</p>
                                        </div>
                                        <div className="flex flex-wrap gap-2 px-3 pb-2">
                                            {recentSearches.map((search, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => {
                                                        setQuery(search)
                                                        inputRef.current?.focus()
                                                    }}
                                                    className="text-xs px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
                                                >
                                                    {search}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Popular Searches */}
                                <div className="p-2 border-b border-gray-100 dark:border-gray-800">
                                    <div className="flex items-center gap-2 px-3 py-2">
                                        <TrendingUp className="w-4 h-4 text-orange-500" />
                                        <p className="text-xs text-gray-500 font-medium">Trending Searches</p>
                                    </div>
                                    <div className="flex flex-wrap gap-2 px-3 pb-2">
                                        {popularSearches.map((search, i) => (
                                            <button
                                                key={i}
                                                onClick={() => {
                                                    setQuery(search)
                                                    inputRef.current?.focus()
                                                }}
                                                className="text-xs px-3 py-1.5 rounded-full bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 hover:bg-orange-100 dark:hover:bg-orange-900/40 transition-colors"
                                            >
                                                {search}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Browse Categories */}
                                <div className="p-2">
                                    <p className="text-xs text-gray-500 px-3 py-2 font-medium">Browse Categories</p>
                                    <div className="grid grid-cols-2 gap-1 px-1">
                                        {categories.map((cat) => (
                                            <Link
                                                key={cat.name}
                                                href={cat.link}
                                                onClick={() => setIsOpen(false)}
                                            >
                                                <motion.div
                                                    whileHover={{ scale: 1.02 }}
                                                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors cursor-pointer"
                                                >
                                                    <span className="text-lg">{cat.icon}</span>
                                                    <span className="text-sm text-gray-700 dark:text-gray-300">{cat.name}</span>
                                                </motion.div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
