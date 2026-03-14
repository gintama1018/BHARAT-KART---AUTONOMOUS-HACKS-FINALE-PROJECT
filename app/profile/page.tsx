"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { User, Mail, Phone, MapPin, Package, Settings, LogOut, Edit2, Save, X, Plus, Trash2, Shield, Heart, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { createClient, Address } from "@/lib/supabase"

export default function ProfilePage() {
    const router = useRouter()
    const { user, profile, loading, signOut, updateProfile } = useAuth()
    const [activeTab, setActiveTab] = useState("profile")
    const [isEditing, setIsEditing] = useState(false)
    const [formData, setFormData] = useState({
        full_name: "",
        phone: ""
    })
    const [addresses, setAddresses] = useState<Address[]>([])
    const [isSaving, setIsSaving] = useState(false)

    useEffect(() => {
        if (profile) {
            setFormData({
                full_name: profile.full_name || "",
                phone: profile.phone || ""
            })
        }
    }, [profile])

    useEffect(() => {
        if (user) {
            fetchAddresses()
        }
    }, [user])

    const fetchAddresses = async () => {
        const supabase = createClient()
        if (!supabase || !user) return

        const { data } = await supabase
            .from("addresses")
            .select("*")
            .eq("user_id", user.uid)
            .order("is_default", { ascending: false })

        if (data) setAddresses(data)
    }

    const handleSaveProfile = async () => {
        setIsSaving(true)
        await updateProfile(formData)
        setIsSaving(false)
        setIsEditing(false)
    }

    const handleSignOut = async () => {
        await signOut()
        router.push("/")
    }

    if (loading) {
        return (
            <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950 py-12">
                <div className="container mx-auto px-4">
                    <div className="animate-pulse space-y-4">
                        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
                        <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-2xl" />
                    </div>
                </div>
            </main>
        )
    }

    if (!user) {
        return (
            <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950 py-12">
                <div className="container mx-auto px-4 text-center py-20">
                    <User className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                        Sign in to view your profile
                    </h1>
                    <Link href="/auth/login">
                        <Button className="bg-orange-500 hover:bg-orange-600">Sign In</Button>
                    </Link>
                </div>
            </main>
        )
    }

    const tabs = [
        { id: "profile", label: "Profile", icon: User },
        { id: "addresses", label: "Addresses", icon: MapPin },
        { id: "orders", label: "Orders", icon: Package },
        { id: "settings", label: "Settings", icon: Settings },
    ]

    return (
        <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950 py-8">
            <div className="container mx-auto px-4">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
                    <Link href="/" className="hover:text-orange-600">Home</Link>
                    <span>/</span>
                    <span className="text-gray-900 dark:text-white font-medium">My Profile</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
                        >
                            {/* User Info */}
                            <div className="text-center mb-6">
                                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white text-3xl font-bold">
                                    {profile?.full_name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <h2 className="font-bold text-gray-900 dark:text-white">
                                    {profile?.full_name || 'User'}
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                    {user.email}
                                </p>
                            </div>

                            {/* Navigation Tabs */}
                            <nav className="space-y-1">
                                {tabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => tab.id === "orders" ? router.push("/orders") : setActiveTab(tab.id)}
                                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === tab.id
                                                ? "bg-orange-100 dark:bg-orange-900/30 text-orange-600"
                                                : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                                            }`}
                                    >
                                        <tab.icon className="w-5 h-5" />
                                        <span className="font-medium">{tab.label}</span>
                                    </button>
                                ))}
                            </nav>

                            {/* Sign Out */}
                            <button
                                onClick={handleSignOut}
                                className="w-full flex items-center gap-3 px-4 py-3 mt-4 rounded-xl text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            >
                                <LogOut className="w-5 h-5" />
                                <span className="font-medium">Sign Out</span>
                            </button>
                        </motion.div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        {/* Profile Tab */}
                        {activeTab === "profile" && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                        Personal Information
                                    </h2>
                                    {!isEditing ? (
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => setIsEditing(true)}
                                            className="gap-2"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                            Edit
                                        </Button>
                                    ) : (
                                        <div className="flex gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => setIsEditing(false)}
                                                className="gap-2"
                                            >
                                                <X className="w-4 h-4" />
                                                Cancel
                                            </Button>
                                            <Button
                                                size="sm"
                                                onClick={handleSaveProfile}
                                                disabled={isSaving}
                                                className="gap-2 bg-orange-500 hover:bg-orange-600"
                                            >
                                                <Save className="w-4 h-4" />
                                                {isSaving ? "Saving..." : "Save"}
                                            </Button>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Full Name
                                            </label>
                                            {isEditing ? (
                                                <input
                                                    type="text"
                                                    value={formData.full_name}
                                                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                                                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900"
                                                />
                                            ) : (
                                                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                                    <User className="w-5 h-5 text-gray-400" />
                                                    <span className="text-gray-900 dark:text-white">
                                                        {profile?.full_name || "Not set"}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Email Address
                                            </label>
                                            <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                                <Mail className="w-5 h-5 text-gray-400" />
                                                <span className="text-gray-900 dark:text-white">{user.email}</span>
                                                <span className="ml-auto text-xs bg-green-100 dark:bg-green-900/30 text-green-600 px-2 py-1 rounded-full">
                                                    Verified
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Phone Number
                                            </label>
                                            {isEditing ? (
                                                <input
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                    placeholder="+91 98765 43210"
                                                    className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900"
                                                />
                                            ) : (
                                                <div className="flex items-center gap-3 px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                                    <Phone className="w-5 h-5 text-gray-400" />
                                                    <span className="text-gray-900 dark:text-white">
                                                        {profile?.phone || "Not set"}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Addresses Tab */}
                        {activeTab === "addresses" && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                        Saved Addresses
                                    </h2>
                                    <Button size="sm" className="gap-2 bg-orange-500 hover:bg-orange-600">
                                        <Plus className="w-4 h-4" />
                                        Add New
                                    </Button>
                                </div>

                                {addresses.length === 0 ? (
                                    <div className="text-center py-12">
                                        <MapPin className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                        <p className="text-gray-500 dark:text-gray-400">No addresses saved yet</p>
                                        <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
                                            Add an address for faster checkout
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {addresses.map(address => (
                                            <div
                                                key={address.id}
                                                className={`p-4 border-2 rounded-xl ${address.is_default
                                                        ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                                                        : "border-gray-200 dark:border-gray-700"
                                                    }`}
                                            >
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <span className="font-semibold text-gray-900 dark:text-white">
                                                                {address.full_name}
                                                            </span>
                                                            {address.is_default && (
                                                                <span className="text-xs bg-orange-500 text-white px-2 py-0.5 rounded-full">
                                                                    Default
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            {address.address}
                                                        </p>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            {address.city} - {address.pin_code}
                                                        </p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
                                                            {address.phone}
                                                        </p>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button variant="ghost" size="sm">
                                                            <Edit2 className="w-4 h-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm" className="text-red-500">
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {/* Settings Tab */}
                        {activeTab === "settings" && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                {/* Notifications */}
                                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                        <Bell className="w-5 h-5 text-orange-500" />
                                        Notifications
                                    </h2>
                                    <div className="space-y-4">
                                        {[
                                            { label: "Order updates", desc: "Get notified about your order status" },
                                            { label: "Promotional emails", desc: "Receive offers and discounts" },
                                            { label: "New arrivals", desc: "Be first to know about new products" },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0">
                                                <div>
                                                    <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                                                </div>
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                    <input type="checkbox" className="sr-only peer" defaultChecked={i === 0} />
                                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Security */}
                                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                                        <Shield className="w-5 h-5 text-orange-500" />
                                        Security
                                    </h2>
                                    <div className="space-y-4">
                                        <Button variant="outline" className="w-full justify-start gap-3 py-6">
                                            Change Password
                                        </Button>
                                        <Button variant="outline" className="w-full justify-start gap-3 py-6 text-red-500 border-red-200 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-900/20">
                                            Delete Account
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}
