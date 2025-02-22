/// <reference types="node" />
import '../Extensions/Message';
import { Client, Collection, MessageEmbed, Message } from "discord.js";
import { BanLog, UnbanLog, MuteLog, EUBGuildMessage } from "../Types/EUB";
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
interface EUBDeleteMessageOptions {
    timeout?: number;
    reason?: string;
}
declare enum EUBDiscordColors {
    BASE = "00ff81",
    WARN = "f0f725",
    MUTE = "2560f7",
    KICK = "f79525",
    BAN = "f73625",
    BUGS = "777d84",
    ERROR = "f2594b"
}
export default class EUBClient extends Client {
    prefix: any;
    swearWords: any;
    blacklist: any;
    punishments: any;
    db: any;
    eco: any;
    punish: any;
    capitalise: (str: string) => string;
    colors: typeof EUBDiscordColors;
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
    embed(type: 'base' | 'warn' | 'mute' | 'kick' | 'ban' | 'bugs' | 'error', title: string, description: string): MessageEmbed;
    sem(msg: Message | EUBGuildMessage, type: 'base' | 'warn' | 'mute' | 'kick' | 'ban' | 'bugs' | 'error', title: string, description: string, deleteOptions?: EUBDeleteMessageOptions): Promise<Message> | Promise<void> | undefined;
    get time(): string;
}
export {};
