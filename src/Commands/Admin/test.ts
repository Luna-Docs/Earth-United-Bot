import { MessageEmbed } from "discord.js";

import Command from "../../Lib/Structures/Command";
import { EUBGuildMessage } from "../../Lib/Types/EUB";
import Cluster from "../../Lib/Structures/Client";

export default class Ping extends Command {
    constructor(client: Cluster) {
        super(client, {
            category: 'General',
            name: 'test',
            aliases: ['tst'],
            usages: ['!test'],
            examples: ['!test'],
            description: 'Test if the bot responds.',
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
        return message.channel.send(args.join(' '));
    }
}