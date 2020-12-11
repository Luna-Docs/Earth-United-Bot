import {PermissionString} from "discord.js";

export interface DefaultCommandData {
    name: string;
    aliases?: string[];
    usages?: string[] | string;
    examples?: string[] | string;
    description: string;

    permissions: PermissionCommandData;

    cooldown: CooldownCommandData;

    settings: SettingsCommandData;
}

export interface DefaultPermissionCommandData {
    server: PermissionString[];
    channel: PermissionString[];
}

export interface PermissionCommandData {
    client: DefaultPermissionCommandData;
    user: DefaultPermissionCommandData;
}

export interface CooldownCommandData {
    allowedUses: number;
    duration: number;
}

export interface SettingsCommandData {
    guildOnly: boolean;
    dmOnly: boolean;
}