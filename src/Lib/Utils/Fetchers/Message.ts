import { Message, TextChannel, Guild } from "discord.js";

import Cluster from "../../Structures/Client";

export default class EUBMessageFetcher {
    client: Cluster;

    constructor(client: Cluster) {
        this.client = client;
    }

    /** Gets a message by the input which was given. */
    public async get(identifier: string, channel: TextChannel, guild: Guild, type: 'endsWith' | 'startsWith' | 'includes' | 'id'): Promise<Message | null> {
        if (!(guild instanceof Guild)) throw this.client.logger.error('The guild parameter isn\'t correctly set! (Not an instance of a guild)');
        if (!(channel instanceof TextChannel)) throw this.client.logger.error('The textchannel parameter is either invalid or it isn\'t a textchannel!');

        let fetched;

        if (type === 'id') fetched = await channel.messages.cache.find((msg) => msg.id === identifier);
        if (type === 'startsWith') fetched = await channel.messages.cache.find((msg) => msg.content.startsWith(identifier));
        if (type === 'includes') fetched = await channel.messages.cache.find((msg) => msg.content.includes(identifier));
        if (type === 'endsWith') fetched = await channel.messages.cache.find((msg) => msg.content.endsWith(identifier));

        return fetched || null;
    }
}