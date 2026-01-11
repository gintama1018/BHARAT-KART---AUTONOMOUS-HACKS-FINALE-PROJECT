"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

// Supported languages
export const languages = {
    en: { name: "English", nativeName: "English", flag: "🇬🇧" },
    hi: { name: "Hindi", nativeName: "हिंदी", flag: "🇮🇳" },
    gu: { name: "Gujarati", nativeName: "ગુજરાતી", flag: "🇮🇳" },
    ta: { name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳" },
    te: { name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳" },
    bn: { name: "Bengali", nativeName: "বাংলা", flag: "🇮🇳" },
    mr: { name: "Marathi", nativeName: "मराठी", flag: "🇮🇳" },
    kn: { name: "Kannada", nativeName: "ಕನ್ನಡ", flag: "🇮🇳" },
    ml: { name: "Malayalam", nativeName: "മലയാളം", flag: "🇮🇳" },
    pa: { name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
    or: { name: "Odia", nativeName: "ଓଡ଼ିଆ", flag: "🇮🇳" },
} as const

export type LanguageCode = keyof typeof languages

// Translations
export const translations: Record<LanguageCode, Record<string, string>> = {
    en: {
        // Navigation
        "nav.home": "Home",
        "nav.explore": "Explore",
        "nav.states": "States",
        "nav.artisans": "Artisans",
        "nav.categories": "Categories",
        "nav.cart": "Cart",
        "nav.profile": "Profile",
        "nav.signIn": "Sign In",
        "nav.signUp": "Sign Up",
        "nav.signOut": "Sign Out",

        // Home
        "home.hero.title": "Discover India's",
        "home.hero.titleHighlight": "Authentic Crafts",
        "home.hero.subtitle": "Connecting artisans with the world, one handcrafted piece at a time",
        "home.featured": "Featured Products",
        "home.trending": "Trending Now",
        "home.exploreStates": "Explore by States",
        "home.shopNow": "Shop Now",
        "home.viewAll": "View All",

        // Products
        "product.addToCart": "Add to Cart",
        "product.buyNow": "Buy Now",
        "product.inStock": "In Stock",
        "product.outOfStock": "Out of Stock",
        "product.reviews": "Reviews",
        "product.description": "Description",
        "product.specifications": "Specifications",
        "product.byArtisan": "By",
        "product.from": "From",

        // Cart
        "cart.title": "Shopping Cart",
        "cart.empty": "Your cart is empty",
        "cart.continueShopping": "Continue Shopping",
        "cart.checkout": "Proceed to Checkout",
        "cart.subtotal": "Subtotal",
        "cart.shipping": "Shipping",
        "cart.tax": "Tax",
        "cart.total": "Total",
        "cart.remove": "Remove",

        // Auth
        "auth.login": "Sign In",
        "auth.register": "Create Account",
        "auth.email": "Email Address",
        "auth.password": "Password",
        "auth.confirmPassword": "Confirm Password",
        "auth.fullName": "Full Name",
        "auth.forgotPassword": "Forgot Password?",
        "auth.noAccount": "Don't have an account?",
        "auth.hasAccount": "Already have an account?",
        "auth.orContinueWith": "or continue with",

        // Profile
        "profile.title": "My Profile",
        "profile.personalInfo": "Personal Information",
        "profile.addresses": "Addresses",
        "profile.orders": "My Orders",
        "profile.settings": "Settings",
        "profile.edit": "Edit",
        "profile.save": "Save",

        // Artisans
        "artisan.experience": "years of experience",
        "artisan.products": "Products",
        "artisan.story": "Story",
        "artisan.awards": "Awards",
        "artisan.techniques": "Techniques",
        "artisan.addProduct": "Add Product",
        "artisan.voiceInput": "Use Voice to Add Product",

        // Voice
        "voice.record": "Start Recording",
        "voice.stop": "Stop Recording",
        "voice.replay": "Replay",
        "voice.rerecord": "Re-record",
        "voice.process": "Process with AI",
        "voice.processing": "Processing...",
        "voice.speakNow": "Speak now in your preferred language",
        "voice.tips": "Tips for best results",

        // Common
        "common.loading": "Loading...",
        "common.error": "Something went wrong",
        "common.retry": "Retry",
        "common.cancel": "Cancel",
        "common.confirm": "Confirm",
        "common.search": "Search",
        "common.filter": "Filter",
        "common.sort": "Sort",
        "common.price": "Price",
        "common.rating": "Rating",
    },

    hi: {
        // Navigation
        "nav.home": "होम",
        "nav.explore": "खोजें",
        "nav.states": "राज्य",
        "nav.artisans": "कारीगर",
        "nav.categories": "श्रेणियाँ",
        "nav.cart": "कार्ट",
        "nav.profile": "प्रोफ़ाइल",
        "nav.signIn": "साइन इन",
        "nav.signUp": "साइन अप",
        "nav.signOut": "साइन आउट",

        // Home
        "home.hero.title": "भारत की खोज करें",
        "home.hero.titleHighlight": "प्रामाणिक शिल्प",
        "home.hero.subtitle": "कारीगरों को दुनिया से जोड़ना, एक हस्तनिर्मित टुकड़ा",
        "home.featured": "विशेष उत्पाद",
        "home.trending": "ट्रेंडिंग",
        "home.exploreStates": "राज्यों द्वारा खोजें",
        "home.shopNow": "अभी खरीदें",
        "home.viewAll": "सभी देखें",

        // Products
        "product.addToCart": "कार्ट में डालें",
        "product.buyNow": "अभी खरीदें",
        "product.inStock": "स्टॉक में",
        "product.outOfStock": "स्टॉक में नहीं",
        "product.reviews": "समीक्षाएं",
        "product.description": "विवरण",
        "product.specifications": "विशेषताएँ",
        "product.byArtisan": "द्वारा",
        "product.from": "से",

        // Cart
        "cart.title": "शॉपिंग कार्ट",
        "cart.empty": "आपका कार्ट खाली है",
        "cart.continueShopping": "खरीदारी जारी रखें",
        "cart.checkout": "चेकआउट करें",
        "cart.subtotal": "उप-योग",
        "cart.shipping": "शिपिंग",
        "cart.tax": "कर",
        "cart.total": "कुल",
        "cart.remove": "हटाएं",

        // Auth
        "auth.login": "साइन इन करें",
        "auth.register": "खाता बनाएं",
        "auth.email": "ईमेल पता",
        "auth.password": "पासवर्ड",
        "auth.confirmPassword": "पासवर्ड की पुष्टि करें",
        "auth.fullName": "पूरा नाम",
        "auth.forgotPassword": "पासवर्ड भूल गए?",
        "auth.noAccount": "खाता नहीं है?",
        "auth.hasAccount": "पहले से खाता है?",
        "auth.orContinueWith": "या इसके साथ जारी रखें",

        // Profile
        "profile.title": "मेरी प्रोफ़ाइल",
        "profile.personalInfo": "व्यक्तिगत जानकारी",
        "profile.addresses": "पते",
        "profile.orders": "मेरे ऑर्डर",
        "profile.settings": "सेटिंग्स",
        "profile.edit": "संपादित करें",
        "profile.save": "सहेजें",

        // Artisans
        "artisan.experience": "वर्षों का अनुभव",
        "artisan.products": "उत्पाद",
        "artisan.story": "कहानी",
        "artisan.awards": "पुरस्कार",
        "artisan.techniques": "तकनीक",
        "artisan.addProduct": "उत्पाद जोड़ें",
        "artisan.voiceInput": "उत्पाद जोड़ने के लिए आवाज़ का उपयोग करें",

        // Voice
        "voice.record": "रिकॉर्डिंग शुरू करें",
        "voice.stop": "रिकॉर्डिंग बंद करें",
        "voice.replay": "फिर से सुनें",
        "voice.rerecord": "फिर से रिकॉर्ड करें",
        "voice.process": "AI से प्रोसेस करें",
        "voice.processing": "प्रोसेसिंग...",
        "voice.speakNow": "अपनी पसंदीदा भाषा में बोलें",
        "voice.tips": "बेहतर परिणाम के लिए टिप्स",

        // Common
        "common.loading": "लोड हो रहा है...",
        "common.error": "कुछ गलत हो गया",
        "common.retry": "पुनः प्रयास करें",
        "common.cancel": "रद्द करें",
        "common.confirm": "पुष्टि करें",
        "common.search": "खोजें",
        "common.filter": "फ़िल्टर",
        "common.sort": "क्रमबद्ध करें",
        "common.price": "मूल्य",
        "common.rating": "रेटिंग",
    },

    // Gujarati
    gu: {
        "nav.home": "હોમ",
        "nav.explore": "શોધો",
        "nav.states": "રાજ્યો",
        "nav.artisans": "કારીગરો",
        "nav.cart": "કાર્ટ",
        "nav.signIn": "સાઇન ઇન",
        "nav.signOut": "સાઇન આઉટ",
        "home.hero.title": "ભારતની શોધ કરો",
        "home.hero.titleHighlight": "પ્રામાણિક શિલ્પ",
        "home.shopNow": "હમણાં ખરીદો",
        "product.addToCart": "કાર્ટમાં ઉમેરો",
        "cart.title": "શોપિંગ કાર્ટ",
        "common.loading": "લોડ થઈ રહ્યું છે...",
    },

    // Tamil
    ta: {
        "nav.home": "முகப்பு",
        "nav.explore": "ஆராய்க",
        "nav.states": "மாநிலங்கள்",
        "nav.artisans": "கைவினைஞர்கள்",
        "nav.cart": "வண்டி",
        "nav.signIn": "உள்நுழைக",
        "nav.signOut": "வெளியேறு",
        "home.hero.title": "இந்தியாவை கண்டறியுங்கள்",
        "home.hero.titleHighlight": "உண்மையான கைவினை",
        "home.shopNow": "இப்போது வாங்கு",
        "product.addToCart": "கூடைக்கு சேர்",
        "cart.title": "ஷாப்பிங் கார்ட்",
        "common.loading": "ஏற்றுகிறது...",
    },

    // Telugu
    te: {
        "nav.home": "హోమ్",
        "nav.explore": "అన్వేషించండి",
        "nav.states": "రాష్ట్రాలు",
        "nav.artisans": "కళాకారులు",
        "nav.cart": "కార్ట్",
        "nav.signIn": "సైన్ ఇన్",
        "nav.signOut": "సైన్ అవుట్",
        "home.hero.title": "భారతదేశాన్ని కనుగొనండి",
        "home.hero.titleHighlight": "ప్రామాణిక చేతిపనులు",
        "home.shopNow": "ఇప్పుడే కొనండి",
        "product.addToCart": "కార్ట్‌కు జోడించండి",
        "cart.title": "షాపింగ్ కార్ట్",
        "common.loading": "లోడ్ అవుతోంది...",
    },

    // Bengali
    bn: {
        "nav.home": "হোম",
        "nav.explore": "অন্বেষণ করুন",
        "nav.states": "রাজ্য",
        "nav.artisans": "কারিগর",
        "nav.cart": "কার্ট",
        "nav.signIn": "সাইন ইন",
        "nav.signOut": "সাইন আউট",
        "home.hero.title": "ভারত আবিষ্কার করুন",
        "home.hero.titleHighlight": "খাঁটি হস্তশিল্প",
        "home.shopNow": "এখনই কিনুন",
        "product.addToCart": "কার্টে যোগ করুন",
        "cart.title": "শপিং কার্ট",
        "common.loading": "লোড হচ্ছে...",
    },

    // Marathi
    mr: {
        "nav.home": "मुखपृष्ठ",
        "nav.explore": "शोधा",
        "nav.states": "राज्ये",
        "nav.artisans": "कारागीर",
        "nav.cart": "कार्ट",
        "nav.signIn": "साइन इन",
        "nav.signOut": "साइन आउट",
        "home.hero.title": "भारत शोधा",
        "home.hero.titleHighlight": "अस्सल हस्तकला",
        "home.shopNow": "आता खरेदी करा",
        "product.addToCart": "कार्टमध्ये टाका",
        "cart.title": "शॉपिंग कार्ट",
        "common.loading": "लोड होत आहे...",
    },

    // Kannada
    kn: {
        "nav.home": "ಮುಖಪುಟ",
        "nav.explore": "ಅನ್ವೇಷಿಸಿ",
        "nav.states": "ರಾಜ್ಯಗಳು",
        "nav.artisans": "ಕುಶಲಕರ್ಮಿಗಳು",
        "nav.cart": "ಕಾರ್ಟ್",
        "nav.signIn": "ಸೈನ್ ಇನ್",
        "nav.signOut": "ಸೈನ್ ಔಟ್",
        "home.hero.title": "ಭಾರತವನ್ನು ಕಂಡುಹಿಡಿಯಿರಿ",
        "home.hero.titleHighlight": "ಅಸಲಿ ಕರಕುಶಲ",
        "home.shopNow": "ಈಗ ಖರೀದಿಸಿ",
        "product.addToCart": "ಕಾರ್ಟ್‌ಗೆ ಸೇರಿಸಿ",
        "cart.title": "ಶಾಪಿಂಗ್ ಕಾರ್ಟ್",
        "common.loading": "ಲೋಡ್ ಆಗುತ್ತಿದೆ...",
    },

    // Malayalam
    ml: {
        "nav.home": "ഹോം",
        "nav.explore": "പര്യവേക്ഷണം",
        "nav.states": "സംസ്ഥാനങ്ങൾ",
        "nav.artisans": "കരകൗശലക്കാർ",
        "nav.cart": "കാർട്ട്",
        "nav.signIn": "സൈൻ ഇൻ",
        "nav.signOut": "സൈൻ ഔട്ട്",
        "home.hero.title": "ഇന്ത്യ കണ്ടെത്തുക",
        "home.hero.titleHighlight": "യഥാർത്ഥ കരകൗശലം",
        "home.shopNow": "ഇപ്പോൾ ഷോപ്പ് ചെയ്യുക",
        "product.addToCart": "കാർട്ടിലേക്ക് ചേർക്കുക",
        "cart.title": "ഷോപ്പിംഗ് കാർട്ട്",
        "common.loading": "ലോഡ് ചെയ്യുന്നു...",
    },

    // Punjabi
    pa: {
        "nav.home": "ਹੋਮ",
        "nav.explore": "ਖੋਜ",
        "nav.states": "ਰਾਜ",
        "nav.artisans": "ਕਾਰੀਗਰ",
        "nav.cart": "ਕਾਰਟ",
        "nav.signIn": "ਸਾਈਨ ਇਨ",
        "nav.signOut": "ਸਾਈਨ ਆਊਟ",
        "home.hero.title": "ਭਾਰਤ ਦੀ ਖੋਜ ਕਰੋ",
        "home.hero.titleHighlight": "ਅਸਲੀ ਦਸਤਕਾਰੀ",
        "home.shopNow": "ਹੁਣੇ ਖਰੀਦੋ",
        "product.addToCart": "ਕਾਰਟ ਵਿੱਚ ਸ਼ਾਮਲ ਕਰੋ",
        "cart.title": "ਸ਼ਾਪਿੰਗ ਕਾਰਟ",
        "common.loading": "ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...",
    },

    // Odia
    or: {
        "nav.home": "ହୋମ",
        "nav.explore": "ଅନ୍ୱେଷଣ",
        "nav.states": "ରାଜ୍ୟ",
        "nav.artisans": "କାରିଗର",
        "nav.cart": "କାର୍ଟ",
        "nav.signIn": "ସାଇନ ଇନ",
        "nav.signOut": "ସାଇନ ଆଉଟ",
        "home.hero.title": "ଭାରତ ଆବିଷ୍କାର କରନ୍ତୁ",
        "home.hero.titleHighlight": "ପ୍ରାମାଣିକ ହସ୍ତଶିଳ୍ପ",
        "home.shopNow": "ବର୍ତ୍ତମାନ କିଣନ୍ତୁ",
        "product.addToCart": "କାର୍ଟରେ ଯୋଗ କରନ୍ତୁ",
        "cart.title": "ସପିଂ କାର୍ଟ",
        "common.loading": "ଲୋଡ୍ ହେଉଛି...",
    },
}

interface LanguageContextType {
    locale: LanguageCode
    setLocale: (locale: LanguageCode) => void
    t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<LanguageCode>("en")

    useEffect(() => {
        // Load saved language preference
        const saved = localStorage.getItem("bharatkart-language") as LanguageCode
        if (saved && languages[saved]) {
            setLocaleState(saved)
        }
    }, [])

    const setLocale = (newLocale: LanguageCode) => {
        setLocaleState(newLocale)
        localStorage.setItem("bharatkart-language", newLocale)
    }

    // Translation function
    const t = (key: string): string => {
        // Try current locale first
        if (translations[locale]?.[key]) {
            return translations[locale][key]
        }
        // Fallback to English
        if (translations.en?.[key]) {
            return translations.en[key]
        }
        // Return key if no translation found
        return key
    }

    return (
        <LanguageContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </LanguageContext.Provider>
    )
}

export function useLanguage() {
    const context = useContext(LanguageContext)
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider")
    }
    return context
}
