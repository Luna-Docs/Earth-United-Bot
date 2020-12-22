import { Message } from "discord.js";

import Command from "../../Lib/Structures/Command";
import { EUBGuildMessage } from "../../Lib/Types/EUB";
import Cluster from "../../Lib/Structures/Client";

export default class Say extends Command {
    constructor(client: Cluster) {
        super(client, {
            category: 'General',
            name: 'say',
            aliases: ['sy'],
            usages: ['!say'],
            examples: ['!say I think I might be inlove with you  :3'],
            description: 'Let the bot say something.',
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

    public async execute(message: EUBGuildMessage, args: string[]) {
        const params = args.join(' ');

        if (!params || !args.length) {
            const col = await message.channel.createMessageCollector((msg) => msg.member.id === message.author.id, {
                time: 10000
            });

            const ms = await this.client.sem(message, 'error', 'Error | Parameters', [
                `You didn't provide any text that I should say/send in chat.`,
                `Type the message you would like me to say in chat.`
            ].join('\n'), {
                timeout: 10000,
                reason: 'Collector expired'
            });

            col
                .on('collect', async (msg: Message | EUBGuildMessage) => {
                    if (ms instanceof Message) await ms.delete();
                    return message.channel.send(msg.content);
                })
        }

        if (params || args.length > 0) return message.channel.send(params);
    }
}