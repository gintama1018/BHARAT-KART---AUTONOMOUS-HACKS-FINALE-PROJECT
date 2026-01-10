"use client"

import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { useRef, type ReactNode } from "react"

interface ParallaxSectionProps {
  children: ReactNode
  speed?: number
  className?: string
}

export function ParallaxSection({ children, speed = 0.5, className = "" }: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 }
  const smoothProgress = useSpring(scrollYProgress, springConfig)

  const y = useTransform(smoothProgress, [0, 1], ["0%", `${speed * 50}%`]) // Reduced speed multiplier for subtlety

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="relative z-10">
        {children}
      </motion.div>
    </div>
  )
}
