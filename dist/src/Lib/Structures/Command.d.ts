import { Message, PermissionString } from "discord.js";
import Cluster from "./Client";
import { DefaultCommandData } from "../Types/EUB";
export default class Command {
    client: Cluster;
    category: string;
    name: string;
    aliases: string[];
    usages: string[] | string;
    examples: string[] | string;
    description: string;
    permissions: {
        client: {
            channel: PermissionString[];
            server: PermissionString[];
        };
        user: {
            channel: PermissionString[];
            server: PermissionString[];
        };
    };
    cooldown: {
        allowedUses: number;
        duration: number;
    };
    settings: {
        guildOnly: boolean;
        dmOnly: boolean;
    };
    constructor(client: Cluster, data: DefaultCommandData);
    execute(message: Message, params: string[]): Promise<Message | void>;
}
