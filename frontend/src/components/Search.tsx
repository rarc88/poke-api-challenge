import React, { useRef } from "react";
import { useGetPokemon } from "../hooks/useGetPokemon";
import { useGetPokemons } from "../hooks/useGetPokemons";

export const Search = () => {
  const { isLoading, getPokemon, setPokemons, pokemons } = useGetPokemon();
  const { getPokemons } = useGetPokemons();

  const searchInput = useRef<HTMLInputElement>(null);

  const handleSearch = async () => {
    if (searchInput.current && searchInput.current.value !== "") {
      const pokemon = await getPokemon(searchInput.current.value);
      setPokemons(pokemon ? [pokemon] : []);
    }
  };

  const handleClear = () => {
    if (
      searchInput.current &&
      (searchInput.current.value !== "" || pokemons.length === 0)
    ) {
      searchInput.current.value = "";
      getPokemons();
    }
  };

  return (
    <div className="row d-flex justify-content-center">
      <div className="col-md-8 col-sm-12 mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search pokemon by name"
            aria-describedby="button-addon4"
            ref={searchInput}
            disabled={isLoading}
            onKeyUp={(e) => {
              if (e.code === "Enter") handleSearch();
            }}
          />
          <div className="input-group-append" id="button-addon4">
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleSearch}
              disabled={isLoading}
            >
              Search
            </button>
            <button
              className="btn btn-warning"
              type="button"
              onClick={handleClear}
              disabled={isLoading}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
