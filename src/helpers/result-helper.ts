import { LuckyThree, Utils } from "@rd/numbers-game-probabilities";
import { DrawResult } from "../models/rounds";
import { BALLS_EACH_DRAW, MEDIAN } from "../constants";

export type FinalSeeds = {
    serverSeed: string;
    finalHash: string;
};

export const generateResult = (finalSeeds: FinalSeeds) => {
    const serverSeed = JSON.parse(finalSeeds.serverSeed);

    const remainingBalls = serverSeed.remain.split(":").map((ball: string) => +ball);

    const randomIndexes = serverSeed.random.split(";").map((ballIndex: string) => +ballIndex) as number[];

    const increments = finalHashToNumbers(finalSeeds.finalHash);

    const totalRemainingBalls = remainingBalls.length;

    const ballIndexes = randomIndexes.map((randomValue, index) => (randomValue + increments[index]) % (totalRemainingBalls - index));

    let currentRemainingBalls: number[] = remainingBalls;

    const balls: number[] = [];

    ballIndexes.forEach((index) => {
        balls.push(currentRemainingBalls[index]);
        currentRemainingBalls.splice(index, 1);
    });

    return { balls };
};

export const finalHashToNumbers = (finalHash: string) => {
    const increments = [];
    for (let i = 0; i < BALLS_EACH_DRAW; i++) {
        const value = parseInt(finalHash.slice(i * 2, i * 2 + 2), 16);
        increments.push(value);
    }
    return increments;
};

export const getSettlementResult = (result: DrawResult) => {
    const sum = Utils.getSum(result.balls);
    const over = sum >= MEDIAN;
    const totalReds = getTotalReds(result.balls);

    return {
        over,
        under: !over,
        red2: totalReds === 2,
        red3: totalReds === 3,
        blue2: totalReds === 1,
        blue3: totalReds === 0,
    };
};

const getTotalReds = (balls: number[]) => [...balls].filter((ball) => +ball % 2 === 0).length;

export const getProbabilities = (roundResult: DrawResult[]) => {
    const drawn = roundResult
        .map((res) => res.balls)
        .flat()
        .map((ball) => +ball);

    return LuckyThree.getProbabilities(drawn);
};

export const generateRawResultForHash = () => {};
