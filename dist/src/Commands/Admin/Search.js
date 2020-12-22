"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Command_1 = tslib_1.__importDefault(require("../../Lib/Structures/Command"));
class Ping extends Command_1.default {
    constructor(client) {
        super(client, {
            category: 'Admin',
            name: 'search',
            aliases: ['find'],
            usages: ['!search <Mention|ID|Tag|Username|Nickname>'],
            examples: ['!search @Mochi'],
            description: 'Search for a user and see how many punishments they have.',
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
        if (message.member.permissions.has('KICK_MEMBERS', true))
            return message.channel.send(`W.I.P`);
    }
}
exports.default = Ping;
//# sourceMappingURL=Search.js.map