import { Controller, Get, Param, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiHeader,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { FilterPokemonDto } from './dto/filter-pokemon.dto';
import { PokemonService } from './pokemon.service';

@ApiTags('pokemon')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer token',
  required: true,
})
@ApiBearerAuth()
@Controller({
  path: 'pokemon',
  version: '1',
})
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @ApiOperation({ description: 'List pokemons' })
  @Get()
  async findAll(@Query() params: FilterPokemonDto) {
    return await this.pokemonService.findAll(params);
  }

  @ApiOperation({ description: 'Get pokemon by name' })
  @ApiParam({
    name: 'name',
    description: 'Name of the pokemon you are trying to find',
  })
  @Get(':name')
  async findOne(@Param('name') name: string) {
    return await this.pokemonService.findByName(name);
  }
}
