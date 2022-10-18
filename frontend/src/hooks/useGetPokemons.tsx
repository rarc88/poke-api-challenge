import axios, { AxiosError } from "axios";
import { useContext } from "react";
import { PokeAPIContext } from "../contexts/PokeAPIContext";
import { Pokemon } from "../types";

export const useGetPokemons = () => {
  const { isLoading, setIsLoading, error, setError, pokemons, setPokemons } =
    useContext(PokeAPIContext);

  const getPokemons = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get("/v2/pokemon?offset=0&limit=10");

      const results: Pokemon[] = response.data.results;

      let promises = results.map((pokemon) => axios.get(pokemon.url));

      let responses = await Promise.all(promises);

      responses.forEach((pokemon, index) => {
        const { data } = pokemon;
        results[index].id = data.id;
        results[index].officialArtwork =
          data.sprites.other["official-artwork"].front_default;
      });

      promises = results.map((pokemon) =>
        axios.get(`/v2/characteristic/${pokemon.id}`)
      );

      responses = await Promise.all(promises);

      responses.forEach((item, index) => {
        const { data } = item;
        results[index].description = data.descriptions.find(
          (description: any) => description.language.name === "en"
        ).description;
      });

      setPokemons(results);
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

  return { isLoading, getPokemons, pokemons, error };
};
