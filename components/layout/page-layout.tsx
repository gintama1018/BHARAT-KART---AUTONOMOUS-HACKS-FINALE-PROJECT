"use client"

import { motion } from "framer-motion"
import { ReactNode } from "react"
import { Sparkles } from "lucide-react"
import Link from "next/link"
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs"

interface PageHeroProps {
    title: string
    subtitle: string
    titleHindi?: string
    children?: ReactNode
    gradient?: string
    breadcrumbs?: BreadcrumbItem[]
}

export function PageHero({
    title,
    subtitle,
    titleHindi,
    children,
    gradient = "from-orange-600 via-red-600 to-amber-600",
    breadcrumbs
}: PageHeroProps) {
    return (
        <>
            {/* Breadcrumbs */}
            {breadcrumbs && (
                <Breadcrumbs
                    items={breadcrumbs}
                    className="bg-white dark:bg-gray-800 border-b border-orange-100 dark:border-gray-700"
                />
            )}

            <section className={`py-16 sm:py-20 lg:py-24 bg-gradient-to-br ${gradient} text-white relative overflow-hidden`}>
                {/* Cultural pattern background */}
                <div className="absolute inset-0 opacity-10">
                    <div
                        className="absolute inset-0 bg-repeat opacity-30"
                        style={{
                            backgroundImage: "url('/indian-mandala-pattern.png')",
                            backgroundSize: "200px 200px"
                        }}
                    />
                </div>

                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.h1
                            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            {title}
                        </motion.h1>
                        {titleHindi && (
                            <motion.p
                                className="text-xl text-yellow-200 font-medium mb-4"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                {titleHindi}
                            </motion.p>
                        )}
                        <motion.p
                            className="text-lg sm:text-xl text-yellow-100 max-w-3xl mx-auto mb-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            {subtitle}
                        </motion.p>
                        {children}
                    </motion.div>
                </div>
            </section>
        </>
    )
}

interface PageContainerProps {
    children: ReactNode
    className?: string
}

export function PageContainer({ children, className = "" }: PageContainerProps) {
    return (
        <div className={`min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 ${className}`}>
            {children}
        </div>
    )
}

interface SectionProps {
    children: ReactNode
    className?: string
    title?: string
    subtitle?: string
}

export function Section({ children, className = "", title, subtitle }: SectionProps) {
    return (
        <section className={`py-12 sm:py-16 lg:py-20 ${className}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {(title || subtitle) && (
                    <motion.div
                        className="text-center mb-12"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        {title && (
                            <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                                {title}
                            </h2>
                        )}
                        {subtitle && (
                            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                                {subtitle}
                            </p>
                        )}
                    </motion.div>
                )}
                {children}
            </div>
        </section>
    )
}
