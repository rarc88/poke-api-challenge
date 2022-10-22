import React from "react";
import { Link } from "react-router-dom";
import { Pokemon } from "../types";

interface Props {
  pokemon: Pokemon;
}

export const PokeCard = ({ pokemon }: Props) => {
  return (
    <div className="col-lg-3 col-md-4 col-sm-12 d-flex justify-content-center mb-4 text-center">
      <div className="border rounded shadow-lg pb-4" style={{ maxWidth: 300 }}>
        <img
          className="img-fluid"
          src={pokemon.image}
          alt={pokemon.name}
          style={{ maxWidth: "100%", height: "auto" }}
        />
        <h3>{`${pokemon.name.charAt(0).toUpperCase()}${pokemon.name.slice(
          1
        )}`}</h3>
        <p>{pokemon.description}</p>
        <Link to={`/pokemon/${pokemon.name}`} className="btn btn-primary">
          More details
        </Link>
      </div>
    </div>
  );
};
