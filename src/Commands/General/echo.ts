import Command from "../../Lib/Structures/Command";
import { EUBGuildMessage } from "../../Lib/Types/EUB";
import Cluster from "../../Lib/Structures/Client";
import { Message } from "discord.js";

export default class Echo extends Command {
    constructor(client: Cluster) {
        super(client, {
            category: 'General',
            name: 'echo',
            aliases: ['ec'],
            usages: ['!echo <Parameters>'],
            examples: ['!echo I love you 🥰'],
            description: 'Let the bot say something but with an embed.',
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

            const ms = await this.client.sem(message, 'error', 'An error has occurred', [
                `You didn't provide any text that I should say/send in chat.`,
                `Type the message you would like me to say in chat.`
            ].join('\n'), {
                timeout: 10000,
                reason: 'Collector expired'
            });

            col
                .on('collect', async (msg: Message | EUBGuildMessage) => {
                    if (ms instanceof Message) await ms.delete();
                    return this.client.sem(message, 'base', `Echo | Author: ${message.author.tag}`, msg.content);
                });
        }

        if (params || args.length > 0) return this.client.sem(message, 'base', `Echo | Author: ${message.author.username}`, params);
    }
}