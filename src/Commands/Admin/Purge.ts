import Command from "../../Lib/Structures/Command";
import { EUBGuildMessage } from "../../Lib/Types/EUB";
import Cluster from "../../Lib/Structures/Client";
import { Message, TextChannel } from "discord.js";

export default class Purge extends Command {
    constructor(client: Cluster) {
        super(client, {
            category: 'Admin',
            name: 'purge',
            aliases: ['clear'],
            usages: ['!purge <Amount>', '!purge <Amount> <Channel>'],
            examples: ['!purge 15', '!purge 15 #general'],
            description: 'Purge some messages from a channel.',
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
        if (!message.member.permissions.has('MANAGE_MESSAGES', true))
            return this.client.sem(message, 'error', 'Permission Error', `You need the Manage Messages permission to execute this command!`);

        let toDelete = Number(args[0]);

        if (!toDelete || isNaN(toDelete))
            return this.client.sem(message, 'error', 'Amount Error', `The amount of messages to delete must be a number!`);

        if (args[1] || args.slice(1).join(' ')) {
            let channel = await this.client.fetch.channel.get(args.slice(1).join(' '), message.guild);

            if (channel instanceof TextChannel) {
                await channel.bulkDelete(Number(toDelete))

                return this.client.sem(message, 'base', 'Purge Report', `Purged ${toDelete} messages from ${channel}!`);
            }
        }

        const col = await message.channel.createMessageCollector((msg) => msg.member.id === message.author.id, {
            time: 10000
        });

        const ms = await this.client.sem(message, 'base', 'Invalid Channel', [
            `You didn't define a channel!`,
            `Do you wish to delete ${toDelete} messages from this channel instead?`,
            ``,
            `Type **y** or **yes** in chat to delete ${toDelete} messages from this channel.`,
            `Type **n** or **no** in chat to cancel this selection.`
        ].join('\n'));

        col
            .on('collect', async (msg: Message) => {
                switch (msg.content) {
                    case 'yes':
                    case 'y':
                        if (ms instanceof Message) await ms.delete();
                        await message.channel.bulkDelete(Number(toDelete));
                        this.client.sem(message, 'base', 'Purge Report', `Purged ${toDelete} messages from this channel!`);
                        break;

                    case 'no':
                    case 'n':
                        if (ms instanceof Message) await ms.delete();
                        this.client.sem(message, 'base', 'Action Cancellation', `The action has been cancelled and so no messages were deleted!`);
                        break;
                }
            })
            // .on('end', (m, _) => {
            //     if (['time'].includes(_))
            //         return this.client.sem(message, 'base', 'Action Cancellation', `The action has been cancelled as you took too long!`);
            // });
    }
}