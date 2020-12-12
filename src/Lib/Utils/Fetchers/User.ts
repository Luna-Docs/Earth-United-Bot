import { User } from "discord.js";

import Cluster from "../../Structures/Client";

export default class EUBUserFetcher {
    client: Cluster;

    constructor(client: Cluster) {
        this.client = client;
    }

    /** Gets a user by the input which was given. */
    public async get(identifier: string): Promise<User | null> {
        let userProcessor = await this.client.users.cache.find(
            (u) => u.username.toLowerCase() === identifier.toLowerCase() ||
                u.tag.toLowerCase() === identifier.toLowerCase() ||
                u.id === identifier.replace(/[\\<>@!]/g, '')
        );

        try {
            if (!userProcessor) userProcessor = await this.fetch(identifier);
        } catch (err) {
            this.client.logger.error(err);
        }

        return userProcessor || null;
    }

    /** Uses forceful fetching to make sure if the user exists it's fetchable. */
    public async fetch(ID: string) {
        return await this.client.users.fetch(ID, false, true);
    }
}