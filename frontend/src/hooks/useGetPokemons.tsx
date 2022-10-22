import axios, { AxiosError } from "axios";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { PokeAPIContext } from "../contexts/PokeAPIContext";
import { Pokemon } from "../types";

export const useGetPokemons = () => {
  const { isLoading, setIsLoading, error, setError, pokemons, setPokemons } =
    useContext(PokeAPIContext);
  const { accessToken } = useContext(AuthContext);

  const getPokemons = async () => {
    setIsLoading(true);
    setError(null);

    try {
      let config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.get("/v1/pokemon?offset=0&limit=10", config);
      const results: Pokemon[] = response.data.data;

      setPokemons(results);
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

  return { isLoading, getPokemons, pokemons, error };
};
