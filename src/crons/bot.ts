import { Crons } from "sc-number-game-base";
import { BET_CHOICES } from "../constants";

export default class Bot extends Crons.Bot {
    updatePlayerBetCount(playerId: string, choice: string): void {
        if ([BET_CHOICES.over, BET_CHOICES.under].includes(choice)) {
            if (!this.gameData.playerBetCount[choice]) {
                this.gameData.playerBetCount[choice] = [];
            }
            !this.gameData.playerBetCount[choice].includes(playerId) && this.gameData.playerBetCount[choice].push(playerId);
        }
    }
}
