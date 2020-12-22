import { GuildMember } from "discord.js";

export = async (
    type: 'CUSTOM_STATUS' | 'PLAYING' | 'STREAMING' | 'WATCHING' | 'LISTENING' | 'COMPETING',
    member: GuildMember
) => {
    const pres = await member.presence.activities.find((pres) => pres.type === type);

    return pres;
}