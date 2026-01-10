"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Star, ShoppingCart, Heart, MapPin, Calendar, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { festivalsData } from "@/lib/festivals-data"
import { useCart } from "@/lib/cart-context"
import { useNotifications } from "@/lib/notification-context"

// Festival-specific products data
const festivalProducts: Record<string, Array<{
    id: string
    name: string
    price: number
    originalPrice: number
    image: string
    artisan: string
    rating: number
    reviews: number
    description: string
}>> = {
    diwali: [
        { id: "diwali-1", name: "Handcrafted Brass Diya Set (12 pcs)", price: 1299, originalPrice: 1599, image: "/images/cultural/rajasthan.jpg", artisan: "Moradabad Craftsmen", rating: 4.9, reviews: 456, description: "Traditional brass diyas for Diwali decoration" },
        { id: "diwali-2", name: "Decorative Rangoli Stencils Pack", price: 499, originalPrice: 699, image: "/images/cultural/maharashtra.jpg", artisan: "Pune Artisans", rating: 4.7, reviews: 234, description: "Reusable rangoli stencils with traditional patterns" },
        { id: "diwali-3", name: "Premium Toran Door Hanging", price: 899, originalPrice: 1199, image: "/images/cultural/gujarat.jpg", artisan: "Kutch Artisans", rating: 4.8, reviews: 178, description: "Handwoven toran with mirror work" },
        { id: "diwali-4", name: "Lac Bangles Set (24 pcs)", price: 599, originalPrice: 799, image: "/images/cultural/rajasthan.jpg", artisan: "Jaipur Women Artisans", rating: 4.6, reviews: 312, description: "Traditional lac bangles in festive colors" },
        { id: "diwali-5", name: "Silk Gift Box Set", price: 1499, originalPrice: 1899, image: "/images/cultural/karnataka.jpg", artisan: "Mysore Weavers", rating: 4.9, reviews: 89, description: "Premium silk wrapped gift boxes" },
        { id: "diwali-6", name: "Clay Lakshmi-Ganesha Pair", price: 799, originalPrice: 999, image: "/images/cultural/tamil-nadu.jpg", artisan: "Kumbakonam Potters", rating: 4.8, reviews: 267, description: "Handpainted clay idols for worship" },
    ],
    holi: [
        { id: "holi-1", name: "Organic Herbal Gulal (5 colors)", price: 399, originalPrice: 499, image: "/images/cultural/gujarat.jpg", artisan: "Natural Dye Artisans", rating: 4.8, reviews: 567, description: "Safe organic colors from flower extracts" },
        { id: "holi-2", name: "Traditional Brass Pichkari", price: 649, originalPrice: 849, image: "/images/cultural/uttar-pradesh.jpg", artisan: "Aligarh Metalwork", rating: 4.7, reviews: 234, description: "Handcrafted brass water gun" },
        { id: "holi-3", name: "Festive Kurta Set (Men)", price: 1299, originalPrice: 1699, image: "/images/cultural/rajasthan.jpg", artisan: "Jaipur Tailors", rating: 4.9, reviews: 189, description: "White cotton kurta perfect for Holi" },
        { id: "holi-4", name: "Gujiya Mold Set", price: 299, originalPrice: 399, image: "/images/cultural/uttar-pradesh.jpg", artisan: "Agra Craftsmen", rating: 4.5, reviews: 345, description: "Traditional sweet molds" },
        { id: "holi-5", name: "Ethnic Women's Suit", price: 1599, originalPrice: 2099, image: "/images/cultural/punjab.jpg", artisan: "Ludhiana Weavers", rating: 4.8, reviews: 156, description: "Colorful festive suit for women" },
    ],
    "durga-puja": [
        { id: "durga-1", name: "Miniature Durga Idol", price: 2499, originalPrice: 2999, image: "/images/cultural/west-bengal.jpg", artisan: "Kumartuli Artisans", rating: 4.9, reviews: 234, description: "Handcrafted clay Durga idol" },
        { id: "durga-2", name: "Dokra Dhak Drum Replica", price: 1899, originalPrice: 2399, image: "/images/cultural/west-bengal.jpg", artisan: "Bengal Metalworkers", rating: 4.8, reviews: 89, description: "Traditional metal dhak decoration" },
        { id: "durga-3", name: "Kantha Stitch Saree", price: 3499, originalPrice: 4299, image: "/images/cultural/west-bengal.jpg", artisan: "Bolpur Artisans", rating: 4.9, reviews: 167, description: "Hand-stitched kantha work saree" },
        { id: "durga-4", name: "Shola Pith Decoration", price: 599, originalPrice: 799, image: "/images/cultural/west-bengal.jpg", artisan: "Murshidabad Artists", rating: 4.7, reviews: 345, description: "Traditional Bengali craft decoration" },
    ],
    pongal: [
        { id: "pongal-1", name: "Bronze Pongal Pot", price: 1299, originalPrice: 1599, image: "/images/cultural/tamil-nadu.jpg", artisan: "Swamimalai Craftsmen", rating: 4.9, reviews: 234, description: "Traditional bronze cooking pot" },
        { id: "pongal-2", name: "Kolam Art Stencils", price: 399, originalPrice: 549, image: "/images/cultural/tamil-nadu.jpg", artisan: "Chennai Artists", rating: 4.6, reviews: 312, description: "Traditional rangoli patterns" },
        { id: "pongal-3", name: "Kanchipuram Silk Saree", price: 8999, originalPrice: 11999, image: "/images/cultural/tamil-nadu.jpg", artisan: "Kanchi Weavers", rating: 5.0, reviews: 456, description: "Pure silk festive saree" },
    ],
    onam: [
        { id: "onam-1", name: "Kerala Kasavu Saree", price: 4999, originalPrice: 6499, image: "/images/cultural/kerala.jpg", artisan: "Kuthampully Weavers", rating: 4.9, reviews: 345, description: "Traditional cream and gold saree" },
        { id: "onam-2", name: "Coir Door Mat (Pookalam)", price: 599, originalPrice: 799, image: "/images/cultural/kerala.jpg", artisan: "Alleppey Artisans", rating: 4.7, reviews: 234, description: "Flower design coir mat" },
        { id: "onam-3", name: "Brass Nilavilakku Lamp", price: 1899, originalPrice: 2399, image: "/images/cultural/kerala.jpg", artisan: "Thrissur Metalworks", rating: 4.9, reviews: 189, description: "Traditional Kerala lamp" },
    ],
    navratri: [
        { id: "navratri-1", name: "Chaniya Choli Set", price: 3499, originalPrice: 4499, image: "/images/cultural/gujarat.jpg", artisan: "Kutch Embroiderers", rating: 4.9, reviews: 456, description: "Traditional Garba outfit" },
        { id: "navratri-2", name: "Decorated Dandiya Sticks", price: 499, originalPrice: 699, image: "/images/cultural/gujarat.jpg", artisan: "Rajkot Artisans", rating: 4.7, reviews: 678, description: "Handpainted wooden dandiya" },
        { id: "navratri-3", name: "Bandhani Dupatta", price: 899, originalPrice: 1199, image: "/images/cultural/gujarat.jpg", artisan: "Bhuj Tie-dye Artists", rating: 4.8, reviews: 234, description: "Traditional tie-dye dupatta" },
        { id: "navratri-4", name: "Silver Oxidized Jewelry Set", price: 1299, originalPrice: 1699, image: "/images/cultural/rajasthan.jpg", artisan: "Jaipur Jewelers", rating: 4.8, reviews: 312, description: "Festive jewelry set" },
    ],
    baisakhi: [
        { id: "baisakhi-1", name: "Phulkari Dupatta", price: 1499, originalPrice: 1899, image: "/images/cultural/punjab.jpg", artisan: "Patiala Artisans", rating: 4.9, reviews: 234, description: "Hand-embroidered phulkari" },
        { id: "baisakhi-2", name: "Punjabi Jutti Pair", price: 899, originalPrice: 1199, image: "/images/cultural/punjab.jpg", artisan: "Amritsar Cobblers", rating: 4.8, reviews: 345, description: "Traditional leather juttis" },
        { id: "baisakhi-3", name: "Men's Kurta Pajama Set", price: 1799, originalPrice: 2299, image: "/images/cultural/punjab.jpg", artisan: "Ludhiana Tailors", rating: 4.7, reviews: 189, description: "Festive kurta pajama" },
    ],
    "ganesh-chaturthi": [
        { id: "ganesh-1", name: "Eco-Friendly Ganesha (Medium)", price: 1299, originalPrice: 1599, image: "/images/cultural/maharashtra.jpg", artisan: "Pune Clay Artists", rating: 4.9, reviews: 567, description: "Dissolvable eco-friendly idol" },
        { id: "ganesh-2", name: "Silver Ganesha Idol", price: 4999, originalPrice: 5999, image: "/images/cultural/karnataka.jpg", artisan: "Mysore Silversmiths", rating: 5.0, reviews: 234, description: "Pure silver Ganesha" },
        { id: "ganesh-3", name: "Modak Making Set", price: 399, originalPrice: 549, image: "/images/cultural/maharashtra.jpg", artisan: "Kitchen Craft Co.", rating: 4.6, reviews: 412, description: "Traditional sweet molds" },
        { id: "ganesh-4", name: "Pooja Thali Set", price: 899, originalPrice: 1199, image: "/images/cultural/maharashtra.jpg", artisan: "Brass Workers Guild", rating: 4.8, reviews: 289, description: "Complete brass pooja set" },
    ],
}

