import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';

//Arquivo que inicia a aplicação NestJS
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //Remove as chaves que nao existe na requisicao
      transform: true, // Ele tenta fazer uma tranformação
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
