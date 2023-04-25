import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  public getHello(): string {
    try {
      return this.appService.getHello();
    }
    catch (err) {
      throw(err);
    }
  }
}
