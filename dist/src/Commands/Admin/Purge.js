"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Command_1 = tslib_1.__importDefault(require("../../Lib/Structures/Command"));
const discord_js_1 = require("discord.js");
class Purge extends Command_1.default {
    constructor(client) {
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
    async execute(message, args) {
        if (!message.member.permissions.has('MANAGE_MESSAGES', true))
            return this.client.sem(message, 'error', 'Error | Permission', `You need the Manage Messages permission to execute this command!`);
        let toDelete = Number(args[0]);
        if (!toDelete || isNaN(toDelete))
            return this.client.sem(message, 'error', 'Amount Error', `The amount of messages to delete must be a number!`);
        if (args[1] || args.slice(1).join(' ')) {
            let channel = await this.client.fetch.channel.get(args.slice(1).join(' '), message.guild);
            if (channel instanceof discord_js_1.TextChannel) {
                await channel.bulkDelete(Number(toDelete));
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
            .on('collect', async (msg) => {
            switch (msg.content) {
                case 'yes':
                case 'y':
                    if (ms instanceof discord_js_1.Message)
                        await ms.delete();
                    await message.channel.bulkDelete(Number(toDelete));
                    this.client.sem(message, 'base', 'Purge Report', `Purged ${toDelete} messages from this channel!`);
                    break;
                case 'no':
                case 'n':
                    if (ms instanceof discord_js_1.Message)
                        await ms.delete();
                    this.client.sem(message, 'base', 'Action Cancellation', `The action has been cancelled and so no messages were deleted!`);
                    break;
            }
        });
        // .on('end', (m, _) => {
        //     if (['time'].includes(_))
        //         return this.client.sem(message, 'base', 'Action Cancellation', `The action has been cancelled as you took too long!`);
        // });
    }
}
exports.default = Purge;
//# sourceMappingURL=Purge.js.map