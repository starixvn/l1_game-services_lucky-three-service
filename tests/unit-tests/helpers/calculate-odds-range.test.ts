import { calculateOddsRange } from "../../../src/helpers/calculate-odds-range";
import { Helpers } from "sc-number-game-base";

jest.mock("sc-number-game-base", () => ({
    Helpers: { getBetOdds: jest.fn() },
}));

describe("calculateOddsRange tests", () => {
    it("should call Helpers.getBetOdds", () => {
        // arrange
        const MinProbability = {
            over: 0.3742138365,
            under: 0.3742138365,
            red3: 0.08159974198,
            red2: 0.3338171263,
            blue3: 0.08159974198,
            blue2: 0.3338171263,
        };

        const MaxProbability = {
            over: 0.4208998549,
            under: 0.4208998549,
            red3: 0.1636832769,
            red2: 0.4208998549,
            blue3: 0.1636832769,
            blue2: 0.4208998549,
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
        const odds = calculateOddsRange(margin);

        // assert
        expect(Helpers.getBetOdds).toHaveBeenNthCalledWith(1, MaxProbability, margin);
        expect(Helpers.getBetOdds).toHaveBeenNthCalledWith(2, MinProbability, margin);
    });
});
