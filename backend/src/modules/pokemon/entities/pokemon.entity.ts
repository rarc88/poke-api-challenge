import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PokemonDocument = Pokemon & Document;

@Schema()
export class Pokemon {
  @Prop({ required: true, unique: true })
  externalId: number;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false })
  image: string;

  @Prop({ required: false })
  evolvesTo: string;

  @Prop({ required: false })
  height: number;

  @Prop({ required: false })
  weight: number;

  @Prop({ required: false })
  baseExperience: number;

  @Prop({ required: false })
  types: string[];

  @Prop({ required: false })
  abilities: string[];

  @Prop({ required: false })
  moves: string[];
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
