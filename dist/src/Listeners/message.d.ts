import { Message } from "discord.js";
import Listener from "../Lib/Structures/Listener";
import { EUBGuildMessage } from "../Lib/Types/EUB";
export default class MessageReceived extends Listener {
    execute(message: Message | EUBGuildMessage): Promise<any>;
    handleGuild(message: EUBGuildMessage): Promise<void | ((message?: any, ...optionalParams: any[]) => void)>;
    inviteCheck(message: EUBGuildMessage): void;
    handleDM(message: Message): void;
    private missingPerms;
}
