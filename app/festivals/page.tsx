"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Sparkles, Gift, ArrowRight } from "lucide-react"
import Link from "next/link"
import { PageContainer, PageHero, Section } from "@/components/layout/page-layout"
import { festivalsData, monthFilters } from "@/lib/festivals-data"
import { breadcrumbConfigs } from "@/components/ui/breadcrumbs"

export default function FestivalsPage() {
    const [selectedMonth, setSelectedMonth] = useState("All Months")

    const filteredFestivals = festivalsData.filter((festival) => {
        if (selectedMonth === "All Months") return true
        return festival.month.includes(selectedMonth)
    })

    // Get current month to highlight upcoming festivals
    const currentMonth = new Date().toLocaleString('default', { month: 'long' })

    return (
        <PageContainer>
            <PageHero
                title="Festival Collections"
                titleHindi="त्योहार संग्रह"
                subtitle="Celebrate India's vibrant festivals with authentic handcrafted treasures. Each festival brings unique traditions and special artisan creations."
                gradient="from-purple-600 via-pink-600 to-orange-600"
                breadcrumbs={[...breadcrumbConfigs.festivals]}
            />

            {/* Month Filters */}
            <section className="py-6 bg-white dark:bg-gray-800 border-b border-orange-100 dark:border-gray-700">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {monthFilters.map((month) => (
                            <Button
                                key={month}
                                variant={selectedMonth === month ? "default" : "outline"}
                                size="sm"
                                onClick={() => setSelectedMonth(month)}
                                className={selectedMonth === month
                                    ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white border-0"
                                    : "border-orange-300 text-orange-600 hover:bg-orange-50 dark:border-orange-700 dark:text-orange-400"
                                }
                            >
                                {month}
                            </Button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Festivals Grid */}
            <Section title="Upcoming Celebrations" subtitle="Shop specially curated collections for each festival">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredFestivals.map((festival, index) => (
                        <motion.div
                            key={festival.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8, scale: 1.02 }}
                        >
                            <Card className="overflow-hidden group cursor-pointer border border-orange-200 dark:border-orange-900/40 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-800 h-full flex flex-col">
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={festival.image || "/placeholder.svg"}
                                        alt={festival.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                                    <div className="absolute top-4 right-4">
                                        <Badge className="bg-white/90 text-orange-600 font-semibold">
                                            <Calendar className="w-3 h-3 mr-1" />
                                            {festival.month}
                                        </Badge>
                                    </div>
                                    <div className="absolute bottom-4 left-4">
                                        <h3 className="text-2xl font-bold text-white">{festival.name}</h3>
                                        <p className="text-yellow-200 font-medium">{festival.nameHindi}</p>
                                    </div>
                                </div>

                                <div className="p-5 flex-1 flex flex-col">
                                    <p className="text-gray-600 dark:text-gray-300 mb-4 flex-1">
                                        {festival.description}
                                    </p>

                                    <div className="mb-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-2">
                                            <MapPin className="w-4 h-4 text-orange-500" />
                                            <span>{festival.states.join(", ")}</span>
                                        </div>
                                    </div>

                                    <div className="mb-4">
                                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Festival Crafts:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {festival.crafts.slice(0, 3).map((craft) => (
                                                <Badge
                                                    key={craft}
                                                    variant="secondary"
                                                    className="text-xs bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-800"
                                                >
                                                    {craft}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-orange-100 dark:border-gray-700 mt-auto">
                                        <Link href={`/explore?festival=${festival.id}`}>
                                            <Button className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white group">
                                                <Gift className="w-4 h-4 mr-2" />
                                                Shop {festival.name} Collection
                                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* Cultural Significance */}
            <section className="py-16 bg-gradient-to-br from-orange-100 via-yellow-50 to-red-100 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
                <div className="container mx-auto px-4 sm:px-6">
                    <motion.div
                        className="text-center max-w-4xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Sparkles className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                            Celebrating India's Living Heritage
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                            Indian festivals are not just celebrations—they are a living archive of traditions, crafts, and stories passed down through generations. When you shop festival collections from BharatKart, you're not just buying products; you're preserving ancient art forms and supporting the artisans who keep these traditions alive.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Subscribe CTA */}
            <section className="py-16 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold mb-4">Never Miss a Festival Sale!</h2>
                        <p className="text-lg text-yellow-100 mb-8 max-w-2xl mx-auto">
                            Get exclusive early access to festival collections and special artisan stories delivered to your inbox.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-4 py-3 rounded-lg text-gray-800 flex-1"
                            />
                            <Button size="lg" className="bg-white text-purple-600 hover:bg-yellow-50">
                                Subscribe
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </PageContainer>
    )
}
