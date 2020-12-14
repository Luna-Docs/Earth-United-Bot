"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Command_1 = tslib_1.__importDefault(require("../../Lib/Structures/Command"));
class Ping extends Command_1.default {
    constructor(client) {
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
    async execute(message, args) {
        return message.channel.send(args.join(' '));
    }
}
exports.default = Ping;
//# sourceMappingURL=test.js.map