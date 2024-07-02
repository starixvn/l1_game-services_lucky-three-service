import { BET_CHOICES } from "./constants";

export default {
    id: 1006,
    name: "LuckyThree",
    durations: {
        wholeRound: 82,
        placingBets: 20,
        lockingBet: 3,
        showingResult: 3,
        wholeTurn: 26,
        startingRound: 4,
    },
    choices: Object.values(BET_CHOICES),
    choicesMapper: { over: 1, under: 2, red2: 3, red3: 4, blue2: 5, blue3: 6 },
    hedgeBetGroups: [["over", "under"]],
    numberOfTurnsPerRound: 3,
    numberOfRoundHistory: 108,
    historyPageSize: 30,
    provablyFair: true,
    botSettings: {
        ratio: { overUnderOptions: 70, rareOptions: 30 },
        overUnderOptions: ["over", "under"],
        rareOptions: ["red2", "red3", "blue2", "blue3"],
    },
};
