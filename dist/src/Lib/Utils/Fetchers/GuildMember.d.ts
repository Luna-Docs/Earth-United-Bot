import { GuildMember, User, Guild } from "discord.js";
import Cluster from "../../Structures/Client";
export default class EUBGuildMemberFetcher {
    client: Cluster;
    constructor(client: Cluster);
    /** Gets a guildmember by the input which was given. */
    get(identifier: string, guild: Guild): Promise<GuildMember | User | null>;
    /** Uses forceful fetching to make sure if the user exists it's fetchable. */
    fetch(ID: string): Promise<User>;
}
