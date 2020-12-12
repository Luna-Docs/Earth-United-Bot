"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class EUBMessageFetcher {
    constructor(client) {
        this.client = client;
    }
    /** Gets a message by the input which was given. */
    async get(identifier, channel, guild, type) {
        if (!(guild instanceof discord_js_1.Guild))
            throw this.client.logger.error('The guild parameter isn\'t correctly set! (Not an instance of a guild)');
        if (!(channel instanceof discord_js_1.TextChannel))
            throw this.client.logger.error('The textchannel parameter is either invalid or it isn\'t a textchannel!');
        let fetched;
        if (type === 'id')
            fetched = await channel.messages.cache.find((msg) => msg.id === identifier);
        if (type === 'startsWith')
            fetched = await channel.messages.cache.find((msg) => msg.content.startsWith(identifier));
        if (type === 'includes')
            fetched = await channel.messages.cache.find((msg) => msg.content.includes(identifier));
        if (type === 'endsWith')
            fetched = await channel.messages.cache.find((msg) => msg.content.endsWith(identifier));
        return fetched || null;
    }
}
exports.default = EUBMessageFetcher;
//# sourceMappingURL=Message.js.map