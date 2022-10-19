import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { DatabaseModule } from './modules/database/database.module';
import { APIConfigModule } from './modules/api-config/api-config.module';

import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PokemonModule } from './modules/pokemon/pokemon.module';

@Module({
  imports: [UserModule, DatabaseModule, APIConfigModule, AuthModule, PokemonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
