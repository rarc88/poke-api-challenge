import { HttpService } from '@nestjs/axios';
import { Command, CommandRunner } from 'nest-commander';
import { APIConfigService } from 'src/modules/api-config/api-config.service';
import { FilterPokemonDto } from 'src/modules/pokemon/dto/filter-pokemon.dto';
import { PokemonService } from 'src/modules/pokemon/pokemon.service';
import { UserService } from '../modules/user/user.service';

@Command({
  name: 'initial:seed',
  options: { isDefault: true },
})
export class InitialDataCommand extends CommandRunner {
  private readonly users = [{ username: 'test', password: '12345' }];

  constructor(
    private readonly httpService: HttpService,
    private readonly apiConfigService: APIConfigService,
    private readonly userService: UserService,
    private readonly pokemonService: PokemonService,
  ) {
    super();
  }

  async run(): Promise<void> {
    await this.createUsers();
    await this.createPokemons();
  }

  async createUsers(): Promise<void> {
    console.log('------------------------------------------------------------');
    console.log('Begin user seeds');

    for (let user of this.users) {
      const tmp = await this.userService.findByUsername(user.username);
      if (!tmp) {
        user = await this.userService.create(user);
        console.log(JSON.stringify(user));
      }
    }

    console.log('End user seeds');
    console.log('------------------------------------------------------------');
  }

  async createPokemons() {
    console.log('------------------------------------------------------------');
    console.log('Begin pokemon seeds');

    try {
      const check = await this.pokemonService.findAll(new FilterPokemonDto());
      console.log(`${check.length} pokemons found`);
      if (check.length === 0) {
        const response = await this.httpService.axiosRef.get(
          `${this.apiConfigService.env.pokeApi.url}/v2/pokemon?offset=20&limit=10`,
        );

        const pokemons: any[] = response.data.results;

        let promises = pokemons.map((item: any) =>
          this.httpService.axiosRef.get(item.url),
        );

        let responses = await Promise.all(promises);

        responses.forEach((item, index) => {
          const { data } = item;
          pokemons[index].externalId = data.id;
          pokemons[index].image = data.sprites.other.home.front_default;
          pokemons[index].height = data.height;
          pokemons[index].weight = data.weight;
          pokemons[index].baseExperience = data.base_experience;
          pokemons[index].types = data.types.map((item: any) => {
            return item.type.name;
          });
          pokemons[index].abilities = data.abilities.map(
            (item: any) => item.ability.name,
          );
          pokemons[index].moves = data.moves.map((item: any) => item.move.name);
          pokemons[index].specieUrl = data.species.url;
        });

        promises = pokemons.map((item: any) =>
          this.httpService.axiosRef.get(
            `${this.apiConfigService.env.pokeApi.url}/v2/characteristic/${item.externalId}`,
          ),
        );

        responses = await Promise.all(promises);

        responses.forEach((item, index) => {
          const { data } = item;
          pokemons[index].description = data.descriptions.find(
            (description: any) => description.language.name === 'en',
          ).description;
        });

        promises = pokemons.map((item: any) =>
          this.httpService.axiosRef.get(item.specieUrl),
        );

        responses = await Promise.all(promises);

        promises = responses.map((item: any) =>
          this.httpService.axiosRef.get(item.data.evolution_chain.url),
        );

        responses = await Promise.all(promises);

        responses.forEach((item, index) => {
          const { data } = item;
          pokemons[index].evolvesTo = data.chain.evolves_to[0].species.name;
        });

        for (let item of pokemons) {
          const tmp = await this.pokemonService.findByName(item.name);
          if (!tmp) {
            const { specieUrl, ...data } = item;
            const pokemon = await this.pokemonService.create(data);
            console.log(JSON.stringify(pokemon));
          }
        }
      }
    } catch (error) {
      console.log(error);
    }

    console.log('End pokemon seeds');
    console.log('------------------------------------------------------------');
  }
}
