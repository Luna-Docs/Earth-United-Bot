"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Command_1 = tslib_1.__importDefault(require("../../Lib/Structures/Command"));
class Level extends Command_1.default {
    constructor(client) {
        super(client, {
            category: 'General',
            name: 'echo',
            aliases: ['ec'],
            usages: ['!echo <Parameters>'],
            examples: ['!echo I love you 🥰'],
            description: 'Let the bot say something but with an embed.',
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
        return this.client.sem(message, 'base', `Echo | Author: ${message.author.username}`, params);
    }
}
exports.default = Level;
//# sourceMappingURL=Rank.js.map