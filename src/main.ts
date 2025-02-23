import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


// {
//   bufferLogs: true
// });
// app.useLogger(app.get(MyLoggerService))

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  // app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('The blog API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  await app.listen(7089);
}
bootstrap();
