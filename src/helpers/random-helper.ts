import Chance from "chance";
import { MersenneTwister19937, Random } from "random-js";
import { shuffle as d3Shuffle } from "d3-array";
import lodashShuffle from "lodash/shuffle";

const chance = new Chance();
const random = new Random(MersenneTwister19937.autoSeed());
const generateSeeds = (numberOfSeeds: number) => {
    return [...Array(numberOfSeeds + 1).keys()].slice(1);
};

const random1 = (numberOfPicked: number, numberOfSeeds: number) =>
    chance.shuffle(chance.shuffle(chance.shuffle(generateSeeds(numberOfSeeds)))).slice(0, numberOfPicked);

const random2 = (numberOfPicked: number, numberOfSeeds: number) => {
    return d3Shuffle(d3Shuffle(d3Shuffle(generateSeeds(numberOfSeeds)))).slice(0, numberOfPicked);
};

const random3 = (numberOfPicked: number, numberOfSeeds: number) =>
    lodashShuffle(lodashShuffle(lodashShuffle(generateSeeds(numberOfSeeds)))).slice(0, numberOfPicked);

const random4 = (numberOfPicked: number, numberOfSeeds: number) => chance.pickset(generateSeeds(numberOfSeeds), numberOfPicked);

const random5 = (numberOfPicked: number, numberOfSeeds: number) =>
    random.shuffle([...generateSeeds(numberOfSeeds)]).slice(0, numberOfPicked);

const random6 = (numberOfPicked: number, numberOfSeeds: number) => random.sample(generateSeeds(numberOfSeeds), numberOfPicked);

export const randomModes: any = {
    1: [random1, random2, random3, random4],
    2: [random3, random4, random5, random6],
    3: [random1, random2, random5, random6],
};

export const generateRandomNumbers = (randomMode: number, numberOfPicked: number, numberOfSeeds: number): number[] => {
    const randomShuffles: Function[] = randomModes[randomMode] || randomModes[1];
    return chance.pickone(randomShuffles)(numberOfPicked, numberOfSeeds);
};
