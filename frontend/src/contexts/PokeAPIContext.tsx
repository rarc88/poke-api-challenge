import React, { createContext, useState } from "react";
import { Pokemon } from "../types";

interface Props {
  children: JSX.Element;
}

interface PokeAPI {
  isLoading: boolean;
  setIsLoading: React.Dispatch<boolean>;
  error: string | null;
  setError: React.Dispatch<string | null>;
  pokemons: Pokemon[];
  setPokemons: React.Dispatch<Pokemon[]>;
}

const initialData: any = {};

export const PokeAPIContext = createContext<PokeAPI>(initialData);

export const PokeAPIProvider = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  return (
    <PokeAPIContext.Provider
      value={{
        isLoading,
        setIsLoading,
        error,
        setError,
        pokemons,
        setPokemons,
      }}
    >
      {children}
    </PokeAPIContext.Provider>
  );
};
