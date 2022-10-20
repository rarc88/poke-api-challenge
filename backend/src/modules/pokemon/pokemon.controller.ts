import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { FilterPokemonDto } from './dto/filter-pokemon.dto';
import { PokemonService } from './pokemon.service';

@ApiTags('pokemons')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
  required: true,
})
@ApiBearerAuth()
@Controller({
  path: 'pokemons',
  version: '1',
})
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @ApiOperation({ description: 'List pokemon' })
  @Get()
  async findAll(@Query() params: FilterPokemonDto) {
    return await this.pokemonService.findAll(params);
  }
}
