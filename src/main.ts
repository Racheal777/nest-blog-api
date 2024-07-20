import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// {
//   bufferLogs: true
// });
// app.useLogger(app.get(MyLoggerService))

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(7089);
}
bootstrap();
