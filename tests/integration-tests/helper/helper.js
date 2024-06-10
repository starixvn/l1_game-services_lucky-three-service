import { currencyData } from "../_stubs/test-data";
import { GameClientDriver, normalUser, eventTypes } from "sc-game-service-integration-utils";
import { Helpers } from "sc-number-game-base";
import gameSettings from "../_stubs/game-settings";
import mongoose from "mongoose";
import { middlewares } from "sc-common";

export const checkConnect = (socketOptions, callback) => {
    const normalUserClientDriver = new GameClientDriver(socketOptions, initUserSession(normalUser));
    normalUserClientDriver.on(eventTypes.connectError, () => {
        setTimeout(() => {
            checkConnect(socketOptions, callback);
        }, 1000);
    });
    normalUserClientDriver.on(eventTypes.connect, () => {
        normalUserClientDriver.close();
        setTimeout(callback, 2000);
    });
};

export const getTimeOutToPlacingBetTime = (remainingTime, durations) => {
    remainingTime = Helpers.getCurrentTimeOfTurn(remainingTime, durations.wholeTurn, gameSettings.numberOfTurnsPerRound);
    const currentDraw = Helpers.getCurrentTurn(remainingTime, durations.wholeTurn, gameSettings.numberOfTurnsPerRound);

    let timeout = 0;
    if (remainingTime <= durations.lockingBet) {
        timeout = remainingTime + durations.wholeTurn - durations.placingBets + 2;

        if (currentDraw === gameSettings.numberOfTurnsPerRound) {
            timeout += durations.startingRound;
        }
    } else if (remainingTime >= durations.placingBets) {
        timeout = remainingTime - durations.placingBets + 2;
    }

    return timeout;
};

export const getTimeOutToSettleTime = (remainingTime, durations) => {
    remainingTime = Helpers.getCurrentTimeOfTurn(remainingTime, durations.wholeTurn, gameSettings.numberOfTurnsPerRound);
    const currentDraw = Helpers.getCurrentTurn(remainingTime, durations.wholeTurn, gameSettings.numberOfTurnsPerRound);
    const showingResultTime = durations.placingBets + durations.showingResult;

    let timeout = 0;
    if (remainingTime <= durations.placingBets || remainingTime >= showingResultTime) {
        timeout = remainingTime + 1;

        if (currentDraw === gameSettings.numberOfTurnsPerRound) {
            timeout += durations.startingRound;
        }
    }

    return timeout;
};

export const getTimeOutToBetInvalid = (remainingTime, durations) => {
    remainingTime = Helpers.getCurrentTimeOfTurn(remainingTime, durations.wholeTurn, gameSettings.numberOfTurnsPerRound);

    let timeout = 0;
    if (remainingTime >= durations.lockingBet && remainingTime <= durations.placingBets) {
        timeout = remainingTime - durations.lockingBet + 1;
    }

    return timeout;
};

export const initUserSession = (user) => {
    return {
        session: `${user.playerId}-session-id`,
        ss: `${user.playerId}-session-id`,
        currency: currencyData.name,
        username: `${user.playerId}_${user.playerName}`,
        browserUserAgent: "browser-user-agent",
    };
};
