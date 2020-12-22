"use strict";
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const PresenceSearch_1 = tslib_1.__importDefault(require("./PresenceSearch"));
const TimeParsing_1 = tslib_1.__importDefault(require("./TimeParsing"));
module.exports = async (message, client, member, args) => {
    const params = args.join(' ');
    let mem;
    if (!params)
        mem = client.fetch.member.get(member.id, message.guild);
    else
        mem = client.fetch.member.get(params, message.guild);
    if (mem instanceof discord_js_1.GuildMember) {
        const custom = await PresenceSearch_1.default('CUSTOM_STATUS', mem);
        const streaming = await PresenceSearch_1.default('STREAMING', mem);
        const playing = await PresenceSearch_1.default('PLAYING', mem);
        const watching = await PresenceSearch_1.default('WATCHING', mem);
        const listening = await PresenceSearch_1.default('LISTENING', mem);
        const embM = client.embed('base', 'General | User Info', `Fetched user!`)
            .addField('Base', [
            `**ID** ${mem.id}`,
            `**Username ${mem.user.username}`,
            `**Tag** ${mem.user.tag}`
        ].join('\n'))
            .addField('Status', [
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
                `**Listening**`,
                `> ${listening.name}`,
                `> ${listening.details}`,
                `> ${listening.state}`
            ].join('\n') : ''}`
        ].join('\n'))
            .addField('Dates', [
            `**Joined** ${await TimeParsing_1.default(mem.joinedTimestamp)}`,
            `**Created** ${await TimeParsing_1.default(mem.user.createdTimestamp)}`
        ].join('\n'))
            .addField('Ranks', [
            `**Highest** ${mem.roles.highest}`,
            `**Sorted**`,
            `>>> ${mem.roles.cache.sort((a, b) => {
                b.position < a.position;
            })}`
        ].join('\n'));
        return message.channel.send(embM);
    }
    else if (mem instanceof discord_js_1.User) {
        return message.channel.send(`${params} isn't in the server!`);
    }
};
//# sourceMappingURL=UserInfo.js.map