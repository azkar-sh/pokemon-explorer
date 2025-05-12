"use client";

import { useState } from "react";
import { PokemonList } from "@/components/pokemon-list";
import { Pagination } from "@/components/pagination";
import { SearchBar } from "@/components/search-bar";
import { usePokemon } from "@/hooks/use-pokemon";
import { searchPokemonByName } from "@/lib/pokemon-service";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";

export default function Home() {
  const [page, setPage] = useState(1);
  const [searchResults, setSearchResults] = useState<any[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const limit = 12;
  const offset = (page - 1) * limit;

  const { pokemon, isLoading, totalCount } = usePokemon({
    limit,
    offset,
    enabled: searchResults === null, // Only fetch paginated list when not searching
  });

  const totalPages = Math.ceil(totalCount / limit);

  const handlePrevious = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleSearch = async (query: string) => {
    setIsSearching(true);
    setSearchError(null);

    try {
      const data = await searchPokemonByName(query);
      setSearchResults(data.results);
    } catch (error) {
      setSearchError(
        error instanceof Error ? error.message : "Failed to search for Pokémon"
      );
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleClearSearch = () => {
    setSearchResults(null);
    setSearchError(null);
  };

  // Determine which pokemon list to display
  const displayedPokemon = searchResults !== null ? searchResults : pokemon;
  const showPagination = searchResults === null && !searchError;

  return (
    <>
      <Hero />
      <main
        className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-red-50 to-blue-50"
        id="pokemon-explorer"
      >
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-8 text-gray-800">
            Pokémon Explorer
          </h1>

          <SearchBar
            onSearch={handleSearch}
            onClear={handleClearSearch}
            isSearching={isSearching}
          />

          {searchError && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{searchError}</AlertDescription>
            </Alert>
          )}

          {showPagination && (
            <div className="mb-6">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPrevious={handlePrevious}
                onNext={handleNext}
                isLoading={isLoading}
              />
            </div>
          )}

          <PokemonList
            pokemon={displayedPokemon}
            isLoading={isLoading || isSearching}
            emptyMessage={
              searchResults?.length === 0 && !searchError
                ? "No Pokémon found matching your search."
                : undefined
            }
          />

          {showPagination && (
            <div className="mt-6">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPrevious={handlePrevious}
                onNext={handleNext}
                isLoading={isLoading}
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
