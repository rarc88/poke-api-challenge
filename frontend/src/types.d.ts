import React from "react";

export interface Pokemon {
  externalId?: number;
  name: string;
  description: string;
  image?: string;
  evolvesTo?: string;
  height?: number;
  weight?: number;
  baseExperience?: number;
  types?: string;
  abilities?: string;
  moves?: string;
}
