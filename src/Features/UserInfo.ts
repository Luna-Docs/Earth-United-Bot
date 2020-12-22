import { GuildMember, Message, User } from "discord.js";

import Cluster from "../Lib/Structures/Client";
import PresenceSearch from "./PresenceSearch";
import TimeParsing from "./TimeParsing";

export = async (message: Message, client: Cluster, member: GuildMember, args: string[]) => {
    const params = args.join(' ');
    let mem;

    if (!params) mem = client.fetch.member.get(member.id, message.guild!);
    else mem = client.fetch.member.get(params, message.guild!);

    if (mem instanceof GuildMember) {
        const custom = await PresenceSearch('CUSTOM_STATUS', mem);
        const streaming = await PresenceSearch('STREAMING', mem);
        const playing = await PresenceSearch('PLAYING', mem);
        const watching = await PresenceSearch('WATCHING', mem);
        const listening = await PresenceSearch('LISTENING', mem);

        const embM = client.embed('base', 'General | User Info',
            `Fetched user!`)
            .addField('Base', [
                `**ID** ${mem!.id}`,
                `**Username ${mem!.user.username}`,
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
                    `**Listening**`,
                    `> ${listening.name}`,
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
                    `>>> ${mem.roles.cache.sort((a, b): any => {
                        b.position < a.position
                    })}`
                ].join('\n'));

        return message.channel.send(embM);
    } else if (mem instanceof User) {
        return message.channel.send(`${params} isn't in the server!`);  
    } 
}