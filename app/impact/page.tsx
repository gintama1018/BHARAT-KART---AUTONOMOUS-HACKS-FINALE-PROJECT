"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Heart, Globe, Award, TrendingUp, MapPin, Sparkles, ArrowRight } from "lucide-react"
import Link from "next/link"
import { PageContainer, PageHero, Section } from "@/components/layout/page-layout"
import { breadcrumbConfigs } from "@/components/ui/breadcrumbs"

const impactStats = [
    { icon: Users, number: "2,000+", label: "Artisans Empowered", description: "Traditional craftspeople earning fair wages" },
    { icon: MapPin, number: "28", label: "States Covered", description: "Preserving crafts from every corner of India" },
    { icon: Heart, number: "₹50L+", label: "Income Generated", description: "Direct earnings to rural artisan families" },
    { icon: Globe, number: "50+", label: "Countries Reached", description: "Indian heritage shared worldwide" },
    { icon: Award, number: "500+", label: "Crafts Preserved", description: "Traditional techniques kept alive" },
    { icon: TrendingUp, number: "85%", label: "Income Increase", description: "Average artisan income growth" },
]

const stories = [
    {
        name: "Savitri Devi",
        location: "Jaipur, Rajasthan",
        craft: "Blue Pottery",
        story: "Before joining BharatKart, I could barely afford my children's education. Now I employ 5 other women from my village and my daughter is studying to become a teacher.",
        image: "/indian-artisan-crafting-pottery.jpg"
    },
    {
        name: "Ramchandra Vishwakarma",
        location: "Varanasi, UP",
        craft: "Brassware",
        story: "My family has been making brass items for 7 generations. BharatKart helped us find customers who truly value our craft and are willing to pay fair prices.",
        image: "/images/cultural/rajasthan.jpg"
    },
    {
        name: "Anandi Kumari",
        location: "Madhubani, Bihar",
        craft: "Madhubani Painting",
        story: "Through BharatKart's training programs, I learned new designs while keeping our traditional style. My paintings are now in homes across America and Europe.",
        image: "/images/cultural/bihar.jpg"
    }
]

const initiatives = [
    {
        title: "Artisan Training Program",
        description: "We provide free skill development workshops to help artisans improve quality and learn sustainable practices.",
        icon: Award
    },
    {
        title: "Fair Trade Guarantee",
        description: "Every artisan receives at least 60% of the product price, far above industry standards.",
        icon: Heart
    },
    {
        title: "Heritage Documentation",
        description: "We document dying craft traditions through video and create learning resources for future generations.",
        icon: Globe
    },
    {
        title: "Women Empowerment",
        description: "70% of our artisan partners are women, many of whom are now heads of their households.",
        icon: Users
    }
]

export default function ImpactPage() {
    return (
        <PageContainer>
            <PageHero
                title="Our Impact"
                titleHindi="हमारा प्रभाव"
                subtitle="Every purchase you make creates ripples of positive change across India's artisan communities. See how we're preserving heritage while empowering lives."
                gradient="from-green-600 via-teal-600 to-orange-600"
                breadcrumbs={[...breadcrumbConfigs.impact]}
            />

            {/* Impact Statistics */}
            <Section>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    {impactStats.map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                        >
                            <Card className="p-6 text-center border border-orange-200 dark:border-orange-900/40 hover:shadow-lg transition-all bg-white dark:bg-gray-800">
                                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-1">
                                    {stat.number}
                                </div>
                                <div className="font-semibold text-gray-800 dark:text-white mb-2">
                                    {stat.label}
                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {stat.description}
                                </p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* Mission Statement */}
            <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
                <div className="container mx-auto px-4 sm:px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto"
                    >
                        <Sparkles className="w-12 h-12 mx-auto mb-6" />
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
                        <p className="text-xl text-yellow-100 leading-relaxed">
                            "To create a bridge between India's master artisans and conscious consumers worldwide, ensuring traditional crafts thrive for generations while providing sustainable livelihoods to rural communities."
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Artisan Stories */}
            <Section title="Artisan Stories" subtitle="Real people, real transformations">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stories.map((story, index) => (
                        <motion.div
                            key={story.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <Card className="overflow-hidden border border-orange-200 dark:border-orange-900/40 h-full bg-white dark:bg-gray-800">
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={story.image || "/placeholder.svg"}
                                        alt={story.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="mb-4">
                                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">{story.name}</h3>
                                        <p className="text-sm text-orange-600 dark:text-orange-400">{story.craft} • {story.location}</p>
                                    </div>
                                    <blockquote className="text-gray-600 dark:text-gray-300 italic border-l-4 border-orange-400 pl-4">
                                        "{story.story}"
                                    </blockquote>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* Our Initiatives */}
            <section className="py-16 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800">
                <div className="container mx-auto px-4 sm:px-6">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                            Our Initiatives
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Programs designed to create lasting, sustainable impact
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {initiatives.map((initiative, index) => (
                            <motion.div
                                key={initiative.title}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card className="p-6 border border-orange-200 dark:border-orange-900/40 bg-white dark:bg-gray-800 h-full">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center shrink-0">
                                            <initiative.icon className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{initiative.title}</h3>
                                            <p className="text-gray-600 dark:text-gray-300">{initiative.description}</p>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-to-r from-green-600 via-teal-600 to-orange-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold mb-4">Be Part of the Change</h2>
                        <p className="text-lg text-yellow-100 mb-8 max-w-2xl mx-auto">
                            Every product you buy directly supports an artisan family. Start your conscious shopping journey today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/explore">
                                <Button size="lg" className="bg-white text-green-600 hover:bg-yellow-50">
                                    Shop With Purpose
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                            <Link href="/artisans">
                                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                                    Meet Our Artisans
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </PageContainer>
    )
}
