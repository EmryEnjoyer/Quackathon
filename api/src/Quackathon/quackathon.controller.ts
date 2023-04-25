import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { QuackathonService } from "./quackathon.service";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { Quackathon } from "src/dto/Quackathon";


@Controller('quackathon')
export class QuackathonController {
    constructor(private readonly service: QuackathonService, @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger) {}

    // Operations for Quackathon
    @Get(`quackathon`)
    async getAllQuackathons() {
        try {
            this.logger.log("Calling getAllQuackathons()", {controller: QuackathonController.name})
            return this.service.getAllQuackathons();
        } catch (err) {
            this.logger.error("Calling getAllQuackathons()", err, {controller: QuackathonController.name})
        }
    }

    @Get('quackathon/latest')
    async getLatestQuackathon() {
        try {
            this.logger.log("Calling getLatestQuackathon()", {Controller: QuackathonController.name})
            return this.service.getLatestQuackathon();
        } catch (err) {
            this.logger.error("Calling getLatestQuackathon()", err, {Controller: QuackathonController.name});
        }
    }

    @Get('quackathon/:quackathonId')
    async getQuackathonById(@Param('quackathonId') id: string) {
        try {
            this.logger.log("Calling getQuackathonById()", {controller: QuackathonController})
            return this.service.getQuackathonById(id);
        } catch (err) {
            this.logger.error("Calling getQuackathonById()", err, {controller: QuackathonController.name});
        }
    }

    @Get('quackathon/get/:quackathonName')
    async getQuackathonByName(@Param('quackathonName') name: string) {
        try {
            this.logger.log("Calling getQuackathonByName()", {controller: QuackathonController})
            return this.service.getQuackathonByName(name);
        } catch (err) {
            this.logger.error("Calling getQuackathonByName()", err, {controller: QuackathonController.name});
        }
    }

    @Post('quackathon/create')
    async createQuackathon (@Body() quackathon: Partial<Quackathon>) {
        try {
            this.logger.log("Calling createQuackathon()", {controller: QuackathonController})
            return this.service.createQuackathon(quackathon);
        } catch (err) {
            this.logger.error("Calling createQuackathon()", err, {controller: QuackathonController.name});
        }
    }

    @Post('quackathon/update')
    async updateQuackathon(@Body() quackathon: Quackathon) {
        try {
            await this.service.updateQuackathon(quackathon);
        } catch (err) {
            this.logger.error("Calling updateQuackathon()", err, {controller: QuackathonController.name});
        }
    }

    @Post('quackathon/delete')
    async deleteQuackathon (@Body() quackathon: Quackathon) {
        try {
            this.logger.log("Calling deleteQuackathon()", {controller: QuackathonController})
            return this.service.deleteQuackathon(quackathon);
        } catch (err) {
            this.logger.error("Calling deleteQuackathon()", err, {controller: QuackathonController.name});
        }
    }

    // Operations for boilerplate
    @Get('quackathon/boilerplate')
    async getBoilerplate () {
        try {
            this.logger.log("Calling getBoilerplate()", {controller: QuackathonController})
            return await this.service.getBoilerplate();
        } catch (err) {
            this.logger.error("Calling getBoilerplate()", err, {controller: QuackathonController})
        }
    }

    @Post('quackathon/set/boilerplate')
    async setBoilerplate (@Body() boilerplate: string) {
        try {
            this.logger.log("Calling setBoilerplate()", {controller: QuackathonController})
            return await this.service.setBoilerplate(boilerplate);
        } catch (err) {
            this.logger.error("Calling setBoilerplate()", err, {controller: QuackathonController})
            throw err;
        }
    }
}