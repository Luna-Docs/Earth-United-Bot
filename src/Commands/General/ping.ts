import { MessageEmbed } from "discord.js";

import Command from "../../Lib/Structures/Command";
import { EUBGuildMessage } from "../../Lib/Types/EUB";
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
        const ping = await message.channel.send('Calculating...');

        setInterval(() => {
            const embed = new MessageEmbed()
                .setColor(this.client.colors.BASE)
                .setTitle(`Ping towards: ${message.guild!.name}`)
                .addField('Response Latency', `${ping.createdTimestamp - message.createdTimestamp}ms`, true)
                .addField('API Latency', Math.floor(this.client.ws.ping), true);

            return ping.edit('> Ping Fetched!', embed);
        }, 3000)
    }
}