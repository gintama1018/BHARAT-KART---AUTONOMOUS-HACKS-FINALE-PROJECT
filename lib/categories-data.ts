import { Product, statesData } from "@/lib/states-data"

export interface Category {
    id: string
    name: string
    nameHindi: string
    description: string
    icon: string
    gradient: string
    image: string
    stats: {
        products: number
        artisans: number
        states: number
    }
}

export const categoriesData: Record<string, Category> = {
    textiles: {
        id: "textiles",
        name: "Textiles & Fabrics",
        nameHindi: "वस्त्र एवं कपड़े",
        description: "Discover India's rich textile heritage - from the finest silks of Kanchipuram to the vibrant Bandhani of Gujarat. Each fabric tells a story of centuries-old traditions passed down through generations.",
        icon: "🧵",
        gradient: "from-purple-600 to-pink-500",
        image: "/images/cultural/gujarat.jpg",
        stats: { products: 2500, artisans: 850, states: 24 }
    },
    pottery: {
        id: "pottery",
        name: "Pottery & Ceramics",
        nameHindi: "मिट्टी के बर्तन",
        description: "From the famous Blue Pottery of Jaipur to the black clay pots of Manipur, explore the earthen artistry that has shaped Indian civilization for millennia.",
        icon: "🏺",
        gradient: "from-amber-600 to-orange-500",
        image: "/images/cultural/rajasthan.jpg",
        stats: { products: 1200, artisans: 420, states: 18 }
    },
    jewelry: {
        id: "jewelry",
        name: "Jewelry & Accessories",
        nameHindi: "आभूषण",
        description: "Adorn yourself with the finest handcrafted jewelry - from the intricate Kundan work of Rajasthan to the tribal silver of the Northeast. Each piece is a wearable work of art.",
        icon: "💍",
        gradient: "from-yellow-500 to-amber-600",
        image: "/images/cultural/rajasthan.jpg",
        stats: { products: 1800, artisans: 560, states: 20 }
    },
    crafts: {
        id: "crafts",
        name: "Wood & Metal Crafts",
        nameHindi: "लकड़ी और धातु शिल्प",
        description: "Explore the masterful woodwork of Kashmir and the intricate Dhokra metal casting of tribal India. These crafts represent the pinnacle of Indian artisanal skill.",
        icon: "🪵",
        gradient: "from-emerald-600 to-teal-500",
        image: "/images/cultural/jharkhand.jpg",
        stats: { products: 1500, artisans: 480, states: 22 }
    },
    art: {
        id: "art",
        name: "Paintings & Art",
        nameHindi: "चित्रकला",
        description: "From the geometric precision of Warli to the mythological narratives of Pattachitra, discover the diverse painting traditions that make Indian art unique in the world.",
        icon: "🎨",
        gradient: "from-red-500 to-rose-600",
        image: "/images/cultural/maharashtra.jpg",
        stats: { products: 980, artisans: 380, states: 16 }
    },
    home: {
        id: "home",
        name: "Home & Decor",
        nameHindi: "घर की सजावट",
        description: "Transform your living spaces with authentic Indian decor - from handwoven rugs to carved furniture, bring the warmth of Indian craftsmanship into your home.",
        icon: "🏠",
        gradient: "from-blue-600 to-indigo-500",
        image: "/images/cultural/karnataka.jpg",
        stats: { products: 2100, artisans: 620, states: 25 }
    }
}

// Function to get products by category
export function getProductsByCategory(categoryId: string): { product: Product; stateName: string; stateId: string }[] {
    const categoryKeywords: Record<string, string[]> = {
        textiles: ["silk", "saree", "cotton", "handloom", "textile", "fabric", "dupatta", "shawl", "phulkari", "ikat", "bandhani", "chikankari", "stole", "kurta", "mekhela", "puan"],
        pottery: ["pottery", "ceramic", "terracotta", "clay", "pot", "vase", "longpi"],
        jewelry: ["jewelry", "jewellery", "ornament", "necklace", "earring", "bangle", "pearl", "filigree"],
        crafts: ["wood", "metal", "brass", "bronze", "dhokra", "dokra", "carving", "carved", "bamboo", "cane", "iron", "lamp", "figurine", "toys", "mask"],
        art: ["painting", "art", "pattachitra", "madhubani", "warli", "gond", "tanjore", "thangka", "aipan", "kalamkari"],
        home: ["carpet", "rug", "basket", "decor", "furniture", "table", "chair", "bowl", "set", "container", "doormat", "rumal"]
    }

    const keywords = categoryKeywords[categoryId] || []
    const results: { product: Product; stateName: string; stateId: string }[] = []

    Object.values(statesData).forEach(state => {
        state.featuredProducts.forEach(product => {
            const productNameLower = product.name.toLowerCase()
            if (keywords.some(keyword => productNameLower.includes(keyword))) {
                results.push({
                    product,
                    stateName: state.name,
                    stateId: state.id
                })
            }
        })
    })

    return results
}

// Get all products (for displaying when no specific match)
export function getAllProducts(): { product: Product; stateName: string; stateId: string }[] {
    const results: { product: Product; stateName: string; stateId: string }[] = []

    Object.values(statesData).forEach(state => {
        state.featuredProducts.forEach(product => {
            results.push({
                product,
                stateName: state.name,
                stateId: state.id
            })
        })
    })

    return results
}
