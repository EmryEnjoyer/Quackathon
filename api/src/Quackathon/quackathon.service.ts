import { Inject, Injectable, NotImplementedException } from "@nestjs/common";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { Quackathon } from "src/dto/Quackathon";
import { open } from 'sqlite'
import * as fs from 'fs'
import { getLatestQuackathonQuery } from "src/Data/Queries/QuackathonQueries";
import { Database, sqlite3 } from "sqlite3";

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
        try {
            this.logger.log("Calling getBoilerplate()", {service: QuackathonService.name});
            const db = await open({filename: process.env.CONNECTION_STRING, driver: Database});
            const result: Quackathon = await db.get(getLatestQuackathonQuery);
            db.close();
            
            let boilerplate: string = fs.readFileSync(process.env.BOILERPLATE_FILE, 'utf-8');
            const curDate: string = new Date(Date.now()).toDateString();
            const dueDate: string = new Date(result.due).toDateString();

            boilerplate = boilerplate.replace('$$CURRENT_DATE$$', curDate);
            boilerplate = boilerplate.replace('$$DUE_DATE$$', dueDate);
            return boilerplate;
        }
        catch (err) {
            this.logger.error("Calling getBoilerplate()", err, {service: QuackathonService.name});
            throw err;
        }
    }

    async setBoilerplate (boilerplate: any) {
        try {
            const promise = fs.writeFile(process.env.BOILERPLATE_FILE, boilerplate.boilerplate, (err) => {
                if(err)
                    throw err;
            });
            await promise;
        }
        catch (err) {
            this.logger.error("Calling setBoilerplate()", err, {service: QuackathonService.name});
            throw err;
        }
    }
}