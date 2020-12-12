import { Message } from "discord.js";
import Command from "../../Lib/Structures/Command";
import Cluster from "../../Lib/Structures/Client";
export default class Ping extends Command {
    constructor(client: Cluster);
    execute(message: Message, args: string[]): Promise<void>;
}
