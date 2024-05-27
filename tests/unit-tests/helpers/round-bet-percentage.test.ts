import { roundBetPercentage } from "../../../src/helpers/round-bet-percentage";

describe("round bet percentage tests", () => {
    const testCases = [
        {
            betPercentage: {
                over: 24.5,
                under: 75.5,
            },

            expected: {
                over: 24,
                under: 76,
            },
        },
        {
            betPercentage: {
                over: 24.9,
                under: 75.1,
            },

            expected: {
                over: 24,
                under: 76,
            },
        },
    ];
    it.each(testCases)("should return expected", ({ betPercentage, expected }) => {
        // act
        const actual = roundBetPercentage(betPercentage);

        // assert
        expect(actual).toEqual(expected);
    });
});
