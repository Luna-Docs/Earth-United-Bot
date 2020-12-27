import Command from "../../Lib/Structures/Command";
import { EUBGuildMessage } from "../../Lib/Types/EUB";
import Cluster from "../../Lib/Structures/Client";

import { GuildMember, Message, TextChannel } from "discord.js";
import moment from "moment";

export default class Level extends Command {
    constructor(client: Cluster) {
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

    public async execute(message: EUBGuildMessage, args: string[]) {
        if (!message.member.permissions.has('MANAGE_MESSAGES', true)) 
        return this.client.sem(message, 'error', 'Error | Permission',
        `You don't have the permission to execute this command!`);
        
        const us = args[0];
        const reason = args.slice(1).join(' ');

        if (!us) return this.client.sem(message, 'error', 'Error | Fetcher',
        `You didn't provide the user argument so I couldn't warn anyone!`);

        const mem = await this.client.fetch.member.get(us, message.guild!);
        let member: GuildMember | undefined;
        
        if (!mem) return this.client.sem(message, 'error', 'Error | Fetcher',
        `The member you provided (\`${us}\`) either doesn't exist or you made a typo!`);
        
        if (!(mem instanceof GuildMember)) {
            member = message.guild.members.cache.get(mem.id);
        } else if (mem instanceof GuildMember) member = mem;
        else if (mem === undefined) return this.client.sem(message, 'error', 'Error | Fetcher',
        `The member you provided (\`${us}\`) either doesn't exist or you made a typo!`);

        if (member!.id === message.member.id) 
        return this.client.sem(message, 'error', 'Error | Permission',
        `You can't warn yourself!`);

        let caseNumber = await this.client.db.get(`${message.member.id}-case`, 1);
            
        this.client.db.set(`${message.member.id}-warnings-${caseNumber}`, {
            user: member!.id,
            reason: reason ? reason : 'No reason provided',
            case: `#${caseNumber}`,
            at: `${moment(Date.now()).format('MMM[/]Do[/]YYYY [|] hh:mm A')}`
        });

        caseNumber++
        this.client.db.set(`${message.member.id}-case`, caseNumber);

        const t = await this.client.sem(message, 'base', 'Punishments | Warning',
        `The user **${member!.user.tag}** has been warned by **${reason.includes('-s') ? 'a Staff Member' : message.member.user.tag}** for:\n\`\`\`${reason}\`\`\``);

        const channel = await this.client.fetch.channel.get('792763060418379797', message.guild);
        const emb = this.client.embed('warn', 'Punishments | Warning', [
            `**User** ${member!}`,
            `**Moderator** ${message.member}${t instanceof Message ? `\n**Channel** <#${t.channel.id}>` : ''}`,
            `**Reason** ${reason ? reason : 'No reason provided'}`,
            `**Punished At** ${moment(Date.now()).format('MMM[/]DD[/]YYYY [|] hh:mm A')}`
        ].join('\n'));

        const dmEmb = this.client.embed('warn', 'Notifications | Staff',
        `You have been warned in **${message.guild.name}** for:\n\`\`\`${reason}\`\`\``);
        
        await member!.user.send(dmEmb);

        channel instanceof TextChannel 
        ? channel.send(emb)
        : message.member.user.send(`${channel} is not an instance of a text channel!\n\nPlease alarm <@!671374842951630858> about this!`);
    }
}