import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { FilterPokemonDto } from './dto/filter-pokemon.dto';
import { Pokemon, PokemonDocument } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name) private pokemonModel: Model<PokemonDocument>,
  ) {}

  async create(data: any): Promise<PokemonDocument> {
    const createdPokemon = new this.pokemonModel(data);
    const pokemon = await createdPokemon.save();
    return pokemon;
  }

  async findAll(params: FilterPokemonDto): Promise<PokemonDocument[]> {
    const filter: FilterQuery<Pokemon> = {};

    if (params.name != null) {
      filter.name = params.name.toLowerCase();
    }

    const query = this.pokemonModel.find(filter);

    if (params.offset != null && params.limit != null) {
      query.skip(params.offset * params.limit).limit(params.limit);
    } else {
      query.skip(0).limit(10);
    }

    const users = await query.exec();
    return users;
  }

  async findByName(name: string): Promise<PokemonDocument> {
    try {
      const pokemon = await this.pokemonModel
        .findOne({ name: name.toLowerCase() })
        .exec();
      return pokemon;
    } catch (error) {
      console.log(error);
    }
  }
}
