"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Phone, MapPin, Clock, Send, MessageCircle, Instagram, Facebook, Twitter } from "lucide-react"
import { PageContainer, PageHero, Section } from "@/components/layout/page-layout"
import { breadcrumbConfigs } from "@/components/ui/breadcrumbs"

const contactInfo = [
    { icon: Mail, label: "Email Us", value: "support@bharatkart.com", desc: "We respond within 24 hours" },
    { icon: Phone, label: "Call Us", value: "+91 1800-123-4567", desc: "Mon-Sat, 9AM-6PM IST" },
    { icon: MapPin, label: "Visit Us", value: "Jaipur, Rajasthan, India", desc: "Our artisan hub headquarters" },
    { icon: Clock, label: "Working Hours", value: "9:00 AM - 6:00 PM", desc: "Monday to Saturday" },
]

const socialLinks = [
    { icon: Instagram, label: "Instagram", href: "#", handle: "@bharatkart" },
    { icon: Facebook, label: "Facebook", href: "#", handle: "BharatKart India" },
    { icon: Twitter, label: "Twitter", href: "#", handle: "@bharatkart_in" },
]

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    })
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Simulate form submission
        setSubmitted(true)
        setTimeout(() => setSubmitted(false), 3000)
    }

    return (
        <PageContainer>
            <PageHero
                title="Contact Us"
                titleHindi="संपर्क करें"
                subtitle="Have a question about our products, artisans, or orders? We'd love to hear from you. Our team is here to help!"
                gradient="from-teal-600 via-cyan-600 to-orange-600"
                breadcrumbs={breadcrumbConfigs.contact}
            />

            {/* Contact Cards */}
            <Section>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {contactInfo.map((item, index) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="p-6 text-center border border-orange-200 dark:border-orange-900/40 h-full bg-white dark:bg-gray-800 hover:shadow-lg transition-all">
                                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <item.icon className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="font-bold text-gray-800 dark:text-white mb-1">{item.label}</h3>
                                <p className="text-orange-600 dark:text-orange-400 font-medium mb-1">{item.value}</p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </Section>

            {/* Contact Form & Map */}
            <section className="py-16 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800">
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                        {/* Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <Card className="p-8 border border-orange-200 dark:border-orange-900/40 bg-white dark:bg-gray-800">
                                <div className="flex items-center gap-3 mb-6">
                                    <MessageCircle className="w-8 h-8 text-orange-500" />
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Send us a Message</h2>
                                </div>

                                {submitted ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-12"
                                    >
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <Send className="w-8 h-8 text-green-500" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Message Sent!</h3>
                                        <p className="text-gray-600 dark:text-gray-300">We'll get back to you within 24 hours.</p>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Your Name</label>
                                            <Input
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="Enter your full name"
                                                className="border-orange-200 dark:border-gray-600 focus:border-orange-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                                            <Input
                                                type="email"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="you@example.com"
                                                className="border-orange-200 dark:border-gray-600 focus:border-orange-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subject</label>
                                            <Input
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                placeholder="How can we help?"
                                                className="border-orange-200 dark:border-gray-600 focus:border-orange-500"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                                            <textarea
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                placeholder="Tell us more about your query..."
                                                rows={4}
                                                className="w-full px-4 py-3 border border-orange-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:text-white"
                                                required
                                            />
                                        </div>
                                        <Button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
                                            <Send className="w-4 h-4 mr-2" />
                                            Send Message
                                        </Button>
                                    </form>
                                )}
                            </Card>
                        </motion.div>

                        {/* Social & Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-8"
                        >
                            {/* Map Placeholder */}
                            <Card className="overflow-hidden border border-orange-200 dark:border-orange-900/40">
                                <div className="h-64 bg-gradient-to-br from-orange-100 to-yellow-100 dark:from-gray-700 dark:to-gray-800 flex items-center justify-center">
                                    <div className="text-center">
                                        <MapPin className="w-12 h-12 text-orange-500 mx-auto mb-2" />
                                        <p className="text-gray-600 dark:text-gray-300 font-medium">BharatKart Artisan Hub</p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">Jaipur, Rajasthan, India</p>
                                    </div>
                                </div>
                            </Card>

                            {/* Social Links */}
                            <Card className="p-6 border border-orange-200 dark:border-orange-900/40 bg-white dark:bg-gray-800">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Follow Us</h3>
                                <div className="space-y-4">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.label}
                                            href={social.href}
                                            className="flex items-center gap-4 p-3 rounded-lg hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors group"
                                        >
                                            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                                                <social.icon className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-800 dark:text-white group-hover:text-orange-600">{social.label}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">{social.handle}</p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </section>
        </PageContainer>
    )
}
