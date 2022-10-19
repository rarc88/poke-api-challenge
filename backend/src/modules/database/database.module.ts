import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { APIConfigService } from '../api-config/api-config.service';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: async (apiConfigService: APIConfigService) => ({
        useNewUrlParser: true,
        useUnifiedTopology: true,
        authMechanism: 'DEFAULT',
        uri: `${apiConfigService.env.database.connection}://${apiConfigService.env.database.host}:${apiConfigService.env.database.port}`,
        user: apiConfigService.env.database.user,
        pass: apiConfigService.env.database.pass,
        dbName: apiConfigService.env.database.name,
      }),
      inject: [APIConfigService],
    }),
  ],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
