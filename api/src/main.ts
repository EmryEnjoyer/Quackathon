import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger UI setup
  const config = new DocumentBuilder()
    .setTitle('Quackabot API')
    .setDescription('API to manage member data for Qackabot')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config); 
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
