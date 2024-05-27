import * as resultHelper from "../../../src/helpers/result-helper";
import { ServerSeedHelper } from "sc-game-base/src/core/helpers";
import { DrawResult } from "../../../src/models/rounds";
import { LuckyThree } from "@rd/numbers-game-probabilities";

jest.mock("sc-game-base/src/core/helpers", () => ({
    ServerSeedHelper: { generateServerSeed: jest.fn().mockReturnValue("123asd") },
}));

jest.mock("@rd/numbers-game-probabilities", () => ({
    ...jest.requireActual("@rd/numbers-game-probabilities"),
    LuckyThree: { getProbabilities: jest.fn() },
}));

describe("result helper tests", () => {
    describe("finalHashToNumbers", () => {
        it("should return expected", () => {
            // arrange
            const finalHash = "123b5c4f";

            // act
            const actual = resultHelper.finalHashToNumbers(finalHash);

            // assert
            expect(actual).toEqual([18, 59, 92]);
        });
    });

    describe("generateResult", () => {
        it("should return expected", () => {
            // arrange
            const remainingBalls = [...Array(60 + 1).keys()].slice(1).join(":");

            const serverSeedSecret = ServerSeedHelper.generateServerSeed(1, 32);

            const serverSeed = `{"random":"29;65;79","remain":"${remainingBalls}","secret":"${serverSeedSecret}"}`;

            const finalSeeds = {
                serverSeed: serverSeed,
                finalHash: "123b5c4f",
            };

            // act
            const actual = resultHelper.generateResult(finalSeeds);

            // assert
            expect(actual).toEqual({ balls: [48, 7, 58] });
        });
    });

    describe("getSettlementResult", () => {
        it("should return expected", () => {
            // arrange
            const result = {
                balls: [2, 4, 6],
            } as DrawResult;

            // act
            const actual = resultHelper.getSettlementResult(result);

            // assert
            expect(actual).toEqual({
                over: false,
                under: true,
                red2: false,
                red3: true,
                blue2: false,
                blue3: false,
            });
        });
    });

    describe("getProbabilities", () => {
        it("should return expected", () => {
            // arrange
            const roundResult = [
                {
                    drawId: 1,
                    balls: [1, 2, 3],
                },
                {
                    drawId: 2,
                    balls: [4, 5, 6],
                },
            ] as DrawResult[];

            // act
            resultHelper.getProbabilities(roundResult);

            // assert
            expect(LuckyThree.getProbabilities).toHaveBeenCalledWith([1, 2, 3, 4, 5, 6]);
        });
    });
});
