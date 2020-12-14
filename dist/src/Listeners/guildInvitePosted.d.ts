import Listener from "../Lib/Structures/Listener";
import { EUBGuildMessage } from "../Lib/Types/EUB";
export default class GuildInvitePosted extends Listener {
    execute(message: EUBGuildMessage): Promise<void>;
}
