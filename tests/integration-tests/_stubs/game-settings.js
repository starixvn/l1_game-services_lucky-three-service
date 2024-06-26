import gameSettings from "../../../build/game-settings";

export default Object.assign(gameSettings, {
    durations: {
        wholeRound: 35,
        placingBets: 8,
        lockingBet: 3,
        showingResult: 2,
        wholeTurn: 11,
        startingRound: 2,
    },
    numberOfTurnsPerRound: 3,
});
