export interface Collection {
    id: string
    name: string
    nameHindi: string
    description: string
    image: string
    productCount: number
    featured: boolean
    gradient: string
}

export const collectionsData: Collection[] = [
    {
        id: "textiles",
        name: "Handloom Textiles",
        nameHindi: "हथकरघा वस्त्र",
        description: "Exquisite handwoven fabrics from master weavers across India",
        image: "/images/cultural/rajasthan.jpg",
        productCount: 450,
        featured: true,
        gradient: "from-red-500 to-orange-500"
    },
    {
        id: "pottery",
        name: "Pottery & Ceramics",
        nameHindi: "मिट्टी के बर्तन",
        description: "Traditional terracotta and blue pottery from skilled potters",
        image: "/indian-artisan-crafting-pottery.jpg",
        productCount: 280,
        featured: true,
        gradient: "from-amber-500 to-yellow-500"
    },
    {
        id: "jewelry",
        name: "Traditional Jewelry",
        nameHindi: "पारंपरिक आभूषण",
        description: "Handcrafted ornaments with age-old techniques",
        image: "/images/cultural/tamil-nadu.jpg",
        productCount: 320,
        featured: true,
        gradient: "from-yellow-500 to-amber-600"
    },
    {
        id: "paintings",
        name: "Folk Paintings",
        nameHindi: "लोक चित्रकला",
        description: "Madhubani, Warli, Pattachitra and more traditional art forms",
        image: "/images/cultural/bihar.jpg",
        productCount: 180,
        featured: true,
        gradient: "from-purple-500 to-pink-500"
    },
    {
        id: "wood",
        name: "Wood Crafts",
        nameHindi: "लकड़ी की कलाकृतियाँ",
        description: "Intricately carved wooden artifacts and furniture",
        image: "/images/cultural/karnataka.jpg",
        productCount: 220,
        featured: false,
        gradient: "from-amber-700 to-orange-600"
    },
    {
        id: "metal",
        name: "Metal Crafts",
        nameHindi: "धातु शिल्प",
        description: "Brass, bronze, and bell metal traditional artifacts",
        image: "/images/cultural/odisha.jpg",
        productCount: 190,
        featured: false,
        gradient: "from-gray-600 to-yellow-600"
    },
    {
        id: "embroidery",
        name: "Embroidery Collection",
        nameHindi: "कढ़ाई संग्रह",
        description: "Kantha, Phulkari, Chikankari and regional embroideries",
        image: "/images/cultural/punjab.jpg",
        productCount: 350,
        featured: true,
        gradient: "from-pink-500 to-red-500"
    },
    {
        id: "home-decor",
        name: "Home Décor",
        nameHindi: "घर की सजावट",
        description: "Traditional items to adorn your living spaces",
        image: "/images/cultural/gujarat.jpg",
        productCount: 410,
        featured: false,
        gradient: "from-teal-500 to-green-500"
    },
    {
        id: "eco-friendly",
        name: "Eco-Friendly",
        nameHindi: "पर्यावरण अनुकूल",
        description: "Sustainable products made from natural materials",
        image: "/images/cultural/kerala.jpg",
        productCount: 150,
        featured: false,
        gradient: "from-green-500 to-emerald-600"
    },
    {
        id: "festive",
        name: "Festive Collection",
        nameHindi: "त्योहारी संग्रह",
        description: "Special items for Diwali, Holi, and other celebrations",
        image: "/images/cultural/maharashtra.jpg",
        productCount: 280,
        featured: true,
        gradient: "from-orange-500 to-red-600"
    }
]
