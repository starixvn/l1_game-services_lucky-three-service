import { calculateOddsRange } from "../../../src/helpers/calculate-odds-range";
import { Helpers } from "sc-number-game-base";

jest.mock("sc-number-game-base", () => ({
    Helpers: { getBetOdds: jest.fn() },
}));

describe("calculateOddsRange tests", () => {
    it("should call Helpers.getBetOdds", () => {
        // arrange
        const MinProbability = {
            over: 0.3742138364779874,
            under: 0.3742138364779874,
            red2: 0.33381712626995647,
            red3: 0.08159974197710047,
            blue2: 0.33381712626995647,
            blue3: 0.08159974197710047,
        };

        const MaxProbability = {
            over: 0.6257861635220126,
            under: 0.6257861635220126,
            red2: 0.420899854862119,
            red3: 0.16368327689082407,
            blue2: 0.420899854862119,
            blue3: 0.16368327689082407,
        };

        const margin = [
            {
                over: 0.02,
                under: 0.02,
                red3: 0.06,
                red2: 0.06,
                blue3: 0.06,
                blue2: 0.06,
                max: 10,
            },
            {
                over: 0.02,
                under: 0.02,
                red3: 0.06,
                red2: 0.06,
                blue3: 0.06,
                blue2: 0.06,
                max: 100,
            },
        ];

        // act
        calculateOddsRange(margin);

        // assert
        expect(Helpers.getBetOdds).toHaveBeenNthCalledWith(1, MaxProbability, margin);
        expect(Helpers.getBetOdds).toHaveBeenNthCalledWith(2, MinProbability, margin);
    });
});
