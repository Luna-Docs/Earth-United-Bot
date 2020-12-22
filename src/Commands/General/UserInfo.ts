import { GuildMember } from "discord.js";

import Command from "../../Lib/Structures/Command";
import { EUBGuildMessage } from "../../Lib/Types/EUB";
import Cluster from "../../Lib/Structures/Client";
import PresenceSearch from "../../Features/PresenceSearch";
import TimeParsing from "../../Features/TimeParsing";

export default class UserInfo extends Command {
    constructor(client: Cluster) {
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

    public async execute(message: EUBGuildMessage, args: string[]) {
        let params = args.join(' ');

        const stat = {
            "online": "Online",
            "idle": "AFK / Idle",
            "dnd": "Do not Disturb",
            "invisible": "Invisible",
            "offline": "Offline"
        };

        if (!params || params.length < 1) {
            const custom = await PresenceSearch('CUSTOM_STATUS', message.member);
            const streaming = await PresenceSearch('STREAMING', message.member);
            const playing = await PresenceSearch('PLAYING', message.member);
            const watching = await PresenceSearch('WATCHING', message.member);
            const listening = await PresenceSearch('LISTENING', message.member);

                const embM = this.client.embed('base', 'General | User Info',
                `Fetched user!`)
                .setThumbnail(message.member.user.displayAvatarURL({dynamic: true}))
                .addField('Base', [
                    `**ID** ${message.member!.id}`,
                    `**Username** ${message.member!.user.username}`,
                    `**Tag** ${message.member!.user.tag}`
                ].join('\n'))
                .addField('Dates', [
                    `**Joined** ${await TimeParsing(message.member.joinedTimestamp!)}`,
                    `**Created** ${await TimeParsing(message.member.user.createdTimestamp)}`
                ].join('\n'))
                .addField('Ranks', [
                    `**Highest** ${message.member.roles.highest}`,
                    `**Sorted**`,
                    `>>> ${message.member.roles.cache.sort((a, b): any => b.position < a.position).map(c => c)}`
                ].join('\n'));

                if (
                    custom ||
                    streaming ||
                    playing ||
                    watching ||
                    listening
                ) embM.addField('Presence', [
                    `**Status** ${stat[message.member.presence.status]}`,
                    `${custom ? `**Custom** ${custom.state}` : ''}`,
                    `${streaming ? [
                        `**Streaming**`,
                        `> ${streaming.name}`,
                        `> ${streaming.details}`,
                        `> ${streaming.state}`
                    ].join('\n') : null}`,
                    `${playing ? [
                        `**Playing**`,
                        `> ${playing.name}`,
                        `> ${playing.details}`,
                        `> ${playing.state}`
                    ].join('\n') : null}`,
                    `${watching ? [
                        `**Watching**`,
                        `> ${watching.name}`,
                        `> ${watching.details}`,
                        `> ${watching.state}`
                    ].join('\n') : null}`,
                    `${listening ? [
                        `**Listening | ${listening.name}**`,
                        `> ${listening.details}`,
                        `> ${listening.state}`
                    ].join('\n') : null}`
                ].join('\n'));
                else embM.addField('Presence', `**Status** ${stat[message.member.presence.status]}`)

                return message.channel.send(embM);
        } else {
            const mem = await this.client.fetch.member.get(params, message.guild);

            if (mem instanceof GuildMember) {
                const custom = await PresenceSearch('CUSTOM_STATUS', mem);
                const streaming = await PresenceSearch('STREAMING', mem);
                const playing = await PresenceSearch('PLAYING', mem);
                const watching = await PresenceSearch('WATCHING', mem);
                const listening = await PresenceSearch('LISTENING', mem);

                const embM = this.client.embed('base', 'General | User Info',
                `Fetched user!`)
                .setThumbnail(mem!.user.displayAvatarURL({dynamic: true}))
                .addField('Base', [
                    `**ID** ${mem!.id}`,
                    `**Username** ${mem!.user.username}`,
                    `**Tag** ${mem!.user.tag}`
                ].join('\n'))
                .addField('Dates', [
                    `**Joined** ${await TimeParsing(mem.joinedTimestamp!)}`,
                    `**Created** ${await TimeParsing(mem.user.createdTimestamp)}`
                ].join('\n'))
                .addField('Ranks', [
                    `**Highest** ${mem.roles.highest}`,
                    `**Sorted**`,
                    `>>> ${mem.roles.cache.sort((a, b): any => b.position < a.position).map(c => c)}`
                ].join('\n'));

                if (
                    custom ||
                    streaming ||
                    playing ||
                    listening ||
                    watching
                ) embM.addField('Presence', [
                    `**Status** ${stat[mem.presence.status]}`,
                    `${custom ? `**Custom** ${custom.state}` : ''}`,
                    `${streaming ? [
                        `**Streaming**`,
                        `> ${streaming.name}`,
                        `> ${streaming.details}`,
                        `> ${streaming.state}`
                    ].join('\n') : ''}`,
                    `${playing ? [
                        `**Playing**`,
                        `> ${playing.name}`,
                        `> ${playing.details}`,
                        `> ${playing.state}`
                    ].join('\n') : ''}`,
                    `${watching ? [
                        `**Watching**`,
                        `> ${watching.name}`,
                        `> ${watching.details}`,
                        `> ${watching.state}`
                    ].join('\n') : ''}`,
                    `${listening ? [
                        `**Listening | ${listening.name}**`,
                        `> ${listening.details}`,
                        `> ${listening.state}`
                    ].join('\n') : ''}`
                ].join('\n'));
                else embM.addField('Presence', `**Status** ${stat[mem.presence.status]}`);
                
                return message.channel.send(embM);
            }
        }
    }
}