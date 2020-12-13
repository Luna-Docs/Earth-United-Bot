import { inspect } from "util";
import { Message, GuildMember, User, MessageEmbed, BitFieldResolvable, PermissionString } from "discord.js";
import moment from "moment";
import PMS from "pretty-ms";

import Listener from "../Lib/Structures/Listener";
import { EUBGuildMessage } from "../Lib/Types/EUB";

export default class MessageReceived extends Listener {
    public async execute(message: Message | EUBGuildMessage) {
        if (message.partial || (message.author?.bot)) return;

        if (message.channel.type === 'dm')
            return this.handleDM(message as Message);

        return this.handleGuild(message as EUBGuildMessage);
    }

    async handleGuild(message: EUBGuildMessage) {
        if (!message.guild.available) return;
        if (!this.client.prefix[message.guild!.id]) {
            this.client.prefix[message.guild!.id] = await this.client.db.get(`prefix-${message.guild!.id}`, this.client.prefix['default']);
        }

        const botMember = message.guild.me as GuildMember;
        const botSendPerms = message.channel.permissionsFor(botMember);
        if (!botSendPerms || !botSendPerms.has('SEND_MESSAGES', true)) return;

        const possibleBotMentions = [
            `<@787041097033056266>`,
            `<@!787041097033056266>`
        ];

        if (possibleBotMentions.includes(message.content)) {
            return message.channel.send(
                new MessageEmbed()
                    .setColor('ef3b3b')
                    .setTitle('Prefix Notification')
                    .setDescription(`My prefix for **${message.guild!.name}** is currently \`${this.client.prefix[message.guild!.id]}\`\nTo change my prefix use the following commands:\n\`${this.client.prefix[message.guild!.id]}prefix <New Prefix>\``)
                    .setFooter(`${moment().format('MMMM [the] Do [in] YYYY [@] hh:mm A')}`)
            );
        }

        const helperRole = await this.client.fetch.role.get('787037557413904404', message.guild);
        const modRole = await this.client.fetch.role.get('787036880234872873', message.guild);
        const adminRole = await this.client.fetch.role.get('787034469897994250', message.guild);
        const ownerRole = await this.client.fetch.role.get('787034142461788201', message.guild);

        if (
            !message.member.roles.cache.has(helperRole!.id) ||
            !message.member.roles.cache.has(modRole!.id) ||
            !message.member.roles.cache.has(adminRole!.id) ||
            !message.member.roles.cache.has(ownerRole!.id) ||
            message.author.id !== message.guild.ownerID
        ) return this.inviteCheck(message);

        if (
            message.member.roles.cache.has(helperRole!.id) ||
            message.member.roles.cache.has(modRole!.id) ||
            message.member.roles.cache.has(adminRole!.id) ||
            !message.member.roles.cache.has(ownerRole!.id) ||
            message.author.id === message.guild.ownerID
        ) return;

        const [split, ...params] = message.content.split(' ');

        if (!message.content.startsWith(this.client.prefix[message.guild!.id])) return;

        const command = this.client.commands.fetch(split.slice(this.client.prefix[message.guild!.id].length).toLowerCase());

        if (!command) return;
        if (!message.member)
            await message.guild.members.fetch(message.author.id);

        if (!message.guild.me?.permissions.has(command.permissions.client.server, true))
            return message.channel.send(
                new MessageEmbed()
                    .setColor('ef3b3b')
                    .setTitle('Permissions Notification')
                    .setDescription(`My highest roles doesn't have the proper permissions!\nI'm missing the following permission(s) ${this.missingPerms(message.guild.me!, command.permissions.client.server)}.`)
                    .setFooter(`${moment().format('MMMM [the] Do [in] YYYY [@] hh:mm A')}`)
            );

        if (!message.channel.permissionsFor(message.guild.me!)?.has(command.permissions.client.channel))
            return message.channel.send(
                new MessageEmbed()
                    .setColor('ef3b3b')
                    .setTitle('Permissions Notification')
                    .setDescription(`I don't have the proper permissions in this channel!\nI'm missing the following permission(s) ${this.missingPerms(message.guild.me!, command.permissions.client.channel)}.`)
                    .setFooter(`${moment().format('MMMM [the] Do [in] YYYY [@] hh:mm A')}`)
            );

        if (!message.member.permissions.has(command.permissions.user.server, true))
            return message.channel.send(
                new MessageEmbed()
                    .setColor('ef3b3b')
                    .setTitle('Permissions Notification')
                    .setDescription(`Your highest role doesn't have the proper permissions!\nYou're missing the following permission(s) ${this.missingPerms(message.member, command.permissions.user.server)}.`)
                    .setFooter(`${moment().format('MMMM [the] Do [in] YYYY [@] hh:mm A')}`)
            );

        if (!message.channel.permissionsFor(message.member)?.has(command.permissions.user.channel))
            return message.channel.send(
                new MessageEmbed()
                    .setColor('ef3b3b')
                    .setTitle('Permissions Notification')
                    .setDescription(`You don't have the proper permissions in this channel!\nYou're missing the following permission(s) ${this.missingPerms(message.member, command.permissions.user.channel)}.`)
                    .setFooter(`${moment().format('MMMM [the] Do [in] YYYY [@] hh:mm A')}`)
            );

        if (message.channel.type === 'text' && command.settings.dmOnly) return;

        const { name } = command;
        const limit = this.client.cooldown.get(`limit-${name}-${message.guild!.id}-${message.author.id}`);
        const cooldown = this.client.cooldown.get(`cooldown-${name}-${message.guild!.id}-${message.author.id}`);

        if (limit && limit >= command.cooldown.allowedUses) {
            message.channel.send(
                new MessageEmbed()
                    .setColor('ef3b3b')
                    .setTitle('Cooldown Notification')
                    .setDescription(`You are currently in cooldown, you may use ${this.client.capitalise(name)} again in **${PMS(Math.abs(Date.now() - cooldown - command.cooldown.duration), {verbose: true, secondsDecimalDigits: 0})}**.`)
                    .setFooter(`${moment().format('MMMM [the] Do [in] YYYY [@] hh:mm A')}`)
            );

            setTimeout(() => {
                this.client.cooldown.delete(`limit-${name}-${message.guild!.id}-${message.author.id}`);
                this.client.cooldown.delete(`cooldown-${name}-${message.guild!.id}-${message.author.id}`);
            }, command.cooldown.duration * 1000);
            return;
        } else {
            if (limit === undefined) this.client.cooldown.set(`limit-${name}-${message.guild!.id}-${message.author.id}`, 0);

            let newLimit = limit! + 1;
            this.client.cooldown.set(`limit-${name}-${message.guild!.id}-${message.author.id}`, newLimit);

            this.client.cooldown.set(`cooldown-${name}-${message.guild!.id}-${message.author.id}`, Date.now());

            setTimeout(() => this.client.cooldown.set(`limit-${name}-${message.guild!.id}-${message.author.id}`, 0), command.cooldown.duration);
        }

        try {
            command.execute(message, params);
        } catch (err) {
            this.client.logger.error(err);
        }
    }

    inviteCheck(message: EUBGuildMessage) {
        const inviteRegex = /(discord\.(gg|io|me|li|plus|link)\/.+|discord(?:app)?\.com\/invite\/.+)/i;
        if (
            inviteRegex.test(message.content) ||
            inviteRegex.test(inspect(message.embeds, {depth: 4}))
        ) this.client.emit('guildInvitePosted', message);
    }

    handleDM(message: Message) {
        const [split, ...params] = message.content.split(' ');

        if (!message.content.startsWith(this.client.prefix[message.guild!.id])) return;

        const command = this.client.commands.fetch(split.slice(this.client.prefix[message.guild!.id].length).toLowerCase());

        if (
            !command ||
            !command.settings.dmOnly
        ) return;

        command.execute(message, params);
    }

    private missingPerms(member: GuildMember, perms: BitFieldResolvable<PermissionString>) {
        const missingPerms = member.permissions.missing(perms)
            .map(str => `${str.replace(/_/g, ' ').toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase())}`);

        return missingPerms.length > 1 ?
            `${missingPerms.slice(0, -1).join(', ')} and ${missingPerms.slice(-1)[0]}` :
            missingPerms[0];
    }
}