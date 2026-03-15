"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { PremiumButton } from "@/components/cultural/premium-buttons"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, MapPin, Users, Star, Heart, ShoppingBag, Globe, Sparkles, Menu, X } from "lucide-react"
import Link from "next/link"
import { FloatingElements } from "@/components/cultural/floating-elements"
import { ParallaxSection } from "@/components/cultural/parallax-section"
import { CulturalTransition } from "@/components/cultural/cultural-transitions"
import { InteractiveMap } from "@/components/cultural/interactive-map"
import { ThreeDEnvironment } from "@/components/cultural/three-d-environment"
import { useSound, useCulturalSounds } from "@/components/cultural/advanced-sound-manager"
import { createClient } from "@/lib/supabase"

export default function LandingPage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [productCount, setProductCount] = useState<number>(15000)
  const { playAmbient } = useSound()
  const { playHover, playClick } = useCulturalSounds()

  const heroSlides = [
    {
      title: "Where Stories Become Treasures",
      subtitle: "Experience India's Soul Through Authentic Crafts",
      theme: "diwali",
      bgColor: "from-primary via-amber-500 to-orange-600",
    },
    {
      title: "Colors of Heritage",
      subtitle: "Celebrating Holi Through Handcrafted Masterpieces",
      theme: "holi",
      bgColor: "from-pink-500 via-purple-500 to-blue-500",
    },
    {
      title: "Royal Traditions",
      subtitle: "Discover Rajputana Crafts from the Land of Kings",
      theme: "royal",
      bgColor: "from-red-700 via-primary to-orange-500",
    },
  ]

  const culturalStats = [
    { number: "28", label: "States", icon: MapPin },
    { number: "2000+", label: "Artisans", icon: Users },
    { number: `${productCount}+`, label: "Products", icon: ShoppingBag },
    { number: "4.9", label: "Rating", icon: Star },
  ]

  const featuredStates = [
    {
      name: "Rajasthan",
      nameHindi: "राजस्थान",
      tagline: "Land of Kings",
      image: "/images/cultural/rajasthan.jpg",
      specialties: ["Blue Pottery", "Kathputli", "Block Prints"],
      color: "from-red-600 to-primary",
    },
    {
      name: "Kerala",
      nameHindi: "केरल",
      tagline: "God's Own Country",
      image: "/images/cultural/kerala.jpg",
      specialties: ["Coir Products", "Spices", "Ayurveda"],
      color: "from-secondary to-teal-500",
    },
    {
      name: "Gujarat",
      nameHindi: "गुजरात",
      tagline: "Vibrant Gujarat",
      image: "/images/cultural/gujarat.jpg",
      specialties: ["Bandhani", "Mirror Work", "Patola"],
      color: "from-yellow-500 to-pink-500",
    },
    {
      name: "Tamil Nadu",
      nameHindi: "तमिल नाडु",
      tagline: "Temple Land",
      image: "/images/cultural/tamil-nadu.jpg",
      specialties: ["Bronze Idols", "Silk Sarees", "Tanjore Art"],
      color: "from-amber-600 to-red-500",
    },
  ]

  useEffect(() => {
    setIsLoaded(true)
    playAmbient("landing")

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    
    // Fetch product count from Supabase
    async function fetchStats() {
      const supabase = createClient()
      const { count } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        
      if (count !== null) {
        setProductCount(count)
      }
    }
    
    fetchStats()
    
    return () => clearInterval(interval)
  }, [playAmbient])

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <ThreeDEnvironment scene="landing" className="absolute inset-0 z-0" />
      <FloatingElements count={25} />



      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-60"
            poster="/indian-artisan-crafting-pottery.jpg"
          >
            <source
              src="https://cdn.pixabay.com/vimeo/580351/spinning-wheel-28795.mp4?width=1280&hash=ace9bb74b2a64f76b8a8dafee0f1f7cd23e43a1a"
              type="video/mp4"
            />
          </video>

          <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-orange-900/75 to-amber-950/80" />

          <motion.div
            className="absolute inset-0 opacity-5"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
            style={{
              backgroundImage: "url('/indian-mandala-pattern.png')",
              backgroundSize: "200px 200px",
              backgroundRepeat: "repeat",
            }}
          />
        </div>

        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <CulturalTransition key={currentSlide} type="kaleidoscope">
              <motion.div>
                <motion.h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight text-balance text-white"
                  style={{
                    textShadow: "0 4px 20px rgba(0,0,0,0.4), 0 0 60px rgba(255,255,255,0.2)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  {heroSlides[currentSlide].title}
                </motion.h1>

                <motion.p
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 font-medium max-w-4xl mx-auto text-pretty"
                  style={{
                    color: "#FFFFFF",
                    textShadow: "0 2px 10px rgba(0,0,0,0.5), 0 0 40px rgba(0,0,0,0.3)",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {heroSlides[currentSlide].subtitle}
                </motion.p>
              </motion.div>
            </CulturalTransition>
          </AnimatePresence>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/explore">
              <PremiumButton
                size="lg"
                variant="primary"
                data-cursor="button"
                onClick={playClick}
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl"
              >
                Begin Your Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </PremiumButton>
            </Link>
            <PremiumButton
              size="lg"
              variant="secondary"
              data-cursor="button"
              onClick={playClick}
              className="w-full sm:w-auto border-white/60 text-white hover:bg-white/10 bg-transparent backdrop-blur-sm"
            >
              Watch Stories
            </PremiumButton>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            {culturalStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                }}
                transition={{ type: "spring", stiffness: 300 }}
                onMouseEnter={playHover}
                data-cursor="product"
              >
                <motion.div
                  className="flex justify-center mb-2"
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.5,
                  }}
                >
                  <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400" />
                </motion.div>
                <motion.div
                  className="text-xl sm:text-2xl md:text-3xl font-bold text-white"
                  animate={{
                    textShadow: [
                      "0 0 10px rgba(255, 255, 255, 0.5)",
                      "0 0 20px rgba(255, 255, 255, 0.8)",
                      "0 0 10px rgba(255, 255, 255, 0.5)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.3,
                  }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm sm:text-base text-yellow-200">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          {heroSlides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => {
                setCurrentSlide(index)
                playClick()
              }}
              className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all ${index === currentSlide ? "bg-white shadow-lg" : "bg-white/50"
                }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              data-cursor="button"
            />
          ))}
        </div>
      </section>

      {/* Enhanced Heritage Exploration Section */}
      <ParallaxSection speed={0.3}>
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-background via-card to-muted relative">
          <div className="absolute inset-0 opacity-30">
            <ThreeDEnvironment scene="landing" className="w-full h-full" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-orange-600 bg-clip-text text-transparent text-balance">
                Explore Our Heritage
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 text-pretty">
                Journey through 28 states, each with unique traditions and masterful artisans
              </p>

              <div className="mb-8 sm:mb-12">
                <InteractiveMap />
              </div>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {featuredStates.map((state, index) => (
                <CulturalTransition key={state.name} type="mandala">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{
                      y: -10,
                      rotateY: 5,
                      scale: 1.02,
                    }}
                    className="perspective-1000"
                    onMouseEnter={playHover}
                    data-cursor="product"
                  >
                    <Card className="overflow-hidden group cursor-pointer border border-orange-200 dark:border-orange-900/40 shadow-lg hover:shadow-2xl transition-all duration-300 bg-card rounded-2xl">
                      <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                        <img
                          src={state.image || "/placeholder.svg"}
                          alt={state.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div
                          className={`absolute inset-0 bg-gradient-to-t ${state.color} opacity-60 group-hover:opacity-40 transition-opacity`}
                        />
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-white/95 text-gray-800 font-semibold text-xs shadow-sm border border-orange-200">
                            {state.specialties.length} Crafts
                          </Badge>
                        </div>
                      </div>

                      <div className="p-5 sm:p-6">
                        <div className="mb-4">
                          <h3 className="text-lg sm:text-xl font-bold text-card-foreground">{state.name}</h3>
                          <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">{state.nameHindi}</p>
                          <p className="text-sm text-muted-foreground italic mt-1">{state.tagline}</p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {state.specialties.map((specialty) => (
                            <Badge
                              key={specialty}
                              variant="secondary"
                              className="text-xs bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800"
                            >
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                </CulturalTransition>
              ))}
            </div>

            <motion.div
              className="text-center mt-8 sm:mt-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Link href="/states">
                <PremiumButton
                  size="lg"
                  variant="primary"
                  data-cursor="button"
                  onClick={playClick}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
                >
                  Explore All 28 States
                  <ArrowRight className="ml-2 w-5 h-5" />
                </PremiumButton>
              </Link>
            </motion.div>
          </div>
        </section>
      </ParallaxSection>

      {/* Cultural Impact Section */}
      <ParallaxSection speed={0.5}>
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-primary via-orange-600 to-amber-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('/indian-mandala-pattern.png')] bg-repeat opacity-20" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              className="text-center mb-12 sm:mb-16"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance">
                Preserving Heritage, Empowering Artisans
              </h2>
              <p className="text-lg sm:text-xl text-yellow-100 max-w-4xl mx-auto text-pretty">
                Every purchase supports traditional craftspeople and helps preserve India's rich cultural legacy for
                future generations
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
              {[
                { number: "2000+", label: "Artisans Supported", desc: "Across 28 states" },
                { number: "₹50L+", label: "Earnings Generated", desc: "For rural communities" },
                { number: "500+", label: "Traditions Preserved", desc: "Ancient crafts saved" },
              ].map((impact, index) => (
                <motion.div
                  key={impact.label}
                  className="text-center p-6 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 text-yellow-300">{impact.number}</div>
                  <div className="text-lg sm:text-xl font-semibold mb-1">{impact.label}</div>
                  <div className="text-yellow-200 text-sm sm:text-base">{impact.desc}</div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <Link href="/impact">
                <PremiumButton
                  size="lg"
                  variant="secondary"
                  className="border-white text-white hover:bg-white hover:text-primary bg-transparent backdrop-blur-sm"
                >
                  Learn About Our Impact
                </PremiumButton>
              </Link>
            </motion.div>
          </div>
        </section>
      </ParallaxSection>

      {/* Cultural Footer */}
      <footer className="bg-gray-900 text-white py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-10">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">BharatKart</h3>
                  <p className="text-sm text-orange-400 font-medium">भारत कार्ट</p>
                </div>
              </div>
              <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                Connecting India's heritage with the world through authentic craftsmanship.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-orange-400 text-lg">Explore</h4>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <Link href="/states" className="hover:text-orange-400 transition-colors text-sm">
                    All States
                  </Link>
                </li>
                <li>
                  <Link href="/artisans" className="hover:text-orange-400 transition-colors text-sm">
                    Meet Artisans
                  </Link>
                </li>
                <li>
                  <Link href="/collections" className="hover:text-orange-400 transition-colors text-sm">
                    Collections
                  </Link>
                </li>
                <li>
                  <Link href="/festivals" className="hover:text-orange-400 transition-colors text-sm">
                    Festivals
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-orange-400 text-lg">Support</h4>
              <ul className="space-y-3 text-gray-300">
                <li>
                  <Link href="/help" className="hover:text-orange-400 transition-colors text-sm">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-orange-400 transition-colors text-sm">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-orange-400 transition-colors text-sm">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-orange-400 transition-colors text-sm">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-orange-400 text-lg">Connect</h4>
              <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                Join our cultural community and stay updated with new artisan stories.
              </p>
              <div className="flex space-x-2">
                <PremiumButton size="sm" variant="primary" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-md">
                  Subscribe
                </PremiumButton>
              </div>
            </div>
          </div>

          <div className="border-t border-orange-900/30 pt-8 text-center">
            <p className="text-gray-300 text-sm">&copy; 2024 BharatKart. Celebrating India's Heritage. Made with ❤️ for our artisans.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
