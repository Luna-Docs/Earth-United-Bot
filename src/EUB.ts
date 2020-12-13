import {config} from "dotenv";
config({path: `${__dirname}/../.env`});

import Cluster from "./Lib/Structures/Client";
const client = new Cluster();

import {VultrexDB} from "vultrex.db";
import { table } from "console";

const db = new VultrexDB({
    provider: 'sqlite',
    fileName: 'database',
    table: 'main'
});

const eco = new VultrexDB({
    provider: 'sqlite',
    fileName: 'economy',
    table: 'economy'
});

const punish = new VultrexDB({
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
            
            await client.logger.info('Punishments Database Connected!');
            client.start("Nzg3MDQxMDk3MDMzMDU2MjY2.X9PLJA.QhoJko7ecyVhnLRTbQ9C85woOZI");
        });
    });
});