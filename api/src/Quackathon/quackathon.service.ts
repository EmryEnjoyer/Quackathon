import { Injectable } from "@nestjs/common";

@Injectable()
export class QuackathonService {

    getTest(): string {
        return 'hello';
    }

}