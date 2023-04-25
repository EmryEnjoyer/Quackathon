import { Inject, Injectable, NotFoundException, NotImplementedException } from "@nestjs/common";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { Quackathon } from "src/dto/Quackathon";
import { open } from 'sqlite'
import * as fs from 'fs'
import * as queries from 'src/Data/Queries/QuackathonQueries';
import { Database } from "sqlite3";
import { NotFoundError } from "rxjs";

@Injectable()
export class QuackathonService {
    constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) public readonly logger) {}

    public getTest(): string {
        return 'hello';
    }

    async getAllQuackathons() {
        try {
            this.logger.log("Calling getAllQuackathons()", {service: QuackathonService.name});
            const db = await open({filename: process.env.CONNECTION_STRING, driver: Database});
            const quackathons: Quackathon[] = await db.all(queries.getAllQuackathonsQuery);
            await db.close();

            if(quackathons)
                return quackathons;
            throw NotFoundError;
        } catch (err) {
            this.logger.error("Calling getAllQuackathons()", err, {service: QuackathonService.name});
        }
    }

    async getLatestQuackathon() {
        try {
            this.logger.log("Calling getLatestQuackathon()", {service: QuackathonService.name});
            const db = await open({filename: process.env.CONNECTION_STRING, driver: Database});

            const latestQuackathon: Quackathon = await db.get(queries.getLatestQuackathonQuery);
            await db.close();

            if(latestQuackathon)
                return latestQuackathon;
            throw NotFoundError;
        } catch (err) {
            this.logger.error("Calling getLatestQuackathon()", err, {service: QuackathonService.name});
        }
    }

    async getQuackathonById(id: string) {
        try {
            this.logger.log("Calling getQuackathonById()", {service: QuackathonService.name});
            
            const db = await open({filename: process.env.CONNECTION_STRING, driver: Database});
            const quackathon = await db.get(queries.getQuackathonByIdQuery, {$id: id});

            await db.close();

            if(quackathon)
                return quackathon;
            throw NotFoundException;
        } catch (err) {
            this.logger.error("Calling getQuackathonById()", err, {service: QuackathonService.name});
            throw err;
        }
    }

    async getQuackathonByName(name: string) {
        try {
            this.logger.log("Calling getQuackathonByName()", { service: QuackathonService.name});

            const db = await open({filename: process.env.CONNECTION_STRING, driver: Database});
            const quackathon = await db.get(queries.getQuackathonByNameQuery, {$name: name});

            await db.close();

            if(quackathon)
                return quackathon;
            throw NotFoundException;
        } catch (err) {
            this.logger.error("Calling getQuackathonByName()", err, {service: QuackathonService.name});
            throw err;
        }
    }

    async createQuackathon (quackathon: Partial<Quackathon>) {
        try {
            this.logger.log("Calling createQuackathon()", { service: QuackathonService.name});
            const db = await open({filename: process.env.CONNECTION_STRING, driver: Database});
            
            await db.run(queries.createQuackathonQuery, 
            {
                $name: quackathon.name, 
                $challenge: quackathon.challenge, 
                $due: quackathon.due
            })

            await db.close();
        } catch (err) {
            this.logger.error("Calling createQuackathon()", err, {service: QuackathonService.name});
            throw err;
        }
    }

    async updateQuackathon(quackathon: Quackathon) {
        try {
            this.logger.log("Calling updateQuackathon()", {service: QuackathonService.name});
            const db = await open({filename: process.env.CONNECTION_STRING, driver: Database});
            await db.exec(queries.updateQuackathonQuery, 
                {
                    $challenge: quackathon.challenge, 
                    $due: quackathon.due, 
                    $status: quackathon.status, 
                    $id: quackathon.id
                });
            await db.close();
        } catch (err) {
            this.logger.error("Calling updateQuackathon()", err, {service: QuackathonService.name});
        }
    }

    async deleteQuackathon (quackathon: Quackathon) {
        throw new NotImplementedException;
    }

    async getBoilerplate () {
        try {
            this.logger.log("Calling getBoilerplate()", {service: QuackathonService.name});
            const db = await open({filename: process.env.CONNECTION_STRING, driver: Database});
            const result: Quackathon = await db.get(queries.getLatestQuackathonQuery);
            await db.close();
            
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