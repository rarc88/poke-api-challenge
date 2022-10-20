import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { APIConfigService } from './modules/api-config/api-config.service';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { ExceptionInterceptor } from './interceptors/exception.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalInterceptors(new ExceptionInterceptor());

  const config = new DocumentBuilder()
    .setTitle('Poke API Challenge')
    .setDescription(
      'Frontend and backend programming challenge based on pokemon',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const apiConfigService = app.get(APIConfigService);

  app.enableCors();

  await app.listen(apiConfigService.env.port);
}
bootstrap();
