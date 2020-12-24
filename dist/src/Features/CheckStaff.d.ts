import Cluster from "../Lib/Structures/Client";
import { GuildMember } from "discord.js";
declare const _default: (client: Cluster, member: GuildMember) => Promise<"Trainee" | "Helper" | "Mod" | "Admin" | "Owner" | "Member">;
export = _default;
