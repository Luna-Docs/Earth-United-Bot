"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Command_1 = tslib_1.__importDefault(require("../../Lib/Structures/Command"));
const discord_js_1 = require("discord.js");
const moment_1 = tslib_1.__importDefault(require("moment"));
class Level extends Command_1.default {
    constructor(client) {
        super(client, {
            category: 'Moderation',
            name: 'warn',
            aliases: ['wrn'],
            usages: [
                '!warn <Mention|ID> [Reason?]'
            ],
            examples: [
                '!warn @chadszyd Spam',
                '!warn @Mochi Spam -s'
            ],
            description: 'Warn a member for doing something wrong.',
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
        if (!message.member.permissions.has('MANAGE_MESSAGES', true))
            return this.client.sem(message, 'error', 'Error | Permission', `You don't have the permission to execute this command!`);
        const us = args[0];
        const reason = args.slice(1).join(' ');
        if (!us)
            return this.client.sem(message, 'error', 'Error | Fetcher', `You didn't provide the user argument so I couldn't warn anyone!`);
        const mem = await this.client.fetch.member.get(us, message.guild);
        let member;
        if (!mem)
            return this.client.sem(message, 'error', 'Error | Fetcher', `The member you provided (\`${us}\`) either doesn't exist or you made a typo!`);
        if (!(mem instanceof discord_js_1.GuildMember)) {
            member = message.guild.members.cache.get(mem.id);
        }
        else if (mem instanceof discord_js_1.GuildMember)
            member = mem;
        else if (mem === undefined)
            return this.client.sem(message, 'error', 'Error | Fetcher', `The member you provided (\`${us}\`) either doesn't exist or you made a typo!`);
        // if (member!.id === message.member.id) 
        // return this.client.sem(message, 'error', 'Error | Permission',
        // `You can't warn yourself!`);
        const caseNumber = await this.client.db.get(`case`, 1);
        this.client.db.push(`${message.member.id}-warnings`, {
            user: member.id,
            reason: reason ? reason : 'No reason provided',
            case: `#${caseNumber}`,
            at: `${moment_1.default(Date.now()).format('MMM[/]Do[/]YYYY [|] hh:mm A')}`
        });
        const t = await this.client.sem(message, 'base', 'Punishments | Warning', `The user **${member.user.tag}** has been kicked by **${reason.includes('-s') ? 'a Staff Member' : message.member.user.tag}** for:\n\`\`\`${reason}\`\`\``);
        const channel = await this.client.fetch.channel.get('792763060418379797', message.guild);
        const emb = this.client.embed('warn', 'Punishments | Warning', [
            `**User** ${member}`,
            `**Moderator** ${message.member}${t instanceof discord_js_1.Message ? '\n**Channel**' + t.channel : ''}`,
            `**Reason** ${reason ? reason : 'No reason provided'}`,
            `**Punished At** ${moment_1.default(Date.now()).format('MMM[/]Do[/]YYYY [|] hh:mm A')}`
        ].join('\n'));
        channel instanceof discord_js_1.TextChannel
            ? channel.send(emb)
            : message.member.user.send(`${channel} is not an instance of a text channel!\n\nPlease alarm <@!671374842951630858> about this!`);
    }
}
exports.default = Level;
//# sourceMappingURL=Warn.js.map