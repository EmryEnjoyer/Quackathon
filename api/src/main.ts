import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { queries } from './Data/Queries/setupQueries';
import { executeQueries } from './utils/DbUtils';
import * as dotenv from 'dotenv';
import { Database } from 'sqlite3';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

async function bootstrap() {

  // https://stackoverflow.com/questions/61066950/unable-to-inject-winstons-logger-instance-with-nestjs
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER))
  // Get all the things from the .env file
  dotenv.config();
  const connString = process.env.CONNECTION_STRING;
  const db = new Database(connString);
  executeQueries(db, queries);
  
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
