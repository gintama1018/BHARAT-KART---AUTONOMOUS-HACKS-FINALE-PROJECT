"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Mic, Edit2, Save, Image, Tag, MapPin, Sparkles, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { VoiceRecorder } from "@/components/voice/voice-recorder"
import { useAuth } from "@/lib/auth-context"
import { createClient } from "@/lib/supabase"

interface ExtractedProduct {
    transcription: string
    product_name: string
    description: string
    craft_type: string
    material: string
    state: string
    cultural_tags: string[]
    language_detected: string
    suggested_price: string | null
    confidence_score: number
}

export default function AddProductPage() {
    const router = useRouter()
    const { user } = useAuth()
    const [step, setStep] = useState<"record" | "review" | "edit" | "success">("record")
    const [isProcessing, setIsProcessing] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [extractedData, setExtractedData] = useState<ExtractedProduct | null>(null)
    const [editedData, setEditedData] = useState<ExtractedProduct | null>(null)
    const [price, setPrice] = useState("")

    const handleRecordingComplete = async (audioBlob: Blob) => {
        setIsProcessing(true)
        setError(null)

        try {
            const formData = new FormData()
            formData.append("audio", audioBlob, "recording.webm")

            const response = await fetch("/api/voice/process", {
                method: "POST",
                body: formData
            })

            const result = await response.json()

            if (!response.ok || !result.success) {
                throw new Error(result.error || "Failed to process recording")
            }

            setExtractedData(result.data)
            setEditedData(result.data)
            if (result.data.suggested_price) {
                setPrice(result.data.suggested_price)
            }
            setStep("review")
        } catch (err: any) {
            setError(err.message || "Failed to process your recording. Please try again.")
        } finally {
            setIsProcessing(false)
        }
    }

    const handlePublish = async () => {
        if (!editedData || !user) return;
        
        setIsProcessing(true);
        setError(null);
        
        try {
            const supabase = createClient();
            
            const parsedPrice = parseFloat(price.replace(/[^0-9.]/g, '')) || null;
            
            const { error: insertError } = await supabase
                .from('products')
                .insert({
                    user_id: user.id,
                    product_name: editedData.product_name,
                    description: editedData.description,
                    craft_type: editedData.craft_type,
                    material: editedData.material,
                    state: editedData.state,
                    cultural_tags: editedData.cultural_tags,
                    price: parsedPrice,
                    language_detected: editedData.language_detected,
                    transcription: editedData.transcription,
                    confidence_score: editedData.confidence_score,
                });
            
            if (insertError) throw insertError;
            
            setStep("success");
        } catch (err: any) {
            setError(err.message || "Failed to publish product. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    }

    const handleFieldChange = (field: keyof ExtractedProduct, value: any) => {
        if (editedData) {
            setEditedData({ ...editedData, [field]: value })
        }
    }

    if (!user) {
        return (
            <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950 py-12">
                <div className="container mx-auto px-4 text-center py-20">
                    <Mic className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                    <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                        Sign in to add products
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Create product listings using voice in your own language
                    </p>
                    <Link href="/auth/login">
                        <Button className="bg-orange-500 hover:bg-orange-600">Sign In</Button>
                    </Link>
                </div>
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-950 py-8">
            <div className="container mx-auto px-4 max-w-3xl">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6">
                    <Link href="/" className="hover:text-orange-600">Home</Link>
                    <span>/</span>
                    <Link href="/artisans" className="hover:text-orange-600">Artisans</Link>
                    <span>/</span>
                    <span className="text-gray-900 dark:text-white font-medium">Add Product</span>
                </nav>

                {/* Header */}
                <div className="flex items-center gap-4 mb-8">
                    <Button variant="ghost" size="sm" onClick={() => router.back()}>
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Add New Product
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            Use voice to describe your handcrafted product
                        </p>
                    </div>
                </div>

                 {/* Steps Indicator */}
                 <div className="flex items-center justify-center gap-2 mb-8">
                     {["record", "review", "publish"].map((s, i) => (
                         <div key={s} className="flex items-center">
                             <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${step === s || (step === "edit" && s === "review")
                                     ? "bg-orange-500 text-white"
                                     : (step === "success" || i < ["record", "review", "publish"].indexOf(step))
                                         ? "bg-green-500 text-white"
                                         : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                                 }`}>
                                 {i + 1}
                             </div>
                             {i < 2 && (
                                 <div className={`w-16 h-1 mx-1 rounded ${step === "success" || i < ["record", "review", "publish"].indexOf(step)
                                         ? "bg-green-500"
                                         : "bg-gray-200 dark:bg-gray-700"
                                     }`} />
                             )}
                         </div>
                     ))}
                 </div>

                {/* Content */}
                <AnimatePresence mode="wait">
                    {/* Step 1: Record */}
                    {step === "record" && (
                        <motion.div
                            key="record"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <div className="text-center mb-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    Describe Your Product
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Speak in your preferred language (Hindi, Gujarati, Tamil, etc.)
                                </p>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl flex items-center gap-3 text-red-600"
                                >
                                    <AlertCircle className="w-5 h-5 shrink-0" />
                                    <p>{error}</p>
                                </motion.div>
                            )}

                            <VoiceRecorder
                                onRecordingComplete={handleRecordingComplete}
                                isProcessing={isProcessing}
                            />

                            <div className="mt-6 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
                                <h3 className="font-medium text-orange-800 dark:text-orange-200 mb-2 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4" />
                                    Tips for best results
                                </h3>
                                <ul className="text-sm text-orange-700 dark:text-orange-300 space-y-1">
                                    <li>• Describe the product name and what it is</li>
                                    <li>• Mention the craft type (Bandhani, Block Print, etc.)</li>
                                    <li>• Include materials used</li>
                                    <li>• Tell us which state it's from</li>
                                    <li>• Share the story or cultural significance</li>
                                </ul>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 2: Review */}
                    {(step === "review" || step === "edit") && editedData && (
                        <motion.div
                            key="review"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <div className="text-center mb-6">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    Review & Edit
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    AI has extracted the following details. Please review and edit if needed.
                                </p>
                            </div>

                            {/* Confidence Score */}
                            <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-between">
                                <span className="text-sm text-blue-700 dark:text-blue-300">
                                    AI Confidence: {Math.round((editedData.confidence_score || 0.8) * 100)}%
                                </span>
                                <span className="text-xs text-blue-600 dark:text-blue-400">
                                    Language: {editedData.language_detected || "English"}
                                </span>
                            </div>

                            {/* Original Transcription */}
                            <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                                    What you said:
                                </h3>
                                <p className="text-gray-700 dark:text-gray-300 italic">
                                    "{editedData.transcription}"
                                </p>
                            </div>

                            {/* Extracted Fields */}
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 space-y-6">
                                {/* Product Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Product Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={editedData.product_name || ""}
                                        onChange={(e) => handleFieldChange("product_name", e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900"
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Description *
                                    </label>
                                    <textarea
                                        value={editedData.description || ""}
                                        onChange={(e) => handleFieldChange("description", e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Craft Type */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Craft Type
                                        </label>
                                        <input
                                            type="text"
                                            value={editedData.craft_type || ""}
                                            onChange={(e) => handleFieldChange("craft_type", e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900"
                                        />
                                    </div>

                                    {/* Material */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Material
                                        </label>
                                        <input
                                            type="text"
                                            value={editedData.material || ""}
                                            onChange={(e) => handleFieldChange("material", e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900"
                                        />
                                    </div>

                                    {/* State */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            <MapPin className="w-4 h-4 inline mr-1" />
                                            State of Origin
                                        </label>
                                        <input
                                            type="text"
                                            value={editedData.state || ""}
                                            onChange={(e) => handleFieldChange("state", e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900"
                                        />
                                    </div>

                                    {/* Price */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Price (₹) *
                                        </label>
                                        <input
                                            type="number"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            placeholder="Enter price in INR"
                                            className="w-full px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-900"
                                        />
                                    </div>
                                </div>

                                {/* Cultural Tags */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        <Tag className="w-4 h-4 inline mr-1" />
                                        Cultural Tags
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {(editedData.cultural_tags || []).map((tag, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-full text-sm"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center justify-between mt-6">
                                <Button
                                    variant="outline"
                                    onClick={() => setStep("record")}
                                    className="gap-2"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    Re-record
                                </Button>
                                <Button
                                    onClick={handlePublish}
                                    disabled={isProcessing}
                                    className="gap-2 bg-orange-500 hover:bg-orange-600"
                                >
                                    {isProcessing ? (
                                        <><Loader2 className="w-4 h-4 animate-spin" />Publishing...</>
                                    ) : (
                                        <><CheckCircle className="w-4 h-4" />Publish Product</>
                                    )}
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* Step 3: Success */}
                    {step === "success" && (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-12"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring" }}
                                className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
                            >
                                <CheckCircle className="w-10 h-10 text-green-500" />
                            </motion.div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                Product Listed Successfully!
                            </h2>
                            <p className="text-gray-600 dark:text-gray-400 mb-8">
                                Your handcrafted product is now live on BharatKart
                            </p>
                            <div className="flex items-center justify-center gap-4">
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        setStep("record")
                                        setExtractedData(null)
                                        setEditedData(null)
                                        setPrice("")
                                    }}
                                >
                                    Add Another Product
                                </Button>
                                <Link href="/artisans">
                                    <Button className="bg-orange-500 hover:bg-orange-600">
                                        View All Products
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    )
}
