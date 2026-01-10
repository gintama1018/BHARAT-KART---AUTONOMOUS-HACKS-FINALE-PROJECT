"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  MapPin,
  Users,
  Star,
  Heart,
  ShoppingBag,
  Play,
  Calendar,
  Award,
  Sparkles,
  Filter,
  Grid3X3,
  List,
} from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { statesData } from "@/lib/states-data"
import { Breadcrumbs, getStateBreadcrumbs } from "@/components/ui/breadcrumbs"

export default function StatePage() {
  const params = useParams()
  const slug = params.slug as string
  const [activeTab, setActiveTab] = useState("products")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const currentState = statesData[slug] || statesData.rajasthan // Fallback to Rajasthan if slug invalid

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-orange-200"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/states" className="flex items-center text-orange-600 hover:text-orange-700">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to States
              </Link>

              <Link href="/" className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r ${currentState.gradient || "from-orange-500 to-red-600"}`}
                >
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1
                    className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${currentState.gradient || "from-orange-600 to-red-600"}`}
                  >
                    BharatKart
                  </h1>
                </div>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-orange-600">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-orange-600 relative">
                <ShoppingBag className="w-5 h-5" />
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1">3</Badge>
              </Button>
              <Link href="/get-started">
                <Button
                  className={`text-white bg-gradient-to-r ${currentState.gradient || "from-orange-500 to-red-600"}`}
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={getStateBreadcrumbs(currentState.name, currentState.nameHindi)}
        className="bg-white dark:bg-gray-800 border-b border-orange-100 dark:border-gray-700"
      />

      {/* Hero Banner */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={currentState.backgroundImage || "/placeholder.svg"}
            alt={currentState.name}
            className="w-full h-full object-cover"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-r ${currentState.gradient} opacity-80 mix-blend-multiply`}
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <motion.div
            className="text-white max-w-3xl"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">{currentState.name}</h1>
            <p className="text-2xl text-white/90 mb-2 font-medium">{currentState.nameHindi}</p>
            <p className="text-xl mb-6 italic text-white/80">{currentState.tagline}</p>
            <p className="text-lg mb-8 leading-relaxed max-w-2xl">{currentState.description}</p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-white/90">
                Shop {currentState.name} Crafts
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 bg-transparent"
              >
                <Play className="w-5 h-5 mr-2" />
                Watch Cultural Stories
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-12 bg-white border-b border-orange-100">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {[
              { icon: Users, number: currentState.statistics.artisans, label: "Master Artisans" },
              { icon: ShoppingBag, number: currentState.statistics.products, label: "Unique Products" },
              { icon: MapPin, number: currentState.statistics.heritageSites, label: "Heritage Sites" },
              { icon: Calendar, number: currentState.statistics.festivals, label: "Annual Festivals" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-6 bg-gradient-to-br from-gray-50 to-orange-50/50 rounded-xl border border-orange-100"
                whileHover={{ scale: 1.05 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${currentState.gradient}`}
                  >
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Cultural Heritage Section */}
      <section className="py-16 bg-gradient-to-br from-white via-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r ${currentState.gradient}`}>
              Cultural Heritage
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{currentState.culturalStory}</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {currentState.specialties.map((specialty, index) => (
              <motion.div
                key={specialty}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
              >
                <Card className="p-4 text-center bg-white border-orange-200 hover:shadow-lg transition-all cursor-pointer h-full flex flex-col items-center justify-center gap-2">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br ${currentState.gradient}`}
                  >
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm">{specialty}</h3>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs Navigation */}
      <section className="py-8 bg-white border-b border-orange-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
              {[
                { id: "products", label: "Products" },
                { id: "artisans", label: "Artisans" },
                { id: "heritage", label: "Heritage Sites" },
              ].map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  onClick={() => setActiveTab(tab.id)}
                  className={
                    activeTab === tab.id
                      ? `text-white bg-gradient-to-r ${currentState.gradient}`
                      : "text-gray-600 hover:bg-gray-200"
                  }
                >
                  {tab.label}
                </Button>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  onClick={() => setViewMode("grid")}
                  size="sm"
                  className={
                    viewMode === "grid"
                      ? `text-white bg-gradient-to-r ${currentState.gradient}`
                      : "border-gray-300 text-gray-600"
                  }
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  onClick={() => setViewMode("list")}
                  size="sm"
                  className={
                    viewMode === "list"
                      ? `text-white bg-gradient-to-r ${currentState.gradient}`
                      : "border-gray-300 text-gray-600"
                  }
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              <Button variant="outline" className="border-gray-300 text-gray-600 bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-12 min-h-[400px]">
        <div className="container mx-auto px-4">
          <AnimatePresence mode="wait">
            {activeTab === "products" && (
              <motion.div
                key="products"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {currentState.featuredProducts.length > 0 ? (
                  <div
                    className={`grid gap-8 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
                      }`}
                  >
                    {currentState.featuredProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -10 }}
                      >
                        <Card
                          className={`overflow-hidden group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300 ${viewMode === "list" ? "flex" : ""
                            }`}
                        >
                          <div className={`relative overflow-hidden ${viewMode === "list" ? "w-64 h-48" : "h-64"}`}>
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute top-4 right-4">
                              <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white text-red-500">
                                <Heart className="w-4 h-4" />
                              </Button>
                            </div>
                            <div className="absolute bottom-4 left-4">
                              <Badge className="bg-red-500 text-white">
                                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                              </Badge>
                            </div>
                          </div>

                          <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                            <div className="mb-4">
                              <h3 className="text-xl font-bold text-gray-800 mb-2">{product.name}</h3>
                              <p className="text-sm text-gray-600 mb-2">by {product.artisan}</p>
                              <div className="flex items-center space-x-2 mb-3">
                                <div className="flex items-center">
                                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                  <span className="text-sm font-medium ml-1">{product.rating}</span>
                                </div>
                                <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between mb-4">
                              <div>
                                <span className="text-2xl font-bold text-gray-800">₹{product.price}</span>
                                <span className="text-lg text-gray-500 line-through ml-2">₹{product.originalPrice}</span>
                              </div>
                            </div>

                            <Button
                              className={`w-full text-white bg-gradient-to-r ${currentState.gradient}`}
                            >
                              Add to Cart
                            </Button>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <ShoppingBag className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p>No products featured for {currentState.name} yet.</p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "artisans" && (
              <motion.div
                key="artisans"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {currentState.featuredArtisans.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {currentState.featuredArtisans.map((artisan, index) => (
                      <motion.div
                        key={artisan.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        whileHover={{ y: -10 }}
                      >
                        <Card className="overflow-hidden group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300">
                          <div className="relative h-64 overflow-hidden">
                            <img
                              src={artisan.image || "/placeholder.svg"}
                              alt={artisan.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            <div className="absolute bottom-4 left-4 text-white">
                              <div className="flex items-center space-x-2 mb-2">
                                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                <span className="text-sm font-medium">{artisan.rating}</span>
                              </div>
                              <Badge className="bg-white/20 text-white border-white/30">
                                {artisan.products} Products
                              </Badge>
                            </div>
                            <Button
                              size="sm"
                              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white border-white/30"
                            >
                              <Play className="w-4 h-4" />
                            </Button>
                          </div>

                          <div className="p-6">
                            <div className="mb-4">
                              <h3 className="text-xl font-bold text-gray-800 mb-1">{artisan.name}</h3>
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline" className="text-gray-600 border-gray-300">{artisan.craft}</Badge>
                              </div>
                              <p className="text-sm text-gray-600">
                                {artisan.location} • {artisan.experience}
                              </p>
                            </div>

                            <p className="text-gray-700 text-sm mb-4">{artisan.story}</p>

                            <Button
                              variant="outline"
                              className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent"
                            >
                              View Profile & Products
                            </Button>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Users className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p>No featured artisans for {currentState.name} yet.</p>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "heritage" && (
              <div className="text-center py-12 text-gray-500">
                <MapPin className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <p>Heritage sites gallery coming soon.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
