import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from './modules/database/database.module';
import { APIConfigModule } from './modules/api-config/api-config.module';

import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PokemonModule } from './modules/pokemon/pokemon.module';
import { InitialDataCommand } from './commands/initial-data.command';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    APIConfigModule,
    DatabaseModule,
    HttpModule,
    UserModule,
    AuthModule,
    PokemonModule,
  ],
  controllers: [AppController],
  providers: [AppService, InitialDataCommand],
})
export class AppModule {}
