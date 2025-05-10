"use client"

import { useState, useEffect } from "react"
import { getPokemonList } from "@/lib/pokemon-service"

interface UsePokemonProps {
  limit: number
  offset: number
  enabled?: boolean
}

export function usePokemon({ limit, offset, enabled = true }: UsePokemonProps) {
  const [pokemon, setPokemon] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [totalCount, setTotalCount] = useState(0)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchPokemon = async () => {
      if (!enabled) {
        setIsLoading(false)
        return
      }

      setIsLoading(true)
      try {
        const data = await getPokemonList(limit, offset)
        setPokemon(data.results)
        setTotalCount(data.count)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An unknown error occurred"))
        console.error("Failed to fetch Pokémon:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPokemon()
  }, [limit, offset, enabled])

  return {
    pokemon,
    isLoading,
    totalCount,
    error,
  }
}
