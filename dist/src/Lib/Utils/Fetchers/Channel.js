"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class EUBChannelFetcher {
    constructor(client) {
        this.client = client;
    }
    /** Gets a channel by the input which was given. */
    async get(identifier, guild) {
        if (!(guild instanceof discord_js_1.Guild))
            throw this.client.logger.error('The guild parameter isn\'t correctly set! (Not an instance of a guild)');
        const channelProcessor = await guild.channels.cache.find((tc) => tc.name.toLowerCase().replace(/-/g, ' ') === identifier.toLowerCase() ||
            tc.id === identifier.replace(/[\\<>#]/g, ''));
        return channelProcessor || null;
    }
}
exports.default = EUBChannelFetcher;
//# sourceMappingURL=Channel.js.map