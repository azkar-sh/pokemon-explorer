interface PokemonType {
  type: {
    name: string;
  };
}

interface PokemonSprites {
  front_default: string | null;
  other?: {
    "official-artwork"?: {
      front_default: string | null;
      front_shiny: string | null;
    };
  };
}

interface PokemonDetail {
  id: number;
  name: string;
  types: PokemonType[];
  sprites: PokemonSprites;
}
