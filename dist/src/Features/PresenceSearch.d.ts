import { GuildMember } from "discord.js";
declare const _default: (type: 'CUSTOM_STATUS' | 'PLAYING' | 'STREAMING' | 'WATCHING' | 'LISTENING' | 'COMPETING', member: GuildMember) => Promise<import("discord.js").Activity | undefined>;
export = _default;
