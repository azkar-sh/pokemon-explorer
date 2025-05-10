"use client";

import { motion } from "framer-motion";
import { PokemonCard } from "@/components/pokemon-card";
import { Skeleton } from "@/components/ui/skeleton";

interface PokemonListProps {
  pokemon: {
    name: string;
    url: string;
  }[];
  isLoading: boolean;
  emptyMessage?: string;
}

export function PokemonList({
  pokemon,
  isLoading,
  emptyMessage,
}: PokemonListProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className="h-96 cursor-pointer bg-gray-200 rounded-md p-1"
          >
            <div className="p-4 pb-2">
              <Skeleton className="h-6 w-3/4" />
            </div>
            <div className="p-4 pt-2">
              <Skeleton className="h-40 w-full mb-4" />
              <Skeleton className="h-4 w-1/2 mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (pokemon.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-gray-600">
          {emptyMessage || "No Pokémon found."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {pokemon.map((pokemon, index) => (
        <motion.div
          key={pokemon.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <PokemonCard pokemon={pokemon} />
        </motion.div>
      ))}
    </div>
  );
}
