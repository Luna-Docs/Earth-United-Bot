import { Role, Guild } from "discord.js";
import Cluster from "../../Structures/Client";
export default class EUBRoleFetcher {
    client: Cluster;
    constructor(client: Cluster);
    /** Gets a role by the input which was given. */
    get(identifier: string, guild: Guild): Promise<Role | null>;
}
