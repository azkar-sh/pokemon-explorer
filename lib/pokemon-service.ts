// Fetch a list of Pokémon with pagination
export async function getPokemonList(limit = 20, offset = 0) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)

    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon list: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching Pokémon list:", error)
    throw error
  }
}

// Fetch details for a specific Pokémon by URL or ID
export async function getPokemonDetails(urlOrId: string | number) {
  try {
    const url = typeof urlOrId === "string" ? urlOrId : `https://pokeapi.co/api/v2/pokemon/${urlOrId}`

    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to fetch Pokémon details: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching Pokémon details:", error)
    throw error
  }
}

// Add this new function to search for a Pokémon by name
export async function searchPokemonByName(name: string) {
  try {
    if (!name.trim()) {
      throw new Error("Pokémon name is required")
    }

    const formattedName = name.toLowerCase().trim()
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${formattedName}`)

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Pokémon "${name}" not found`)
      }
      throw new Error(`Failed to search Pokémon: ${response.status}`)
    }

    // Return a single Pokémon in the same format as the list would expect
    const pokemon = await response.json()
    return {
      count: 1,
      results: [
        {
          name: pokemon.name,
          url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`,
        },
      ],
    }
  } catch (error) {
    console.error("Error searching for Pokémon:", error)
    throw error
  }
}
