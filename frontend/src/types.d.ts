import React from "react";

export interface Pokemon {
  name: string;
  url: string;
  id?: number;
  height?: number;
  weight?: number;
  officialArtwork?: string;
  types?: string;
  description?: string;
  baseExperience?: number;
  abilities?: string;
  moves?: string;
  specieUrl: string;
  evolvesTo: string;
}
