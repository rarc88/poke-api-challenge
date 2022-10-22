import axios, { AxiosError } from "axios";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { PokeAPIContext } from "../contexts/PokeAPIContext";
import { Pokemon } from "../types";

export const useGetPokemon = () => {
  const { isLoading, setIsLoading, error, setError, pokemons, setPokemons } =
    useContext(PokeAPIContext);
  const { accessToken } = useContext(AuthContext);

  const getPokemon = async (name: string) => {
    setIsLoading(true);
    setError(null);

    try {
      let config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.get(`/v1/pokemon/${name}`, config);

      let result = response.data.data;
      if (!result) {
        // eslint-disable-next-line
        throw `${name} not found`;
      }

      const pokemon: Pokemon = {
        externalId: result.externalId,
        name: result.name,
        description: result.description,
        image: result.image,
        evolvesTo: result.evolvesTo,
        height: result.height,
        weight: result.weight,
        baseExperience: result.baseExperience,
        types: result.types
          .map((item: any) => {
            return item;
          })
          .join(", "),
        abilities: result.abilities
          .slice(0, result.abilities.length > 3 ? 3 : result.abilities.length)
          .map((item: any) => item)
          .join(", "),
        moves: result.moves
          .slice(0, result.moves.length > 3 ? 3 : result.moves.length)
          .map((item: any) => item)
          .join(", "),
      };

      return pokemon;
    } catch (error: AxiosError | any) {
      if (error instanceof AxiosError) {
        if (error.response) {
          setError(error.response.data.message);
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
