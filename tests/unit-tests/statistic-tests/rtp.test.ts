import { GameData, GameDefinition } from "sc-number-game-base";
import { RoundResultConsumer } from "../../../src/event-consumers";
import { stub } from "jest-auto-stub";
import { RoundResultPublisher } from "sc-number-game-base/dist/event-publishers";
import { ProvablyFairConsumer } from "sc-number-game-base/dist/event-consumers";
import * as Helpers from "../../../src/helpers/result-helper";
import { getBetOdds } from "sc-number-game-base/dist/helpers";
import Chance from "chance";
import { SeedHelper } from "sc-game-base/src/core/helpers";
import gameSettings from "../../../src/game-settings";
import { DrawResult } from "../../../src/models/rounds";
import { GameConfigs } from "sc-game-base/src/core/game-data";

const chance = new Chance();

function generateSeed(): string {
    return chance.ssn({ ssnFour: true });
}

describe("statistic test", () => {
    let consumer: RoundResultConsumer;
    const gameData = stub<GameData>();
    const definition = stub<GameDefinition>();
    const publisher = stub<RoundResultPublisher>();
    const provablyFairConsumer = stub<ProvablyFairConsumer>();
    const numberOfTurnsToRun = 1000 * gameSettings.numberOfTurnsPerRound;
    const BET_CHOICES = {
        over: 0,
        under: 0,
        red2: 0,
        red3: 0,
        blue2: 0,
        blue3: 0,
    } as any;

    const margins = [
        {
            max: 100,
            over: 0.02,
            under: 0.02,
            red2: 0.06,
            red3: 0.06,
            blue2: 0.06,
            blue3: 0.06,
        },
    ];

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
                const totalWin = { ...BET_CHOICES };
                const totalBet = { ...BET_CHOICES };
                const rtpPerChoice = { ...BET_CHOICES };

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

                    const betAmount = {} as any;

                    gameSettings.choices.forEach((choice) => {
                        betAmount[choice] = chance.integer({ min: 10, max: 1000 });
                    });

                    const probabilities = Helpers.getProbabilities(gameData.roundResult);

                    const odds = getBetOdds(probabilities as any, margins);

                    gameSettings.choices.forEach((choice) => {
                        if (settlementResult[choice]) {
                            statistic[choice]++;
                            totalWin[choice] += betAmount[choice] * odds[choice];
                        }

                        totalBet[choice] += betAmount[choice];
                    });

                    gameData.roundResult.push(result);
                    if (turn % gameSettings.numberOfTurnsPerRound === 0) {
                        gameData.roundResult = [];
                    }
                }

                gameSettings.choices.forEach((choice) => {
                    rtpPerChoice[choice] = totalWin[choice] / totalBet[choice];
                });

                console.log(rtpPerChoice);

                gameSettings.choices.forEach((choice) => {
                    expect(rtpPerChoice[choice]).toBeLessThanOrEqual(1);
                });
            });
        });
    });
});
