import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { Logger } from 'winston';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger) {}

  @Get()
  public getHello(): string {
    try {
      this.logger.log("Calling getHello()", {Controller: AppController.name});
      return this.appService.getHello();
    }
    catch (err) {
      this.logger.error("Calling getHello()", err, {Controller: AppController.name});
      throw(err);
    }
  }
}
