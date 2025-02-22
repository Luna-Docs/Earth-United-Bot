import '../Extensions/Message';

import { Client, Collection, MessageEmbed, Intents, Message } from "discord.js";
import moment from "moment";

import pkg from "../../../package.json";
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

enum EUBDiscordColors {
    BASE = '00ff81',
    WARN = 'f0f725',
    MUTE = '2560f7',
    KICK = 'f79525',
    BAN = 'f73625',
    BUGS = '777d84',
    ERROR = 'f2594b'
}

export default class EUBClient extends Client {
    prefix: any;
    swearWords: any;
    blacklist: any;
    punishments: any;
    db: any;
    eco: any;
    punish: any;
    capitalise = (str: string) => str.split(' ').map(str => str.slice(0, 1).toUpperCase() + str.slice(1)).join(' ');
    colors = EUBDiscordColors;

    cooldown = new Collection<string, any>();

    public aliases = new Collection<string, string>();
    public commands = new CommandHandler(this);
    public events = new ListenerHandler(this);
    public fetch = {} as EUBFetchers;
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

        this.fetch.user = new EUBUserFetcher(this);
        this.fetch.member = new EUBGuildMemberFetcher(this);
        this.fetch.message = new EUBMessageFetcher(this);
        this.fetch.role = new EUBRoleFetcher(this);
        this.fetch.channel = new EUBChannelFetcher(this);
    }

    public async start(token: string | any) {
        this.events.init();
        this.commands.init();

        return await super.login(token).catch((err) => this.logger.error(err));
    }

    public embed(type:
        'base'
        | 'warn'
        | 'mute'
        | 'kick'
        | 'ban'
        | 'bugs'
        | 'error', title: string, description: string): MessageEmbed {
        const embed = new MessageEmbed()
            .setTitle(title)
            .setDescription(description)
            .setFooter(this.time);

        if (type === 'base') embed.setColor(this.colors.BASE)
        if (type === 'warn') embed.setColor(this.colors.WARN);
        if (type === 'mute') embed.setColor(this.colors.MUTE);
        if (type === 'kick') embed.setColor(this.colors.KICK);
        if (type === 'ban') embed.setColor(this.colors.BAN);
        if (type === 'bugs') embed.setColor(this.colors.BUGS);
        if (type === 'error') embed.setColor(this.colors.ERROR)

        return embed;
    }

    public sem(
        msg: Message | EUBGuildMessage,
        type:
            'base'
            | 'warn'
            | 'mute'
            | 'kick'
            | 'ban'
            | 'bugs'
            | 'error', title: string, description: string, deleteOptions?: EUBDeleteMessageOptions) {
        const embed = new MessageEmbed()
            .setTitle(title)
            .setDescription(description)
            .setFooter(this.time);;

        if (type === 'base') embed.setColor(this.colors.BASE)
        if (type === 'warn') embed.setColor(this.colors.WARN);
        if (type === 'mute') embed.setColor(this.colors.MUTE);
        if (type === 'kick') embed.setColor(this.colors.KICK);
        if (type === 'ban') embed.setColor(this.colors.BAN);
        if (type === 'bugs') embed.setColor(this.colors.BUGS);
        if (type === 'error') embed.setColor(this.colors.ERROR)

        if (!deleteOptions) return msg.channel.send(embed)
        else if (deleteOptions) return msg.channel.send(embed).then((msg) => {
            msg.delete({
                timeout: deleteOptions.timeout,
                reason: deleteOptions.reason
            })
        });
    }

    get time(): string {
        return moment().format('MMMM [the] Do [in] YYYY [@] hh:mm A');
    }
}