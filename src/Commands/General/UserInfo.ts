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

        if (!params || params.length < 1) {

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
                .addField('Base', [
                    `**ID** ${mem!.id}`,
                    `**Username** ${mem!.user.username}`,
                    `**Tag** ${mem!.user.tag}`
                ].join('\n'))
                .addField('Status', [
                    `${custom ? `**Custom** ${custom!.state}` : ''}`,
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

                return message.channel.send(embM);
            }
        }
    }
}