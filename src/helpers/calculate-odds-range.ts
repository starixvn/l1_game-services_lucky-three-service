import { Helpers } from "sc-number-game-base";
import { LuckyThree } from "@rd/numbers-game-probabilities";
import gameSettings from "../game-settings";

export const calculateOddsRange = (margin?: Record<string, number>[]) => {
    const probabilitiesRange = LuckyThree.getProbabilitiesRange(gameSettings.numberOfTurnsPerRound);

    return {
        min: Helpers.getBetOdds(probabilitiesRange.max as any, margin),
        max: Helpers.getBetOdds(probabilitiesRange.min as any, margin),
    };
};
