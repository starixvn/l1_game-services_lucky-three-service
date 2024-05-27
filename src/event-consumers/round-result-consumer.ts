import { EventConsumers } from "sc-number-game-base";
import { ServerSeedHelper } from "sc-game-base/src/core/helpers";
import { BALLS_EACH_DRAW, SERVER_SEED_SECRET_LENGTH, TOTAL_BALLS } from "../constants";
import { generateRemainingBalls } from "sc-number-game-base/dist/helpers";
import { DrawResult } from "../models/rounds";
import { generateRandomNumbers } from "../helpers";

export default class RoundResultConsumer extends EventConsumers.RoundResultConsumer {
    generateServerSeed() {
        const { randomMode } = this.gameData.gameConfigs;
        const { roundResult } = this.gameData;

        const drawn = (roundResult as DrawResult[])
            .map((res) => res.balls)
            .flat()
            .map((ball) => +ball);

        const totalRemainingBalls = TOTAL_BALLS - drawn.length;

        const randomBalls = generateRandomNumbers(randomMode, BALLS_EACH_DRAW, totalRemainingBalls).join(";");

        const remainingBalls = generateRemainingBalls(TOTAL_BALLS, drawn).join(":");

        const serverSeedSecret = ServerSeedHelper.generateServerSeed(randomMode, SERVER_SEED_SECRET_LENGTH);

        return `{"random":"${randomBalls}","remain":"${remainingBalls}","secret":"${serverSeedSecret}"}`;
    }
}
