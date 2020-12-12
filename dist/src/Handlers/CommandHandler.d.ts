import { Collection } from "discord.js";
import Cluster from "../Lib/Structures/Client";
import Command from "../Lib/Structures/Command";
export default class CommandHandler extends Collection<string, Command> {
    client: Cluster;
    constructor(client: Cluster);
    init(): Promise<void>;
    fetch(name: string): Command | undefined;
}
