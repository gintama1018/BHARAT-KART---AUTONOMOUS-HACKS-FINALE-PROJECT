"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronDown, Search, Package, CreditCard, Truck, RefreshCw, MessageCircle, Mail, Phone } from "lucide-react"
import Link from "next/link"
import { PageContainer, PageHero, Section } from "@/components/layout/page-layout"
import { breadcrumbConfigs } from "@/components/ui/breadcrumbs"

const faqCategories = [
    {
        category: "Orders & Shipping",
        icon: Package,
        questions: [
            { q: "How long does delivery take?", a: "Standard shipping takes 5-7 business days within India. International orders take 10-15 business days." },
            { q: "How can I track my order?", a: "Once your order ships, you'll receive a tracking link via email and SMS. You can also track from your account dashboard." },
            { q: "Do you ship internationally?", a: "Yes! We ship to over 50 countries. International shipping rates are calculated at checkout." },
        ]
    },
    {
        category: "Payments",
        icon: CreditCard,
        questions: [
            { q: "What payment methods do you accept?", a: "We accept all major credit/debit cards, UPI, Net Banking, and popular wallets like PayTM and PhonePe." },
            { q: "Is COD available?", a: "Cash on Delivery is available for orders under ₹10,000 within India. A small COD fee may apply." },
            { q: "Are payments secure?", a: "Yes, all transactions are encrypted with SSL and processed through secure payment gateways." },
        ]
    },
    {
        category: "Returns & Refunds",
        icon: RefreshCw,
        questions: [
            { q: "What is your return policy?", a: "We offer a 7-day return policy for most items. Products must be unused and in original packaging." },
            { q: "How do I initiate a return?", a: "Go to 'My Orders' in your account, select the item, and click 'Request Return'. Our team will guide you through the process." },
            { q: "When will I get my refund?", a: "Refunds are processed within 5-7 business days after we receive the returned item." },
        ]
    }
]

export default function HelpPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [openFaq, setOpenFaq] = useState<string | null>(null)

    return (
        <PageContainer>
            <PageHero
                title="Help Center"
                titleHindi="सहायता केंद्र"
                subtitle="Find answers to common questions or get in touch with our support team. We're here to help!"
                breadcrumbs={breadcrumbConfigs.help}
            >
                <div className="max-w-2xl mx-auto mt-8">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-400" />
                        <Input
                            placeholder="Search for help..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-12 pr-4 py-4 text-lg bg-white/10 backdrop-blur-md border-white/30 text-white placeholder:text-white/70 focus:border-white rounded-full"
                        />
                    </div>
                </div>
            </PageHero>

            {/* Quick Links */}
            <section className="py-8 bg-white dark:bg-gray-800 border-b border-orange-100 dark:border-gray-700">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { icon: Package, label: "Track Order", href: "/get-started" },
                            { icon: RefreshCw, label: "Returns", href: "/returns" },
                            { icon: Truck, label: "Shipping Info", href: "/shipping" },
                            { icon: MessageCircle, label: "Contact Us", href: "/contact" },
                        ].map((item) => (
                            <Link key={item.label} href={item.href}>
                                <Card className="p-4 text-center hover:shadow-lg transition-all border border-orange-200 dark:border-orange-900/40 cursor-pointer group">
                                    <item.icon className="w-8 h-8 text-orange-500 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <Section title="Frequently Asked Questions" subtitle="Quick answers to common queries">
                <div className="max-w-3xl mx-auto space-y-8">
                    {faqCategories.map((category) => (
                        <motion.div
                            key={category.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                                    <category.icon className="w-5 h-5 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white">{category.category}</h3>
                            </div>
                            <div className="space-y-3">
                                {category.questions.map((faq, index) => (
                                    <Card
                                        key={index}
                                        className="border border-orange-200 dark:border-orange-900/40 overflow-hidden"
                                    >
                                        <button
                                            onClick={() => setOpenFaq(openFaq === `${category.category}-${index}` ? null : `${category.category}-${index}`)}
                                            className="w-full p-4 text-left flex items-center justify-between hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            <span className="font-medium text-gray-800 dark:text-white">{faq.q}</span>
                                            <ChevronDown className={`w-5 h-5 text-orange-500 transition-transform ${openFaq === `${category.category}-${index}` ? 'rotate-180' : ''}`} />
                                        </button>
                                        {openFaq === `${category.category}-${index}` && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="px-4 pb-4 text-gray-600 dark:text-gray-300"
                                            >
                                                {faq.a}
                                            </motion.div>
                                        )}
                                    </Card>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* Contact CTA */}
            <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold mb-4">Still Need Help?</h2>
                        <p className="text-lg text-yellow-100 mb-8 max-w-2xl mx-auto">
                            Our support team is available 24/7 to assist you with any queries.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact">
                                <Button size="lg" className="bg-white text-orange-600 hover:bg-yellow-50">
                                    <Mail className="w-5 h-5 mr-2" />
                                    Email Support
                                </Button>
                            </Link>
                            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                                <Phone className="w-5 h-5 mr-2" />
                                Call Us
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </PageContainer>
    )
}
