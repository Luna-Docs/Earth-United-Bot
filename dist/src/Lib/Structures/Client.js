"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require("../Extensions/Message");
const discord_js_1 = require("discord.js");
const moment_1 = tslib_1.__importDefault(require("moment"));
const package_json_1 = tslib_1.__importDefault(require("../../../package.json"));
const Logger_1 = tslib_1.__importDefault(require("../Utils/Logger"));
const CommandHandler_1 = tslib_1.__importDefault(require("../../Handlers/CommandHandler"));
const ListenerHandler_1 = tslib_1.__importDefault(require("../../Handlers/ListenerHandler"));
const User_1 = tslib_1.__importDefault(require("../Utils/Fetchers/User"));
const GuildMember_1 = tslib_1.__importDefault(require("../Utils/Fetchers/GuildMember"));
const Message_1 = tslib_1.__importDefault(require("../Utils/Fetchers/Message"));
const Role_1 = tslib_1.__importDefault(require("../Utils/Fetchers/Role"));
const Channel_1 = tslib_1.__importDefault(require("../Utils/Fetchers/Channel"));
var EUBDiscordColors;
(function (EUBDiscordColors) {
    EUBDiscordColors["BASE"] = "00ff81";
    EUBDiscordColors["WARN"] = "f0f725";
    EUBDiscordColors["MUTE"] = "2560f7";
    EUBDiscordColors["KICK"] = "f79525";
    EUBDiscordColors["BAN"] = "f73625";
    EUBDiscordColors["BUGS"] = "777d84";
    EUBDiscordColors["ERROR"] = "f2594b";
})(EUBDiscordColors || (EUBDiscordColors = {}));
class EUBClient extends discord_js_1.Client {
    constructor() {
        super({
            messageCacheMaxSize: 300,
            messageCacheLifetime: 900,
            messageSweepInterval: 180,
            partials: ['MESSAGE', 'REACTION', 'USER', 'GUILD_MEMBER', 'CHANNEL'],
            ws: {
                intents: discord_js_1.Intents.FLAGS.GUILDS | discord_js_1.Intents.FLAGS.GUILD_MEMBERS | discord_js_1.Intents.FLAGS.GUILD_BANS |
                    discord_js_1.Intents.FLAGS.GUILD_INVITES | discord_js_1.Intents.FLAGS.GUILD_PRESENCES | discord_js_1.Intents.FLAGS.GUILD_MESSAGES |
                    discord_js_1.Intents.FLAGS.GUILD_MESSAGE_REACTIONS | discord_js_1.Intents.FLAGS.DIRECT_MESSAGES |
                    discord_js_1.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS
            }
        });
        this.capitalise = (str) => str.split(' ').map(str => str.slice(0, 1).toUpperCase() + str.slice(1)).join(' ');
        this.colors = EUBDiscordColors;
        this.cooldown = new discord_js_1.Collection();
        this.aliases = new discord_js_1.Collection();
        this.commands = new CommandHandler_1.default(this);
        this.events = new ListenerHandler_1.default(this);
        this.fetch = {};
        this.logger = new Logger_1.default();
        this.caches = {
            bans: new discord_js_1.Collection(),
            unbans: new discord_js_1.Collection(),
            mutes: new discord_js_1.Collection(),
            softbans: new discord_js_1.Collection(),
            invites: new discord_js_1.Collection()
        };
        this.version = package_json_1.default.version;
        this.owners = '671374842951630858';
        this.fetch.user = new User_1.default(this);
        this.fetch.member = new GuildMember_1.default(this);
        this.fetch.message = new Message_1.default(this);
        this.fetch.role = new Role_1.default(this);
        this.fetch.channel = new Channel_1.default(this);
    }
    async start(token) {
        this.events.init();
        this.commands.init();
        return await super.login(token).catch((err) => this.logger.error(err));
    }
    embed(type, title, description) {
        const embed = new discord_js_1.MessageEmbed()
            .setTitle(title)
            .setDescription(description)
            .setFooter(this.time);
        if (type === 'base')
            embed.setColor(this.colors.BASE);
        if (type === 'warn')
            embed.setColor(this.colors.WARN);
        if (type === 'mute')
            embed.setColor(this.colors.MUTE);
        if (type === 'kick')
            embed.setColor(this.colors.KICK);
        if (type === 'ban')
            embed.setColor(this.colors.BAN);
        if (type === 'bugs')
            embed.setColor(this.colors.BUGS);
        if (type === 'error')
            embed.setColor(this.colors.ERROR);
        return embed;
    }
    sem(msg, type, title, description, deleteOptions) {
        const embed = new discord_js_1.MessageEmbed()
            .setTitle(title)
            .setDescription(description)
            .setFooter(this.time);
        ;
        if (type === 'base')
            embed.setColor(this.colors.BASE);
        if (type === 'warn')
            embed.setColor(this.colors.WARN);
        if (type === 'mute')
            embed.setColor(this.colors.MUTE);
        if (type === 'kick')
            embed.setColor(this.colors.KICK);
        if (type === 'ban')
            embed.setColor(this.colors.BAN);
        if (type === 'bugs')
            embed.setColor(this.colors.BUGS);
        if (type === 'error')
            embed.setColor(this.colors.ERROR);
        if (!deleteOptions)
            return msg.channel.send(embed);
        else if (deleteOptions)
            return msg.channel.send(embed).then((msg) => {
                msg.delete({
                    timeout: deleteOptions.timeout,
                    reason: deleteOptions.reason
                });
            });
    }
    get time() {
        return moment_1.default().format('MMMM [the] Do [in] YYYY [@] hh:mm A');
    }
}
exports.default = EUBClient;
//# sourceMappingURL=Client.js.map