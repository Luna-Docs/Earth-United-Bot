"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const Command_1 = tslib_1.__importDefault(require("../../Lib/Structures/Command"));
class Ping extends Command_1.default {
    constructor(client) {
        super(client, {
            category: 'General',
            name: 'ping',
            aliases: ['png'],
            usages: ['!ping'],
            examples: ['!ping'],
            description: 'Check the bot\'s ping towards the server.',
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
        const ping = await message.channel.send('Calculating...');
        setInterval(() => {
            const embed = new discord_js_1.MessageEmbed()
                .setColor(this.client.colors.BASE)
                .setTitle(`Ping towards: ${message.guild.name}`)
                .addField('Response Latency', `${ping.createdTimestamp - message.createdTimestamp}ms`, true)
                .addField('API Latency', Math.floor(this.client.ws.ping), true);
            return ping.edit('> Ping Fetched!', embed);
        }, 3000);
    }
}
exports.default = Ping;
//# sourceMappingURL=Ping.js.map