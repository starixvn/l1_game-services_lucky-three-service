import { EventConsumers, GameData } from "sc-number-game-base";
import { DrawResult } from "../models/rounds";
import { calculateOddsRange, roundBetPercentage } from "../helpers";

export default class InGameConsumer extends EventConsumers.InGameConsumer {
    getOddsRange(margin?: Record<string, number>[]) {
        return calculateOddsRange(margin);
    }

    getBetPercentage(playerBetCount: Record<string, string[]>) {
        return roundBetPercentage(playerBetCount);
    }

    getCurrentRoundData() {
        const payload = super.getCurrentRoundData();
        const { roundResult }: { roundResult: DrawResult[] } = this.gameData as GameData;
        const balls = roundResult
            .map((res) => res.balls)
            .flat()
            .map((ball) => +ball);

        return { ...payload, balls };
    }
}
