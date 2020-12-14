"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Command_1 = tslib_1.__importDefault(require("../../Lib/Structures/Command"));
class Level extends Command_1.default {
    constructor(client) {
        super(client, {
            category: 'Leveling',
            name: 'level',
            aliases: ['lvl'],
            usages: [
                '!level',
                '!level <Mention|ID|Username>'
            ],
            examples: [
                '!level',
                '!level @Mochi'
            ],
            description: 'Check your current message count, level, title.',
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
        if (!args.length || !args) {
            const messages = this.client.db.get(`${message.author.id}-messages`, 0);
            const level = this.client.db.get(`${message.author.id}-level`, 1);
            const title = this.client.db.get(`${message.author.id}-title`, 'Dirt');
            this.client.sem(message, 'base', 'Leveling Stats', [
                `**User** ${}`
            ].join('\n'));
        }
        else if (args.length || args) {
            const user = await this.client.fetch.member.get(args.join(' '), message.guild);
        }
    }
}
exports.default = Level;
//# sourceMappingURL=level.js.map