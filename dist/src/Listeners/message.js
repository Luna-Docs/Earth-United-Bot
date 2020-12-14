"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const util_1 = require("util");
const discord_js_1 = require("discord.js");
const moment_1 = tslib_1.__importDefault(require("moment"));
const pretty_ms_1 = tslib_1.__importDefault(require("pretty-ms"));
const Listener_1 = tslib_1.__importDefault(require("../Lib/Structures/Listener"));
class MessageReceived extends Listener_1.default {
    async execute(message) {
        if (message.partial || (message.author.bot))
            return;
        let messages = this.client.db.get(`${message.author.id}-messages`, 0);
        let level = this.client.db.get(`${message.author.id}-level`, 1);
        const title = this.client.db.get(`${message.author.id}-title`, 'Dirt');
        const needed = Math.floor(25 + (20 * level));
        messages++;
        level++;
        this.client.db.set(`${message.author.id}-messages`, messages);
        if (messages === needed) {
            this.client.sem(message, 'base', 'Level UP', `Congratulations ${message.member.displayName}, you've leveled up to **level ${level}**!`);
            this.client.db.set(`${message.author.id}-level`, 1);
        }
        switch (messages) {
            case 250:
                this.client.db.set(`${message.author.id}-title`, 'Wood');
                this.client.sem(message, 'base', 'New Title', `Congratulations ${message.member.displayName}, you've archieved the title **${this.client.db.get(`${message.author.id}-title`, 'Dirt')}**!`);
                break;
            case 500:
                this.client.db.set(`${message.author.id}-title`, 'Stone');
                this.client.sem(message, 'base', 'New Title', `Congratulations ${message.member.displayName}, you've archieved the title **${this.client.db.get(`${message.author.id}-title`, 'Dirt')}**!`);
                break;
            case 1000:
                this.client.db.set(`${message.author.id}-title`, 'Iron');
                this.client.sem(message, 'base', 'New Title', `Congratulations ${message.member.displayName}, you've archieved the title **${this.client.db.get(`${message.author.id}-title`, 'Dirt')}**!`);
                break;
            case 2000:
                this.client.db.set(`${message.author.id}-title`, 'Lapis Lazuli');
                this.client.sem(message, 'base', 'New Title', `Congratulations ${message.member.displayName}, you've archieved the title **${this.client.db.get(`${message.author.id}-title`, 'Dirt')}**!`);
                break;
            case 4000:
                this.client.db.set(`${message.author.id}-title`, 'Redstone');
                this.client.sem(message, 'base', 'New Title', `Congratulations ${message.member.displayName}, you've archieved the title **${this.client.db.get(`${message.author.id}-title`, 'Dirt')}**!`);
                break;
            case 8000:
                this.client.db.set(`${message.author.id}-title`, 'Gold');
                this.client.sem(message, 'base', 'New Title', `Congratulations ${message.member.displayName}, you've archieved the title **${this.client.db.get(`${message.author.id}-title`, 'Dirt')}**!`);
                break;
            case 16000:
                this.client.db.set(`${message.author.id}-title`, 'Diamond');
                this.client.sem(message, 'base', 'New Title', `Congratulations ${message.member.displayName}, you've archieved the title **${this.client.db.get(`${message.author.id}-title`, 'Dirt')}**!`);
                break;
            case 32000:
                this.client.db.set(`${message.author.id}-title`, 'Emerald');
                this.client.sem(message, 'base', 'New Title', `Congratulations ${message.member.displayName}, you've archieved the title **${this.client.db.get(`${message.author.id}-title`, 'Dirt')}**!`);
                break;
            case 64000:
                this.client.db.set(`${message.author.id}-title`, 'Ruby');
                this.client.sem(message, 'base', 'New Title', `Congratulations ${message.member.displayName}, you've archieved the title **${this.client.db.get(`${message.author.id}-title`, 'Dirt')}**!`);
                break;
            case 128000:
                this.client.db.set(`${message.author.id}-title`, 'Sapphire');
                this.client.sem(message, 'base', 'New Title', `Congratulations ${message.member.displayName}, you've archieved the title **${this.client.db.get(`${message.author.id}-title`, 'Dirt')}**!`);
                break;
            case 256000:
                this.client.db.set(`${message.author.id}-title`, 'Platinum');
                this.client.sem(message, 'base', 'New Title', `Congratulations ${message.member.displayName}, you've archieved the title **${this.client.db.get(`${message.author.id}-title`, 'Dirt')}**!`);
                break;
            case 512000:
                this.client.db.set(`${message.author.id}-title`, 'Titanium');
                this.client.sem(message, 'base', 'New Title', `Congratulations ${message.member.displayName}, you've archieved the title **${this.client.db.get(`${message.author.id}-title`, 'Dirt')}**!`);
                break;
            case 1000000:
                this.client.db.set(`${message.author.id}-title`, 'Earth United');
                this.client.sem(message, 'base', 'New Title', `Congratulations ${message.member.displayName}, you've archieved the title **${this.client.db.get(`${message.author.id}-title`, 'Dirt')}**!`);
                break;
        }
        if (message.channel.type === 'dm')
            return this.handleDM(message);
        return this.handleGuild(message);
    }
    async handleGuild(message) {
        if (!message.guild.available)
            return;
        if (!this.client.prefix[message.guild.id]) {
            this.client.prefix[message.guild.id] = await this.client.db.get(`prefix-${message.guild.id}`, this.client.prefix['default']);
        }
        const botMember = message.guild.me;
        const botSendPerms = message.channel.permissionsFor(botMember);
        //if (!botSendPerms || !botSendPerms.has('SEND_MESSAGES')) return;
        const possibleBotMentions = [
            `<@787041097033056266>`,
            `<@!787041097033056266>`
        ];
        if (possibleBotMentions.includes(message.content)) {
            message.channel.send(new discord_js_1.MessageEmbed()
                .setColor('ef3b3b')
                .setTitle('Prefix Notification')
                .setDescription(`My prefix for **${message.guild.name}** is currently \`${this.client.prefix[message.guild.id]}\`\nTo change my prefix use the following commands:\n\`${this.client.prefix[message.guild.id]}prefix <New Prefix>\``)
                .setFooter(`${moment_1.default().format('MMMM [the] Do [in] YYYY [@] hh:mm A')}`));
            return;
        }
        // const helper = await message.member.roles.cache.find((r) => r.id === '787037557413904404');
        // const mod = await message.member.roles.cache.find((r) => r.id === '787036880234872873');
        // const admin = await message.member.roles.cache.find((r) => r.id === '787034469897994250');
        // const owner = await message.member.roles.cache.find((r) => r.id === '787034142461788201');
        // if (
        //     !helper ||
        //     !mod ||
        //     !admin ||
        //     !owner ||
        //     message.author.id !== message.guild.ownerID
        // ) return this.inviteCheck(message);
        // if (
        //     message.member.roles.cache.has(helperRole!.id) ||
        //     message.member.roles.cache.has(modRole!.id) ||
        //     message.member.roles.cache.has(adminRole!.id) ||
        //     !message.member.roles.cache.has(ownerRole!.id) ||
        //     message.author.id === message.guild.ownerID
        // ) return;
        if (!message.content.startsWith(this.client.prefix[message.guild.id]))
            return;
        const args = message.content.slice(this.client.prefix[message.guild.id].length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        let command = await this.client.commands.find((c) => c.name === cmd) ||
            await this.client.commands.find((c) => c.name === this.client.aliases.find((a) => a === cmd));
        if (!command)
            return console.error;
        if (typeof command === undefined)
            return console.log('Not working');
        // if (!message.guild.me!.permissions.has(command.permissions.client.server, true))
        //     return message.channel.send(
        //         new MessageEmbed()
        //             .setColor('ef3b3b')
        //             .setTitle('Permissions Notification')
        //             .setDescription(`My highest roles doesn't have the proper permissions!\nI'm missing the following permission(s) ${this.missingPerms(message.guild.me!, command.permissions.client.server)}.`)
        //             .setFooter(`${moment().format('MMMM [the] Do [in] YYYY [@] hh:mm A')}`)
        //     );
        // if (!message.channel.permissionsFor(message.guild.me!)!.has(command.permissions.client.channel))
        //     return message.channel.send(
        //         new MessageEmbed()
        //             .setColor('ef3b3b')
        //             .setTitle('Permissions Notification')
        //             .setDescription(`I don't have the proper permissions in this channel!\nI'm missing the following permission(s) ${this.missingPerms(message.guild.me!, command.permissions.client.channel)}.`)
        //             .setFooter(`${moment().format('MMMM [the] Do [in] YYYY [@] hh:mm A')}`)
        //     );
        // if (!message.member.permissions.has(command.permissions.user.server, true))
        //     return message.channel.send(
        //         new MessageEmbed()
        //             .setColor('ef3b3b')
        //             .setTitle('Permissions Notification')
        //             .setDescription(`Your highest role doesn't have the proper permissions!\nYou're missing the following permission(s) ${this.missingPerms(message.member, command.permissions.user.server)}.`)
        //             .setFooter(`${moment().format('MMMM [the] Do [in] YYYY [@] hh:mm A')}`)
        //     );
        // if (!message.channel.permissionsFor(message.member)!.has(command.permissions.user.channel))
        //     return message.channel.send(
        //         new MessageEmbed()
        //             .setColor('ef3b3b')
        //             .setTitle('Permissions Notification')
        //             .setDescription(`You don't have the proper permissions in this channel!\nYou're missing the following permission(s) ${this.missingPerms(message.member, command.permissions.user.channel)}.`)
        //             .setFooter(`${moment().format('MMMM [the] Do [in] YYYY [@] hh:mm A')}`)
        //     );
        if (message.channel.type === 'text' && command.settings.dmOnly)
            return;
        console.log(`${command} | ${message.content}`);
        const { name } = command;
        const limit = this.client.cooldown.get(`limit-${name}-${message.guild.id}-${message.author.id}`);
        const cooldown = this.client.cooldown.get(`cooldown-${name}-${message.guild.id}-${message.author.id}`);
        if (limit && limit >= command.cooldown.allowedUses) {
            message.channel.send(new discord_js_1.MessageEmbed()
                .setColor('ef3b3b')
                .setTitle('Cooldown Notification')
                .setDescription(`You are currently in cooldown, you may use ${this.client.capitalise(name)} again in **${pretty_ms_1.default(Math.abs(Date.now() - cooldown - command.cooldown.duration), { verbose: true, secondsDecimalDigits: 0 })}**.`)
                .setFooter(`${moment_1.default().format('MMMM [the] Do [in] YYYY [@] hh:mm A')}`));
            setTimeout(() => {
                this.client.cooldown.delete(`limit-${name}-${message.guild.id}-${message.author.id}`);
                this.client.cooldown.delete(`cooldown-${name}-${message.guild.id}-${message.author.id}`);
            }, command.cooldown.duration * 1000);
            return;
        }
        else {
            if (limit === undefined)
                this.client.cooldown.set(`limit-${name}-${message.guild.id}-${message.author.id}`, 0);
            let newLimit = limit + 1;
            this.client.cooldown.set(`limit-${name}-${message.guild.id}-${message.author.id}`, newLimit);
            this.client.cooldown.set(`cooldown-${name}-${message.guild.id}-${message.author.id}`, Date.now());
            setTimeout(() => this.client.cooldown.set(`limit-${name}-${message.guild.id}-${message.author.id}`, 0), command.cooldown.duration);
        }
        command.execute(message, args);
    }
    inviteCheck(message) {
        const inviteRegex = /(discord\.(gg|io|me|li|plus|link)\/.+|discord(?:app)?\.com\/invite\/.+)/i;
        if (inviteRegex.test(message.content) ||
            inviteRegex.test(util_1.inspect(message.embeds, { depth: 4 })))
            this.client.emit('guildInvitePosted', message);
    }
    handleDM(message) {
        const [split, ...params] = message.content.split(' ');
        if (!message.content.startsWith(this.client.prefix[message.guild.id]))
            return;
        const command = this.client.commands.fetch(split.slice(this.client.prefix[message.guild.id].length).toLowerCase());
        if (!command ||
            !command.settings.dmOnly)
            return;
        command.execute(message, params);
    }
    missingPerms(member, perms) {
        const missingPerms = member.permissions.missing(perms)
            .map(str => `${str.replace(/_/g, ' ').toLowerCase().replace(/\b(\w)/g, char => char.toUpperCase())}`);
        return missingPerms.length > 1 ?
            `${missingPerms.slice(0, -1).join(', ')} and ${missingPerms.slice(-1)[0]}` :
            missingPerms[0];
    }
}
exports.default = MessageReceived;
//# sourceMappingURL=message.js.map