import {Message, PermissionString} from "discord.js";

import Cluster from "./Client";
import {DefaultCommandData, EUBGuildMessage} from "../Types/EUB";

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

    constructor(client: Cluster, data: DefaultCommandData) {
        this.client = client;

        this.category = data.category;
        this.name = data.name;
        this.aliases = data.aliases = [];
        this.usages = data.usages = ['No usages have been found!'];
        this.examples = data.examples = ['No examples have been found!'];
        this.description = data.description;

        this.permissions = data.permissions
        
        this.cooldown = data.cooldown;

        this.settings = data.settings;
    }

    execute(message: Message, params: string[]): Promise<Message | void> {
        throw console.log(`${this.name} doesn't execute anything!`);
    }
}