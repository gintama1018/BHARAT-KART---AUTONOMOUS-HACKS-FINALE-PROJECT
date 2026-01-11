"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Users, Star, Sparkles, Filter, Grid3X3, List, ArrowRight } from "lucide-react"
import Link from "next/link"
import { statesData } from "@/lib/states-data"
import { Breadcrumbs, breadcrumbConfigs } from "@/components/ui/breadcrumbs"

export default function StatesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedRegion, setSelectedRegion] = useState<string>("all")

  const states = Object.values(statesData)

  const regions = ["all", "North", "South", "East", "West", "Central", "Northeast"]

  const filteredStates = states.filter((state) => {
    const matchesSearch =
      state.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      state.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesRegion = selectedRegion === "all" || state.region === selectedRegion
    return matchesSearch && matchesRegion
  })


  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={breadcrumbConfigs.states}
        className="bg-white dark:bg-gray-800 border-b border-orange-100 dark:border-gray-700"
      />

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-orange-600 via-red-600 to-yellow-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="/indian-mandala-pattern.png" alt="Pattern" className="w-full h-full object-cover" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Explore India's 28 States</h1>
            <p className="text-xl text-yellow-100 max-w-3xl mx-auto mb-8">
              Journey through diverse cultures, traditions, and craftsmanship from every corner of incredible India
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-orange-500" />
                <Input
                  placeholder="Search states, crafts, or specialties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-14 pr-4 py-4 text-lg border-white/30 bg-white/10 backdrop-blur-md text-white placeholder:text-white/70 focus:border-white focus:ring-white"
                />
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {[
              { icon: MapPin, number: "28", label: "States & UTs" },
              { icon: Users, number: "2000+", label: "Master Artisans" },
              { icon: Star, number: "15K+", label: "Unique Products" },
              { icon: Sparkles, number: "500+", label: "Craft Traditions" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/20"
                whileHover={{ scale: 1.05 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-3">
                  <stat.icon className="w-8 h-8 text-yellow-300" />
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-sm text-yellow-200">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-8 bg-white border-b border-orange-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Region Filters */}
            <div className="flex flex-wrap gap-2">
              {regions.map((region) => (
                <Button
                  key={region}
                  variant={selectedRegion === region ? "default" : "outline"}
                  onClick={() => setSelectedRegion(region)}
                  className={
                    selectedRegion === region
                      ? "bg-gradient-to-r from-orange-500 to-red-600 text-white"
                      : "border-orange-300 text-orange-600 hover:bg-orange-50"
                  }
                >
                  {region === "all" ? "All Regions" : region}
                </Button>
              ))}
            </div>

            {/* View Controls */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  onClick={() => setViewMode("grid")}
                  size="sm"
                  className={
                    viewMode === "grid"
                      ? "bg-gradient-to-r from-orange-500 to-red-600 text-white"
                      : "border-orange-300 text-orange-600"
                  }
                >
                  <Grid3X3 className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  onClick={() => setViewMode("list")}
                  size="sm"
                  className={
                    viewMode === "list"
                      ? "bg-gradient-to-r from-orange-500 to-red-600 text-white"
                      : "border-orange-300 text-orange-600"
                  }
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

              <Button variant="outline" className="border-orange-400 text-orange-600 bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* States Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <p className="text-gray-600">
              Showing {filteredStates.length} of {states.length} states
              {selectedRegion !== "all" && ` in ${selectedRegion} India`}
            </p>
          </div>

          <div
            className={`grid gap-8 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
              }`}
          >
            {filteredStates.map((state, index) => (
              <motion.div
                key={state.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <Link href={`/states/${state.id}`}>
                  <Card
                    className={`overflow-hidden group cursor-pointer border-0 shadow-lg hover:shadow-2xl transition-all duration-300 ${viewMode === "list" ? "flex" : ""
                      }`}
                  >
                    <div className={`relative overflow-hidden ${viewMode === "list" ? "w-64 h-48" : "h-64"}`}>
                      <img
                        src={state.backgroundImage || "/placeholder.svg"}
                        alt={state.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-t ${state.gradient} opacity-60 group-hover:opacity-40 transition-opacity`}
                      />

                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/90 text-gray-800 font-medium">{state.region}</Badge>
                      </div>

                      <div className="absolute bottom-4 left-4 text-white">
                        <Badge className="bg-white/20 text-white border-white/30 mb-2">{state.statistics.artisans} Artisans</Badge>
                      </div>
                    </div>

                    <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-800 mb-1">{state.name}</h3>
                        <p className="text-sm text-orange-600 font-medium mb-1">{state.nameHindi}</p>
                        <p className="text-sm text-gray-600 italic mb-2">{state.tagline}</p>
                        {viewMode === "list" && <p className="text-gray-700 text-sm mb-4">{state.description}</p>}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {state.specialties.slice(0, viewMode === "list" ? 4 : 3).map((specialty) => (
                          <Badge key={specialty} variant="secondary" className="text-xs">
                            {specialty}
                          </Badge>
                        ))}
                        {state.specialties.length > (viewMode === "list" ? 4 : 3) && (
                          <Badge variant="secondary" className="text-xs">
                            +{state.specialties.length - (viewMode === "list" ? 4 : 3)} more
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                        <span>{state.statistics.products} Products</span>
                        <span className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                          4.8
                        </span>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full border-orange-400 text-orange-600 hover:bg-orange-50 group-hover:bg-orange-600 group-hover:text-white transition-colors bg-transparent"
                      >
                        Explore {state.name}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredStates.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No states found matching your search criteria.</p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedRegion("all")
                }}
                className="mt-4 bg-gradient-to-r from-orange-500 to-red-600 text-white"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
