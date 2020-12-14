import Command from "../../Lib/Structures/Command";
import { EUBGuildMessage } from "../../Lib/Types/EUB";
import Cluster from "../../Lib/Structures/Client";

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

        return this.client.sem(message, 'base', `Echo | Author: ${message.author.username}`, params);
    }
}