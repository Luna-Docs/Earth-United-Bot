import Command from "../../Lib/Structures/Command";
import { EUBGuildMessage } from "../../Lib/Types/EUB";
import Cluster from "../../Lib/Structures/Client";

export default class Ping extends Command {
    constructor(client: Cluster) {
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

    public async execute(message: EUBGuildMessage, args: string[]) {
        if (message.member.permissions.has('KICK_MEMBERS', true)) return message.channel.send(`W.I.P`);
    }
}