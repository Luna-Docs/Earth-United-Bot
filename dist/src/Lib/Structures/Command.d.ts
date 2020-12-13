import { Message } from "discord.js";
import Cluster from "./Client";
import { CooldownCommandData, DefaultCommandData, PermissionCommandData, SettingsCommandData } from "../Types/EUB";
export default class Command {
    client: Cluster;
    category: string;
    name: string;
    aliases: string[];
    usages: string[] | string;
    examples: string[] | string;
    description: string;
    permissions: PermissionCommandData;
    cooldown: CooldownCommandData;
    settings: SettingsCommandData;
    constructor(client: Cluster, data: DefaultCommandData);
    execute(message: Message, params: string[]): Promise<Message | void>;
}
