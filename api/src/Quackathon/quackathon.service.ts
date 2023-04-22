import { Injectable, NotImplementedException } from "@nestjs/common";
import { Quackathon } from "src/dto/Quackathon";

@Injectable()
export class QuackathonService {

    public getTest(): string {
        return 'hello';
    }

    async getAllQuackathons() {
        throw new NotImplementedException;
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