import { Collection, MessageEmbed, TextChannel, User } from "discord.js";

import Listener from "../Lib/Structures/Listener";
import { EUBGuildMessage } from "../Lib/Types/EUB";

export default class GuildInvitePosted extends Listener {
    public async execute(message: EUBGuildMessage) {
        message.deletable
            ? message.delete()
            : message.channel.send(
                this.client.embed('error', 'Deletion Notification',
                    `Couldn't delete the message which was sent by ${message.author.tag} as their message is not deletable!`)
            ).then((msg) => msg.delete({ timeout: 10000 }));
        
        const invChan = await this.client.fetch.channel.get('787033568610091071', message.guild);
        let inv;
        if (invChan instanceof TextChannel) inv = invChan.createInvite({maxUses: 1}); 

        const uniqueMemberID = `${message.guild.id}-${message.author.id}`;
        if (!this.client.caches.invites.has(uniqueMemberID))
            this.client.caches.invites.set(uniqueMemberID, new Collection());

        const cache = this.client.caches.invites.get(uniqueMemberID) as Collection<string, NodeJS.Timeout>;

        const invWarn = this.client.db.get(`invites-warn`, 0);
        const invKick = this.client.db.get(`invites-kick`, 0);

        const notifyEmbed = this.client.embed('base', 'Warning', `Your last message in ${message.channel} has been deleted as it included a Discord server invite!`);

        const warnEmbed = this.client.embed('base', 'Warning', [
            `Your last message in ${message.channel} has been deleted as it included a Discord server invite!`,
            `Your current amount of invite warnings are ${cache.size}.`,
            `***Note*** *on ${invKick} warnings you'll be kicked from the server*`
        ].join('\n'));

        const kickEmbed = this.client.embed('base', 'Kick', [
            `You exceeded that amount of warnings and therefore you're being kicked for sending too many Discord invites.`, 
            `You may join back if you won't send any invites again, you can join back by using the following invite:`,
            `[Earth United Network Discord Invite](${inv})`
        ].join('\n'))

        cache.set(message.id, setTimeout(() => cache.delete(message.id), 60000));

        if (
            invWarn !== 0 &&
            cache.size === invWarn
        ) {
            const channel = message.guild.channels.cache.get('787682679331487755');
            if (!(channel instanceof TextChannel)) return;

            this.client.punish.push(`${message.author.id}-punishments`, {
                user: message.author.id,
                moderator: this.client.user!.id,
                type: 'warning',
                at: Date.now(),
                reason: `[AUTO MOD] Posted an invite`,
                case: cache.size 
            });

            message.author.send(warnEmbed);

            channel.send(
                this.client.embed('base', 'Discord Invite Automod', `**User** ${message.author.tag}\n**Action** Warning\n**Reason** [AUTO MOD] Posted an invite`)
                    .addField('Sent In', `${message.channel}`, true)
                    .addField('Sent Content', `${message.content.length >= 1024 ? message.content.slice(0, 1021) + '...' : message.content}`)
            );
        } else if (
            (invKick !== 0 &&
            cache.size === invKick) &&
            cache.size > invWarn
        ) {
            const channel = message.guild.channels.cache.get('787682679331487755');
            if (!(channel instanceof TextChannel)) return;

            this.client.punish.push(`${message.author.id}-punishments`, {
                user: message.author.id,
                moderator: this.client.user!.id,
                type: 'kick',
                at: Date.now(),
                reason: `[AUTO MOD] Posted an invite`,
                case: cache.size 
            });

            message.author.send(kickEmbed);

            channel.send(
                this.client.embed('base', 'Discord Invite Automod', `**User** ${message.author.tag}\n**Action** Kick\n**Reason** [AUTO MOD] Posted an invite`)
                    .addField('Sent In', `${message.channel}`, true)
                    .addField('Sent Content', `${message.content.length >= 1024 ? message.content.slice(0, 1021) + '...' : message.content}`)
            );
        }
    }
}