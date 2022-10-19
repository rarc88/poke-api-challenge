import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

import { environments } from 'environments';
import apiConfig from 'src/modules/api-config/api-config';
import apiConfigSchema from 'src/modules/api-config/api-config.schema';

import { APIConfigService } from './api-config.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      isGlobal: true,
      load: [apiConfig],
      validationSchema: Joi.object(apiConfigSchema),
    }),
  ],
  controllers: [],
  providers: [APIConfigService],
  exports: [APIConfigService],
})
export class APIConfigModule {}
