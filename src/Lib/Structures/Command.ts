import { Message, BitFieldResolvable, PermissionString, PermissionResolvable } from "discord.js";

import Cluster from "./Client";
import { CooldownCommandData, DefaultCommandData, EUBGuildMessage, PermissionCommandData, SettingsCommandData } from "../Types/EUB";

export default class Command {
    client: Cluster;
    category: string;
    name: string;
    aliases: string[];
    usages: string[];
    examples: string[];
    description: string;
    permissions: PermissionCommandData;
    cooldown: CooldownCommandData;
    settings: SettingsCommandData;    

    constructor(client: Cluster, data: DefaultCommandData) {
        this.client = client;

        this.category = data.category;
        this.name = data.name;
        this.aliases = data.aliases = [];
        this.usages = data.usages = ['No usages have been found!'];
        this.examples = data.examples = ['No examples have been found!'];
        this.description = data.description;

        this.permissions = {} as PermissionCommandData; 

        this.cooldown = {} as CooldownCommandData;

        this.settings = {} as SettingsCommandData;
    }

    execute(message: Message, params: string[]): Promise<Message | void> {
        throw console.log(`${this.name} doesn't execute anything!`);
    }
}