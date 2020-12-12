import { Collection } from "discord.js";
import Cluster from "../Lib/Structures/Client";
import Listener from "../Lib/Structures/Listener";
export default class ListenerHandler extends Collection<string, Listener> {
    client: Cluster;
    constructor(client: Cluster);
    init(): Promise<void>;
}
