export interface Product {
    id: number
    name: string
    price: number
    originalPrice: number
    image: string
    artisan: string
    rating: number
    reviews: number
}

export interface Artisan {
    id: number
    name: string
    craft: string
    experience: string
    location: string
    image: string
    story: string
    rating: number
    products: number
}

export interface StateData {
    id: string
    name: string
    nameHindi: string
    tagline: string
    region: string
    description: string
    culturalStory: string
    colors: {
        primary: string
        secondary: string
        accent: string
    }
    gradient: string
    backgroundImage: string
    statistics: {
        artisans: number
        products: number
        heritageSites: number
        festivals: number
    }
    specialties: string[]
    featuredProducts: Product[]
    featuredArtisans: Artisan[]
}

export const statesData: Record<string, StateData> = {
    rajasthan: {
        id: "rajasthan",
        name: "Rajasthan",
        nameHindi: "राजस्थान",
        tagline: "Land of Kings and Crafts",
        region: "North",
        description:
            "Royal desert palace heritage with master craftsmen creating timeless masterpieces.",
        culturalStory:
            "Rajasthan's craft tradition spans over 1000 years, rooted in royal patronage and desert ingenuity. From the blue pottery of Jaipur to the intricate puppets of Udaipur, every craft tells a story of resilience and artistry.",
        colors: {
            primary: "#DC143C",
            secondary: "#F4A460",
            accent: "#FFD700",
        },
        gradient: "from-red-600 to-orange-500",
        backgroundImage: "/images/cultural/rajasthan.jpg",
        statistics: {
            artisans: 150,
            products: 1200,
            heritageSites: 35,
            festivals: 12,
        },
        specialties: [
            "Blue Pottery",
            "Kathputli Puppets",
            "Block Print Textiles",
            "Kundan Jewelry",
            "Miniature Paintings",
            "Leather Crafts",
        ],
        featuredProducts: [
            {
                id: 1,
                name: "Royal Kathputli Puppet",
                price: 1250,
                originalPrice: 1800,
                image: "/rajasthani-kathputli-puppet-colorful-traditional.jpg",
                artisan: "Ramesh Kumar",
                rating: 4.9,
                reviews: 147,
            },
            {
                id: 2,
                name: "Jaipur Blue Pottery Vase",
                price: 850,
                originalPrice: 1200,
                image: "/indian-artisan-crafting-pottery.jpg",
                artisan: "Meera Devi",
                rating: 4.8,
                reviews: 89,
            },
            {
                id: 3,
                name: "Block Print Bedsheet Set",
                price: 2200,
                originalPrice: 2800,
                image: "/images/cultural/rajasthan.jpg",
                artisan: "Suresh Chand",
                rating: 4.9,
                reviews: 203,
            },
        ],
        featuredArtisans: [
            {
                id: 1,
                name: "Ramesh Kumar",
                craft: "Kathputli Puppets",
                experience: "25 years",
                location: "Udaipur",
                image: "/rajasthani-kathputli-puppet-colorful-traditional.jpg",
                story: "Third generation puppet maker preserving ancient traditions",
                rating: 4.9,
                products: 45,
            },
            {
                id: 2,
                name: "Meera Devi",
                craft: "Blue Pottery",
                experience: "18 years",
                location: "Jaipur",
                image: "/indian-artisan-crafting-pottery.jpg",
                story: "Master potter creating contemporary designs with traditional techniques",
                rating: 4.8,
                products: 32,
            },
        ],
    },
    kerala: {
        id: "kerala",
        name: "Kerala",
        nameHindi: "केरल",
        tagline: "God's Own Country",
        region: "South",
        description: "Tropical backwaters paradise with coconut crafts and spice heritage.",
        culturalStory: "Kerala's crafts are deeply intertwined with its natural abundance. From coir spun from coconut husks to intricate Kathakali masks used in classical dance, the state's artistry reflects its lush landscapes and vibrant performing arts traditions.",
        colors: {
            primary: "#228B22",
            secondary: "#4682B4",
            accent: "#8B4513",
        },
        gradient: "from-green-600 to-teal-500",
        backgroundImage: "/images/cultural/kerala.jpg",
        statistics: {
            artisans: 120,
            products: 890,
            heritageSites: 28,
            festivals: 15,
        },
        specialties: ["Coir Products", "Spice Blends", "Ayurvedic Items", "Kathakali Masks", "Coconut Shell Crafts"],
        featuredProducts: [
            { id: 1, name: "Handwoven Coir Doormat", price: 450, originalPrice: 600, image: "/images/cultural/kerala.jpg", artisan: "Lakshmi Amma", rating: 4.7, reviews: 120 },
            { id: 2, name: "Kathakali Mask (Wood)", price: 3500, originalPrice: 4200, image: "/images/cultural/kerala.jpg", artisan: "Gopalan Nair", rating: 4.9, reviews: 56 },
        ],
        featuredArtisans: [
            { id: 1, name: "Lakshmi Amma", craft: "Coir Weaving", experience: "40 years", location: "Alleppey", image: "/images/cultural/kerala.jpg", story: "Transforming coconut husk into durable and beautiful artifacts.", rating: 4.8, products: 25 },
        ],
    },
    gujarat: {
        id: "gujarat",
        name: "Gujarat",
        nameHindi: "गुजरात",
        tagline: "Vibrant Gujarat",
        region: "West",
        description: "Festival of colors and mirrors with vibrant textile traditions.",
        culturalStory: "Gujarat is a kaleidoscope of colors and textures. Its crafts are famous for their mirror work, intricate embroidery, and vibrant bandhani tie-dye. The state's artisans masterfully blend geometry and color to create stunning textiles and handicrafts.",
        colors: { primary: "#FFD700", secondary: "#FF1493", accent: "#C0C0C0" },
        gradient: "from-yellow-500 to-pink-500",
        backgroundImage: "/images/cultural/gujarat.jpg",
        statistics: { artisans: 200, products: 1500, heritageSites: 40, festivals: 20 },
        specialties: ["Bandhani Textiles", "Mirror Work", "Patola Silk", "Kutch Embroidery", "Beadwork"],
        featuredProducts: [
            { id: 1, name: "Kutch Bandhani Saree", price: 4500, originalPrice: 5500, image: "/images/cultural/gujarat.jpg", artisan: "Fatima Khatun", rating: 4.9, reviews: 234 },
            { id: 2, name: "Mirror Work Wall Hanging", price: 1200, originalPrice: 1500, image: "/images/cultural/gujarat.jpg", artisan: "Raju Jat", rating: 4.7, reviews: 89 },
            { id: 3, name: "Patola Silk Dupatta", price: 8500, originalPrice: 10000, image: "/images/cultural/gujarat.jpg", artisan: "Salvi Family", rating: 4.9, reviews: 156 },
        ],
        featuredArtisans: [
            { id: 1, name: "Fatima Khatun", craft: "Bandhani Tie-Dye", experience: "30 years", location: "Kutch", image: "/images/cultural/gujarat.jpg", story: "Master of traditional tie-dye creating vibrant patterns", rating: 4.9, products: 67 },
        ]
    },
    "tamil-nadu": {
        id: "tamil-nadu",
        name: "Tamil Nadu",
        nameHindi: "तमिल नाडु",
        tagline: "Tamil Heritage",
        region: "South",
        description: "Temple architecture and classical arts with bronze craftsmanship.",
        culturalStory: "Home to thousands of temples, Tamil Nadu's crafts are deeply rooted in spirituality. The state is renowned for its exquisite Chola bronzes, heavy Kanchipuram silk sarees, and intricate Tanjore paintings that adorn prayer rooms across the world.",
        colors: { primary: "#CD7F32", secondary: "#FFD700", accent: "#DC143C" },
        gradient: "from-amber-600 to-red-500",
        backgroundImage: "/images/cultural/tamil-nadu.jpg",
        statistics: { artisans: 180, products: 1100, heritageSites: 50, festivals: 18 },
        specialties: ["Bronze Idols", "Kanchipuram Silk", "Tanjore Paintings", "Stone Sculptures", "Temple Jewelry"],
        featuredProducts: [
            { id: 1, name: "Chola Bronze Nataraja", price: 15000, originalPrice: 18000, image: "/images/cultural/tamil-nadu.jpg", artisan: "Sthapathi Raj", rating: 5.0, reviews: 89 },
            { id: 2, name: "Kanchipuram Silk Saree", price: 25000, originalPrice: 30000, image: "/images/cultural/tamil-nadu.jpg", artisan: "Kanchi Weavers", rating: 4.9, reviews: 445 },
            { id: 3, name: "Tanjore Painting (Krishna)", price: 8500, originalPrice: 10000, image: "/images/cultural/tamil-nadu.jpg", artisan: "Lakshmi Arts", rating: 4.8, reviews: 178 },
        ],
        featuredArtisans: [
            { id: 1, name: "Sthapathi Raj", craft: "Bronze Casting", experience: "45 years", location: "Swamimalai", image: "/images/cultural/tamil-nadu.jpg", story: "Fifth generation bronze sculptor using lost-wax technique", rating: 5.0, products: 120 },
        ]
    },
    "west-bengal": {
        id: "west-bengal",
        name: "West Bengal",
        nameHindi: "पश्चिम बंगाल",
        tagline: "Cultural Renaissance",
        region: "East",
        description: "Intellectual heritage and Durga Puja traditions with rich cultural arts.",
        culturalStory: "West Bengal is the cultural capital of India, known for its literary heritage and artistic soul. From the delicate Kantha embroidery to the magnificent terracotta temples and the world-famous Durga Puja idols, Bengal's art is a celebration of life and divinity.",
        colors: { primary: "#DC143C", secondary: "#000080", accent: "#FFD700" },
        gradient: "from-purple-600 to-blue-500",
        backgroundImage: "/images/cultural/west-bengal.jpg",
        statistics: { artisans: 140, products: 950, heritageSites: 30, festivals: 14 },
        specialties: ["Kantha Embroidery", "Terracotta Art", "Dokra Metal Work", "Baluchari Sarees", "Shola Pith Craft"],
        featuredProducts: [
            { id: 1, name: "Kantha Embroidered Stole", price: 1800, originalPrice: 2200, image: "/images/cultural/west-bengal.jpg", artisan: "Mala Khatun", rating: 4.8, reviews: 312 },
            { id: 2, name: "Dokra Horse Figurine", price: 2500, originalPrice: 3000, image: "/images/cultural/west-bengal.jpg", artisan: "Bikash Karmakar", rating: 4.9, reviews: 98 },
            { id: 3, name: "Baluchari Silk Saree", price: 12000, originalPrice: 15000, image: "/images/cultural/west-bengal.jpg", artisan: "Bishnupur Weavers", rating: 4.9, reviews: 267 },
        ],
        featuredArtisans: [
            { id: 1, name: "Mala Khatun", craft: "Kantha Embroidery", experience: "25 years", location: "Bolpur", image: "/images/cultural/west-bengal.jpg", story: "Creating narrative art through traditional running stitch", rating: 4.8, products: 89 },
        ]
    },
    punjab: {
        id: "punjab",
        name: "Punjab",
        nameHindi: "पंजाब",
        tagline: "Land of Five Rivers",
        region: "North",
        description: "Harvest festival and Sikh heritage with vibrant embroidery traditions.",
        culturalStory: "Punjab's vibrant culture is reflected in its colorful Phulkari embroidery and energetic crafts. The state's artisans are known for their wooden inlay work, leather mojari shoes, and the deep agricultural roots that inspire their folk art.",
        colors: { primary: "#DAA520", secondary: "#FF9933", accent: "#4169E1" },
        gradient: "from-yellow-600 to-orange-500",
        backgroundImage: "/images/cultural/punjab.jpg",
        statistics: { artisans: 90, products: 650, heritageSites: 15, festivals: 10 },
        specialties: ["Phulkari Embroidery", "Juttis", "Wooden Toys", "Punjabi Suits", "Truck Art"],
        featuredProducts: [
            { id: 1, name: "Phulkari Dupatta", price: 2500, originalPrice: 3000, image: "/images/cultural/punjab.jpg", artisan: "Gurpreet Kaur", rating: 4.9, reviews: 456 },
            { id: 2, name: "Punjabi Jutti (Leather)", price: 1800, originalPrice: 2200, image: "/images/cultural/punjab.jpg", artisan: "Arjun Singh", rating: 4.7, reviews: 234 },
            { id: 3, name: "Wooden Paranda Set", price: 450, originalPrice: 600, image: "/images/cultural/punjab.jpg", artisan: "Hoshiarpur Artisans", rating: 4.6, reviews: 123 },
        ],
        featuredArtisans: [
            { id: 1, name: "Gurpreet Kaur", craft: "Phulkari Embroidery", experience: "20 years", location: "Patiala", image: "/images/cultural/punjab.jpg", story: "Preserving the vibrant floral embroidery of Punjab", rating: 4.9, products: 78 },
        ]
    },
    maharashtra: {
        id: "maharashtra",
        name: "Maharashtra",
        nameHindi: "महाराष्ट्र",
        tagline: "Cultural Capital",
        region: "West",
        description: "Maratha heritage and Mumbai spirit with tribal art traditions.",
        culturalStory: "Maharashtra balances urban energy with deep tribal roots. The Warli paintings, created by tribal women using rice paste, are world-renowned for their simple yet profound storytelling. The state also boasts rich textile traditions like the Paithani saree.",
        colors: { primary: "#FF6600", secondary: "#000080", accent: "#FFD700" },
        gradient: "from-orange-600 to-yellow-500",
        backgroundImage: "/images/cultural/maharashtra.jpg",
        statistics: { artisans: 160, products: 1050, heritageSites: 38, festivals: 16 },
        specialties: ["Warli Art", "Paithani Sarees", "Kolhapuri Chappals", "Bidriware", "Dhol Tasha"],
        featuredProducts: [
            { id: 1, name: "Warli Painting (Village Scene)", price: 3500, originalPrice: 4200, image: "/images/cultural/maharashtra.jpg", artisan: "Jivya Soma Mashe", rating: 4.9, reviews: 189 },
            { id: 2, name: "Paithani Silk Saree", price: 35000, originalPrice: 42000, image: "/images/cultural/maharashtra.jpg", artisan: "Yeola Weavers", rating: 5.0, reviews: 312 },
            { id: 3, name: "Kolhapuri Chappal", price: 1500, originalPrice: 1800, image: "/images/cultural/maharashtra.jpg", artisan: "Athani Leather", rating: 4.8, reviews: 567 },
        ],
        featuredArtisans: [
            { id: 1, name: "Jivya Soma Mashe", craft: "Warli Art", experience: "50 years", location: "Thane", image: "/images/cultural/maharashtra.jpg", story: "Legendary Warli artist preserving tribal traditions", rating: 5.0, products: 200 },
        ]
    },
    karnataka: {
        id: "karnataka",
        name: "Karnataka",
        nameHindi: "कर्नाटक",
        tagline: "Silicon Valley meets Heritage",
        region: "South",
        description: "Technology and tradition blend with royal silk and sandalwood heritage.",
        culturalStory: "Karnataka is a land of royal splendor and sandalwood scent. The state is famous for its Mysore silk, intricate wood carvings, and the unique Channapatna toys. Its crafts blend the grandeur of the Mysore palace with the folk traditions of the varied landscape.",
        colors: { primary: "#6A0DAD", secondary: "#8B7355", accent: "#FFD700" },
        gradient: "from-teal-600 to-green-500",
        backgroundImage: "/images/cultural/karnataka.jpg",
        statistics: { artisans: 130, products: 920, heritageSites: 45, festivals: 15 },
        specialties: ["Mysore Silk", "Sandalwood Crafts", "Channapatna Toys", "Ilkal Sarees", "Kasuti Embroidery"],
        featuredProducts: [
            { id: 1, name: "Mysore Silk Saree", price: 18000, originalPrice: 22000, image: "/images/cultural/karnataka.jpg", artisan: "Mysore Weavers", rating: 4.9, reviews: 389 },
            { id: 2, name: "Channapatna Wooden Toys Set", price: 850, originalPrice: 1000, image: "/images/cultural/karnataka.jpg", artisan: "Ramu Achari", rating: 4.8, reviews: 234 },
            { id: 3, name: "Sandalwood Carved Elephant", price: 4500, originalPrice: 5500, image: "/images/cultural/karnataka.jpg", artisan: "Mysore Crafts", rating: 4.9, reviews: 156 },
        ],
        featuredArtisans: [
            { id: 1, name: "Ramu Achari", craft: "Channapatna Toys", experience: "35 years", location: "Channapatna", image: "/images/cultural/karnataka.jpg", story: "Creating eco-friendly lacquer toys for generations", rating: 4.8, products: 150 },
        ]
    },
    "andhra-pradesh": {
        id: "andhra-pradesh",
        name: "Andhra Pradesh",
        nameHindi: "आंध्र प्रदेश",
        tagline: "Kohinoor of India",
        region: "South",
        description: "Pearl city and spicy heritage with Hyderabadi craftsmanship.",
        culturalStory: "Andhra Pradesh shares a rich legacy of Nizami culture and coastal traditions. It is celebrated for its Kalamkari hand-painted fabrics, intricate Kondapalli toys, and the weaving traditions of Pochampally.",
        colors: { primary: "#F8F8FF", secondary: "#FF4500", accent: "#4169E1" },
        gradient: "from-blue-600 to-white",
        backgroundImage: "/images/cultural/andhra-pradesh.jpg",
        statistics: { artisans: 125, products: 875, heritageSites: 20, festivals: 12 },
        specialties: ["Pearl Jewelry", "Kalamkari Paintings", "Pochampally Ikat", "Kondapalli Dolls", "Bidriware"],
        featuredProducts: [
            { id: 1, name: "Kalamkari Cotton Saree", price: 3500, originalPrice: 4200, image: "/images/cultural/andhra-pradesh.jpg", artisan: "Srikalahasti Artisans", rating: 4.8, reviews: 234 },
            { id: 2, name: "Kondapalli Wooden Toys", price: 650, originalPrice: 800, image: "/images/cultural/andhra-pradesh.jpg", artisan: "Krishna Rao", rating: 4.7, reviews: 178 },
            { id: 3, name: "Pochampally Ikat Dupatta", price: 1800, originalPrice: 2200, image: "/images/cultural/andhra-pradesh.jpg", artisan: "Pochampally Weavers", rating: 4.9, reviews: 312 },
        ],
        featuredArtisans: [
            { id: 1, name: "Krishna Rao", craft: "Kondapalli Toys", experience: "28 years", location: "Vijayawada", image: "/images/cultural/andhra-pradesh.jpg", story: "Crafting colorful wooden toys depicting rural life", rating: 4.7, products: 85 },
        ]
    },
    telangana: {
        id: "telangana",
        name: "Telangana",
        nameHindi: "तेलंगाना",
        tagline: "State of Art & Culture",
        region: "South",
        description: "Nizami heritage and modern identity with traditional weaving.",
        culturalStory: "Telangana is known for its distinct weaving patterns and metal crafts. The ikat weaving of Pochampally and the metal craft of Pembarthi are prime examples of the state's dedication to preserving its artistic ancestry.",
        colors: { primary: "#FFD700", secondary: "#228B22", accent: "#8B0000" },
        gradient: "from-gold-500 to-green-600",
        backgroundImage: "/images/cultural/telangana.jpg",
        statistics: { artisans: 95, products: 680, heritageSites: 18, festivals: 10 },
        specialties: ["Pochampally Ikat", "Gadwal Sarees", "Warangal Durries", "Pearl Work", "Nizami Crafts"],
        featuredProducts: [
            { id: 1, name: "Pochampally Double Ikat Saree", price: 6500, originalPrice: 8000, image: "/images/cultural/telangana.jpg", artisan: "Pochampally Cluster", rating: 4.9, reviews: 267 },
            { id: 2, name: "Pembarthi Brass Lamp", price: 2200, originalPrice: 2800, image: "/images/cultural/telangana.jpg", artisan: "Pembarthi Metalworks", rating: 4.8, reviews: 145 },
            { id: 3, name: "Gadwal Cotton Silk Saree", price: 4500, originalPrice: 5500, image: "/images/cultural/telangana.jpg", artisan: "Gadwal Weavers", rating: 4.7, reviews: 189 },
        ],
        featuredArtisans: [
            { id: 1, name: "Venkat Rao", craft: "Pembarthi Metal Craft", experience: "32 years", location: "Warangal", image: "/images/cultural/telangana.jpg", story: "Master of sheet metal craft with intricate designs", rating: 4.8, products: 56 },
        ]
    },
    assam: {
        id: "assam",
        name: "Assam",
        nameHindi: "असम",
        tagline: "Gateway to Northeast",
        region: "Northeast",
        description: "Tea gardens and silk heritage with golden muga traditions.",
        culturalStory: "Assam is the land of the golden thread. Muga silk, unique to this region, is known for its durability and shimmering glossy texture. The state is also famous for its bamboo and cane crafts that are an integral part of daily life.",
        colors: { primary: "#90EE90", secondary: "#FFD700", accent: "#4682B4" },
        gradient: "from-emerald-500 to-teal-500",
        backgroundImage: "/images/cultural/assam.jpg",
        statistics: { artisans: 80, products: 560, heritageSites: 10, festivals: 8 },
        specialties: ["Muga Silk", "Bamboo Crafts", "Cane Work", "Traditional Jewelry", "Gamosa Textiles"],
        featuredProducts: [
            { id: 1, name: "Muga Silk Mekhela Chador", price: 12000, originalPrice: 15000, image: "/images/cultural/assam.jpg", artisan: "Sualkuchi Weavers", rating: 4.9, reviews: 178 },
            { id: 2, name: "Bamboo Tea Set", price: 850, originalPrice: 1000, image: "/images/cultural/assam.jpg", artisan: "Barpeta Artisans", rating: 4.6, reviews: 234 },
            { id: 3, name: "Gamosa (Traditional Towel)", price: 350, originalPrice: 450, image: "/images/cultural/assam.jpg", artisan: "Local Weavers", rating: 4.8, reviews: 567 },
        ],
        featuredArtisans: [
            { id: 1, name: "Renu Bora", craft: "Muga Silk Weaving", experience: "25 years", location: "Sualkuchi", image: "/images/cultural/assam.jpg", story: "Preserving the golden thread tradition of Assam", rating: 4.9, products: 45 },
        ]
    },
    odisha: {
        id: "odisha",
        name: "Odisha",
        nameHindi: "ओडिशा",
        tagline: "Soul of India",
        region: "East",
        description: "Jagannath culture and Pattachitra art with classical Odissi dance.",
        culturalStory: "Odisha is a treasure trove of ancient arts. The Pattachitra scroll paintings, intricate silver filigree work of Cuttack, and the stone carving traditions that built the Konark temple are testament to the state's artistic genius.",
        colors: { primary: "#FF6347", secondary: "#FFD700", accent: "#4169E1" },
        gradient: "from-red-500 to-pink-500",
        backgroundImage: "/images/cultural/odisha.jpg",
        statistics: { artisans: 110, products: 780, heritageSites: 25, festivals: 13 },
        specialties: ["Pattachitra Paintings", "Ikat Textiles", "Silver Filigree", "Palm Leaf Art", "Sambalpuri Sarees"],
        featuredProducts: [
            { id: 1, name: "Pattachitra Painting (Jagannath)", price: 2500, originalPrice: 3000, image: "/images/cultural/odisha.jpg", artisan: "Raghurajpur Artists", rating: 4.9, reviews: 234 },
            { id: 2, name: "Silver Filigree Jewelry Box", price: 4500, originalPrice: 5500, image: "/images/cultural/odisha.jpg", artisan: "Cuttack Silversmiths", rating: 4.8, reviews: 156 },
            { id: 3, name: "Sambalpuri Ikat Saree", price: 5500, originalPrice: 6800, image: "/images/cultural/odisha.jpg", artisan: "Sonepur Weavers", rating: 4.9, reviews: 378 },
        ],
        featuredArtisans: [
            { id: 1, name: "Ananta Maharana", craft: "Pattachitra Art", experience: "35 years", location: "Raghurajpur", image: "/images/cultural/odisha.jpg", story: "National award winner for traditional scroll painting", rating: 5.0, products: 120 },
        ]
    },
    "madhya-pradesh": {
        id: "madhya-pradesh",
        name: "Madhya Pradesh",
        nameHindi: "मध्य प्रदेश",
        tagline: "Heart of India",
        region: "Central",
        description: "Tribal heritage and handloom textiles from India's geographical center.",
        culturalStory: "As the heart of India, Madhya Pradesh blends influences from all directions. It is famous for the delicate Chanderi and Maheshwari silks, and the mystical Gond tribal art that depicts flora, fauna, and folklore.",
        colors: { primary: "#228B22", secondary: "#8B4513", accent: "#FFD700" },
        gradient: "from-green-500 to-blue-500",
        backgroundImage: "/images/cultural/madhya-pradesh.jpg",
        statistics: { artisans: 100, products: 720, heritageSites: 30, festivals: 11 },
        specialties: ["Chanderi Silk", "Gond Art", "Dhokra Craft", "Maheshwari Sarees", "Tribal Paintings"],
        featuredProducts: [
            { id: 1, name: "Chanderi Silk Saree", price: 8500, originalPrice: 10000, image: "/images/cultural/madhya-pradesh.jpg", artisan: "Chanderi Weavers", rating: 4.9, reviews: 289 },
            { id: 2, name: "Gond Painting (Large)", price: 5500, originalPrice: 6500, image: "/images/cultural/madhya-pradesh.jpg", artisan: "Bhajju Shyam", rating: 4.9, reviews: 167 },
            { id: 3, name: "Maheshwari Cotton Saree", price: 3500, originalPrice: 4200, image: "/images/cultural/madhya-pradesh.jpg", artisan: "Maheshwar Weavers", rating: 4.8, reviews: 234 },
        ],
        featuredArtisans: [
            { id: 1, name: "Bhajju Shyam", craft: "Gond Art", experience: "30 years", location: "Bhopal", image: "/images/cultural/madhya-pradesh.jpg", story: "Internationally acclaimed Gond artist and author", rating: 5.0, products: 89 },
        ]
    },
    "uttar-pradesh": {
        id: "uttar-pradesh",
        name: "Uttar Pradesh",
        nameHindi: "उत्तर प्रदेश",
        tagline: "Heartland of India",
        region: "North",
        description: "Mughal-influenced crafts and traditional embroidery heritage.",
        culturalStory: "Uttar Pradesh is a hub of fine craftsmanship. From the delicate Chikankari embroidery of Lucknow to the brassware of Moradabad and the carpets of Bhadohi, the state's artisans create products that are exported globally.",
        colors: { primary: "#4B0082", secondary: "#FFD700", accent: "#DC143C" },
        gradient: "from-indigo-600 to-purple-500",
        backgroundImage: "/images/cultural/uttar-pradesh.jpg",
        statistics: { artisans: 220, products: 1600, heritageSites: 45, festivals: 18 },
        specialties: ["Chikankari Embroidery", "Brass Work", "Carpets", "Zardozi Work", "Pottery"],
        featuredProducts: [
            { id: 1, name: "Lucknowi Chikankari Kurta", price: 3500, originalPrice: 4200, image: "/images/cultural/uttar-pradesh.jpg", artisan: "Lucknow Artisans", rating: 4.9, reviews: 567 },
            { id: 2, name: "Bhadohi Hand-knotted Carpet", price: 25000, originalPrice: 30000, image: "/images/cultural/uttar-pradesh.jpg", artisan: "Bhadohi Weavers", rating: 4.8, reviews: 189 },
            { id: 3, name: "Moradabad Brass Vase", price: 1800, originalPrice: 2200, image: "/images/cultural/uttar-pradesh.jpg", artisan: "Moradabad Craftsmen", rating: 4.7, reviews: 345 },
        ],
        featuredArtisans: [
            { id: 1, name: "Ustad Haider Ali", craft: "Chikankari Embroidery", experience: "40 years", location: "Lucknow", image: "/images/cultural/uttar-pradesh.jpg", story: "Master craftsman keeping Mughal embroidery traditions alive", rating: 4.9, products: 120 },
        ]
    },
    bihar: {
        id: "bihar",
        name: "Bihar",
        nameHindi: "बिहार",
        tagline: "Land of Buddha",
        region: "East",
        description: "Ancient Buddhist heritage with vibrant Madhubani art traditions.",
        culturalStory: "Bihar's artistic legacy is ancient and profound. The world-famous Madhubani paintings, originally done on walls during festivals, are now a global art form. The state is also known for its stone crafts and eco-friendly Sikki grass products.",
        colors: { primary: "#FF8C00", secondary: "#8B0000", accent: "#FFD700" },
        gradient: "from-saffron-500 to-red-600",
        backgroundImage: "/images/cultural/bihar.jpg",
        statistics: { artisans: 85, products: 590, heritageSites: 15, festivals: 8 },
        specialties: ["Madhubani Paintings", "Sikki Grass Work", "Stone Carving", "Applique Work", "Bamboo Crafts"],
        featuredProducts: [
            { id: 1, name: "Madhubani Painting (Medium)", price: 2500, originalPrice: 3000, image: "/images/cultural/bihar.jpg", artisan: "Sita Devi", rating: 4.9, reviews: 345 },
            { id: 2, name: "Sikki Grass Basket Set", price: 650, originalPrice: 800, image: "/images/cultural/bihar.jpg", artisan: "Mithila Artisans", rating: 4.7, reviews: 189 },
            { id: 3, name: "Stone Carved Buddha", price: 3500, originalPrice: 4200, image: "/images/cultural/bihar.jpg", artisan: "Bodh Gaya Sculptors", rating: 4.8, reviews: 123 },
        ],
        featuredArtisans: [
            { id: 1, name: "Sita Devi", craft: "Madhubani Art", experience: "45 years", location: "Madhubani", image: "/images/cultural/bihar.jpg", story: "Padma Shri awardee preserving ancient Mithila art", rating: 5.0, products: 150 },
        ]
    },
    jharkhand: {
        id: "jharkhand",
        name: "Jharkhand",
        nameHindi: "झारखंड",
        tagline: "Land of Forests",
        region: "East",
        description: "Tribal forest heritage with metal work and stone carving traditions.",
        culturalStory: "Jharkhand, the land of forests, is rich in tribal culture. Its Dhokra metal craft, lost-wax casting technique, produces unique artifacts. The state's bamboo work and tribal paintings reflect a deep connection with nature.",
        colors: { primary: "#228B22", secondary: "#8B4513", accent: "#FFD700" },
        gradient: "from-forest-green to-brown-600",
        backgroundImage: "/images/cultural/jharkhand.jpg",
        statistics: { artisans: 70, products: 480, heritageSites: 12, festivals: 9 },
        specialties: ["Tribal Art", "Dokra Metal Work", "Bamboo Crafts", "Stone Sculptures", "Handloom Textiles"],
        featuredProducts: [
            { id: 1, name: "Dhokra Tribal Figure", price: 1800, originalPrice: 2200, image: "/images/cultural/jharkhand.jpg", artisan: "Tribal Artisans", rating: 4.8, reviews: 167 },
            { id: 2, name: "Bamboo Fruit Basket", price: 450, originalPrice: 550, image: "/images/cultural/jharkhand.jpg", artisan: "Ranchi Craftsmen", rating: 4.6, reviews: 234 },
            { id: 3, name: "Sohrai Painting", price: 1500, originalPrice: 1800, image: "/images/cultural/jharkhand.jpg", artisan: "Hazaribagh Artists", rating: 4.7, reviews: 98 },
        ],
        featuredArtisans: [
            { id: 1, name: "Bulu Imam", craft: "Tribal Art Conservation", experience: "40 years", location: "Hazaribagh", image: "/images/cultural/jharkhand.jpg", story: "Preserving tribal rock art and painting traditions", rating: 4.9, products: 45 },
        ]
    },
    haryana: {
        id: "haryana",
        name: "Haryana",
        nameHindi: "हरियाणा",
        tagline: "Land of Rotis",
        region: "North",
        description: "Agricultural heritage with vibrant embroidery and pottery traditions.",
        culturalStory: "Haryana's crafts are practical yet beautiful, born from an agrarian lifestyle. Pottery is a major craft here, along with Phulkari embroidery which shares similarities with Punjab but has its own distinct geometric patterns.",
        colors: { primary: "#32CD32", secondary: "#FFD700", accent: "#FF6347" },
        gradient: "from-green-600 to-yellow-500",
        backgroundImage: "/images/cultural/haryana.jpg",
        statistics: { artisans: 65, products: 450, heritageSites: 8, festivals: 7 },
        specialties: ["Phulkari Embroidery", "Pottery", "Handloom Textiles", "Wooden Crafts", "Metalwork"],
        featuredProducts: [
            { id: 1, name: "Haryanvi Phulkari Dupatta", price: 1800, originalPrice: 2200, image: "/images/cultural/haryana.jpg", artisan: "Local Artisans", rating: 4.7, reviews: 234 },
            { id: 2, name: "Terracotta Water Pot", price: 350, originalPrice: 450, image: "/images/cultural/haryana.jpg", artisan: "Pottery Village", rating: 4.5, reviews: 156 },
            { id: 3, name: "Wooden Lacquer Box", price: 550, originalPrice: 700, image: "/images/cultural/haryana.jpg", artisan: "Rohtak Craftsmen", rating: 4.6, reviews: 89 },
        ],
        featuredArtisans: [
            { id: 1, name: "Rajbala Devi", craft: "Phulkari Embroidery", experience: "22 years", location: "Panipat", image: "/images/cultural/haryana.jpg", story: "Reviving traditional geometric embroidery patterns", rating: 4.7, products: 56 },
        ]
    },
    "himachal-pradesh": {
        id: "himachal-pradesh",
        name: "Himachal Pradesh",
        nameHindi: "हिमाचल प्रदेश",
        tagline: "Dev Bhoomi",
        region: "North",
        description: "Mountain heritage with woolen crafts and wood carving traditions.",
        culturalStory: "Nestled in the Himalayas, Himachal Pradesh is famous for its warm woolens. The colorful Kullu shawls and Himachal caps are iconic. The state also has a rich tradition of wood carving seen in its ancient temples.",
        colors: { primary: "#4169E1", secondary: "#FFFFFF", accent: "#228B22" },
        gradient: "from-blue-600 to-white",
        backgroundImage: "/images/cultural/himachal-pradesh.jpg",
        statistics: { artisans: 75, products: 520, heritageSites: 14, festivals: 10 },
        specialties: ["Woolen Shawls", "Wood Carving", "Metalwork", "Himachali Caps", "Chamba Rumals"],
        featuredProducts: [
            { id: 1, name: "Kullu Wool Shawl", price: 3500, originalPrice: 4200, image: "/images/cultural/himachal-pradesh.jpg", artisan: "Kullu Weavers", rating: 4.9, reviews: 456 },
            { id: 2, name: "Himachali Topi (Cap)", price: 450, originalPrice: 550, image: "/images/cultural/himachal-pradesh.jpg", artisan: "Kinnaur Artisans", rating: 4.7, reviews: 312 },
            { id: 3, name: "Chamba Rumal (Embroidered)", price: 2800, originalPrice: 3500, image: "/images/cultural/himachal-pradesh.jpg", artisan: "Chamba Ladies", rating: 4.8, reviews: 145 },
        ],
        featuredArtisans: [
            { id: 1, name: "Pushpa Devi", craft: "Kullu Shawl Weaving", experience: "30 years", location: "Kullu", image: "/images/cultural/himachal-pradesh.jpg", story: "Champion of traditional geometric pattern weaving", rating: 4.9, products: 78 },
        ]
    },
    uttarakhand: {
        id: "uttarakhand",
        name: "Uttarakhand",
        nameHindi: "उत्तराखंड",
        tagline: "Land of Gods",
        region: "North",
        description: "Himalayan heritage with traditional mountain crafts and spiritual art.",
        culturalStory: "Uttarakhand's crafts are influenced by its spiritual significance and mountain environment. The Aipan folk art, done on floors and walls, is a key tradition. Woolen products and wood carving are also prominent.",
        colors: { primary: "#4682B4", secondary: "#228B22", accent: "#FFD700" },
        gradient: "from-blue-500 to-green-600",
        backgroundImage: "/images/cultural/uttarakhand.jpg",
        statistics: { artisans: 60, products: 420, heritageSites: 16, festivals: 9 },
        specialties: ["Woolen Products", "Wood Carving", "Aipan Art", "Ringaal Crafts", "Stone Work"],
        featuredProducts: [
            { id: 1, name: "Aipan Art Wall Decor", price: 1200, originalPrice: 1500, image: "/images/cultural/uttarakhand.jpg", artisan: "Kumaon Artists", rating: 4.7, reviews: 189 },
            { id: 2, name: "Ringaal Bamboo Basket", price: 650, originalPrice: 800, image: "/images/cultural/uttarakhand.jpg", artisan: "Garhwal Artisans", rating: 4.6, reviews: 234 },
            { id: 3, name: "Pashmina Wool Stole", price: 4500, originalPrice: 5500, image: "/images/cultural/uttarakhand.jpg", artisan: "Mountain Weavers", rating: 4.9, reviews: 167 },
        ],
        featuredArtisans: [
            { id: 1, name: "Kamla Devi", craft: "Aipan Folk Art", experience: "35 years", location: "Almora", image: "/images/cultural/uttarakhand.jpg", story: "Keeping alive the sacred floor art tradition", rating: 4.8, products: 45 },
        ]
    },
    chhattisgarh: {
        id: "chhattisgarh",
        name: "Chhattisgarh",
        nameHindi: "छत्तीसगढ़",
        tagline: "Rice Bowl of India",
        region: "Central",
        description: "Tribal heritage with bell metal crafts and bamboo work traditions.",
        culturalStory: "Chhattisgarh is known for its authentic tribal crafts using bell metal (Dhokra), iron, and bamboo. The terracotta figures of the state are also distinct and hold ritualistic significance.",
        colors: { primary: "#228B22", secondary: "#8B4513", accent: "#FFD700" },
        gradient: "from-green-500 to-brown-600",
        backgroundImage: "/indian-mandala-pattern.png",
        statistics: { artisans: 55, products: 380, heritageSites: 10, festivals: 8 },
        specialties: ["Tribal Art", "Bell Metal Craft", "Bamboo Work", "Handloom Textiles", "Wood Carving"],
        featuredProducts: [
            { id: 1, name: "Bastar Dhokra Figurine", price: 2200, originalPrice: 2800, image: "/indian-mandala-pattern.png", artisan: "Bastar Artisans", rating: 4.8, reviews: 178 },
            { id: 2, name: "Tribal Iron Craft Lamp", price: 1500, originalPrice: 1800, image: "/indian-mandala-pattern.png", artisan: "Tribal Metalworkers", rating: 4.7, reviews: 123 },
            { id: 3, name: "Kosa Silk Saree", price: 5500, originalPrice: 6800, image: "/indian-mandala-pattern.png", artisan: "Champa Weavers", rating: 4.9, reviews: 234 },
        ],
        featuredArtisans: [
            { id: 1, name: "Jaidev Baghel", craft: "Dhokra Metal Craft", experience: "28 years", location: "Bastar", image: "/indian-mandala-pattern.png", story: "Master of lost-wax casting technique", rating: 4.8, products: 67 },
        ]
    },
    goa: {
        id: "goa",
        name: "Goa",
        nameHindi: "गोवा",
        tagline: "Pearl of the Orient",
        region: "West",
        description: "Portuguese heritage with coastal crafts and tile work traditions.",
        culturalStory: "Goa's crafts reflect its unique Indo-Portuguese history. The Azulejo hand-painted tiles are a signature art form. Coconut shell crafts and seashell art are also popular, celebrating the state's coastal identity.",
        colors: { primary: "#4169E1", secondary: "#FFD700", accent: "#FF6347" },
        gradient: "from-blue-400 to-yellow-500",
        backgroundImage: "/kerala-backwaters-coconut.jpg",
        statistics: { artisans: 40, products: 280, heritageSites: 12, festivals: 15 },
        specialties: ["Azulejo Tiles", "Cashew Products", "Coconut Crafts", "Portuguese Pottery", "Seashell Art"],
        featuredProducts: [
            { id: 1, name: "Azulejo Painted Tile Set", price: 1800, originalPrice: 2200, image: "/kerala-backwaters-coconut.jpg", artisan: "Goan Tile Artists", rating: 4.7, reviews: 145 },
            { id: 2, name: "Coconut Shell Bowl Set", price: 550, originalPrice: 700, image: "/kerala-backwaters-coconut.jpg", artisan: "Coastal Craftsmen", rating: 4.6, reviews: 234 },
            { id: 3, name: "Caju Feni Gift Set", price: 950, originalPrice: 1200, image: "/kerala-backwaters-coconut.jpg", artisan: "Traditional Distillers", rating: 4.8, reviews: 312 },
        ],
        featuredArtisans: [
            { id: 1, name: "Mario Fernandes", craft: "Azulejo Tile Painting", experience: "25 years", location: "Old Goa", image: "/kerala-backwaters-coconut.jpg", story: "Preserving Indo-Portuguese tile art tradition", rating: 4.7, products: 89 },
        ]
    },
    manipur: {
        id: "manipur",
        name: "Manipur",
        nameHindi: "मणिपुर",
        tagline: "Jewel of India",
        region: "Northeast",
        description: "Classical dance heritage with exquisite textiles and bamboo crafts.",
        culturalStory: "Manipur is known for its sophistication in culture and arts. Its handloom textiles are highly prized for their design and durability. The state is also famous for its black pottery (Longpi) and intricate cane and bamboo work.",
        colors: { primary: "#8A2BE2", secondary: "#FF69B4", accent: "#FFD700" },
        gradient: "from-purple-500 to-pink-500",
        backgroundImage: "/indian-mandala-pattern.png",
        statistics: { artisans: 45, products: 320, heritageSites: 8, festivals: 10 },
        specialties: ["Manipuri Textiles", "Bamboo Crafts", "Pottery", "Jewelry", "Traditional Dolls"],
        featuredProducts: [
            { id: 1, name: "Manipuri Handloom Saree", price: 3500, originalPrice: 4200, image: "/indian-mandala-pattern.png", artisan: "Imphal Weavers", rating: 4.8, reviews: 145 },
            { id: 2, name: "Longpi Black Pottery Set", price: 1200, originalPrice: 1500, image: "/indian-mandala-pattern.png", artisan: "Longpi Village Artisans", rating: 4.9, reviews: 89 },
            { id: 3, name: "Bamboo Water Container", price: 450, originalPrice: 550, image: "/indian-mandala-pattern.png", artisan: "Local Craftsmen", rating: 4.6, reviews: 178 },
        ],
        featuredArtisans: [
            { id: 1, name: "Meerabai Devi", craft: "Manipuri Weaving", experience: "30 years", location: "Imphal", image: "/indian-mandala-pattern.png", story: "Master weaver of traditional Manipuri textiles", rating: 4.8, products: 67 },
        ]
    },
    meghalaya: {
        id: "meghalaya",
        name: "Meghalaya",
        nameHindi: "मेघालय",
        tagline: "Abode of Clouds",
        region: "Northeast",
        description: "Cloud heritage with bamboo crafts and traditional weaving.",
        culturalStory: "In Meghalaya, weaving is a primary occupation in many households. The state is also known for its cane and bamboo mats, stools, and baskets. The craftsmanship reflects the simplicity and beauty of tribal life in the hills.",
        colors: { primary: "#32CD32", secondary: "#4682B4", accent: "#FFD700" },
        gradient: "from-green-400 to-blue-500",
        backgroundImage: "/kerala-backwaters-coconut.jpg",
        statistics: { artisans: 35, products: 250, heritageSites: 6, festivals: 7 },
        specialties: ["Bamboo Crafts", "Cane Work", "Traditional Textiles", "Pottery", "Wood Carving"],
        featuredProducts: [
            { id: 1, name: "Khasi Bamboo Basket", price: 650, originalPrice: 800, image: "/kerala-backwaters-coconut.jpg", artisan: "Shillong Artisans", rating: 4.7, reviews: 123 },
            { id: 2, name: "Cane Stool (Traditional)", price: 850, originalPrice: 1000, image: "/kerala-backwaters-coconut.jpg", artisan: "Khasi Craftsmen", rating: 4.6, reviews: 89 },
            { id: 3, name: "Eri Silk Shawl", price: 2800, originalPrice: 3500, image: "/kerala-backwaters-coconut.jpg", artisan: "Jaintia Weavers", rating: 4.8, reviews: 67 },
        ],
        featuredArtisans: [
            { id: 1, name: "Phyllis Marbaniang", craft: "Bamboo Weaving", experience: "25 years", location: "Shillong", image: "/kerala-backwaters-coconut.jpg", story: "Preserving traditional Khasi basket weaving", rating: 4.7, products: 45 },
        ]
    },
    tripura: {
        id: "tripura",
        name: "Tripura",
        nameHindi: "त्रिपुरा",
        tagline: "Land of Diversity",
        region: "Northeast",
        description: "Diverse tribal heritage with bamboo and textile traditions.",
        culturalStory: "Tripura is famous for its exceptional bamboo and cane handicrafts, considered among the best in India. From furniture to delicate lampshades, the variety is immense. Handloom weaving is also a significant part of their culture.",
        colors: { primary: "#228B22", secondary: "#DC143C", accent: "#FFD700" },
        gradient: "from-green-500 to-red-500",
        backgroundImage: "/indian-mandala-pattern.png",
        statistics: { artisans: 30, products: 210, heritageSites: 5, festivals: 8 },
        specialties: ["Bamboo Crafts", "Handloom Textiles", "Cane Work", "Traditional Jewelry", "Wood Carving"],
        featuredProducts: [
            { id: 1, name: "Tripuri Handloom Stole", price: 1200, originalPrice: 1500, image: "/indian-mandala-pattern.png", artisan: "Agartala Weavers", rating: 4.7, reviews: 112 },
            { id: 2, name: "Bamboo Lamp Shade", price: 850, originalPrice: 1000, image: "/indian-mandala-pattern.png", artisan: "Tribal Craftsmen", rating: 4.8, reviews: 78 },
            { id: 3, name: "Cane Furniture Chair", price: 3500, originalPrice: 4200, image: "/indian-mandala-pattern.png", artisan: "Tripuri Artisans", rating: 4.9, reviews: 56 },
        ],
        featuredArtisans: [
            { id: 1, name: "Bijoy Debbarma", craft: "Bamboo Craft", experience: "35 years", location: "Agartala", image: "/indian-mandala-pattern.png", story: "Creating innovative bamboo furniture designs", rating: 4.8, products: 89 },
        ]
    },
    mizoram: {
        id: "mizoram",
        name: "Mizoram",
        nameHindi: "मिजोरम",
        tagline: "Land of Blue Mountains",
        region: "Northeast",
        description: "Blue mountain heritage with bamboo crafts and traditional weaving.",
        culturalStory: "Mizoram's traditional craft is weaving. The Puan chei is a colorful and intricately woven fabric used as a wrap-around skirt. Bamboo and cane work is also widely practiced, creating items of utility and beauty.",
        colors: { primary: "#4169E1", secondary: "#228B22", accent: "#FFD700" },
        gradient: "from-blue-500 to-green-500",
        backgroundImage: "/kerala-backwaters-coconut.jpg",
        statistics: { artisans: 25, products: 180, heritageSites: 4, festivals: 6 },
        specialties: ["Bamboo Crafts", "Traditional Textiles", "Wood Carving", "Cane Work", "Pottery"],
        featuredProducts: [
            { id: 1, name: "Puan Chei (Traditional Wrap)", price: 2200, originalPrice: 2800, image: "/kerala-backwaters-coconut.jpg", artisan: "Aizawl Weavers", rating: 4.8, reviews: 98 },
            { id: 2, name: "Mizo Bamboo Vase", price: 550, originalPrice: 700, image: "/kerala-backwaters-coconut.jpg", artisan: "Local Craftsmen", rating: 4.6, reviews: 145 },
            { id: 3, name: "Cane Storage Basket", price: 450, originalPrice: 550, image: "/kerala-backwaters-coconut.jpg", artisan: "Mizo Artisans", rating: 4.7, reviews: 89 },
        ],
        featuredArtisans: [
            { id: 1, name: "Lalbiakzuali", craft: "Traditional Weaving", experience: "28 years", location: "Aizawl", image: "/kerala-backwaters-coconut.jpg", story: "Master weaver of Puan traditional garments", rating: 4.8, products: 56 },
        ]
    },
    nagaland: {
        id: "nagaland",
        name: "Nagaland",
        nameHindi: "नागालैंड",
        tagline: "Land of Festivals",
        region: "Northeast",
        description: "Festival heritage with vibrant textiles and wood carving traditions.",
        culturalStory: "Nagaland is known for its shawls, which are not just garments but social identifiers. Each tribe has its own patterns. Wood carving is another significant art form, often decorating the entrances of traditional houses (Morungs).",
        colors: { primary: "#DC143C", secondary: "#000000", accent: "#FFD700" },
        gradient: "from-red-500 to-black",
        backgroundImage: "/indian-mandala-pattern.png",
        statistics: { artisans: 40, products: 290, heritageSites: 7, festivals: 12 },
        specialties: ["Traditional Textiles", "Bamboo Crafts", "Wood Carving", "Jewelry", "Pottery"],
        featuredProducts: [
            { id: 1, name: "Naga Tribal Shawl", price: 4500, originalPrice: 5500, image: "/indian-mandala-pattern.png", artisan: "Kohima Weavers", rating: 4.9, reviews: 178 },
            { id: 2, name: "Hornbill Wood Carving", price: 2200, originalPrice: 2800, image: "/indian-mandala-pattern.png", artisan: "Tribal Carvers", rating: 4.8, reviews: 89 },
            { id: 3, name: "Traditional Naga Jewelry Set", price: 1800, originalPrice: 2200, image: "/indian-mandala-pattern.png", artisan: "Dimapur Artisans", rating: 4.7, reviews: 134 },
        ],
        featuredArtisans: [
            { id: 1, name: "Imcha Walling", craft: "Traditional Weaving", experience: "35 years", location: "Kohima", image: "/indian-mandala-pattern.png", story: "Preserving ancient Naga weaving patterns", rating: 4.9, products: 78 },
        ]
    },
    "arunachal-pradesh": {
        id: "arunachal-pradesh",
        name: "Arunachal Pradesh",
        nameHindi: "अरुणाचल प्रदेश",
        tagline: "Land of Rising Sun",
        region: "Northeast",
        description: "Rising sun heritage with traditional crafts and tribal art.",
        culturalStory: "Arunachal Pradesh has a rich tradition of bamboo and cane work, weaving, and wood carving. The masks carved by the Monpa and Sherdukpen tribes for religious dances are particularly notable.",
        colors: { primary: "#FF8C00", secondary: "#DC143C", accent: "#FFD700" },
        gradient: "from-orange-500 to-red-600",
        backgroundImage: "/kerala-backwaters-coconut.jpg",
        statistics: { artisans: 35, products: 240, heritageSites: 8, festivals: 9 },
        specialties: ["Traditional Textiles", "Bamboo Crafts", "Wood Carving", "Masks", "Jewelry"],
        featuredProducts: [
            { id: 1, name: "Monpa Wooden Mask", price: 3500, originalPrice: 4200, image: "/kerala-backwaters-coconut.jpg", artisan: "Tawang Artisans", rating: 4.9, reviews: 67 },
            { id: 2, name: "Apatani Cane Hat", price: 850, originalPrice: 1000, image: "/kerala-backwaters-coconut.jpg", artisan: "Ziro Valley Craftsmen", rating: 4.7, reviews: 89 },
            { id: 3, name: "Tribal Handwoven Carpet", price: 5500, originalPrice: 6800, image: "/kerala-backwaters-coconut.jpg", artisan: "Local Weavers", rating: 4.8, reviews: 45 },
        ],
        featuredArtisans: [
            { id: 1, name: "Dorjee Khandu", craft: "Wood Carving & Masks", experience: "40 years", location: "Tawang", image: "/kerala-backwaters-coconut.jpg", story: "Master carver of Buddhist ceremonial masks", rating: 4.9, products: 56 },
        ]
    },
    sikkim: {
        id: "sikkim",
        name: "Sikkim",
        nameHindi: "सिक्किम",
        tagline: "Himalayan Paradise",
        region: "Northeast",
        description: "Himalayan paradise with Buddhist art and woolen craft traditions.",
        culturalStory: "Sikkim's crafts are heavily influenced by Tibetan Buddhism. Thangka paintings, wooden masks, and carpets are prominent. The state is also known for its traditional Choktsees (foldable tables) with intricate carving.",
        colors: { primary: "#4169E1", secondary: "#FFFFFF", accent: "#FFD700" },
        gradient: "from-blue-600 to-white",
        backgroundImage: "/indian-mandala-pattern.png",
        statistics: { artisans: 30, products: 200, heritageSites: 10, festivals: 8 },
        specialties: ["Woolen Products", "Thangka Paintings", "Wood Carving", "Traditional Textiles", "Carpets"],
        featuredProducts: [
            { id: 1, name: "Thangka Painting (Medium)", price: 8500, originalPrice: 10000, image: "/indian-mandala-pattern.png", artisan: "Gangtok Artists", rating: 4.9, reviews: 89 },
            { id: 2, name: "Sikkim Wool Carpet", price: 6500, originalPrice: 8000, image: "/indian-mandala-pattern.png", artisan: "Local Weavers", rating: 4.8, reviews: 56 },
            { id: 3, name: "Choksee Folding Table", price: 4500, originalPrice: 5500, image: "/indian-mandala-pattern.png", artisan: "Rumtek Craftsmen", rating: 4.9, reviews: 34 },
        ],
        featuredArtisans: [
            { id: 1, name: "Tashi Lepcha", craft: "Thangka Painting", experience: "30 years", location: "Gangtok", image: "/indian-mandala-pattern.png", story: "Renowned artist of Buddhist spiritual paintings", rating: 5.0, products: 45 },
        ]
    },
}
