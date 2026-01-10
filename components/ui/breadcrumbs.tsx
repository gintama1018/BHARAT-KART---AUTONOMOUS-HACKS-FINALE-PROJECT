"use client"

import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { motion } from "framer-motion"

export interface BreadcrumbItem {
    label: string
    href: string
    labelHindi?: string
}

interface BreadcrumbsProps {
    items: readonly BreadcrumbItem[] | BreadcrumbItem[]
    className?: string
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
    // Always start with Home
    const allItems: BreadcrumbItem[] = [
        { label: "Home", href: "/", labelHindi: "होम" },
        ...items
    ]

    return (
        <motion.nav
            aria-label="Breadcrumb"
            className={`py-4 ${className}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className="container mx-auto px-4 sm:px-6">
                <ol className="flex items-center flex-wrap gap-1 text-sm">
                    {allItems.map((item, index) => {
                        const isLast = index === allItems.length - 1

                        return (
                            <li key={item.href} className="flex items-center">
                                {index === 0 ? (
                                    // Home icon for first item
                                    <Link
                                        href={item.href}
                                        className="flex items-center gap-1 text-gray-500 hover:text-orange-600 dark:text-gray-400 dark:hover:text-orange-400 transition-colors"
                                    >
                                        <Home className="w-4 h-4" />
                                        <span className="hidden sm:inline">{item.label}</span>
                                    </Link>
                                ) : isLast ? (
                                    // Current page (not a link)
                                    <span className="flex items-center gap-1.5">
                                        <ChevronRight className="w-4 h-4 text-gray-400" />
                                        <span className="font-medium text-orange-600 dark:text-orange-400">
                                            {item.label}
                                        </span>
                                        {item.labelHindi && (
                                            <span className="hidden md:inline text-xs text-orange-400 dark:text-orange-500">
                                                ({item.labelHindi})
                                            </span>
                                        )}
                                    </span>
                                ) : (
                                    // Middle items (links)
                                    <Link
                                        href={item.href}
                                        className="flex items-center gap-1.5 text-gray-600 hover:text-orange-600 dark:text-gray-300 dark:hover:text-orange-400 transition-colors"
                                    >
                                        <ChevronRight className="w-4 h-4 text-gray-400" />
                                        <span className="hover:underline">{item.label}</span>
                                    </Link>
                                )}
                            </li>
                        )
                    })}
                </ol>
            </div>
        </motion.nav>
    )
}

// ============================================
// CENTRALIZED BREADCRUMB CONFIGURATION
// ============================================
// All breadcrumbs are DETERMINISTIC - explicit hrefs, no router.back()
// This ensures predictable UX regardless of navigation history

// Pre-built breadcrumb configurations for static pages
export const breadcrumbConfigs = {
    states: [
        { label: "Explore", href: "/explore" },
        { label: "States", href: "/states", labelHindi: "राज्य" }
    ],
    artisans: [
        { label: "Artisans", href: "/artisans", labelHindi: "कारीगर" }
    ],
    festivals: [
        { label: "Festivals", href: "/festivals", labelHindi: "त्योहार" }
    ],
    collections: [
        { label: "Collections", href: "/collections", labelHindi: "संग्रह" }
    ],
    explore: [
        { label: "Explore", href: "/explore", labelHindi: "एक्सप्लोर" }
    ],
    cart: [
        { label: "Shopping Cart", href: "/cart", labelHindi: "कार्ट" }
    ],
    checkout: [
        { label: "Cart", href: "/cart" },
        { label: "Checkout", href: "/checkout", labelHindi: "चेकआउट" }
    ],
    impact: [
        { label: "Our Impact", href: "/impact", labelHindi: "हमारा प्रभाव" }
    ],
    help: [
        { label: "Help Center", href: "/help", labelHindi: "सहायता" }
    ],
    shipping: [
        { label: "Help", href: "/help" },
        { label: "Shipping", href: "/shipping", labelHindi: "शिपिंग" }
    ],
    returns: [
        { label: "Help", href: "/help" },
        { label: "Returns", href: "/returns", labelHindi: "वापसी" }
    ],
    contact: [
        { label: "Contact Us", href: "/contact", labelHindi: "संपर्क" }
    ]
} as const

// ============================================
// DYNAMIC BREADCRUMB BUILDERS
// ============================================
// For pages with dynamic segments (e.g., /states/[slug])

// State detail page: Home > Explore > States > {StateName}
export function getStateBreadcrumbs(stateName: string, stateHindi?: string): BreadcrumbItem[] {
    return [
        { label: "Explore", href: "/explore" },
        { label: "States", href: "/states" },
        { label: stateName, href: `/states/${stateName.toLowerCase().replace(/\s+/g, '-')}`, labelHindi: stateHindi }
    ]
}

// Product page: Home > Explore > [States > StateName] > ProductName
export function getProductBreadcrumbs(productName: string, stateName?: string): BreadcrumbItem[] {
    const items: BreadcrumbItem[] = [
        { label: "Explore", href: "/explore" }
    ]

    if (stateName) {
        items.push({ label: "States", href: "/states" })
        items.push({ label: stateName, href: `/states/${stateName.toLowerCase().replace(/\s+/g, '-')}` })
    }

    items.push({ label: productName, href: "#" })

    return items
}

// Artisan profile: Home > Artisans > {ArtisanName}
export function getArtisanBreadcrumbs(artisanName: string): BreadcrumbItem[] {
    return [
        { label: "Artisans", href: "/artisans" },
        { label: artisanName, href: "#" }
    ]
}

// Festival detail: Home > Festivals > {FestivalName}
export function getFestivalBreadcrumbs(festivalName: string, festivalHindi?: string): BreadcrumbItem[] {
    return [
        { label: "Festivals", href: "/festivals" },
        { label: festivalName, href: "#", labelHindi: festivalHindi }
    ]
}

// Collection detail: Home > Collections > {CollectionName}
export function getCollectionBreadcrumbs(collectionName: string): BreadcrumbItem[] {
    return [
        { label: "Collections", href: "/collections" },
        { label: collectionName, href: "#" }
    ]
}
