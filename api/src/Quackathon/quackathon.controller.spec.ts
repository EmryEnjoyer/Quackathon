import { Quackathon } from "src/dto/Quackathon";
import { QuackathonController } from "./quackathon.controller";
import { QuackathonService } from "./quackathon.service";

describe('QuackathonController', () => {
    let quackathonController;
    let quackathonService;
    beforeEach(() => {
        quackathonService = new QuackathonService({
            debug: jest.fn(),
            log: jest.fn()
        });
        quackathonController = new QuackathonController(quackathonService, {
            debug: jest.fn(),
            log: jest.fn()
        });
    });

    describe('QuackathonInteractionsBasic', async () => {
        const mockQuack = {
            name: 'mock quack',
            challenge: 'mock challenge',
            due: 0,
            status: 0
        };
        

        expect(await quackathonController.createQuackathon(mockQuack)).toHaveBeenCalled();

        const fullQuack = await quackathonController.getLatestQuackathon();
        
        expect(([fullQuack] as Partial<Quackathon>[]).map((q) => {
            return {
                name: q.name, 
                challenge: q.challenge,
                due: q.due,
                status: q.status
            };
        })[0]).toBe(mockQuack);

        expect(await quackathonService.getQuackathonById(`${fullQuack.id}`))
            .toBe(fullQuack);

        expect(await quackathonService.getQuackathonByName(fullQuack.name))
            .toBe(fullQuack);

        fullQuack.name = "ChangedName";

        await quackathonService.updateQuackathon(fullQuack);

        expect(await quackathonService.getQuackathonById(`${fullQuack}`)).toBe(fullQuack);
    })
})