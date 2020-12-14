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

        return message.channel.send(`Arguments: ${params}`);
    }
}