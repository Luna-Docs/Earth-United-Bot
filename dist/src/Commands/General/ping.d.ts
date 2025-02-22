import Command from "../../Lib/Structures/Command";
import { EUBGuildMessage } from "../../Lib/Types/EUB";
import Cluster from "../../Lib/Structures/Client";
export default class Ping extends Command {
    constructor(client: Cluster);
    execute(message: EUBGuildMessage, args: string[]): Promise<void>;
}
