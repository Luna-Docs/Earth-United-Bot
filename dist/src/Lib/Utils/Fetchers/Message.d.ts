import { Message, TextChannel, Guild } from "discord.js";
import Cluster from "../../Structures/Client";
export default class EUBMessageFetcher {
    client: Cluster;
    constructor(client: Cluster);
    /** Gets a message by the input which was given. */
    get(identifier: string, channel: TextChannel, guild: Guild, type: 'endsWith' | 'startsWith' | 'includes' | 'id'): Promise<Message | null>;
}
