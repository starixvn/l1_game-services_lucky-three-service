import { GameData, GameDefinition } from "sc-number-game-base";
import { stub } from "jest-auto-stub";
import * as Helpers from "../../../src/helpers";
import { InGameConsumer } from "../../../src/event-consumers";
import { Core } from "sc-game-base";
import GameManagementApiClientFactory from "sc-game-base/src/core/game-management-api";
import { EventConsumers } from "sc-number-game-base";

describe("InGameConsumer test", () => {
    let consumer: InGameConsumer;
    const definition = stub<GameDefinition>();
    const gameData = stub<GameData>();
    const roundQuery = stub<Core.QueryApis.RoundQuery>();
    const publisher = stub<Core.BaseEventPublishers.BaseEventPublisher>();
    const getBalance = jest.fn();
    const gameManagementApiClientFactory = stub<GameManagementApiClientFactory>();

    beforeEach(() => {
        consumer = new InGameConsumer(definition, gameData, roundQuery, publisher, getBalance, gameManagementApiClientFactory);
    });

    it("inherit InGameConsumer of sc-number-game-base", () => {
        expect(consumer instanceof EventConsumers.InGameConsumer);
    });

    describe("getOddsRange", () => {
        jest.spyOn(Helpers, "calculateOddsRange").mockReturnValue({
            min: { over: 2, under: 2 },
            max: { over: 2, under: 2 },
        });

        it("should return correct", () => {
            // Arrange
            const expectedOddsRange = {
                min: { over: 2, under: 2 },
                max: { over: 2, under: 2 },
            };
            // Act
            const actual = consumer.getOddsRange();

            // Assert
            expect(actual).toEqual(expectedOddsRange);
        });
    });

    describe("getBetPercentage", () => {
        it("should return correct", () => {
            // act
            const actual = consumer.getBetPercentage({ over: ["1"], under: ["2", "3"] });

            // assert
            expect(actual).toStrictEqual({ over: 33, under: 67 });
        });
    });

    describe("getCurrentRoundData", () => {
        beforeEach(() => {
            jest.spyOn(EventConsumers.InGameConsumer.prototype, "getCurrentRoundData").mockReturnValue({
                drawId: 3,
            });
            (consumer.gameData as GameData).roundResult = [
                {
                    drawId: 1,
                    balls: [1, 2, 3],
                },
                {
                    drawId: 2,
                    balls: [4, 5, 6],
                },
            ];
        });

        it("should call super.getCurrentRoundData", () => {
            // act
            consumer.getCurrentRoundData();

            // assert
            expect(EventConsumers.InGameConsumer.prototype.getCurrentRoundData).toHaveBeenCalled();
        });

        it("should return correct", () => {
            //Arrange
            const expectedRoundData = {
                drawId: 3,
                balls: [1, 2, 3, 4, 5, 6],
            };
            // Act
            const actual = consumer.getCurrentRoundData();

            // Assert
            expect(actual).toEqual(expectedRoundData);
        });
    });
});
