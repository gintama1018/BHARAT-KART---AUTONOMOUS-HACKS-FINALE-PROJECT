export interface Festival {
    id: string
    name: string
    nameHindi: string
    description: string
    month: string
    states: string[]
    image: string
    significance: string
    crafts: string[]
    products: string[]
}

export const festivalsData: Festival[] = [
    {
        id: "diwali",
        name: "Diwali",
        nameHindi: "दीवाली",
        description: "The Festival of Lights celebrating the victory of light over darkness",
        month: "October/November",
        states: ["All India"],
        image: "/images/cultural/rajasthan.jpg",
        significance: "Marks Lord Rama's return to Ayodhya. Homes are decorated with diyas and rangoli.",
        crafts: ["Diyas", "Rangoli", "Torans", "Lanterns"],
        products: ["Brass Diyas", "Decorative Rangoli", "Door Hangings", "Gift Boxes"]
    },
    {
        id: "holi",
        name: "Holi",
        nameHindi: "होली",
        description: "The Festival of Colors celebrating spring and love",
        month: "March",
        states: ["North India", "Gujarat", "Maharashtra"],
        image: "/images/cultural/gujarat.jpg",
        significance: "Celebrates the divine love of Radha-Krishna and the triumph of good over evil.",
        crafts: ["Natural Colors", "Pichkari", "Traditional Sweets"],
        products: ["Organic Gulal", "Traditional Pichkari", "Festive Kurtas"]
    },
    {
        id: "durga-puja",
        name: "Durga Puja",
        nameHindi: "दुर्गा पूजा",
        description: "Celebrating Goddess Durga's victory over the demon Mahishasura",
        month: "September/October",
        states: ["West Bengal", "Odisha", "Assam"],
        image: "/images/cultural/west-bengal.jpg",
        significance: "The biggest festival in Bengal with elaborate pandals and cultural programs.",
        crafts: ["Clay Idols", "Alpana Art", "Shola Pith", "Dhak Drums"],
        products: ["Durga Idols", "Dokra Jewelry", "Kantha Sarees", "Terracotta Art"]
    },
    {
        id: "pongal",
        name: "Pongal",
        nameHindi: "पोंगल",
        description: "Tamil harvest festival thanking the Sun God and cattle",
        month: "January",
        states: ["Tamil Nadu", "Andhra Pradesh", "Karnataka"],
        image: "/images/cultural/tamil-nadu.jpg",
        significance: "Four-day harvest festival marking the Tamil New Year period.",
        crafts: ["Kolam", "Pongal Pot", "Banana Leaf Art"],
        products: ["Bronze Pongal Pot", "Silk Sarees", "Temple Jewelry"]
    },
    {
        id: "onam",
        name: "Onam",
        nameHindi: "ओणम",
        description: "Kerala's harvest festival celebrating King Mahabali's return",
        month: "August/September",
        states: ["Kerala"],
        image: "/images/cultural/kerala.jpg",
        significance: "Welcome of mythical King Mahabali with floral carpets and boat races.",
        crafts: ["Pookalam", "Vallam Kali Boats", "Kasavu Textiles"],
        products: ["Kerala Kasavu Saree", "Coir Products", "Brass Lamps"]
    },
    {
        id: "navratri",
        name: "Navratri",
        nameHindi: "नवरात्रि",
        description: "Nine nights of worship dedicated to Goddess Durga",
        month: "September/October",
        states: ["Gujarat", "Maharashtra", "West Bengal"],
        image: "/images/cultural/gujarat.jpg",
        significance: "Celebrated with Garba and Dandiya dances in Gujarat.",
        crafts: ["Dandiya Sticks", "Chaniya Choli", "Ghagra"],
        products: ["Embroidered Chaniya Choli", "Silver Dandiya", "Bandhani Dupattas"]
    },
    {
        id: "baisakhi",
        name: "Baisakhi",
        nameHindi: "बैसाखी",
        description: "Punjabi harvest festival and Sikh New Year",
        month: "April",
        states: ["Punjab", "Haryana"],
        image: "/images/cultural/punjab.jpg",
        significance: "Marks the Sikh New Year and founding of the Khalsa.",
        crafts: ["Phulkari", "Traditional Juttis", "Punjabi Suits"],
        products: ["Phulkari Dupattas", "Leather Juttis", "Wooden Furniture"]
    },
    {
        id: "ganesh-chaturthi",
        name: "Ganesh Chaturthi",
        nameHindi: "गणेश चतुर्थी",
        description: "Celebrating the birth of Lord Ganesha",
        month: "August/September",
        states: ["Maharashtra", "Karnataka", "Andhra Pradesh"],
        image: "/images/cultural/maharashtra.jpg",
        significance: "Ten-day festival with elaborate Ganesha idols and processions.",
        crafts: ["Clay Idols", "Modak Molds", "Decoration Items"],
        products: ["Eco-friendly Ganesha", "Silver Pooja Items", "Traditional Modak"]
    }
]

export const monthFilters = [
    "All Months",
    "January",
    "March",
    "April",
    "August",
    "September",
    "October",
    "November"
]
