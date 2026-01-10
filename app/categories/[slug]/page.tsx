"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Star, ShoppingCart, Heart, Filter, Grid3X3, List, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { categoriesData, getProductsByCategory, getAllProducts } from "@/lib/categories-data"

export default function CategoryPage() {
    const params = useParams()
    const slug = params.slug as string
    const category = categoriesData[slug]

    if (!category) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Category not found</h1>
                    <Link href="/explore">
                        <Button>Back to Explore</Button>
                    </Link>
                </div>
            </div>
        )
    }

    const products = getProductsByCategory(slug)
    const displayProducts = products.length > 0 ? products : getAllProducts().slice(0, 12)

    return (
        <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950">
            {/* Hero Section */}
            <section className={`relative py-20 bg-gradient-to-r ${category.gradient}`}>
                <div className="absolute inset-0 bg-black/30" />
                <div className="container mx-auto px-4 relative z-10">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-white/80 text-sm mb-6">
                        <Link href="/" className="hover:text-white">Home</Link>
                        <span>/</span>
                        <Link href="/explore" className="hover:text-white">Explore</Link>
                        <span>/</span>
                        <span className="text-white font-medium">{category.name}</span>
                    </nav>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-6xl">{category.icon}</span>
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                                    {category.name}
                                </h1>
                                <p className="text-xl text-white/80">{category.nameHindi}</p>
                            </div>
                        </div>
                        <p className="text-lg text-white/90 leading-relaxed">
                            {category.description}
                        </p>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex gap-8 mt-8"
                    >
                        <div className="text-center">
                            <p className="text-3xl font-bold text-white">{category.stats.products.toLocaleString()}+</p>
                            <p className="text-white/70 text-sm">Products</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold text-white">{category.stats.artisans.toLocaleString()}+</p>
                            <p className="text-white/70 text-sm">Artisans</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold text-white">{category.stats.states}</p>
                            <p className="text-white/70 text-sm">States</p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Filter Bar */}
            <section className="sticky top-16 z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button variant="outline" size="sm" className="gap-2">
                                <Filter className="w-4 h-4" />
                                Filters
                            </Button>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                Showing {displayProducts.length} products
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                                <Grid3X3 className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                                <List className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {displayProducts.map((item, index) => (
                            <motion.div
                                key={`${item.stateId}-${item.product.id}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                {/* Product Image */}
                                <div className="relative aspect-square overflow-hidden">
                                    <img
                                        src={item.product.image}
                                        alt={item.product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                    {/* Discount Badge */}
                                    {item.product.originalPrice > item.product.price && (
                                        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                            {Math.round((1 - item.product.price / item.product.originalPrice) * 100)}% OFF
                                        </span>
                                    )}

                                    {/* Wishlist Button */}
                                    <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 dark:bg-gray-800/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
                                        <Heart className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                                    </button>

                                    {/* Quick Add */}
                                    <button className="absolute bottom-3 left-3 right-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-medium py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 hover:bg-orange-500 hover:text-white">
                                        <ShoppingCart className="w-4 h-4" />
                                        Add to Cart
                                    </button>
                                </div>

                                {/* Product Info */}
                                <div className="p-4">
                                    <Link href={`/states/${item.stateId}`}>
                                        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-orange-600 transition-colors line-clamp-1">
                                            {item.product.name}
                                        </h3>
                                    </Link>

                                    <div className="flex items-center gap-1 mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        <MapPin className="w-3 h-3" />
                                        <span>{item.stateName}</span>
                                    </div>

                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        by {item.product.artisan}
                                    </p>

                                    <div className="flex items-center gap-1 mt-2">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm font-medium">{item.product.rating}</span>
                                        <span className="text-sm text-gray-400">({item.product.reviews})</span>
                                    </div>

                                    <div className="flex items-center gap-2 mt-3">
                                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                                            ₹{item.product.price.toLocaleString()}
                                        </span>
                                        {item.product.originalPrice > item.product.price && (
                                            <span className="text-sm text-gray-400 line-through">
                                                ₹{item.product.originalPrice.toLocaleString()}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Load More */}
                    <div className="text-center mt-12">
                        <Button size="lg" variant="outline" className="px-8">
                            Load More Products
                        </Button>
                    </div>
                </div>
            </section>

            {/* Related Categories */}
            <section className="py-12 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold mb-6">Explore Other Categories</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {Object.values(categoriesData)
                            .filter(cat => cat.id !== slug)
                            .map(cat => (
                                <Link key={cat.id} href={`/categories/${cat.id}`}>
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className={`p-4 rounded-xl bg-gradient-to-r ${cat.gradient} text-white text-center cursor-pointer`}
                                    >
                                        <span className="text-3xl">{cat.icon}</span>
                                        <p className="text-sm font-medium mt-2">{cat.name.split(" ")[0]}</p>
                                    </motion.div>
                                </Link>
                            ))}
                    </div>
                </div>
            </section>
        </main>
    )
}
