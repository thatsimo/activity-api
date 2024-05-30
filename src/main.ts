import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

(async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Activity REST API')
    .setDescription('The activity API description')
    .setVersion('1.0')
    .addServer('/api/', 'HTTP')
    .addBearerAuth(
      {
        name: 'Authorization',
        type: 'http',
        bearerFormat: 'JWT',
        in: 'header',
        scheme: 'Bearer',
      },
      'token',
    )
    .addSecurityRequirements('token')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  app.setGlobalPrefix('api', {
    exclude: ['docs'],
  });

  await app.listen(3000);
})();
