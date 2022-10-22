import { useEffect, useRef } from "react";
import { Error } from "../components/Error";
import { Loading } from "../components/Loading";
import { PokeCard } from "../components/PokeCard";
import { Search } from "../components/Search";

import { useGetPokemons } from "../hooks/useGetPokemons";

export const Home = () => {
  const { isLoading, getPokemons, pokemons, error } = useGetPokemons();

  const isFirtRender = useRef(true);
  useEffect(() => {
    if (isFirtRender.current && pokemons.length === 0) {
      getPokemons();

      return () => {
        isFirtRender.current = false;
      };
    }
  });

  return (
    <div className="pt-4">
      <h1 className="text-center">PokeAPI Challenge</h1>
      <p className="text-center">
        Frontend programming challenge based on pokemon
      </p>
      <Search />
      {isLoading ? (
        <Loading />
      ) : error ? (
        <Error error={error} />
      ) : (
        <div className="row">
          {pokemons.map((pokemon, index) => {
            return <PokeCard key={index} pokemon={pokemon} />;
          })}
        </div>
      )}
    </div>
  );
};
