import {Structures, MessageEmbed} from "discord.js";
import moment from "moment";

export class MessageExt extends Structures.get('Message') {
    time() {
        return moment().format('MMMM [the] Do [in] YYYY [@] hh:mm A');
    }
    
    public embed(type: 'base' | 'bugs' | 'error', title: string, description: string) {
        const embed = new MessageEmbed();

        if (type === 'base') {
            embed.setColor('00ff81')
                 .setTitle(title)
                 .setDescription(description)
                 .setFooter(this.time());

            return embed;
        } else if (type === 'bugs') {
            embed.setColor('777d84')
                 .setTitle(title)
                 .setDescription(description)
                 .setFooter(this.time());

            return embed;
        } else if (type === 'error') {
            embed.setColor('ef3b3b')
                 .setTitle(`Error: ${title}`)
                 .setDescription(description)
                 .setFooter(this.time());

            return embed;
        }
    }

    public sem(type: 'base' | 'bugs' | 'error', title: string, description: string) {
        const embed = new MessageEmbed();

        if (type === 'base') {
            embed.setColor('00ff81')
                 .setTitle(title)
                 .setDescription(description)
                 .setFooter(this.time());

            return this.channel.send(embed);
        } else if (type === 'bugs') {
            embed.setColor('777d84')
                 .setTitle(title)
                 .setDescription(description)
                 .setFooter(this.time());

            return this.channel.send(embed);
        } else if (type === 'error') {
            embed.setColor('ef3b3b')
                 .setTitle(`Error: ${title}`)
                 .setDescription(description)
                 .setFooter(this.time());

            return this.channel.send(embed);
        }
    }
}

Structures.extend('Message', () => MessageExt);