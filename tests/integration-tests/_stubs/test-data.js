import gameSetting from "./game-settings";

const game = {
    id: gameSetting.id,
    name: gameSetting.name,
};

const currencyData = { code: "USD", name: "$US" };

const socketOptionsFunc = (port) => {
    return {
        socketUri: `http://localhost:${port}/user/${gameSetting.name.toLowerCase()}`,
        gameName: game.name,
        proxyRoute: "/socket.io",
    };
};

const gameConfig = {
    type: 0,
    name: gameSetting.name.toLowerCase(),
    minBet: 1,
    maxBet: 3000,
    maxBetPerChoices: { over: 3000, under: 3000, red2: 3000, red3: 3000, blue2: 3000, blue3: 3000 },
    odds: { over: 2, under: 2, red2: 2, red3: 2, blue2: 2, blue3: 2 },
    margin: [
        {
            max: 10,
            over: 0.02,
            under: 0.02,
            red2: 0.06,
            red3: 0.06,
            blue2: 0.06,
            blue3: 0.06,
        },
        {
            max: 100,
            over: 0.02,
            under: 0.02,
            red2: 0.06,
            red3: 0.06,
            blue2: 0.06,
            blue3: 0.06,
        },
    ],
    botenabled: false,
    hour_maxbot: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    bot_maxbet: 1000,
    choices_maxbet: { over: 3000, under: 3000, red2: 3000, red3: 3000, blue2: 3000, blue3: 3000 },
};

const tempRoundResult = [
    { drawId: 1, balls: [1, 2, 3] },
    { drawId: 2, balls: [4, 5, 6] },
    { drawId: 3, balls: [7, 8, 9] },
];

const pfResults = [
    {
        clientSeeds: [
            {
                name: "Top35226",
                clientSeed: "0816",
            },
            {
                name: "Amphibian71248",
                clientSeed: "5302",
            },
            {
                name: "Aardwolf49247",
                clientSeed: "6611",
            },
        ],
        roundId: 2,
        drawId: 4,
        serverSeedHash: "3192218b9d14fd08f9fd91c374046a58eaee1a5b46f12bbc14396152da83f8b1",
        encryptedServerSeed: {
            iv: "703b5ee8a943c824f675c84626ed493c",
            content:
                "9f8863996f2934f6eba77ddc58ada2862d492febd42ed83da7aba3b411705dc90296d1ef624ee9175b43ac030a63691fc6a37183791890380923106613b453bff7e6b568a48df311cda33ac73c705f13176df1e6ec425a65f3f1f967b5ab3e6f47da0a700ae1981a12f56669c822aa140a32710d518ff0db1f1000fe69934f2ffee5442e1a5991bf98095dd43c85cd1a31973520e2acbd935b90b18a022989f383028f24df52afa8d5bd0b5168abf4b4e3351259c5ced7d614a8112dc08d9970b431a0e35dab9dcac4d0060bab208fbbde37e5588382d7cbf096f3b88b465919a4f45f038701d880dcbd4bfc94cae7d3fbf0ef7ba720",
        },
        finalHash:
            "c0c4bd8a862fb67099954b0c4807046304943fd707c98201b25b7e58fc33750d8491a745f25fa73737c6006e6b587fd8531c87c2603cca46eafe5b2f31ec1ada",
        mergeClientSeed: "081653026611",
        mergeSeed:
            '{"random":"45;6;10","remain":"1:2:3:4:5:6:7:8:9:10:11:12:13:14:15:16:17:18:19:20:21:22:23:24:25:26:27:28:29:30:31:32:33:34:35:36:37:38:39:40:41:42:43:44:45:46:47:48:49:50:51:52:53:54:55:56:57:58:59:60","secret":"H13xfDSznPMKNTDZZu5KdHWYhNF3oZR6"}081653026611',
    },
];

const roundsData = [
    {
        id: 1,
        result: [...tempRoundResult],
        settlementResult: [
            { drawId: 1, over: false, under: true, odd: true, even: false },
            { drawId: 2, over: false, under: true, odd: true, even: false },
            { drawId: 3, over: false, under: true, odd: true, even: false },
        ],
        drawId: 3,
        ended: true,
        exchangeRateId: 1,
    },
];

const userBetData = (uid) => {
    return [
        {
            uid: uid,
            drawId: 2,
            freeBet: false,
            roundId: 1,
            betwin: 195.6,
            clientSeed: "0",
            currency: "INH",
            name: "Draco",
            odds: gameConfig.odds,
            operatorId: "ONEworksVGCash",
            playerId: 70000,
            rate: 1000,
            siteId: "4100300",
            paid: true,
            over: 120,
            odd: 140,
            totalAmount: 260,
        },
        {
            uid: uid,
            drawId: 4,
            freeBet: false,
            roundId: 2,
            betwin: 0,
            clientSeed: "0",
            currency: "INH",
            name: "Draco",
            odds: { over: 2, red2: 2 },
            operatorId: "ONEworksVGCash",
            playerId: 70000,
            rate: 1000,
            siteId: "4100300",
            paid: false,
            over: 120,
            red2: 140,
            totalAmount: 260,
        },
        {
            uid: uid,
            drawId: 4,
            freeBet: false,
            roundId: 2,
            betwin: 0,
            clientSeed: "0",
            currency: "INH",
            name: "Draco",
            odds: { over: 2, under: 2 },
            operatorId: "ONEworksVGCash",
            playerId: 70000,
            rate: 1000,
            siteId: "4100300",
            paid: false,
            under: 120,
            totalAmount: 120,
        },
    ];
};

const userBetLogData = (uid) => {
    return [
        {
            amount: 196.8,
            rebet: false,
            roundId: 1,
            drawId: 3,
            uid: uid,
            name: "Tornado45411",
            time: "2024-03-06T02:08:29.598Z",
            choice: "over",
            siteId: "4100300",
            currency: "INH",
            rate: 1000,
            operatorId: "ONEworksVGCash",
            playerId: 666,
        },
        {
            amount: 20,
            rebet: false,
            roundId: 1,
            drawId: 2,
            uid: uid,
            name: "Bird4252",
            time: "2024-03-06T02:10:48.915Z",
            choice: "under",
            siteId: "4100300",
            currency: "INH",
            rate: 1000,
            operatorId: "ONEworksVGCash",
            playerId: 2609,
        },
    ];
};

const promotions = [
    {
        gameId: gameSetting.id,
        startDateTime: new Date(new Date().setSeconds(new Date().getSeconds() + 15)),
        endDateTime: new Date(new Date().setSeconds(new Date().getSeconds() + 15 + 6)),
        isDaily: false,
        odds: gameConfig.odds,
        status: "enabled",
    },
];

export { game, currencyData, socketOptionsFunc, gameConfig, roundsData, userBetData, promotions, userBetLogData, pfResults };
