import { Module } from "@nestjs/common";
import { QuackathonController } from "./quackathon.controller";
import { QuackathonService } from "./quackathon.service";
import { WinstonModule, utilities } from "nest-winston";
import * as winston from 'winston';
@Module({
    controllers: [QuackathonController],
    providers: [QuackathonService],
    imports: [WinstonModule.forRoot({
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
        ]
    })]
})
export class QuackathonModule {}