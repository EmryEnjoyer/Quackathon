import { QuackathonController } from "./quackathon.controller";
import { QuackathonService } from "./quackathon.service";

describe('QuackathonController', () => {
    let quackathonController: QuackathonController;
    let quackathonService: QuackathonService;
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
            id: 10,
            name: 'mock quack',
            challenge: 'mock challenge',
            due: 0,
            status: 0
        }
        

        expect(await quackathonController.createQuackathon(mockQuack)).toHaveBeenCalled();
        expect(await quackathonController.getAllQuackathons()).toContain(mockQuack);
        expect(await quackathonController.getLatestQuackathon()).toBe(mockQuack);
        expect(await quackathonController.getQuackathonById(mockQuack.id)).toBe(mockQuack);
        expect(await quackathonController.getQuackathonByName(mockQuack.name)).toBe(mockQuack);
        expect(await quackathonController.deleteQuackathon(mockQuack)).toHaveBeenCalled();
    })
})