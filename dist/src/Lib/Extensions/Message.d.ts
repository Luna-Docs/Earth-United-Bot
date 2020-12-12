import { MessageEmbed } from "discord.js";
declare const MessageExt_base: typeof import("discord.js").Message;
export declare class MessageExt extends MessageExt_base {
    time(): string;
    embed(type: 'base' | 'bugs' | 'error', title: string, description: string): MessageEmbed | undefined;
    sem(type: 'base' | 'bugs' | 'error', title: string, description: string): Promise<import("discord.js").Message> | undefined;
}
export {};
