import {
    User,
    GuildMember,
    Message,
    MessageOptions,
    MessageEmbed,
    GuildChannel,
    TextChannel,
    Guild,
    PermissionResolvable
} from "discord.js";

import Cluster from "../Structures/Client";
import ModerationLog from "../Structures/ModerationLog";

export interface DefaultCommandData {
    category: string;
    name: string;
    aliases?: string[];
    usages?: string[] | string;
    examples?: string[] | string;
    description: string;

    permissions: PermissionCommandData;

    cooldown: CooldownCommandData;

    settings: SettingsCommandData;
}

export interface PermissionCommandData {
    client: {
        server: PermissionResolvable;
        channel: PermissionResolvable;
    };
    user: {
        server: PermissionResolvable;
        channel: PermissionResolvable;
    };
}

export interface CooldownCommandData {
    allowedUses: number;
    duration: number;
}

export interface SettingsCommandData {
    guildOnly: boolean;
    dmOnly: boolean;
}

export interface GuildSettings {
    apikey?: string | null;
    id: string;
    dm: {
        commands: boolean;
    };
    embed: boolean;
    roles: {
        public: string[];
        mute: string | null;
        blacklist: string[];
        moderator: string[];
        administrator: string[];
    };
    ignored: {
        commands: string[];
        invites: string[];
        stars: string[];
    };
    announcements: {
        id: string | null;
        mention: string | null;
    };
    aliases: TypicalCommandAlias[];
    logs: {
        id: string | null;
        join: string | null;
        leave: string | null;
        ban: string | null;
        unban: string | null;
        delete: string | null;
        nickname: string | null;
        invite: string | null;
        moderation: string | null;
        purge: string | null;
        say: string | null;
    };
    auto: {
        role: {
            bots: string | null;
            id: string | null;
            delay: number | null;
            silent: boolean;
        };
        message: string | null;
        nickname: string | null;
    };
    prefix: {
        custom: string | null;
        default: boolean;
    };
    automod: {
        invite: boolean;
        inviteaction: boolean;
        invitewarn: number;
        invitekick: number;

        link: boolean;
        linkaction: boolean; 
        linkwarn: number;
        linkkick: number;

        spam: boolean;
        spamaction: boolean;
        spamwarn: number;
        spamkick: number;

        swear: boolean;
        swearaction: boolean;
        swearwarn: number;
        swearkick: number;

        caps: boolean;
        capsaction: boolean;
        capswarn: number;
        capskick: number;
    };
    nonickname: boolean;
    subscriber: string | null;
    starboard: {
        id: string | null;
        count: number;
    };
}

export interface TaskOptions {
    data: unknown;
    id: number;
    end: number;
    type: string;
}

export interface UnbanTaskData {
    guildID: string;
    userID: string;
}

export interface UnmuteTaskData {
    guildID: string;
    memberID: string;
}

export interface ModlogAction {
    hex: number;
    display: string;
}

export interface EUBCommandAlias {
    alias: string;
    command: string;
}

export interface EUBMessage extends Message {
    embeddable: boolean;
    
    dm(
        content: string | MessageEmbed,
        embed?: MessageEmbed,
        options?: MessageOptions
    ): Promise<Message>;

    send(
        content: string | MessageEmbed,
        embed?: MessageEmbed,
        options?: MessageOptions
    ): Promise<Message>;

    success(
        content: string | MessageEmbed,
        embed?: MessageEmbed,
        options?: MessageOptions
    ): Promise<Message>;

    respond(
        content: string | MessageEmbed,
        embed?: MessageEmbed,
        options?: MessageOptions
    ): Promise<Message>;
}

export interface EUBGuildMessage extends EUBMessage {
    author: User;
    member: GuildMember;
    channel: TextChannel;
    guild: EUBGuild;
}

export interface EUBGuild extends Guild {
    client: Cluster;
    settings: GuildSettings;
    buildModerationLog(): Promise<ModerationLog>;
    fetchSettings(): Promise<GuildSettings>;
}

export interface BanLog {
    expiration: number;
    moderator: User;
    reason: string;
}

export interface UnbanLog {
    moderator: User;
    reason?: string;
}

export interface MuteLog {
    expiration: number;
    user: User;
    moderator: User;
    reason: string;
}

export interface FormatMessageOptions {
    oldMember?: GuildMember;
    channel?: GuildChannel;
    message?: MessageOptions;
}