export default function FestivalCollectionPage() {
    const params = useParams()
    const slug = params.slug as string
    const festival = festivalsData.find(f => f.id === slug)
    const { addToCart } = useCart()
    const { addNotification } = useNotifications()

    if (!festival) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Festival not found</h1>
                    <Link href="/festivals">
                        <Button>Back to Festivals</Button>
                    </Link>
                </div>
            </div>
        )
    }

    const products = festivalProducts[slug] || []

    const handleAddToCart = (product: typeof products[0]) => {
        addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.image,
            artisan: product.artisan,
            festival: festival.name
        })

        addNotification({
            type: "cart_add",
            title: "Added to Cart",
            message: `${product.name} has been added to your cart`,
            link: "/cart"
        })
    }

    const getGradient = (id: string) => {
        const gradients: Record<string, string> = {
            diwali: "from-amber-500 via-orange-500 to-red-600",
            holi: "from-pink-500 via-purple-500 to-blue-500",
            "durga-puja": "from-red-600 via-orange-500 to-yellow-500",
            pongal: "from-green-500 via-yellow-500 to-orange-500",
            onam: "from-yellow-400 via-green-500 to-teal-500",
            navratri: "from-purple-600 via-pink-500 to-red-500",
            baisakhi: "from-yellow-500 via-orange-500 to-green-500",
            "ganesh-chaturthi": "from-orange-500 via-red-500 to-pink-500",
        }
        return gradients[id] || "from-orange-500 to-red-600"
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950">
            {/* Hero Section */}
            <section className={`relative py-20 bg-gradient-to-r ${getGradient(slug)}`}>
                <div className="absolute inset-0 bg-black/30" />
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `url(${festival.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center"
                    }}
                />
                <div className="container mx-auto px-4 relative z-10">
                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-white/80 text-sm mb-6">
                        <Link href="/" className="hover:text-white">Home</Link>
                        <span>/</span>
                        <Link href="/festivals" className="hover:text-white">Festivals</Link>
                        <span>/</span>
                        <span className="text-white font-medium">{festival.name}</span>
                    </nav>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-3xl"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                {festival.month}
                            </span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                            {festival.name} Collection
                        </h1>
                        <p className="text-xl text-white/90 mb-2">{festival.nameHindi}</p>
                        <p className="text-lg text-white/80 leading-relaxed mb-6">
                            {festival.description}
                        </p>

                        {/* Stats */}
                        <div className="flex flex-wrap gap-6">
                            <div className="text-center">
                                <p className="text-3xl font-bold text-white">{products.length}</p>
                                <p className="text-white/70 text-sm">Products</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-white">{festival.crafts.length}</p>
                                <p className="text-white/70 text-sm">Craft Types</p>
                            </div>
                            <div className="text-center">
                                <p className="text-3xl font-bold text-white">{festival.states.length}</p>
                                <p className="text-white/70 text-sm">States</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Shop {festival.name} Specials
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            {products.length} products available
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                {/* Product Image */}
                                <div className="relative aspect-square overflow-hidden">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                    {/* Discount Badge */}
                                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                        {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                                    </span>

                                    {/* Festival Badge */}
                                    <span className="absolute top-3 right-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                                        <Sparkles className="w-3 h-3" />
                                        {festival.name}
                                    </span>

                                    {/* Quick Add */}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleAddToCart(product)}
                                        className="absolute bottom-3 left-3 right-3 bg-orange-500 hover:bg-orange-600 text-white font-medium py-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center gap-2 shadow-lg"
                                    >
                                        <ShoppingCart className="w-4 h-4" />
                                        Add to Cart
                                    </motion.button>
                                </div>

                                {/* Product Info */}
                                <div className="p-4">
                                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 min-h-[3rem]">
                                        {product.name}
                                    </h3>

                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        by {product.artisan}
                                    </p>

                                    <div className="flex items-center gap-1 mt-2">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm font-medium">{product.rating}</span>
                                        <span className="text-sm text-gray-400">({product.reviews})</span>
                                    </div>

                                    <div className="flex items-center gap-2 mt-3">
                                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                                            ₹{product.price.toLocaleString()}
                                        </span>
                                        <span className="text-sm text-gray-400 line-through">
                                            ₹{product.originalPrice.toLocaleString()}
                                        </span>
                                    </div>

                                    {/* Desktop Add to Cart */}
                                    <Button
                                        onClick={() => handleAddToCart(product)}
                                        className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white lg:hidden"
                                    >
                                        <ShoppingCart className="w-4 h-4 mr-2" />
                                        Add to Cart
                                    </Button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {products.length === 0 && (
                        <div className="text-center py-12">
                            <Sparkles className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">Coming Soon</h3>
                            <p className="text-gray-500">Products for this festival are being added.</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Related Crafts */}
            <section className="py-12 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold mb-6">Festival Crafts</h2>
                    <div className="flex flex-wrap gap-3">
                        {festival.crafts.map((craft, i) => (
                            <span
                                key={i}
                                className="px-4 py-2 bg-white dark:bg-gray-800 rounded-full text-gray-700 dark:text-gray-300 shadow-sm border border-gray-200 dark:border-gray-700"
                            >
                                {craft}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Other Festivals */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold mb-6">Explore Other Festivals</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {festivalsData
                            .filter(f => f.id !== slug)
                            .slice(0, 4)
                            .map(f => (
                                <Link key={f.id} href={`/festivals/${f.id}`}>
                                    <motion.div
                                        whileHover={{ scale: 1.03 }}
                                        className={`p-4 rounded-xl bg-gradient-to-r ${getGradient(f.id)} text-white text-center`}
                                    >
                                        <h3 className="font-semibold">{f.name}</h3>
                                        <p className="text-sm text-white/80">{f.month}</p>
                                    </motion.div>
                                </Link>
                            ))}
                    </div>
                </div>
            </section>
        </main>
    )
}
