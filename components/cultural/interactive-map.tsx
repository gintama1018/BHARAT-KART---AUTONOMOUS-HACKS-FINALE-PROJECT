"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { MapPin } from "lucide-react"

interface StateInfo {
  name: string
  nameHindi: string
  slug: string
  specialties: string[]
  color: string
}

const statesData: Record<string, StateInfo> = {
  rajasthan: {
    name: "Rajasthan",
    nameHindi: "राजस्थान",
    slug: "rajasthan",
    specialties: ["Blue Pottery", "Kathputli", "Block Prints"],
    color: "#DC143C",
  },
  gujarat: {
    name: "Gujarat",
    nameHindi: "गुजरात",
    slug: "gujarat",
    specialties: ["Bandhani", "Mirror Work", "Patola"],
    color: "#FFD700",
  },
  maharashtra: {
    name: "Maharashtra",
    nameHindi: "महाराष्ट्र",
    slug: "maharashtra",
    specialties: ["Warli Art", "Paithani", "Kolhapuri"],
    color: "#FF8C00",
  },
  kerala: {
    name: "Kerala",
    nameHindi: "केरल",
    slug: "kerala",
    specialties: ["Coir Products", "Spices", "Ayurveda"],
    color: "#228B22",
  },
  tamilnadu: {
    name: "Tamil Nadu",
    nameHindi: "तमिल नाडु",
    slug: "tamil-nadu",
    specialties: ["Bronze Idols", "Silk Sarees", "Tanjore Art"],
    color: "#B8860B",
  },
}

export function InteractiveMap() {
  const [hoveredState, setHoveredState] = useState<string | null>(null)
  const router = useRouter()

  const handleStateClick = (stateKey: string) => {
    const state = statesData[stateKey]
    if (state) {
      router.push(`/states/${state.slug}`)
    }
  }

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <motion.div
        className="relative bg-gradient-to-br from-orange-100 to-yellow-100 rounded-2xl p-8 shadow-2xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Simplified India Map SVG */}
        <svg viewBox="0 0 400 500" className="w-full h-auto">
          {/* Rajasthan */}
          <motion.path
            d="M50 150 L150 140 L160 200 L80 220 Z"
            fill={hoveredState === "rajasthan" ? statesData.rajasthan.color : "#FFA500"}
            stroke="#92400e"
            strokeWidth="2"
            className="cursor-pointer"
            onMouseEnter={() => setHoveredState("rajasthan")}
            onMouseLeave={() => setHoveredState(null)}
            onClick={() => handleStateClick("rajasthan")}
            whileHover={{ scale: 1.05 }}
            animate={{
              fill: hoveredState === "rajasthan" ? statesData.rajasthan.color : "#FFA500",
            }}
          />

          {/* Gujarat */}
          <motion.path
            d="M80 220 L160 200 L170 280 L90 290 Z"
            fill={hoveredState === "gujarat" ? statesData.gujarat.color : "#FFD700"}
            stroke="#92400e"
            strokeWidth="2"
            className="cursor-pointer"
            onMouseEnter={() => setHoveredState("gujarat")}
            onMouseLeave={() => setHoveredState(null)}
            onClick={() => handleStateClick("gujarat")}
            whileHover={{ scale: 1.05 }}
          />

          {/* Maharashtra */}
          <motion.path
            d="M170 280 L250 270 L260 350 L180 360 Z"
            fill={hoveredState === "maharashtra" ? statesData.maharashtra.color : "#FF8C00"}
            stroke="#92400e"
            strokeWidth="2"
            className="cursor-pointer"
            onMouseEnter={() => setHoveredState("maharashtra")}
            onMouseLeave={() => setHoveredState(null)}
            onClick={() => handleStateClick("maharashtra")}
            whileHover={{ scale: 1.05 }}
          />

          {/* Kerala */}
          <motion.path
            d="M200 400 L220 380 L240 450 L210 460 Z"
            fill={hoveredState === "kerala" ? statesData.kerala.color : "#228B22"}
            stroke="#92400e"
            strokeWidth="2"
            className="cursor-pointer"
            onMouseEnter={() => setHoveredState("kerala")}
            onMouseLeave={() => setHoveredState(null)}
            onClick={() => handleStateClick("kerala")}
            whileHover={{ scale: 1.05 }}
          />

          {/* Tamil Nadu */}
          <motion.path
            d="M240 380 L320 370 L330 450 L250 460 Z"
            fill={hoveredState === "tamilnadu" ? statesData.tamilnadu.color : "#B8860B"}
            stroke="#92400e"
            strokeWidth="2"
            className="cursor-pointer"
            onMouseEnter={() => setHoveredState("tamilnadu")}
            onMouseLeave={() => setHoveredState(null)}
            onClick={() => handleStateClick("tamilnadu")}
            whileHover={{ scale: 1.05 }}
          />

          {/* Cultural waves animation */}
          {hoveredState && (
            <motion.circle
              cx="200"
              cy="300"
              r="20"
              fill="none"
              stroke={statesData[hoveredState].color}
              strokeWidth="2"
              initial={{ r: 0, opacity: 1 }}
              animate={{ r: 100, opacity: 0 }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          )}
        </svg>

        {/* State Info Tooltip */}
        {hoveredState && (
          <motion.div
            className="absolute top-4 right-4 bg-white p-4 rounded-lg shadow-lg border-2 border-orange-200 max-w-xs"
            initial={{ opacity: 0, scale: 0.8, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
          >
            <h3 className="font-bold text-lg text-gray-800">{statesData[hoveredState].name}</h3>
            <p className="text-orange-600 font-medium mb-2">{statesData[hoveredState].nameHindi}</p>
            <div className="space-y-1">
              {statesData[hoveredState].specialties.map((specialty, index) => (
                <motion.div
                  key={specialty}
                  className="text-sm text-gray-600 bg-orange-50 px-2 py-1 rounded"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {specialty}
                </motion.div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-orange-100">
              <p className="text-xs text-orange-600 font-medium flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                Click to explore →
              </p>
            </div>
          </motion.div>
        )}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg">
          <p className="text-sm font-medium text-gray-700 mb-2">Click any state to explore</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(statesData).map(([key, state]) => (
              <button
                key={key}
                onClick={() => handleStateClick(key)}
                className="flex items-center space-x-1 hover:bg-orange-50 px-2 py-1 rounded transition-colors"
              >
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: state.color }} />
                <span className="text-xs text-gray-600">{state.name}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

