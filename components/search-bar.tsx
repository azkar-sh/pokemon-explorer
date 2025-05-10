"use client"

import type React from "react"

import { useState } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"

interface SearchBarProps {
  onSearch: (query: string) => void
  onClear: () => void
  isSearching: boolean
}

export function SearchBar({ onSearch, onClear, isSearching }: SearchBarProps) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query)
    }
  }

  const handleClear = () => {
    setQuery("")
    onClear()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto mb-6"
    >
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <Input
          type="text"
          placeholder="Search Pokémon by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pr-20"
          disabled={isSearching}
        />
        <div className="absolute right-1 flex space-x-1">
          <AnimatePresence>
            {query && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={handleClear}
                  disabled={isSearching}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Clear search</span>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
          <Button type="submit" variant="ghost" size="icon" disabled={!query.trim() || isSearching} className="h-8 w-8">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </form>
    </motion.div>
  )
}
