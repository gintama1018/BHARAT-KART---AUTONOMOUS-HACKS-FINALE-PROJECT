"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { Star, MapPin, Clock, Award, Heart, ShoppingCart, Share2, ArrowLeft, Verified, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { artisansData } from "@/lib/artisans-data"
import { useCart } from "@/lib/cart-context"
import { useNotifications } from "@/lib/notification-context"

// Generate products for each artisan based on their craft
const generateProductsForArtisan = (artisan: typeof artisansData[0]) => {
    const productTemplates: Record<string, Array<{ name: string, price: number, category: string, image: string }>> = {
        "Kathputli Puppets": [
            { name: "Traditional Kathputli Set", price: 2500, category: "Puppets", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },
            { name: "Royal King Puppet", price: 1200, category: "Puppets", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },
            { name: "Dancing Girl Puppet", price: 1100, category: "Puppets", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },
            { name: "Musician Puppet Pair", price: 2000, category: "Puppets", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" }
        ],
        "Blue Pottery": [
            { name: "Blue Pottery Vase Set", price: 3500, category: "Home Decor", image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500" },
            { name: "Decorative Wall Plates", price: 1800, category: "Home Decor", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=500" },
            { name: "Tea Cup & Saucer Set", price: 2200, category: "Kitchenware", image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=500" },
            { name: "Blue Pottery Planter", price: 1500, category: "Garden", image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500" }
        ],
        "Coir Weaving": [
            { name: "Traditional Coir Mat", price: 1500, category: "Home Decor", image: "https://images.unsplash.com/photo-1600166898405-da9535204843?w=500" },
            { name: "Coir Door Mat Set", price: 800, category: "Home Decor", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },
            { name: "Handwoven Rope Basket", price: 650, category: "Storage", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500" },
            { name: "Coir Wall Hanging", price: 1200, category: "Decor", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" }
        ],
        "Kathakali Masks": [
            { name: "Kathakali Dance Mask", price: 8500, category: "Art", image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500" },
            { name: "Mini Mask Collection", price: 3500, category: "Collectibles", image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500" },
            { name: "Wall Mount Mask", price: 5500, category: "Home Decor", image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500" }
        ],
        "Block Printing": [
            { name: "Block Print Saree", price: 4500, category: "Sarees", image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500" },
            { name: "Cotton Dupatta", price: 1200, category: "Accessories", image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500" },
            { name: "Table Runner Set", price: 850, category: "Home Decor", image: "https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=500" },
            { name: "Block Print Kurta", price: 2200, category: "Apparel", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500" },
            { name: "Bedsheet Set", price: 3500, category: "Bedding", image: "https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=500" }
        ],
        "Phulkari Embroidery": [
            { name: "Phulkari Dupatta", price: 3500, category: "Accessories", image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500" },
            { name: "Embroidered Cushion Set", price: 2200, category: "Home Decor", image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?w=500" },
            { name: "Phulkari Suit Material", price: 4500, category: "Apparel", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500" },
            { name: "Framed Phulkari Art", price: 1800, category: "Art", image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500" }
        ],
        "Bronze Casting": [
            { name: "Nataraja Bronze Idol", price: 12500, category: "Art", image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500" },
            { name: "Lord Ganesha Figurine", price: 5500, category: "Religious", image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500" },
            { name: "Bronze Lamp Pair", price: 4200, category: "Home Decor", image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500" },
            { name: "Decorative Bell", price: 2800, category: "Decor", image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=500" }
        ],
        "Kantha Embroidery": [
            { name: "Kantha Silk Stole", price: 2800, category: "Accessories", image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500" },
            { name: "Kantha Quilt", price: 6500, category: "Bedding", image: "https://images.unsplash.com/photo-1606722590583-6951b5ea92ad?w=500" },
            { name: "Embroidered Jacket", price: 4500, category: "Apparel", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500" },
            { name: "Kantha Clutch Bag", price: 1200, category: "Accessories", image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500" }
        ]
    }

    const templates = productTemplates[artisan.craft] || [
        { name: `${artisan.craft} Artwork`, price: 2500, category: "Art", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" },
        { name: `Traditional ${artisan.craft}`, price: 3500, category: "Crafts", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500" }
    ]

    return templates.map((t, i) => ({
        id: `${artisan.id}-p${i}`,
        name: t.name,
        price: t.price,
        originalPrice: Math.random() > 0.5 ? Math.round(t.price * 1.25) : undefined,
        image: t.image,
        category: t.category,
        rating: 4.5 + Math.random() * 0.5,
        reviews: Math.floor(50 + Math.random() * 200),
        inStock: true,
        artisan: artisan.name,
        state: artisan.state
    }))
}

export default function ArtisanDetailPage() {
    const params = useParams()
    const slug = params.slug as string
    const artisan = artisansData.find(a => a.id === slug)
    const [activeTab, setActiveTab] = useState<"products" | "story" | "reviews">("products")
    const { addToCart } = useCart()
    const { addNotification } = useNotifications()

    const products = artisan ? generateProductsForArtisan(artisan) : []

    if (!artisan) {
        return (
            <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950 py-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-2xl font-bold mb-4">Artisan not found</h1>
                    <Link href="/artisans">
                        <Button>View All Artisans</Button>
                    </Link>
                </div>
            </main>
        )
    }

    const handleAddToCart = (product: typeof products[0]) => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            artisan: artisan.name,
            state: artisan.state
        })
        addNotification({
            type: "cart_add",
            title: "Added to Cart",
            message: `${product.name} has been added to your cart`
        })
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950">
            {/* Hero Section */}
            <div className="relative h-64 md:h-80 bg-gradient-to-r from-orange-500 to-red-500">
                <div className="absolute inset-0 bg-black/30" />
                <div className="container mx-auto px-4 relative z-10 h-full flex items-end pb-8">
                    <Link href="/artisans" className="absolute top-6 left-4 text-white flex items-center gap-2 hover:underline">
                        <ArrowLeft className="w-5 h-5" />
                        Back to Artisans
                    </Link>
                </div>
            </div>

            {/* Artisan Info Card */}
            <div className="container mx-auto px-4 -mt-20 relative z-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-8"
                >
                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Avatar */}
                        <div className="shrink-0">
                            <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white text-5xl font-bold mx-auto md:mx-0">
                                {artisan.name.charAt(0)}
                            </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                                    {artisan.name}
                                </h1>
                                <Verified className="w-6 h-6 text-blue-500" />
                            </div>
                            <p className="text-lg text-orange-600 font-medium mb-2">{artisan.craft}</p>
                            <div className="flex items-center justify-center md:justify-start gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                                <span className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    {artisan.state}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {artisan.experience}
                                </span>
                                <span className="flex items-center gap-1">
                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                    {artisan.rating}
                                </span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
                                {artisan.story}
                            </p>

                            {/* Awards */}
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-4">
                                {artisan.awards.map((award, i) => (
                                    <span
                                        key={i}
                                        className="flex items-center gap-1 text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-3 py-1 rounded-full"
                                    >
                                        <Award className="w-3 h-3" />
                                        {award}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-row md:flex-col gap-2 justify-center">
                            <Button variant="outline" size="sm" className="gap-2">
                                <Heart className="w-4 h-4" />
                                Follow
                            </Button>
                            <Button variant="outline" size="sm" className="gap-2">
                                <Share2 className="w-4 h-4" />
                                Share
                            </Button>
                        </div>
                    </div>

                    {/* Techniques */}
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Techniques</h3>
                        <div className="flex flex-wrap gap-2">
                            {artisan.techniques.map((tech, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Tabs & Products */}
            <div className="container mx-auto px-4 py-8">
                {/* Tabs */}
                <div className="flex gap-4 mb-8 border-b border-gray-200 dark:border-gray-700">
                    {[
                        { id: "products", label: "Products", icon: Package },
                        { id: "story", label: "Story", icon: Award },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as typeof activeTab)}
                            className={`flex items-center gap-2 pb-4 px-2 border-b-2 transition-colors ${activeTab === tab.id
                                ? "border-orange-500 text-orange-600"
                                : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                                }`}
                        >
                            <tab.icon className="w-4 h-4" />
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Products Tab */}
                {activeTab === "products" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                Products by {artisan.name}
                            </h2>
                            <span className="text-sm text-gray-500">{products.length} items</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {products.map((product, index) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden group"
                                >
                                    <div className="relative aspect-square overflow-hidden">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        {product.originalPrice && (
                                            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                                {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                                            </span>
                                        )}
                                        <button className="absolute top-3 right-3 w-8 h-8 bg-white/80 dark:bg-gray-800/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Heart className="w-4 h-4 text-gray-600" />
                                        </button>
                                    </div>
                                    <div className="p-4">
                                        <span className="text-xs text-orange-600 font-medium">{product.category}</span>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mt-1 line-clamp-2">
                                            {product.name}
                                        </h3>
                                        <div className="flex items-center gap-1 mt-2">
                                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                {product.rating.toFixed(1)} ({product.reviews})
                                            </span>
                                        </div>
                                        <div className="flex items-center justify-between mt-3">
                                            <div>
                                                <span className="text-lg font-bold text-gray-900 dark:text-white">
                                                    ₹{product.price.toLocaleString()}
                                                </span>
                                                {product.originalPrice && (
                                                    <span className="text-sm text-gray-400 line-through ml-2">
                                                        ₹{product.originalPrice.toLocaleString()}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        <Button
                                            onClick={() => handleAddToCart(product)}
                                            className="w-full mt-3 bg-orange-500 hover:bg-orange-600 gap-2"
                                            size="sm"
                                        >
                                            <ShoppingCart className="w-4 h-4" />
                                            Add to Cart
                                        </Button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Story Tab */}
                {activeTab === "story" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="max-w-3xl"
                    >
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                The Story of {artisan.name}
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                                {artisan.story}
                            </p>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                Craft: {artisan.craft}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                                With {artisan.experience} of dedicated practice, {artisan.name} has mastered the traditional art of {artisan.craft} from {artisan.state}.
                                Each piece is handcrafted with meticulous attention to detail, preserving cultural heritage while meeting contemporary tastes.
                            </p>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                                Recognition & Awards
                            </h3>
                            <ul className="space-y-2">
                                {artisan.awards.map((award, i) => (
                                    <li key={i} className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                        <Award className="w-5 h-5 text-amber-500" />
                                        {award}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                )}
            </div>
        </main>
    )
}
