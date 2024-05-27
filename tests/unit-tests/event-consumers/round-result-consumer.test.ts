import { GameData, GameDefinition } from "sc-number-game-base";
import { RoundResultConsumer } from "../../../src/event-consumers";
import { stub } from "jest-auto-stub";
import { RoundResultPublisher } from "sc-number-game-base/dist/event-publishers";
import { ProvablyFairConsumer } from "sc-number-game-base/dist/event-consumers";

jest.mock("sc-game-base/src/core/helpers", () => ({
    ServerSeedHelper: { generateServerSeed: jest.fn().mockReturnValue("123asd") },
}));

jest.mock("sc-number-game-base/dist/helpers", () => ({
    generateRemainingBalls: jest.fn().mockReturnValue([4, 5, 6, 7, 8, 9, 10]),
}));

jest.mock("../../../src/helpers/random-helper.ts", () => ({
    generateRandomNumbers: jest.fn().mockReturnValue([1, 2, 3]),
}));

describe("RoundResultConsumer test", () => {
    let consumer: RoundResultConsumer;
    const gameData = stub<GameData>();
    const definition = stub<GameDefinition>();
    const publisher = stub<RoundResultPublisher>();
    const provablyFairConsumer = stub<ProvablyFairConsumer>();

    beforeEach(() => {
        consumer = new RoundResultConsumer(gameData, definition, publisher, null, provablyFairConsumer);
        consumer.gameData.roundResult = [];
    });
    describe("generateServerSeed", () => {
        it("should return expected", () => {
            // arrange
            const expected = `{"random":"1;2;3","remain":"4:5:6:7:8:9:10","secret":"123asd"}`;

            // act
            const actual = consumer.generateServerSeed();

            // assert
            expect(actual).toEqual(expected);
        });
    });
});
