"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RefreshCw, CheckCircle, XCircle, AlertCircle, ArrowRight, Package } from "lucide-react"
import Link from "next/link"
import { PageContainer, PageHero, Section } from "@/components/layout/page-layout"
import { breadcrumbConfigs } from "@/components/ui/breadcrumbs"

const returnSteps = [
    { step: 1, title: "Initiate Return", desc: "Log into your account, go to 'My Orders', and select the item you wish to return." },
    { step: 2, title: "Pack the Item", desc: "Pack the product in its original packaging with all tags and accessories intact." },
    { step: 3, title: "Schedule Pickup", desc: "Our logistics partner will pick up the item from your address within 2-3 days." },
    { step: 4, title: "Refund Processed", desc: "Once we receive and verify the item, your refund will be processed within 5-7 days." },
]

const eligibleItems = [
    "Textiles and fabrics (unwashed, unused, with tags)",
    "Home décor items (in original packaging)",
    "Jewelry (unused, in original box)",
    "Pottery and ceramics (undamaged)",
    "Paintings and art (in protective packaging)",
]

const nonEligibleItems = [
    "Customized or personalized items",
    "Perishable items (food, fresh flowers)",
    "Items marked as 'Final Sale'",
    "Products without original packaging",
    "Items showing signs of use or damage",
]

export default function ReturnsPage() {
    return (
        <PageContainer>
            <PageHero
                title="Returns & Refunds"
                titleHindi="वापसी और धनवापसी"
                subtitle="We want you to love your purchase. If something isn't right, we're here to help with our hassle-free return policy."
                gradient="from-purple-600 via-pink-600 to-orange-600"
                breadcrumbs={[...breadcrumbConfigs.returns]}
            />

            {/* Return Policy Overview */}
            <Section>
                <div className="max-w-4xl mx-auto">
                    <Card className="p-8 border border-orange-200 dark:border-orange-900/40 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-800 dark:to-gray-900">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                                <RefreshCw className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">7-Day Easy Returns</h2>
                                <p className="text-orange-600 dark:text-orange-400 font-medium">No questions asked return policy</p>
                            </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 text-lg">
                            We offer a 7-day return window from the date of delivery. If you're not completely satisfied with your purchase, simply initiate a return and we'll take care of the rest. Our artisan-crafted products are made with love, and we stand behind their quality.
                        </p>
                    </Card>
                </div>
            </Section>

            {/* Return Process Steps */}
            <section className="py-16 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800">
                <div className="container mx-auto px-4 sm:px-6">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                            How to Return
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">Simple 4-step return process</p>
                    </motion.div>

                    <div className="max-w-4xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                            {returnSteps.map((item, index) => (
                                <motion.div
                                    key={item.step}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="relative"
                                >
                                    <Card className="p-6 text-center border border-orange-200 dark:border-orange-900/40 bg-white dark:bg-gray-800 h-full">
                                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                                            {item.step}
                                        </div>
                                        <h3 className="font-bold text-gray-800 dark:text-white mb-2">{item.title}</h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
                                    </Card>
                                    {index < returnSteps.length - 1 && (
                                        <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                                            <ArrowRight className="w-6 h-6 text-orange-400" />
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Eligible / Non-Eligible */}
            <Section>
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card className="p-6 border border-green-200 dark:border-green-900/40 bg-green-50 dark:bg-green-900/20 h-full">
                            <div className="flex items-center gap-3 mb-4">
                                <CheckCircle className="w-8 h-8 text-green-500" />
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Eligible for Returns</h3>
                            </div>
                            <ul className="space-y-3">
                                {eligibleItems.map((item) => (
                                    <li key={item} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                                        <CheckCircle className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card className="p-6 border border-red-200 dark:border-red-900/40 bg-red-50 dark:bg-red-900/20 h-full">
                            <div className="flex items-center gap-3 mb-4">
                                <XCircle className="w-8 h-8 text-red-500" />
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white">Not Eligible</h3>
                            </div>
                            <ul className="space-y-3">
                                {nonEligibleItems.map((item) => (
                                    <li key={item} className="flex items-start gap-2 text-gray-600 dark:text-gray-300">
                                        <XCircle className="w-4 h-4 text-red-500 mt-1 shrink-0" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </Card>
                    </motion.div>
                </div>
            </Section>

            {/* Refund Info */}
            <section className="py-16 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <AlertCircle className="w-12 h-12 mx-auto mb-4" />
                        <h2 className="text-3xl font-bold mb-4">Refund Information</h2>
                        <p className="text-lg text-yellow-100 mb-8 max-w-2xl mx-auto">
                            Refunds are credited to your original payment method within 5-7 business days after we receive the returned item. For COD orders, refunds are processed via bank transfer.
                        </p>
                        <Link href="/help">
                            <Button size="lg" className="bg-white text-purple-600 hover:bg-yellow-50">
                                <Package className="w-5 h-5 mr-2" />
                                Start a Return
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </PageContainer>
    )
}
