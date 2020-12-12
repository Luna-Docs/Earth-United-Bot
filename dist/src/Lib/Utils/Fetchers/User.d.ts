import { User } from "discord.js";
import Cluster from "../../Structures/Client";
export default class EUBUserFetcher {
    client: Cluster;
    constructor(client: Cluster);
    /** Gets a user by the input which was given. */
    get(identifier: string): Promise<User | null>;
    /** Uses forceful fetching to make sure if the user exists it's fetchable. */
    fetch(ID: string): Promise<User>;
}
