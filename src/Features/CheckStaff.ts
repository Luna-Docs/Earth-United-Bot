import Cluster from "../Lib/Structures/Client";

import { GuildMember } from "discord.js";

export = async (client: Cluster, member: GuildMember) => {
    const trainee = await client.fetch.role.get('787332992854917150', member.guild);
    const helper = await client.fetch.role.get('787037557413904404', member.guild);
    const mod = await client.fetch.role.get('787036880234872873', member.guild);
    const admin = await client.fetch.role.get('787034469897994250', member.guild);
    const owner = await client.fetch.role.get('787034142461788201', member.guild);

    if (member.roles.cache.get(trainee!.id)) {
        return 'Trainee';
    } else if (member.roles.cache.get(helper!.id)) {
        return 'Helper';
    } else if (member.roles.cache.get(mod!.id)) {
        return 'Mod';
    } else if (member.roles.cache.get(admin!.id)) {
        return 'Admin';
    } else if (member.roles.cache.get(owner!.id)) {
        return 'Owner';
    } else {
        return 'Member';
    }
}