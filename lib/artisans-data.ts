export interface Artisan {
    id: string
    name: string
    nameHindi: string
    craft: string
    state: string
    stateHindi: string
    experience: string
    story: string
    image: string
    rating: number
    products: number
    awards: string[]
    techniques: string[]
}

export const artisansData: Artisan[] = [
    {
        id: "ramesh-kumar",
        name: "Ramesh Kumar",
        nameHindi: "रमेश कुमार",
        craft: "Kathputli Puppets",
        state: "Rajasthan",
        stateHindi: "राजस्थान",
        experience: "25 years",
        story: "Third generation puppet maker preserving the ancient art of Kathputli. His puppets have been displayed in international exhibitions and he has trained over 50 young artisans.",
        image: "/rajasthani-kathputli-puppet-colorful-traditional.jpg",
        rating: 4.9,
        products: 45,
        awards: ["National Award 2019", "State Craft Award 2015"],
        techniques: ["String Puppetry", "Natural Dyes", "Hand Carving"]
    },
    {
        id: "meera-devi",
        name: "Meera Devi",
        nameHindi: "मीरा देवी",
        craft: "Blue Pottery",
        state: "Rajasthan",
        stateHindi: "राजस्थान",
        experience: "18 years",
        story: "Master potter creating contemporary designs with traditional techniques. Her work blends Mughal aesthetics with modern functionality.",
        image: "/indian-artisan-crafting-pottery.jpg",
        rating: 4.8,
        products: 32,
        awards: ["Shilp Guru Award 2020"],
        techniques: ["Quartz Pottery", "Cobalt Blue Glazing", "Persian Patterns"]
    },
    {
        id: "lakshmi-amma",
        name: "Lakshmi Amma",
        nameHindi: "लक्ष्मी अम्मा",
        craft: "Coir Weaving",
        state: "Kerala",
        stateHindi: "केरल",
        experience: "40 years",
        story: "Transforming coconut husk into durable and beautiful artifacts. Her coir products are eco-friendly and support sustainable practices.",
        image: "/images/cultural/kerala.jpg",
        rating: 4.8,
        products: 25,
        awards: ["Kerala State Award 2018"],
        techniques: ["Hand Spinning", "Natural Dyeing", "Traditional Weaving"]
    },
    {
        id: "gopalan-nair",
        name: "Gopalan Nair",
        nameHindi: "गोपालन नायर",
        craft: "Kathakali Masks",
        state: "Kerala",
        stateHindi: "केरल",
        experience: "35 years",
        story: "Creating elaborate Kathakali masks used in classical dance performances. Each mask takes weeks to complete with traditional materials.",
        image: "/images/cultural/kerala.jpg",
        rating: 4.9,
        products: 18,
        awards: ["National Award 2017", "Kerala Sangeetha Nataka Akademi Award"],
        techniques: ["Papier-mâché", "Natural Pigments", "Gold Leaf Work"]
    },
    {
        id: "suresh-chand",
        name: "Suresh Chand",
        nameHindi: "सुरेश चंद",
        craft: "Block Printing",
        state: "Rajasthan",
        stateHindi: "राजस्थान",
        experience: "30 years",
        story: "Fifth generation block printer from Sanganer. His family has preserved wooden blocks that are over 200 years old.",
        image: "/images/cultural/rajasthan.jpg",
        rating: 4.9,
        products: 67,
        awards: ["Padma Shri Nominee 2021"],
        techniques: ["Hand Block Printing", "Vegetable Dyes", "Mud Resist Printing"]
    },
    {
        id: "anita-sharma",
        name: "Anita Sharma",
        nameHindi: "अनिता शर्मा",
        craft: "Phulkari Embroidery",
        state: "Punjab",
        stateHindi: "पंजाब",
        experience: "22 years",
        story: "Reviving the traditional Phulkari craft and training rural women. She runs a cooperative of 30 women artisans.",
        image: "/images/cultural/punjab.jpg",
        rating: 4.7,
        products: 89,
        awards: ["Women Entrepreneur Award 2019"],
        techniques: ["Darning Stitch", "Bagh Embroidery", "Silk Thread Work"]
    },
    {
        id: "venkatesh-murthy",
        name: "Venkatesh Murthy",
        nameHindi: "वेंकटेश मूर्ति",
        craft: "Bronze Casting",
        state: "Tamil Nadu",
        stateHindi: "तमिल नाडु",
        experience: "28 years",
        story: "Creating divine bronze idols using the ancient lost-wax technique passed down from Chola artisans.",
        image: "/images/cultural/tamil-nadu.jpg",
        rating: 4.9,
        products: 24,
        awards: ["National Award 2016", "Tamil Nadu State Award"],
        techniques: ["Lost Wax Casting", "Panchaloha Alloy", "Temple Iconography"]
    },
    {
        id: "priya-banerjee",
        name: "Priya Banerjee",
        nameHindi: "प्रिया बनर्जी",
        craft: "Kantha Embroidery",
        state: "West Bengal",
        stateHindi: "पश्चिम बंगाल",
        experience: "20 years",
        story: "Contemporary Kantha artist who has taken this traditional craft to international fashion weeks.",
        image: "/images/cultural/west-bengal.jpg",
        rating: 4.8,
        products: 56,
        awards: ["Dilli Haat Excellence Award 2020"],
        techniques: ["Running Stitch", "Story Quilting", "Upcycled Textiles"]
    }
]

export const craftCategories = [
    "All Crafts",
    "Textiles",
    "Pottery",
    "Metal Work",
    "Wood Carving",
    "Embroidery",
    "Painting",
    "Jewelry"
]

export const stateFilters = [
    "All States",
    "Rajasthan",
    "Kerala",
    "Gujarat",
    "Tamil Nadu",
    "West Bengal",
    "Punjab",
    "Maharashtra",
    "Karnataka"
]
