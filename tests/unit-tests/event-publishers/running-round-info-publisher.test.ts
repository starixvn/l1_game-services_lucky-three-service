import { GameData } from "sc-number-game-base";
import RunningRoundInfoPublisher from "../../../src/event-publishers/running-round-info-publisher";
import { EventPublishers } from "sc-number-game-base";
import { stub } from "jest-auto-stub";

describe("running-round-info-publisher test", () => {
    let publisher: RunningRoundInfoPublisher;
    const gameData = stub<GameData>();

    beforeEach(() => {
        publisher = new RunningRoundInfoPublisher("LuckyThree", gameData);
        jest.spyOn(EventPublishers.RunningRoundInfoPublisher.prototype, "getBetPercentageAndPlayerBetCount").mockReturnValue({
            betPercentage: { over: 37.5, under: 37.5 },
            playerBetCount: { over: 3, under: 2 },
        });
    });

    it("inherit RunningRoundInfoPublisher of sc-number-game-base", () => {
        expect(publisher instanceof EventPublishers.RunningRoundInfoPublisher);
    });

    describe("getBetPercentageAndPlayerBetCount", () => {
        it("should call super.getBetPercentageAndPlayerBetCount", () => {
            // act
            publisher.getBetPercentageAndPlayerBetCount();

            // assert
            expect(EventPublishers.RunningRoundInfoPublisher.prototype.getBetPercentageAndPlayerBetCount).toHaveBeenCalled();
        });

        it("should return correct", () => {
            //arrange
            gameData.playerBetCount = { over: ["1", "2", "3"], under: ["4", "5"] };

            // act
            const actual = publisher.getBetPercentageAndPlayerBetCount();

            // assert
            expect(actual).toStrictEqual({
                betPercentage: { over: 60, under: 40 },
                playerBetCount: { over: 3, under: 2 },
            });
        });
    });
});
