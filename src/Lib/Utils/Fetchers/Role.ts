import { Role, Guild } from "discord.js";

import Cluster from "../../Structures/Client";

export default class EUBRoleFetcher {
    client: Cluster;

    constructor(client: Cluster) {
        this.client = client;
    }

    /** Gets a role by the input which was given. */
    public async get(identifier: string, guild: Guild): Promise<Role | null> {
        const roleProcessor = await guild.roles.cache.find(
            (r) => r.name.toLowerCase() === identifier.toLowerCase() ||
                r.id === identifier.replace(/[\\<>@&]/g, '')
        );

        return roleProcessor || null;
    }
}