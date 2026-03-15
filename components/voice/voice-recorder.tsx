"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mic, Square, Play, Pause, RotateCcw, Loader2, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VoiceRecorderProps {
    onRecordingComplete: (audioBlob: Blob) => void
    isProcessing?: boolean
    className?: string
}

export function VoiceRecorder({ onRecordingComplete, isProcessing, className }: VoiceRecorderProps) {
    const [isRecording, setIsRecording] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [recordingTime, setRecordingTime] = useState(0)
    const [error, setError] = useState<string | null>(null)
    const [audioUrl, setAudioUrl] = useState<string | null>(null)

    const mediaRecorderRef = useRef<MediaRecorder | null>(null)
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const chunksRef = useRef<Blob[]>([])
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current)
            if (audioUrl) URL.revokeObjectURL(audioUrl)
        }
    }, [audioUrl])

    const startRecording = async () => {
        try {
            setError(null)
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            
            const mimeType = [
                'audio/webm;codecs=opus',
                'audio/webm',
                'audio/mp4',
                'audio/ogg',
            ].find(type => MediaRecorder.isTypeSupported(type)) || ''

            const mediaRecorder = new MediaRecorder(stream, 
                mimeType ? { mimeType } : {}
            )
            mediaRecorderRef.current = mediaRecorder
            chunksRef.current = []

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunksRef.current.push(e.data)
                }
            }

            mediaRecorder.onstop = () => {
                const type = mimeType || 'audio/webm'
                const blob = new Blob(chunksRef.current, { type })
                setRecordedBlob(blob)
                const url = URL.createObjectURL(blob)
                setAudioUrl(url)
                stream.getTracks().forEach(track => track.stop())
            }

            mediaRecorder.start(100)
            setIsRecording(true)
            setRecordingTime(0)

            timerRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1)
            }, 1000)
        } catch (err) {
            setError("Microphone access denied. Please allow microphone access to record.")
        }
    }

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop()
            setIsRecording(false)
            if (timerRef.current) {
                clearInterval(timerRef.current)
                timerRef.current = null
            }
        }
    }

    const resetRecording = () => {
        setRecordedBlob(null)
        setRecordingTime(0)
        setIsPlaying(false)
        if (audioUrl) {
            URL.revokeObjectURL(audioUrl)
            setAudioUrl(null)
        }
    }

    const playRecording = () => {
        if (audioUrl && audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause()
                setIsPlaying(false)
            } else {
                audioRef.current.play()
                setIsPlaying(true)
            }
        }
    }

    const handleSubmit = () => {
        if (recordedBlob) {
            onRecordingComplete(recordedBlob)
        }
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 ${className}`}>
            {audioUrl && (
                <audio
                    ref={audioRef}
                    src={audioUrl}
                    onEnded={() => setIsPlaying(false)}
                    hidden
                />
            )}

            {/* Error Message */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl flex items-center gap-3 text-red-600"
                    >
                        <AlertCircle className="w-5 h-5 shrink-0" />
                        <p className="text-sm">{error}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Recording Indicator */}
            <div className="text-center mb-6">
                <div className="relative inline-flex items-center justify-center">
                    <motion.div
                        animate={isRecording ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 1, repeat: Infinity }}
                        className={`w-24 h-24 rounded-full flex items-center justify-center ${isRecording
                                ? "bg-red-100 dark:bg-red-900/30"
                                : recordedBlob
                                    ? "bg-green-100 dark:bg-green-900/30"
                                    : "bg-orange-100 dark:bg-orange-900/30"
                            }`}
                    >
                        {isRecording ? (
                            <motion.div
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                                className="w-4 h-4 bg-red-500 rounded-full"
                            />
                        ) : recordedBlob ? (
                            <CheckCircle className="w-10 h-10 text-green-500" />
                        ) : (
                            <Mic className="w-10 h-10 text-orange-500" />
                        )}
                    </motion.div>

                    {isRecording && (
                        <motion.div
                            animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="absolute inset-0 rounded-full border-2 border-red-500"
                        />
                    )}
                </div>

                {/* Status Text */}
                <p className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                    {isRecording
                        ? "Recording..."
                        : recordedBlob
                            ? "Recording Complete"
                            : "Tap to Start Recording"}
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                    {isRecording
                        ? formatTime(recordingTime)
                        : recordedBlob
                            ? `Duration: ${formatTime(recordingTime)}`
                            : "Speak in your preferred language"}
                </p>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4">
                {!recordedBlob ? (
                    <Button
                        onClick={isRecording ? stopRecording : startRecording}
                        size="lg"
                        className={`gap-2 px-8 ${isRecording
                                ? "bg-red-500 hover:bg-red-600"
                                : "bg-orange-500 hover:bg-orange-600"
                            }`}
                    >
                        {isRecording ? (
                            <>
                                <Square className="w-5 h-5" />
                                Stop Recording
                            </>
                        ) : (
                            <>
                                <Mic className="w-5 h-5" />
                                Start Recording
                            </>
                        )}
                    </Button>
                ) : (
                    <>
                        <Button
                            variant="outline"
                            onClick={playRecording}
                            className="gap-2"
                        >
                            {isPlaying ? (
                                <>
                                    <Pause className="w-5 h-5" />
                                    Pause
                                </>
                            ) : (
                                <>
                                    <Play className="w-5 h-5" />
                                    Play
                                </>
                            )}
                        </Button>

                        <Button
                            variant="outline"
                            onClick={resetRecording}
                            className="gap-2"
                        >
                            <RotateCcw className="w-5 h-5" />
                            Re-record
                        </Button>

                        <Button
                            onClick={handleSubmit}
                            disabled={isProcessing}
                            className="gap-2 bg-orange-500 hover:bg-orange-600"
                        >
                            {isProcessing ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                "Process with AI"
                            )}
                        </Button>
                    </>
                )}
            </div>

            {/* Language Hint */}
            <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">
                ✨ Supports Hindi, Gujarati, Tamil, Bengali, Marathi, and more
            </p>
        </div>
    )
}
