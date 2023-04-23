import { Inject, Injectable, NotImplementedException } from "@nestjs/common";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { Quackathon } from "src/dto/Quackathon";

@Injectable()
export class QuackathonService {

    constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) public readonly logger) {}

    public getTest(): string {
        return 'hello';
    }

    async getAllQuackathons() {
        throw new NotImplementedException;
    }

    async getLatestQuackathon() {
        try {
            this.logger.log("Calling getLatestQuackathon()", {Service: QuackathonService.name});
        } catch (err) {
            this.logger.error("Calling getLatestQuackathon()", err, {Service: QuackathonService.name});
        }
    }

    async getQuackathonById(id: number) {
        throw new NotImplementedException;
    }

    async getQuackathonByName(name: string) {
        throw new NotImplementedException;
    }

    async createQuackathon (quackathon: Quackathon) {
        throw new NotImplementedException;
    }

    async setQuackathonName (name: string) {
        throw new NotImplementedException;
    }
    async setQuackathonChallenge (challenge: string) {
        throw new NotImplementedException;
    }

    async deleteQuackathon (quackathon: Quackathon) {
        throw new NotImplementedException;
    }

    async getBoilerplate () {
        throw new NotImplementedException;
    }
    
    async setBoilerplate (boilerplate: string) {
        throw new NotImplementedException;
    }
}