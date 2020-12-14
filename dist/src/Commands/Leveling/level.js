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
            const messages = await this.client.db.get(`${message.author.id}-messages`, 0);
            const level = await this.client.db.get(`${message.author.id}-level`, 1);
            const title = await this.client.db.get(`${message.author.id}-title`, 'Dirt');
            this.client.sem(message, 'base', 'Leveling Stats', [
                `**User** ${message.member}`,
                `**Messages Sent** ${messages}`,
                `**Level** ${level}`,
                `**Title** ${title}`
            ].join('\n'));
        }
        else if (args.length || args) {
            const user = await this.client.fetch.member.get(args.join(' '), message.guild);
            const messages = await this.client.db.get(`${user.id}-messages`, 0);
            const level = await this.client.db.get(`${user.id}-level`, 1);
            const title = await this.client.db.get(`${user.id}-title`, 'Dirt');
            this.client.sem(message, 'base', 'Leveling Stats', [
                `**User** ${user}`,
                `**Messages Sent** ${messages}`,
                `**Level** ${level}`,
                `**Title** ${title}`
            ].join('\n'));
        }
    }
}
exports.default = Level;
//# sourceMappingURL=level.js.map