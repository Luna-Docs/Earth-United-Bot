import { Message, MessageEmbed } from "discord.js";

import Command from "../../Lib/Structures/Command";
import { EUBMessage } from "../../Lib/Types/EUB";
import Cluster from "../../Lib/Structures/Client";

export default class Ping extends Command {
    constructor(client: Cluster) {
        super(client, {
            category: 'General',
            name: 'ping',
            aliases: ['png'],
            usages: ['!ping'],
            examples: ['!ping'],
            description: 'Check the bot\'s ping towards the server.',
            permissions: {
                client: {
                    server: ['SEND_MESSAGES'],
                    channel: ['SEND_MESSAGES']
                },
                user: {
                    server: ['SEND_MESSAGES'],
                    channel: ['SEND_MESSAGES']
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

    public async execute(message: Message, args: string[]) {
        const ping = await message.channel.send('Calculating...');

        setInterval(() => {
            const embed = new MessageEmbed()
                .setColor('00ff81')
                .setTitle(`Ping towards: ${message.guild!.name}`)
                .addField('Response Latency', `${ping.createdTimestamp - message.createdTimestamp}ms`, true)
                .addField('API Latency', Math.floor(this.client.ws.ping), true);

            ping.edit(embed);
        }, 3000)
    }
}