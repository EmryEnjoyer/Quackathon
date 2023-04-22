import { Controller, Get, Inject } from "@nestjs/common";
import { QuackathonService } from "./quackathon.service";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";


@Controller('quackathon')
export class QuackathonController {
    constructor(private readonly service: QuackathonService, @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger) {}

    @Get('test')
    getTest(): string {
        return this.service.getTest()
    }
}