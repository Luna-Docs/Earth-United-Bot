"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class EUBGuildMemberFetcher {
    constructor(client) {
        this.client = client;
    }
    /** Gets a guildmember by the input which was given. */
    async get(identifier, guild) {
        if (!(guild instanceof discord_js_1.Guild))
            throw this.client.logger.error('The guild parameter isn\'t correctly set! (Not an instance of a guild)');
        let fetched;
        const guildMemberProcessor = await guild.members.cache.find((gm) => (gm.nickname ? gm.nickname : gm.user.username).toLowerCase() === identifier.toLowerCase() ||
            gm.user.username.toLowerCase() === identifier.toLowerCase() ||
            gm.user.tag.toLowerCase() === identifier.toLowerCase() ||
            gm.id === identifier.replace(/[\\<>@!]/g, ''));
        if (!guildMemberProcessor)
            fetched = await this.fetch(identifier);
        else
            fetched = guildMemberProcessor;
        return fetched || null;
    }
    /** Uses forceful fetching to make sure if the user exists it's fetchable. */
    async fetch(ID) {
        return await this.client.users.fetch(ID, false, true);
    }
}
exports.default = EUBGuildMemberFetcher;
//# sourceMappingURL=GuildMember.js.map