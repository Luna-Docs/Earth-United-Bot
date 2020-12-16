import Command from "../../Lib/Structures/Command";
import { EUBGuildMessage } from "../../Lib/Types/EUB";
import Cluster from "../../Lib/Structures/Client";
import { Message } from "discord.js";
export default class Purge extends Command {
    constructor(client: Cluster);
    execute(message: EUBGuildMessage, args: string[]): Promise<void | Message>;
}
