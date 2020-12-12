import { GuildChannel, Guild } from "discord.js";
import Cluster from "../../Structures/Client";
export default class EUBChannelFetcher {
    client: Cluster;
    constructor(client: Cluster);
    /** Gets a channel by the input which was given. */
    get(identifier: string, guild: Guild): Promise<GuildChannel | null>;
}
