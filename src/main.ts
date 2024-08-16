import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

// import * as basicAuth from 'express-basic-auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(
  //   ['/api', '/api-json'],
  //   basicAuth({
  //     users: { admin: '12345' },
  //     challenge: true,
  //   }),
  // );
  // Swagger konfiguratsiyasi
  const config = new DocumentBuilder()
    .setTitle('Todo App')
    .setDescription('The todo API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}

bootstrap();
