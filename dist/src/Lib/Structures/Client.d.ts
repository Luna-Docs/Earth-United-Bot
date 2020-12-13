/// <reference types="node" />
import '../Extensions/Message';
import { Client, Collection } from "discord.js";
import { BanLog, UnbanLog, MuteLog } from "../Types/EUB";
import Logger from "../Utils/Logger";
import CommandHandler from "../../Handlers/CommandHandler";
import ListenerHandler from "../../Handlers/ListenerHandler";
import EUBUserFetcher from "../Utils/Fetchers/User";
import EUBGuildMemberFetcher from "../Utils/Fetchers/GuildMember";
import EUBMessageFetcher from "../Utils/Fetchers/Message";
import EUBRoleFetcher from "../Utils/Fetchers/Role";
import EUBChannelFetcher from "../Utils/Fetchers/Channel";
interface EUBFetchers {
    user: EUBUserFetcher;
    member: EUBGuildMemberFetcher;
    message: EUBMessageFetcher;
    role: EUBRoleFetcher;
    channel: EUBChannelFetcher;
}
export default class EUBClient extends Client {
    prefix: any;
    swearWords: any;
    blacklist: any;
    db: any;
    eco: any;
    punish: any;
    capitalise: (str: string) => string;
    cooldown: Collection<string, any>;
    aliases: Collection<string, string>;
    commands: CommandHandler;
    events: ListenerHandler;
    fetch: EUBFetchers;
    logger: Logger;
    caches: {
        bans: Collection<string, BanLog>;
        unbans: Collection<string, UnbanLog>;
        mutes: Collection<string, MuteLog>;
        softbans: Collection<unknown, unknown>;
        invites: Collection<string, Collection<string, NodeJS.Timeout>>;
    };
    version: string;
    owners: string;
    constructor();
    start(token: string | any): Promise<string | void>;
}
export {};
