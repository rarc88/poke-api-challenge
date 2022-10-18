import axios, { AxiosError } from "axios";
import { useContext } from "react";
import { PokeAPIContext } from "../contexts/PokeAPIContext";
import { Pokemon } from "../types";

export const useGetPokemon = () => {
  const { isLoading, setIsLoading, error, setError, pokemons, setPokemons } =
    useContext(PokeAPIContext);

  const getPokemon = async (id: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/v2/pokemon/${id}`);

      let result = response.data;
      const pokemon: Pokemon = {
        name: result.name,
        url: "",
        id: result.id,
        height: result.height,
        weight: result.weight,
        officialArtwork: result.sprites.other["official-artwork"].front_default,
        types: result.types
          .map((item: any) => {
            return item.type.name;
          })
          .join(", "),
        baseExperience: result.base_experience,
        abilities: result.abilities
          .slice(0, result.abilities.length > 3 ? 3 : result.abilities.length)
          .map((item: any) => item.ability.name)
          .join(", "),
        moves: result.moves
          .slice(0, result.moves.length > 3 ? 3 : result.moves.length)
          .map((item: any) => item.move.name)
          .join(", "),
        specieUrl: result.species.url,
        evolvesTo: "",
      };

      result = await axios.get(`/v2/characteristic/${pokemon.id}`);

      pokemon.description = result.data.descriptions.find(
        (description: any) => description.language.name === "en"
      ).description;

      result = await axios.get(pokemon.specieUrl);
      result = await axios.get(result.data.evolution_chain.url);

      pokemon.evolvesTo = result.data.chain.evolves_to[0].species.name;

      return pokemon;
    } catch (error: AxiosError | any) {
      if (error instanceof AxiosError) {
        if (error.response) {
          setError(error.response.data);
        } else {
          setError(error.message);
        }
      } else if (!(error instanceof AxiosError)) {
        setError(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, getPokemon, setPokemons, pokemons, error };
};
