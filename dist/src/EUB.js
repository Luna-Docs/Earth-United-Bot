"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const dotenv_1 = require("dotenv");
dotenv_1.config({ path: `${__dirname}/../.env` });
const Client_1 = tslib_1.__importDefault(require("./Lib/Structures/Client"));
const client = new Client_1.default();
const vultrex_db_1 = require("vultrex.db");
const db = new vultrex_db_1.VultrexDB({
    provider: 'sqlite',
    fileName: 'database',
    table: 'main'
});
const eco = new vultrex_db_1.VultrexDB({
    provider: 'sqlite',
    fileName: 'economy',
    table: 'economy'
});
const punish = new vultrex_db_1.VultrexDB({
    provider: 'sqlite',
    fileName: 'punishments',
    table: 'punishments'
});
db.connect().then(async () => {
    client.db = db;
    await client.logger.info('Main Database Connected!');
    eco.connect().then(async () => {
        client.eco = eco;
        await client.logger.info('Economy Database Connected!');
        punish.connect().then(async () => {
            client.punish = punish;
            client.prefix = new Object();
            client.prefix['default'] = '!';
            client.swearWords = await client.db.get(`swear-words`, []);
            client.blacklist = await client.db.get(`blacklisted`, []);
            client.punishments = await client.punish.get(`${(new discord_js_1.User(client, {}).id)}-punishments`, []);
            await client.logger.info('Punishments Database Connected!');
            client.start("Nzg3MDQxMDk3MDMzMDU2MjY2.X9PLJA.QhoJko7ecyVhnLRTbQ9C85woOZI");
        });
    });
});
//# sourceMappingURL=EUB.js.map