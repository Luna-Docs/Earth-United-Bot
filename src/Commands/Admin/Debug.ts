import { GuildMember, Message, TextChannel } from "discord.js";

import Command from "../../Lib/Structures/Command";
import { EUBGuildMessage } from "../../Lib/Types/EUB";
import Cluster from "../../Lib/Structures/Client";
import TimeParsing from "../../Features/TimeParsing";
import CheckStaff from "../../Features/CheckStaff";

export default class UserInfo extends Command {
    constructor(client: Cluster) {
        super(client, {
            category: 'Admin',
            name: 'debug',
            aliases: ['dbg'],
            usages: [
                '!debug user <Mention|ID|Tag|Username|Nickname>',
                '!debug channel <Mention|ID|Name>'
            ],
            examples: [
                '!debug user Admin | Texas_Longhorns',
                '!debug channel general'
            ],
            description: 'Check some info of a user.',
            permissions: {
                client: {
                    channel: ['SEND_MESSAGES'],
                    server: ['SEND_MESSAGES']
                },
                user: {
                    channel: ['SEND_MESSAGES'],
                    server: ['SEND_MESSAGES']
                }
            },
            cooldown: {
                allowedUses: 3,
                duration: 5
            },
            settings: {
                guildOnly: true,
                dmOnly: false
            }
        });
    }

    public async execute(message: EUBGuildMessage | Message, args: string[]) {
        if (!message.member!.permissions.has('MANAGE_MESSAGES', true))
            return this.client.sem(message, 'error', 'Error | Permission', `You need the Manage Messages permission to execute this command!`);

        let type = args[0];
        let values = args.slice(1).join(' ');

        if (!type || !args.length)
            return this.client.sem(message, 'error', 'Error | Parameters',
            `You didn't define any arguments with the ${this.client.capitalise(this.name)} command.\nYou may use the following usages:\n> ${[
                '!debug user <Mention|ID|Tag|Username|Nickname>',
                '!debug channel <Mention|ID|Name>'
            ].join('\n> ')}`);

        switch (type) {
            case 'user':
                const user = await this.client.fetch.member.get(values || message.member!.id, message.guild!); 
                
                if (user instanceof GuildMember) {
                    const stage = await CheckStaff(this.client, user!);

                    return this.client.sem(message, 'base', 'Admin | Debug', [
                        '**Fetch Type** User',
                        '',
                        `**Mention** ${user}`,
                        `**ID** ${user.id}`,
                        `**Tag** ${user.user.tag}`,
                        '',
                        `**Kickable** ${this.client.capitalise(user.kickable.toString())}`,
                        `**Bannable** ${this.client.capitalise(user.bannable.toString())}`,
                        '',
                        `**Staff** ${stage === 'Member' ? 'No, they\'re a Member' : `Yes, they're a ${stage}`}`
                    ].join('\n'));
                }

                break;

            case 'channel':
                const channel = await this.client.fetch.channel.get(values || message.channel.id, message.guild!);

                return this.client.sem(message, 'base', 'Admin | Debug', [
                    '**Fetch Type** Channel',
                    '',
                    `**Category** ${channel!.parent!.name}`,
                    `**Mention** ${channel}`,
                    `**ID** ${channel!.id}`,
                    `**Name** ${channel!.name}`,
                    channel instanceof TextChannel ? `**Topic**\n> ${channel!.topic || "No topic set!"}\n` : '',
                    `**Type** ${this.client.capitalise(channel!.type)}`,
                ].join('\n'));
        }
    }
}