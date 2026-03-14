"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, ShoppingBag, Sparkles, Star } from "lucide-react"
import Link from "next/link"
import { PageContainer, PageHero, Section } from "@/components/layout/page-layout"
import { collectionsData } from "@/lib/collections-data"
import { breadcrumbConfigs } from "@/components/ui/breadcrumbs"

export default function CollectionsPage() {
    const featuredCollections = collectionsData.filter(c => c.featured)
    const allCollections = collectionsData

    return (
        <PageContainer>
            <PageHero
                title="Curated Collections"
                titleHindi="संग्रह"
                subtitle="Explore our handpicked collections showcasing the finest traditional crafts from across India's diverse regions and art forms."
                gradient="from-amber-600 via-orange-600 to-red-600"
                breadcrumbs={[...breadcrumbConfigs.collections]}
            />

            {/* Featured Collections */}
            <Section title="Featured Collections" subtitle="Hand-selected masterpieces from our finest artisans">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredCollections.map((collection, index) => (
                        <motion.div
                            key={collection.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="group"
                        >
                            <Link href={`/explore?collection=${collection.id}`}>
                                <Card className="overflow-hidden border border-orange-200 dark:border-orange-900/40 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-800 h-full">
                                    <div className="relative h-64 overflow-hidden">
                                        <img
                                            src={collection.image || "/placeholder.svg"}
                                            alt={collection.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className={`absolute inset-0 bg-gradient-to-t ${collection.gradient} opacity-70 group-hover:opacity-60 transition-opacity`} />
                                        <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                                            <Badge className="w-fit bg-white/20 text-white border-white/30 backdrop-blur-sm mb-2">
                                                <Star className="w-3 h-3 mr-1 fill-current" />
                                                Featured
                                            </Badge>
                                            <h3 className="text-2xl font-bold mb-1">{collection.name}</h3>
                                            <p className="text-yellow-200 font-medium text-sm">{collection.nameHindi}</p>
                                        </div>
                                    </div>
                                    <div className="p-5">
                                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                                            {collection.description}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                                <ShoppingBag className="w-4 h-4 text-orange-500" />
                                                <span className="text-sm">{collection.productCount} Products</span>
                                            </div>
                                            <span className="text-orange-600 dark:text-orange-400 font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                                                Explore <ArrowRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* All Collections Grid */}
            <section className="py-16 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800">
                <div className="container mx-auto px-4 sm:px-6">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                            Browse All Collections
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            From traditional textiles to contemporary home décor, find the perfect collection for every taste
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {allCollections.map((collection, index) => (
                            <motion.div
                                key={collection.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <Link href={`/explore?collection=${collection.id}`}>
                                    <Card className="overflow-hidden border border-orange-200 dark:border-orange-900/40 hover:shadow-lg transition-all cursor-pointer group">
                                        <div className="relative h-32 overflow-hidden">
                                            <img
                                                src={collection.image || "/placeholder.svg"}
                                                alt={collection.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                            />
                                            <div className={`absolute inset-0 bg-gradient-to-t ${collection.gradient} opacity-80`} />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <span className="text-white font-bold text-center px-2">{collection.name}</span>
                                            </div>
                                        </div>
                                        <div className="p-3 bg-white dark:bg-gray-800 text-center">
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{collection.productCount} items</p>
                                        </div>
                                    </Card>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Sparkles className="w-12 h-12 mx-auto mb-4" />
                        <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
                        <p className="text-lg text-yellow-100 mb-8 max-w-2xl mx-auto">
                            We can help you discover the perfect handicraft. Our curators are here to assist you.
                        </p>
                        <Link href="/contact">
                            <Button size="lg" className="bg-white text-orange-600 hover:bg-yellow-50">
                                Talk to a Curator
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </PageContainer>
    )
}
