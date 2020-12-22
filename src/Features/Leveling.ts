import { Message } from "discord.js";

import { EUBGuildMessage } from "../Lib/Types/EUB";
import Cluster from "../Lib/Structures/Client";

export = async (message: Message | EUBGuildMessage, client: Cluster) => {
        let messages = await client.db.get(`${message.author.id}-messages`, 0);
        
        let level = await client.db.get(`${message.author.id}-level`, 1);
        const title = await client.db.get(`${message.author.id}-title`, 'Dirt');
        const needed = Math.floor(25 + (20 * level));

        messages++;

        if (messages === needed) {
            level++;
            client.sem(message, 'base', 'Level UP', 
            `Congratulations ${message.member!.displayName}, you've leveled up to **level ${level}**!`);

            await client.db.set(`${message.author.id}-level`, 1);
        }

        switch (messages) {
            case 250:
                client.db.set(`${message.author.id}-title`, 'Wood');
                client.sem(message, 'base', 'New Title', 
                `Congratulations ${message.member!.displayName}, you've archieved the title **${client.db.get(`${message.author.id}-title`, 'Dirt')}**!`);
                break;

            case 500:
                client.db.set(`${message.author.id}-title`, 'Stone');
                client.sem(message, 'base', 'New Title', 
                `Congratulations ${message.member!.displayName}, you've archieved the title **${client.db.get(`${message.author.id}-title`, 'Dirt')}**!`);
                break;

            case 1000:
                client.db.set(`${message.author.id}-title`, 'Iron');
                client.sem(message, 'base', 'New Title', 
                `Congratulations ${message.member!.displayName}, you've archieved the title **${client.db.get(`${message.author.id}-title`, 'Dirt')}**!`);
                break;

            case 2000:
                client.db.set(`${message.author.id}-title`, 'Lapis Lazuli');
                client.sem(message, 'base', 'New Title', 
                `Congratulations ${message.member!.displayName}, you've archieved the title **${client.db.get(`${message.author.id}-title`, 'Dirt')}**!`);
                break;

            case 4000:
                client.db.set(`${message.author.id}-title`, 'Redstone');
                client.sem(message, 'base', 'New Title', 
                `Congratulations ${message.member!.displayName}, you've archieved the title **${client.db.get(`${message.author.id}-title`, 'Dirt')}**!`);
                break;

            case 8000:
                client.db.set(`${message.author.id}-title`, 'Gold');
                client.sem(message, 'base', 'New Title', 
                `Congratulations ${message.member!.displayName}, you've archieved the title **${client.db.get(`${message.author.id}-title`, 'Dirt')}**!`);
                break;

            case 16000:
                client.db.set(`${message.author.id}-title`, 'Diamond');
                client.sem(message, 'base', 'New Title', 
                `Congratulations ${message.member!.displayName}, you've archieved the title **${client.db.get(`${message.author.id}-title`, 'Dirt')}**!`);
                break;

            case 32000:
                client.db.set(`${message.author.id}-title`, 'Emerald');
                client.sem(message, 'base', 'New Title', 
                `Congratulations ${message.member!.displayName}, you've archieved the title **${client.db.get(`${message.author.id}-title`, 'Dirt')}**!`);
                break;

            case 64000:
                client.db.set(`${message.author.id}-title`, 'Ruby');
                client.sem(message, 'base', 'New Title', 
                `Congratulations ${message.member!.displayName}, you've archieved the title **${client.db.get(`${message.author.id}-title`, 'Dirt')}**!`);
                break;

            case 128000:
                client.db.set(`${message.author.id}-title`, 'Sapphire');
                client.sem(message, 'base', 'New Title', 
                `Congratulations ${message.member!.displayName}, you've archieved the title **${client.db.get(`${message.author.id}-title`, 'Dirt')}**!`);
                break;

            case 256000:
                client.db.set(`${message.author.id}-title`, 'Platinum');
                client.sem(message, 'base', 'New Title', 
                `Congratulations ${message.member!.displayName}, you've archieved the title **${client.db.get(`${message.author.id}-title`, 'Dirt')}**!`);
                break;

            case 512000:
                client.db.set(`${message.author.id}-title`, 'Titanium');
                client.sem(message, 'base', 'New Title', 
                `Congratulations ${message.member!.displayName}, you've archieved the title **${client.db.get(`${message.author.id}-title`, 'Dirt')}**!`);
                break;

            case 1000000:
                client.db.set(`${message.author.id}-title`, 'Earth United');
                client.sem(message, 'base', 'New Title', 
                `Congratulations ${message.member!.displayName}, you've archieved the title **${client.db.get(`${message.author.id}-title`, 'Dirt')}**!`);
                break;
        }

        await client.db.set(`${message.author.id}-messages`, messages);
}