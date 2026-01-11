"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Globe, Check, ChevronDown } from "lucide-react"
import { useLanguage, languages, LanguageCode } from "@/lib/language-context"

export function LanguageSelector() {
    const { locale, setLocale } = useLanguage()
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    const currentLang = languages[locale]

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
                <Globe className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {currentLang.nativeName}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden z-50"
                    >
                        {/* Header */}
                        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
                            <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                                Choose Language
                            </h3>
                            <p className="text-xs text-gray-500">भाषा चुनें</p>
                        </div>

                        {/* Language List */}
                        <div className="max-h-64 overflow-y-auto py-2">
                            {(Object.entries(languages) as [LanguageCode, typeof languages.en][]).map(([code, lang]) => (
                                <button
                                    key={code}
                                    onClick={() => {
                                        setLocale(code)
                                        setIsOpen(false)
                                    }}
                                    className={`w-full flex items-center justify-between px-4 py-2.5 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors ${locale === code ? "bg-orange-50 dark:bg-orange-900/20" : ""
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-lg">{lang.flag}</span>
                                        <div className="text-left">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                {lang.nativeName}
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                {lang.name}
                                            </p>
                                        </div>
                                    </div>
                                    {locale === code && (
                                        <Check className="w-4 h-4 text-orange-500" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
