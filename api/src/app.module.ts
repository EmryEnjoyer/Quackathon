import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WinstonModule, utilities } from 'nest-winston';
import * as winston from 'winston';

@Module({
  imports: [WinstonModule.forRoot({exitOnError: false, 
    level: 'info', 
    transports: [
      new winston.transports.Console({ 
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.ms(),
          utilities.format.nestLike('QuackAPI', {
            colors: true,
            prettyPrint: true
          })
        )
       })
    ]})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
