import { BET_CHOICES } from "../constants";

export const roundBetPercentage = (betPercentage: Record<string, number>) => {
    betPercentage[BET_CHOICES.over] && (betPercentage[BET_CHOICES.over] = parseInt(betPercentage[BET_CHOICES.over].toString()));
    if (betPercentage[BET_CHOICES.under] > 0) {
        betPercentage[BET_CHOICES.under] = 100 - (betPercentage[BET_CHOICES.over] ?? 0);
    }

    return betPercentage;
};
