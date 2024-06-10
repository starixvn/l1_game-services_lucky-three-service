import { roundBetPercentage } from "../../../src/helpers/round-bet-percentage";

describe("round bet percentage tests", () => {
    const testCases = [
        {
            playerBetCount: {
                over: ["1", "2", "3"],
                under: ["4", "5"],
            },

            expected: {
                over: 60,
                under: 40,
            },
        },
        {
            playerBetCount: {
                over: [],
                under: ["4", "5"],
            },

            expected: {
                over: 0,
                under: 100,
            },
        },
        {
            playerBetCount: {
                over: ["1", "2", "3"],
                under: [],
            },

            expected: {
                over: 100,
                under: 0,
            },
        },

        {
            playerBetCount: {},
            expected: {
                over: 0,
                under: 0,
            },
        },
    ];
    it.each(testCases)("should return expected", ({ playerBetCount, expected }) => {
        // act
        const actual = roundBetPercentage(playerBetCount as any);

        // assert
        expect(actual).toEqual(expected);
    });
});
