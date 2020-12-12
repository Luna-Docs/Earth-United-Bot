import { GuildMember, User, Guild } from "discord.js";

import Cluster from "../../Structures/Client";

export default class EUBGuildMemberFetcher {
    client: Cluster;

    constructor(client: Cluster) {
        this.client = client;
    }

    /** Gets a guildmember by the input which was given. */
    public async get(identifier: string, guild: Guild): Promise<GuildMember | User | null> {
        if (!(guild instanceof Guild)) throw this.client.logger.error('The guild parameter isn\'t correctly set! (Not an instance of a guild)');
        
        let fetched: GuildMember | User;
        const guildMemberProcessor = await guild.members.cache.find(
            (gm) => (gm.nickname ? gm.nickname : gm.user.username).toLowerCase() === identifier.toLowerCase() ||
                gm.user.username.toLowerCase() === identifier.toLowerCase() ||
                gm.user.tag.toLowerCase() === identifier.toLowerCase() ||
                gm.id === identifier.replace(/[\\<>@!]/g, '')
        );

        if (!guildMemberProcessor) fetched = await this.fetch(identifier);
        else fetched = guildMemberProcessor;

        return fetched || null;
    }

    /** Uses forceful fetching to make sure if the user exists it's fetchable. */
    public async fetch(ID: string) {
        return await this.client.users.fetch(ID, false, true);
    }
}