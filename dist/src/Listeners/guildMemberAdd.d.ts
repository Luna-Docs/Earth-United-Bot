import { GuildMember } from "discord.js";
import Listener from "../Lib/Structures/Listener";
export default class Ready extends Listener {
    once: boolean;
    execute(member: GuildMember): Promise<void>;
}
