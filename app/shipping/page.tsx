"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Truck, Clock, MapPin, Package, Globe, Shield, CheckCircle } from "lucide-react"
import { PageContainer, PageHero, Section } from "@/components/layout/page-layout"
import { breadcrumbConfigs } from "@/components/ui/breadcrumbs"

const shippingZones = [
    { zone: "Metro Cities", time: "2-4 days", cost: "Free above ₹999", cities: "Delhi, Mumbai, Bangalore, Chennai, Kolkata, Hyderabad" },
    { zone: "Tier 2 Cities", time: "4-6 days", cost: "Free above ₹1499", cities: "Jaipur, Lucknow, Pune, Ahmedabad, Chandigarh, etc." },
    { zone: "Rest of India", time: "5-8 days", cost: "Free above ₹1999", cities: "All serviceable pin codes" },
    { zone: "International", time: "10-15 days", cost: "Calculated at checkout", cities: "USA, UK, Canada, UAE, Australia, etc." },
]

const features = [
    { icon: Package, title: "Secure Packaging", desc: "Every item is carefully hand-packed with protective materials to ensure it reaches you in perfect condition." },
    { icon: Shield, title: "Insured Shipments", desc: "All orders above ₹2000 are fully insured against damage or loss during transit." },
    { icon: Globe, title: "Global Delivery", desc: "We ship to over 50 countries, bringing Indian craftsmanship to your doorstep worldwide." },
    { icon: Clock, title: "Real-time Tracking", desc: "Track your order every step of the way with our detailed tracking system." },
]

export default function ShippingPage() {
    return (
        <PageContainer>
            <PageHero
                title="Shipping Information"
                titleHindi="शिपिंग जानकारी"
                subtitle="We deliver authentic Indian handicrafts to your doorstep with care. Learn about our shipping policies and delivery timelines."
                gradient="from-blue-600 via-teal-600 to-orange-600"
                breadcrumbs={[...breadcrumbConfigs.shipping]}
            />

            {/* Shipping Features */}
            <Section>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="p-6 text-center border border-orange-200 dark:border-orange-900/40 h-full bg-white dark:bg-gray-800">
                                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <feature.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{feature.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{feature.desc}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* Shipping Zones Table */}
            <section className="py-16 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800">
                <div className="container mx-auto px-4 sm:px-6">
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                            Delivery Zones & Timelines
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                            Shipping times may vary during festivals and peak seasons. Free shipping thresholds exclude heavy items.
                        </p>
                    </motion.div>

                    <div className="max-w-4xl mx-auto">
                        <Card className="overflow-hidden border border-orange-200 dark:border-orange-900/40">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                                        <tr>
                                            <th className="px-6 py-4 text-left font-semibold">Zone</th>
                                            <th className="px-6 py-4 text-left font-semibold">Delivery Time</th>
                                            <th className="px-6 py-4 text-left font-semibold">Free Shipping</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800">
                                        {shippingZones.map((zone, index) => (
                                            <tr key={zone.zone} className={index !== shippingZones.length - 1 ? "border-b border-orange-100 dark:border-gray-700" : ""}>
                                                <td className="px-6 py-4">
                                                    <div className="font-semibold text-gray-800 dark:text-white">{zone.zone}</div>
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">{zone.cities}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300">
                                                        <Clock className="w-3 h-3 mr-1" />
                                                        {zone.time}
                                                    </Badge>
                                                </td>
                                                <td className="px-6 py-4 text-gray-700 dark:text-gray-300">{zone.cost}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Additional Info */}
            <Section title="Shipping Policies">
                <div className="max-w-3xl mx-auto space-y-6">
                    {[
                        { title: "Order Processing", content: "Orders are processed within 1-2 business days. Handcrafted items may take 3-5 days for artisan preparation." },
                        { title: "Shipping Partners", content: "We partner with Delhivery, BlueDart, and FedEx to ensure reliable delivery across India and internationally." },
                        { title: "Signature Required", content: "All orders above ₹5000 require a signature upon delivery for security purposes." },
                        { title: "PO Box & APO", content: "We currently do not ship to PO Boxes or military APO/FPO addresses." },
                        { title: "Customs & Duties", content: "International orders may be subject to customs duties and taxes, which are the responsibility of the recipient." },
                    ].map((item, index) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="p-6 border border-orange-200 dark:border-orange-900/40 bg-white dark:bg-gray-800">
                                <div className="flex items-start gap-4">
                                    <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-1" />
                                    <div>
                                        <h3 className="font-bold text-gray-800 dark:text-white mb-2">{item.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-300">{item.content}</p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </Section>
        </PageContainer>
    )
}
