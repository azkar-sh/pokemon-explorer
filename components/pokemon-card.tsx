"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getPokemonDetails } from "@/lib/pokemon-service";
import { Pause, Play, Volume2, VolumeOffIcon } from "lucide-react";

// Define the proper types for Pokemon data
interface PokemonCardProps {
  pokemon: {
    name: string;
    url: string;
  };
}

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const [details, setDetails] = useState<PokemonDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getPokemonDetails(pokemon.url);
        setDetails(data);
      } catch (error) {
        console.error("Failed to fetch Pokémon details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [pokemon.url]);

  if (isLoading || !details) {
    return (
      <Card className="h-96 cursor-pointer bg-gray-200 rounded-md p-1">
        <CardHeader className="p-4 pb-2">
          <Skeleton className="h-6 w-3/4" />
        </CardHeader>
        <CardContent className="p-4 pt-2">
          <Skeleton className="h-40 w-full mb-4" />
          <Skeleton className="h-4 w-1/2 mb-2" />
          <Skeleton className="h-4 w-3/4" />
        </CardContent>
      </Card>
    );
  }

  const officialArtwork = details.sprites.other?.["official-artwork"];
  const imageSrc =
    officialArtwork?.front_default ||
    details.sprites.front_default ||
    "/placeholder.svg";
  const bgCard = details.types[0].type.name;
  const pokemonCries = details.cries?.latest || details.cries?.legacy;

  const handlePlay = () => {
    if (pokemonCries && !isPlaying) {
      const audio = new Audio(pokemonCries);
      audioRef.current = audio; // Store the audio object in the ref
      setIsPlaying(true);

      audio.addEventListener("ended", () => {
        setIsPlaying(false);
      });

      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
        setIsPlaying(false); // Ensure state is reset on error
      });
    } else if (isPlaying && audioRef.current) {
      // Optional: Implement pause functionality if needed
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <motion.div
      whileHover={{
        y: -5,
        transition: { duration: 0.2 },
        filter: "brightness(1.05)",
        boxShadow:
          "0 0 5px 5px rgba(255, 255, 255, 0.7), 0 0 7px 7px rgba(70, 131, 255, 0.5)",
      }}
      whileTap={{ y: 0, transition: { duration: 0.2 } }}
      className="h-96 cursor-pointer bg-gradient-to-br from-cyan-200 to-purple-300 rounded-md p-1 relative"
    >
      <div className="">
        {officialArtwork ? (
          <Image
            src={imageSrc}
            alt={pokemon.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain p-2"
          />
        ) : (
          <Image
            src={imageSrc}
            alt={pokemon.name}
            width={96}
            height={96}
            className="object-contain"
          />
        )}
      </div>
      <div
        className={`bg-gradient-to-br from-cyan-200 to-blue-300 rounded-md h-full`}
      >
        <Card className="overflow-hidden h-full bg-white/50 backdrop-blur-sm relative">
          <CardHeader className="p-4 pb-2">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold capitalize">{pokemon.name}</h3>
              <span className="text-sm font-medium text-muted-foreground">
                #{details.id}
              </span>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-2 opacity-90 hover:opacity-100">
            <div className="bg-blue-200 p-1 rounded-md ">
              <div
                className={`relative h-40 w-full bg-${bgCard} rounded-md flex items-center justify-center`}
              >
                <div className="bg-white/80 absolute inset-0">
                  {officialArtwork ? (
                    <Image
                      src={imageSrc}
                      alt={pokemon.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-contain p-2"
                    />
                  ) : (
                    <Image
                      src={imageSrc}
                      alt={pokemon.name}
                      width={96}
                      height={96}
                      className="object-contain"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between h-32">
              <div className="flex flex-wrap gap-2 mt-2">
                {details.types.map((type: PokemonType) => (
                  <Badge
                    key={type.type.name}
                    variant="outline"
                    className={`capitalize bg-${type.type.name} text-white`}
                  >
                    {type.type.name}
                  </Badge>
                ))}
              </div>
              <div className="self-end">
                {pokemonCries ? (
                  isPlaying ? (
                    <button
                      onClick={handlePlay}
                      className="p-2 rounded-full bg-white hover:bg-gray-200 transition-all duration-300 ease-in-out"
                    >
                      <Pause />
                    </button>
                  ) : (
                    <button
                      onClick={handlePlay}
                      className="p-2 rounded-full bg-white hover:bg-gray-200 transition-all duration-300 ease-in-out"
                    >
                      <Play />
                    </button>
                  )
                ) : (
                  <button className="p-2 rounded-full bg-white hover:bg-gray-200 transition-all duration-300 ease-in-out">
                    <VolumeOffIcon />
                  </button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
