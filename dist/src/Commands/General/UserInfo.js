"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const Command_1 = tslib_1.__importDefault(require("../../Lib/Structures/Command"));
const PresenceSearch_1 = tslib_1.__importDefault(require("../../Features/PresenceSearch"));
const TimeParsing_1 = tslib_1.__importDefault(require("../../Features/TimeParsing"));
class UserInfo extends Command_1.default {
    constructor(client) {
        super(client, {
            category: 'General',
            name: 'userinfo',
            aliases: ['ui'],
            usages: [
                '!userinfo <Mention|ID|Tag|Username|Nickname>'
            ],
            examples: [
                '!userinfo Admin | giantblock'
            ],
            description: 'Check some info of a user.',
            permissions: {
                client: {
                    channel: ['SEND_MESSAGES'],
                    server: ['SEND_MESSAGES']
                },
                user: {
                    channel: ['SEND_MESSAGES'],
                    server: ['SEND_MESSAGES']
                }
            },
            cooldown: {
                allowedUses: 3,
                duration: 5
            },
            settings: {
                guildOnly: true,
                dmOnly: false
            }
        });
    }
    async execute(message, args) {
        let params = args.join(' ');
        const stat = {
            "online": "Online",
            "idle": "AFK / Idle",
            "dnd": "Do not Disturb",
            "invisible": "Invisible",
            "offline": "Offline"
        };
        if (!params || params.length < 1) {
            const custom = await PresenceSearch_1.default('CUSTOM_STATUS', message.member);
            const streaming = await PresenceSearch_1.default('STREAMING', message.member);
            const playing = await PresenceSearch_1.default('PLAYING', message.member);
            const watching = await PresenceSearch_1.default('WATCHING', message.member);
            const listening = await PresenceSearch_1.default('LISTENING', message.member);
            const embM = this.client.embed('base', 'General | User Info', `Fetched user!`)
                .setThumbnail(message.member.user.displayAvatarURL({ dynamic: true }))
                .addField('Base', [
                `**ID** ${message.member.id}`,
                `**Username** ${message.member.user.username}`,
                `**Tag** ${message.member.user.tag}`
            ].join('\n'))
                .addField('Dates', [
                `**Joined** ${await TimeParsing_1.default(Date.now() - message.member.joinedTimestamp)}`,
                `**Created** ${await TimeParsing_1.default(Date.now() - message.member.user.createdTimestamp)}`
            ].join('\n'))
                .addField('Ranks', [
                `**Highest** ${message.member.roles.highest}`,
                `**Sorted**`,
                `>>> ${message.member.roles.cache.sort((a, b) => b.position < a.position).map(c => c)}`
            ].join('\n'));
            const pres = `${custom ? `**Custom** ${custom.state}` : ''}${streaming ? [
                `**Streaming**`,
                `> (${streaming.url})[${streaming.name}]`,
                `> ${streaming.details}`,
                `> ${streaming.state}`,
                ''
            ].join('\n') : ''}${playing ? [
                `**Playing**`,
                `> ${playing.name}`,
                playing.details && playing.state
                    ? [
                        `> ${playing.details}`,
                        `> ${playing.state}`
                    ].join('\n')
                    : (playing.details && !playing.state ? `> ${playing.details}` : ``),
                ''
            ].join('\n') : ''}${watching ? [
                `**Watching**`,
                `${watching.name}`,
                watching.details && watching.state
                    ? [
                        `> ${watching.details}`,
                        `> ${watching.state}`,
                        ''
                    ].join('\n')
                    : (watching.details && !watching.state ? `> ${watching.details}\n` : ``),
                ''
            ].join('\n') : ''}${listening ? [
                `**Listening | ${listening.name}**`,
                `> ${listening.details}`,
                `> ${listening.state}`
            ].join('\n') : ''}`;
            if (custom ||
                streaming ||
                playing ||
                watching ||
                listening)
                embM.addField('Presence', pres);
            else
                embM.addField('Presence', `**Status** ${stat[message.member.presence.status]}`);
            return message.channel.send(embM);
        }
        else {
            const mem = await this.client.fetch.member.get(params, message.guild);
            if (mem instanceof discord_js_1.GuildMember) {
                const custom = await PresenceSearch_1.default('CUSTOM_STATUS', mem);
                const streaming = await PresenceSearch_1.default('STREAMING', mem);
                const playing = await PresenceSearch_1.default('PLAYING', mem);
                const watching = await PresenceSearch_1.default('WATCHING', mem);
                const listening = await PresenceSearch_1.default('LISTENING', mem);
                const embM = this.client.embed('base', 'General | User Info', `Fetched user!`)
                    .setThumbnail(mem.user.displayAvatarURL({ dynamic: true }))
                    .addField('Base', [
                    `**ID** ${mem.id}`,
                    `**Username** ${mem.user.username}`,
                    `**Tag** ${mem.user.tag}`
                ].join('\n'))
                    .addField('Dates', [
                    `**Joined** ${await TimeParsing_1.default(Date.now() - mem.joinedTimestamp)}`,
                    `**Created** ${await TimeParsing_1.default(Date.now() - mem.user.createdTimestamp)}`
                ].join('\n'))
                    .addField('Ranks', [
                    `**Highest** ${mem.roles.highest}`,
                    `**Sorted**`,
                    `>>> ${mem.roles.cache.sort((a, b) => b.position < a.position).map(c => c)}`
                ].join('\n'));
                const pres = `${custom ? `**Custom** ${custom.state}` : ''}${streaming ? [
                    `**Streaming**`,
                    `> (${streaming.url})[${streaming.name}]`,
                    `> ${streaming.details}`,
                    `> ${streaming.state}`,
                    ''
                ].join('\n') : ''}${playing ? [
                    `**Playing**`,
                    `> ${playing.name}`,
                    playing.details && playing.state
                        ? [
                            `> ${playing.details}`,
                            `> ${playing.state}`
                        ].join('\n')
                        : (playing.details && !playing.state ? `> ${playing.details}` : ``),
                    ''
                ].join('\n') : ''}${watching ? [
                    `**Watching**`,
                    `${watching.name}`,
                    watching.details && watching.state
                        ? [
                            `> ${watching.details}`,
                            `> ${watching.state}`,
                            ''
                        ].join('\n')
                        : (watching.details && !watching.state ? `> ${watching.details}\n` : ``),
                    ''
                ].join('\n') : ''}${listening ? [
                    `**Listening | ${listening.name}**`,
                    `> ${listening.details}`,
                    `> ${listening.state}`
                ].join('\n') : ''}`;
                if (custom ||
                    streaming ||
                    playing ||
                    listening ||
                    watching)
                    embM.addField('Presence', pres);
                else
                    embM.addField('Presence', `**Status** ${stat[mem.presence.status]}`);
                return message.channel.send(embM);
            }
        }
    }
}
exports.default = UserInfo;
//# sourceMappingURL=UserInfo.js.map