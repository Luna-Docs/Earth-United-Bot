import './Structures/Message';

import {Client, Collection, Intents} from "discord.js";

import pkg from "../../../package.json";
import {BanLog, UnbanLog, MuteLog} from "../Types/EUB";
import Logger from "../Utils/Logger";
import CommandHandler from "../../Handlers/CommandHandler";
import ListenerHandler from "../../Handlers/ListenerHandler";

export default class EUBClient extends Client {
    prefix: any;
    swearWords: unknown;
    blacklist: unknown;

    public aliases = new Collection<string, string>();
    public commands = new CommandHandler(this);
    public events = new ListenerHandler(this);
    public logger = new Logger();

    public caches = {
        bans: new Collection<string, BanLog>(),
        unbans: new Collection<string, UnbanLog>(),
        mutes: new Collection<string, MuteLog>(),
        softbans: new Collection(),
        invites: new Collection<string, Collection<string, NodeJS.Timeout>>()
    };

    public version = pkg.version;
    public owners: string = '671374842951630858';

    constructor() {
        super({
            messageCacheMaxSize: 300,
            messageCacheLifetime: 900,
            messageSweepInterval: 180,
            partials: ['MESSAGE', 'REACTION', 'USER', 'GUILD_MEMBER', 'CHANNEL'],
            ws: {
                intents: Intents.FLAGS.GUILDS | Intents.FLAGS.GUILD_MEMBERS | Intents.FLAGS.GUILD_BANS |
                Intents.FLAGS.GUILD_INVITES | Intents.FLAGS.GUILD_PRESENCES | Intents.FLAGS.GUILD_MESSAGES |
                Intents.FLAGS.GUILD_MESSAGE_REACTIONS | Intents.FLAGS.DIRECT_MESSAGES |
                Intents.FLAGS.DIRECT_MESSAGE_REACTIONS
            }
        });

        this.login(process.env.DISCORD!);
    }

    public async login(token: string): Promise<string> {
        return super.login(token);
    }
}