import { EventPublishers, GameData } from "sc-number-game-base";
import { roundBetPercentage } from "../helpers";

export default class RunningRoundInfoPublisher extends EventPublishers.RunningRoundInfoPublisher {
    getBetPercentageAndPlayerBetCount() {
        const { playerBetCount } = super.getBetPercentageAndPlayerBetCount();
        const betPercentage = roundBetPercentage((this.gameData as GameData).playerBetCount);

        return { betPercentage, playerBetCount };
    }
}
