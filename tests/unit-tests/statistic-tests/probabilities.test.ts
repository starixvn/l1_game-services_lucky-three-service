import { GameData, GameDefinition } from "sc-number-game-base";
import { RoundResultConsumer } from "../../../src/event-consumers";
import { stub } from "jest-auto-stub";
import { RoundResultPublisher } from "sc-number-game-base/dist/event-publishers";
import { ProvablyFairConsumer } from "sc-number-game-base/dist/event-consumers";
import * as Helpers from "../../../src/helpers/result-helper";
import Chance from "chance";
import { SeedHelper } from "sc-game-base/src/core/helpers";
import gameSettings from "../../../src/game-settings";
import { DrawResult } from "../../../src/models/rounds";
import { GameConfigs } from "sc-game-base/src/core/game-data";

const chance = new Chance();

function generateSeed(): string {
    return chance.ssn({ ssnFour: true });
}

describe("probabilities test", () => {
    let consumer: RoundResultConsumer;
    const gameData = stub<GameData>();
    const definition = stub<GameDefinition>();
    const publisher = stub<RoundResultPublisher>();
    const provablyFairConsumer = stub<ProvablyFairConsumer>();
    const numberOfTurnsToRun = 100_000 * gameSettings.numberOfTurnsPerRound;
    const BET_CHOICES = {
        over: 0,
        under: 0,
        red2: 0,
        red3: 0,
        blue2: 0,
        blue3: 0,
    } as any;

    const randomModes = [1];

    beforeEach(() => {
        consumer = new RoundResultConsumer(gameData, definition, publisher, null, provablyFairConsumer);
        consumer.gameData.roundResult = [];
    });

    describe("statistic test", () => {
        randomModes.forEach((randomMode) => {
            it(`should generate results statistically correct with mode ${randomMode}`, () => {
                gameData.gameConfigs = {
                    randomMode: randomMode,
                } as GameConfigs;

                const statistic = { ...BET_CHOICES };
                const draw1 = { ...BET_CHOICES };
                const draw2 = { ...BET_CHOICES };
                const draw3 = { ...BET_CHOICES };
                const expectedProbabilities = {
                    over: 49.5,
                    under: 49.5,
                    red2: 37.7,
                    red3: 11.4,
                    blue2: 37.7,
                    blue3: 11.4,
                } as any;

                function getDraw(draw: number): any {
                    switch (draw) {
                        case 1:
                            return draw1;
                        case 2:
                            return draw2;
                        case 3:
                            return draw3;
                    }
                    return {};
                }
                for (let turn = 1; turn <= numberOfTurnsToRun; turn++) {
                    const numberOfClients = chance.integer({ min: 0, max: 20 });
                    let mergeClientSeed = "";
                    for (let i = 0; i < numberOfClients; i++) {
                        mergeClientSeed += generateSeed();
                    }
                    const serverSeed = consumer.generateServerSeed();
                    const mergeSeed = serverSeed + mergeClientSeed;
                    const finalHash = SeedHelper.getSHA512Hash(mergeSeed);
                    const result = Helpers.generateResult({ finalHash, serverSeed });
                    const settlementResult = Helpers.getSettlementResult(result as DrawResult) as any;
                    const currentDraw = getDraw(turn % gameSettings.numberOfTurnsPerRound || gameSettings.numberOfTurnsPerRound);

                    gameSettings.choices.forEach((choice) => {
                        if (settlementResult[choice]) {
                            currentDraw[choice]++;
                            statistic[choice]++;
                        }
                    });

                    gameData.roundResult.push(result);
                    if (turn % gameSettings.numberOfTurnsPerRound === 0) {
                        gameData.roundResult = [];
                    }
                }

                const probabilities = {} as any;

                gameSettings.choices.forEach((choice) => {
                    probabilities[choice] = (statistic[choice] / numberOfTurnsToRun) * 100;
                });

                for (let i = 1; i <= gameSettings.numberOfTurnsPerRound; i++) {
                    const draw = getDraw(i);

                    const probabilitiesDraw = {} as any;

                    gameSettings.choices.forEach((choice) => {
                        probabilitiesDraw[choice] = ((draw[choice] * gameSettings.numberOfTurnsPerRound) / numberOfTurnsToRun) * 100;
                    });

                    gameSettings.choices.forEach((choice) => {
                        expect(probabilitiesDraw[choice]).toBeGreaterThanOrEqual(expectedProbabilities[choice]);
                    });
                }

                gameSettings.choices.forEach((choice) => {
                    expect(probabilities[choice]).toBeGreaterThanOrEqual(expectedProbabilities[choice]);
                });
            });
        });
    });
});
