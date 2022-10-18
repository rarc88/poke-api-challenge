import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Error } from "../components/Error";
import { Loading } from "../components/Loading";
import { useGetPokemon } from "../hooks/useGetPokemon";
import { Pokemon } from "../types";

export const Detail = () => {
  const { getPokemon, error } = useGetPokemon();
  let { id } = useParams();
  const [pokemon, setPokemon] = useState<Pokemon>();
  const navigate = useNavigate();

  const isFirtRender = useRef(true);
  useEffect(() => {
    if (isFirtRender.current && id) {
      getPokemon(id).then((pokemon) => setPokemon(pokemon));

      return () => {
        isFirtRender.current = false;
      };
    }
  });

  return (
    <div className="pt-4">
      {error ? (
        <Error error={error} />
      ) : pokemon ? (
        <div className="row">
          <div className="col-md-6 col-sm-12 d-flex flex-row-reverse">
            <img
              className="img-fluid"
              src={pokemon.officialArtwork}
              alt={pokemon.name}
              style={{ maxWidth: "100%", height: "auto" }}
            />
          </div>
          <div className="col-md-6 col-sm-12 px-4 d-flex flex-column justify-content-center">
            <h2>
              {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
            </h2>
            <p className="pt-4">
              <strong>Description: </strong>
              {pokemon.description}
            </p>
            <p>
              <strong>Type(s): </strong>
              {pokemon.types}
            </p>
            <p>
              <strong>Evolution: </strong>
              {pokemon.evolvesTo.charAt(0).toUpperCase() +
                pokemon.evolvesTo.slice(1)}
            </p>
            <p>
              <strong>Height: </strong>
              {pokemon.height}
            </p>
            <p>
              <strong>Weight: </strong>
              {pokemon.weight}
            </p>
            <p>
              <strong>Base Experience: </strong>
              {pokemon.baseExperience}
            </p>
            <p>
              <strong>Abilities: </strong>
              {pokemon.abilities}...
            </p>
            <p>
              <strong>Moves: </strong>
              {pokemon.moves}...
            </p>
            <button
              className="btn btn-primary"
              style={{ maxWidth: 100 }}
              onClick={() => navigate(-1)}
            >
              Home
            </button>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};
