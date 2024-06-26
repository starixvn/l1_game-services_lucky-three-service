import { GameClientDriver, normalUser } from "sc-game-service-integration-utils";
import { initUserSession } from "../../helper/helper";
import { socketOptionsFunc } from "../../_stubs/test-data";
import appConfigs from "../../../../build/app-configs.IGT";

const socketOptions = socketOptionsFunc(appConfigs.hostingPort);

describe("when getPfInfo", () => {
    let client;

    beforeEach(async () => {
        client = new GameClientDriver(socketOptions, initUserSession(normalUser));

        const sendSignInInterval = setInterval(() => {
            client.sendSignInEvent();
        }, 500);

        await client.handleSignedInEvent();

        client.sendInGameEvent();

        clearInterval(sendSignInInterval);
    });

    afterEach(() => {
        client.close();
        client = null;
    });

    it("should return pfInfo", async () => {
        // Arrange
        client.emit("getPfInfo", { drawId: 4 });
        const pfInfo = {
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
            serverSeed: '{"random":"45;6;10","remain":"1:2:3:4:5:6:7:8:9:10:11:12:13:14:15:16:17:18:19:20:21:22:23:24:25:26:27:28:29:30:31:32:33:34:35:36:37:38:39:40:41:42:43:44:45:46:47:48:49:50:51:52:53:54:55:56:57:58:59:60","secret":"H13xfDSznPMKNTDZZu5KdHWYhNF3oZR6"}',
            mergeSeed:
                '{"random":"45;6;10","remain":"1:2:3:4:5:6:7:8:9:10:11:12:13:14:15:16:17:18:19:20:21:22:23:24:25:26:27:28:29:30:31:32:33:34:35:36:37:38:39:40:41:42:43:44:45:46:47:48:49:50:51:52:53:54:55:56:57:58:59:60","secret":"H13xfDSznPMKNTDZZu5KdHWYhNF3oZR6"}081653026611',
        };

        // Act
        const actual = await client.handleGameEvent((data) => data.clientSeedDetail);

        // Assert
        expect(actual.pfResult.serverSeedHash).toEqual(pfInfo.serverSeedHash);
        expect(JSON.stringify(actual.pfResult.serverSeed)).toEqual(JSON.stringify(pfInfo.serverSeed));
        expect(actual.clientSeedDetail).toEqual({});
    });
});
