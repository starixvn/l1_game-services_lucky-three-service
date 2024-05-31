import GameManagementApiClientFactory from "sc-game-base/src/core/game-management-api";
import { Bot } from "../../../src/crons";
import { stub } from "jest-auto-stub";

describe(Bot.name, () => {
    describe("updatePlayerBetCount", () => {
        const gameManagementApiClientFactory = stub<GameManagementApiClientFactory>();

        const playerId = "123";
        it.each(["over", "under"])("should count playerBetCount when bet is over/under", (choice) => {
            // arrange
            const gameData = { playerBetCount: {} };
            // @ts-ignore
            const bot = new Bot({}, gameData, null, gameManagementApiClientFactory, null, null);

            // act
            bot.updatePlayerBetCount(playerId, choice);

            // assert
            expect((gameData.playerBetCount as any)[choice]).toEqual([playerId]);
        });

        it.each(["red2", "red3", "blue2", "blue3"])("should not count playerBetCount when bet is not over/under", (choice) => {
            // arrange
            const gameData = { playerBetCount: {} };
            // @ts-ignore
            const bot = new Bot({}, gameData, null, gameManagementApiClientFactory, null, null);

            // act
            bot.updatePlayerBetCount(playerId, choice);

            // assert
            expect((gameData.playerBetCount as any)[choice]).toBeUndefined();
        });
    });
});
