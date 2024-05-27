import { Helpers } from "sc-number-game-base";

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

export const calculateOddsRange = (margin?: Record<string, number>[]) => {
    return {
        min: Helpers.getBetOdds(MaxProbability, margin),
        max: Helpers.getBetOdds(MinProbability, margin),
    };
};
