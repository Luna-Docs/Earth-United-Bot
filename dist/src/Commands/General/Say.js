"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
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
        return message.channel.send(`Arguments: ${params}`);
    }
}
exports.default = Say;
//# sourceMappingURL=say.js.map