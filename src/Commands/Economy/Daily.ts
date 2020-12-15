import Prsms from "parse-ms";

import Command from "../../Lib/Structures/Command";
import { EUBGuildMessage } from "../../Lib/Types/EUB";
import Cluster from "../../Lib/Structures/Client";

export default class Daily extends Command {
    constructor(client: Cluster) {
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

    public async execute(message: EUBGuildMessage, args: string[]) {
        const cooldown: number = 86400000;
        const amount: number = 200;
        const defaults = Date.now() - cooldown;
        const last = await this.client.eco.get(`last_daily-${message.author.id}`, defaults);
        
        if (cooldown - (Date.now() - last) > 0) {
            const obj = Prsms(cooldown - (Date.now() - last));
            let time = ``;

            if (obj.hours > 0) time += `${obj.hours}h `
            if (obj.minutes > 0) time += `${obj.minutes}m `
            if (obj.seconds > 0) time += `` 

            this.client.sem(message, 'error', 'On Cooldown', 
            `${message.member.user.tag} you still need to wait **${obj.hours}h ${obj.minutes}m ${obj.seconds}s** till you can redeem your next daily rewards!`, {
                timeout: 10000,
                reason: '[FLOOD PREVENTION] I deleted the message to prevent myself from flooding the chat.'
            });
        }
    }
}