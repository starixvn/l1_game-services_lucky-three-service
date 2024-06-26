import { BET_CHOICES } from "../constants";

export const roundBetPercentage = (playerBetCount: Record<string, string[]>) => {
    const totalPlayers = (playerBetCount[BET_CHOICES.over]?.length || 0) + (playerBetCount[BET_CHOICES.under]?.length || 0);
    if (totalPlayers) {
        const over = parseInt(((playerBetCount[BET_CHOICES.over]?.length * 100) / totalPlayers).toString()) || 0;
        return {
            [BET_CHOICES.over]: over,
            [BET_CHOICES.under]: 100 - over,
        };
    }
    return {
        [BET_CHOICES.over]: 0,
        [BET_CHOICES.under]: 0,
    };
};
