import { GuildChannel, Guild } from "discord.js";

import Cluster from "../../Structures/Client";

export default class EUBChannelFetcher {
    client: Cluster;

    constructor(client: Cluster) {
        this.client = client;
    }

    /** Gets a channel by the input which was given. */
    public async get(identifier: string, guild: Guild): Promise<GuildChannel | null> {
        if (!(guild instanceof Guild)) throw this.client.logger.error('The guild parameter isn\'t correctly set! (Not an instance of a guild)');

        const channelProcessor = await guild.channels.cache.find(
            (tc) => tc.name.toLowerCase().replace(/-/g, ' ') === identifier.toLowerCase() ||
                tc.id === identifier.replace(/[\\<>#]/g, '')
        );

        return channelProcessor || null;
    }
}