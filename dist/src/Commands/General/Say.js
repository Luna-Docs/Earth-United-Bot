"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const Command_1 = tslib_1.__importDefault(require("../../Lib/Structures/Command"));
class Say extends Command_1.default {
    constructor(client) {
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
    async execute(message, args) {
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
                .on('collect', async (msg) => {
                if (ms instanceof discord_js_1.Message)
                    await ms.delete();
                return message.channel.send(msg.content);
            });
        }
        if (params || args.length > 0)
            return message.channel.send(params);
    }
}
exports.default = Say;
//# sourceMappingURL=say.js.map