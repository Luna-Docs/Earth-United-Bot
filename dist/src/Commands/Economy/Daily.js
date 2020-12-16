"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const parse_ms_1 = tslib_1.__importDefault(require("parse-ms"));
const Command_1 = tslib_1.__importDefault(require("../../Lib/Structures/Command"));
class Daily extends Command_1.default {
    constructor(client) {
        super(client, {
            category: 'Economy',
            name: 'daily',
            aliases: ['dly'],
            usages: [
                '!daily'
            ],
            examples: [
                '!daily'
            ],
            description: 'Claim your daily coins.',
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
        const cooldown = 86400000;
        const amount = 200;
        const defaults = Date.now() - cooldown;
        const last = await this.client.eco.get(`last_daily-${message.author.id}`, defaults);
        if (cooldown - (Date.now() - last) > 0) {
            const obj = parse_ms_1.default(cooldown - (Date.now() - last));
            let time = ``;
            if (obj.hours > 0)
                time += `${obj.hours}h `;
            if (obj.minutes > 0)
                time += `${obj.minutes}m `;
            if (obj.seconds > 0)
                time += ``;
            this.client.sem(message, 'error', 'On Cooldown', `${message.member.user.tag} you still need to wait **${obj.hours}h ${obj.minutes}m ${obj.seconds}s** till you can redeem your next daily rewards!`, {
                timeout: 10000,
                reason: '[FLOOD PREVENTION] I deleted the message to prevent myself from flooding the chat.'
            });
        }
    }
}
exports.default = Daily;
//# sourceMappingURL=Daily.js.map