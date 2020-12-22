import { GuildMember } from "discord.js";

import Listener from "../Lib/Structures/Listener";
import Waiter from "../Features/Waiter";

export default class Ready extends Listener {
    once = true;

    async execute(member: GuildMember) {
        const role = await this.client.fetch.role.get("Default", member.guild);
        
        Waiter(500);

        member.roles.add(role!);
    }
}