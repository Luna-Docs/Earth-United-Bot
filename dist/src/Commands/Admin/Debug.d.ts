import { Message } from "discord.js";
import Command from "../../Lib/Structures/Command";
import { EUBGuildMessage } from "../../Lib/Types/EUB";
import Cluster from "../../Lib/Structures/Client";
export default class UserInfo extends Command {
    constructor(client: Cluster);
    execute(message: EUBGuildMessage | Message, args: string[]): Promise<void | Message>;
}
