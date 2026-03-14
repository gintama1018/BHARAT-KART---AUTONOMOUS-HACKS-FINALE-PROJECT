"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Star, Award, MapPin, ShoppingBag, Filter, Heart, ArrowRight } from "lucide-react"
import Link from "next/link"
import { PageContainer, PageHero, Section } from "@/components/layout/page-layout"
import { artisansData, craftCategories, stateFilters } from "@/lib/artisans-data"
import { breadcrumbConfigs } from "@/components/ui/breadcrumbs"

export default function ArtisansPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCraft, setSelectedCraft] = useState("All Crafts")
    const [selectedState, setSelectedState] = useState("All States")

    const filteredArtisans = artisansData.filter((artisan) => {
        const matchesSearch =
            artisan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            artisan.craft.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCraft = selectedCraft === "All Crafts" || artisan.craft.includes(selectedCraft)
        const matchesState = selectedState === "All States" || artisan.state === selectedState
        return matchesSearch && matchesCraft && matchesState
    })

    return (
        <PageContainer>
            <PageHero
                title="Meet Our Master Artisans"
                titleHindi="हमारे कारीगरों से मिलें"
                subtitle="Discover the skilled hands behind India's most treasured crafts. Each artisan carries forward generations of tradition and mastery."
                breadcrumbs={[...breadcrumbConfigs.artisans]}
            >
                <div className="max-w-2xl mx-auto mt-8">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-400" />
                        <Input
                            placeholder="Search artisans by name or craft..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12 pr-4 py-4 text-lg bg-white/10 backdrop-blur-md border-white/30 text-white placeholder:text-white/70 focus:border-white rounded-full"
                        />
                    </div>
                </div>
            </PageHero>

            {/* Filters */}
            <section className="py-6 bg-white dark:bg-gray-800 border-b border-orange-100 dark:border-gray-700 sticky top-16 z-40">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex flex-wrap gap-2">
                            {craftCategories.slice(0, 5).map((craft) => (
                                <Button
                                    key={craft}
                                    variant={selectedCraft === craft ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setSelectedCraft(craft)}
                                    className={selectedCraft === craft
                                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0"
                                        : "border-orange-300 text-orange-600 hover:bg-orange-50 dark:border-orange-700 dark:text-orange-400"
                                    }
                                >
                                    {craft}
                                </Button>
                            ))}
                        </div>
                        <div className="flex items-center gap-2">
                            <select
                                value={selectedState}
                                onChange={(e) => setSelectedState(e.target.value)}
                                className="px-4 py-2 border border-orange-300 rounded-lg text-gray-700 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:ring-orange-500 focus:border-orange-500"
                            >
                                {stateFilters.map((state) => (
                                    <option key={state} value={state}>{state}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            {/* Artisans Grid */}
            <Section>
                <div className="mb-6">
                    <p className="text-gray-600 dark:text-gray-300">
                        Showing {filteredArtisans.length} artisans
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredArtisans.map((artisan, index) => (
                        <motion.div
                            key={artisan.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                        >
                            <Card className="overflow-hidden group cursor-pointer border border-orange-200 dark:border-orange-900/40 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-gray-800">
                                <div className="relative h-56 overflow-hidden">
                                    <img
                                        src={artisan.image || "/placeholder.svg"}
                                        alt={artisan.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <button className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition-colors">
                                        <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                                    </button>
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <Badge className="bg-orange-500 text-white border-0 mb-2">
                                            {artisan.craft}
                                        </Badge>
                                    </div>
                                </div>

                                <div className="p-5">
                                    <div className="mb-3">
                                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">{artisan.name}</h3>
                                        <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">{artisan.nameHindi}</p>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 mb-3">
                                        <MapPin className="w-4 h-4 text-orange-500" />
                                        <span>{artisan.state}</span>
                                        <span className="text-gray-400">•</span>
                                        <span>{artisan.experience}</span>
                                    </div>

                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                                        {artisan.story}
                                    </p>

                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{artisan.rating}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                                            <ShoppingBag className="w-4 h-4" />
                                            <span className="text-sm">{artisan.products} Products</span>
                                        </div>
                                    </div>

                                    {artisan.awards.length > 0 && (
                                        <div className="flex items-center gap-2 mb-4">
                                            <Award className="w-4 h-4 text-amber-500" />
                                            <span className="text-xs text-amber-600 dark:text-amber-400 truncate">
                                                {artisan.awards[0]}
                                            </span>
                                        </div>
                                    )}

                                    <Link href={`/explore?artisan=${artisan.id}`}>
                                        <Button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white">
                                            View Products
                                        </Button>
                                    </Link>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                {filteredArtisans.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-gray-500 text-lg mb-4">No artisans found matching your criteria.</p>
                        <Button
                            onClick={() => {
                                setSearchQuery("")
                                setSelectedCraft("All Crafts")
                                setSelectedState("All States")
                            }}
                            className="bg-gradient-to-r from-orange-500 to-orange-600 text-white"
                        >
                            Clear Filters
                        </Button>
                    </div>
                )}
            </Section>

            {/* Call to Action for Artisans to List Products */}
            <section className="py-16 bg-gradient-to-r from-amber-500 to-red-500 text-white">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold mb-4">
                            Want to List Your Products?
                        </h2>
                        <p className="text-lg text-yellow-100 max-w-2xl mx-auto">
                            Showcase your handcrafted creations to customers across India and worldwide. Simple listing process with voice-assisted product description.
                        </p>
                        <Link href="/artisans/add-product">
                             <Button size="lg" className="bg-white text-amber-600 hover:bg-yellow-50">
                                 List Your Product
                                 <ArrowRight className="w-5 h-5 ml-2" />
                             </Button>
                         </Link>
                    </motion.div>
                </div>
            </section>

            {/* Join as Artisan CTA */}
            <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold mb-4">Are You an Artisan?</h2>
                        <p className="text-lg text-yellow-100 mb-8 max-w-2xl mx-auto">
                            Join BharatKart and showcase your crafts to customers worldwide. We help preserve traditions while providing fair income.
                        </p>
                        <Link href="/get-started">
                            <Button size="lg" className="bg-white text-orange-600 hover:bg-yellow-50">
                                Register as Artisan
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </PageContainer>
    )
}