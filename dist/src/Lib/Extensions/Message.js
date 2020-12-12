"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageExt = void 0;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const moment_1 = tslib_1.__importDefault(require("moment"));
class MessageExt extends discord_js_1.Structures.get('Message') {
    time() {
        return moment_1.default().format('MMMM [the] Do [in] YYYY [@] hh:mm A');
    }
    embed(type, title, description) {
        const embed = new discord_js_1.MessageEmbed();
        if (type === 'base') {
            embed.setColor('00ff81')
                .setTitle(title)
                .setDescription(description)
                .setFooter(this.time());
            return embed;
        }
        else if (type === 'bugs') {
            embed.setColor('777d84')
                .setTitle(title)
                .setDescription(description)
                .setFooter(this.time());
            return embed;
        }
        else if (type === 'error') {
            embed.setColor('ef3b3b')
                .setTitle(`Error: ${title}`)
                .setDescription(description)
                .setFooter(this.time());
            return embed;
        }
    }
    sem(type, title, description) {
        const embed = new discord_js_1.MessageEmbed();
        if (type === 'base') {
            embed.setColor('00ff81')
                .setTitle(title)
                .setDescription(description)
                .setFooter(this.time());
            return this.channel.send(embed);
        }
        else if (type === 'bugs') {
            embed.setColor('777d84')
                .setTitle(title)
                .setDescription(description)
                .setFooter(this.time());
            return this.channel.send(embed);
        }
        else if (type === 'error') {
            embed.setColor('ef3b3b')
                .setTitle(`Error: ${title}`)
                .setDescription(description)
                .setFooter(this.time());
            return this.channel.send(embed);
        }
    }
}
exports.MessageExt = MessageExt;
discord_js_1.Structures.extend('Message', () => MessageExt);
//# sourceMappingURL=Message.js.map