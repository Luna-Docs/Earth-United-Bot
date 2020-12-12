import { Team } from "discord.js";

import Listener from "../Lib/Structures/Listener";

export default class Ready extends Listener {
    once = true;

    async execute() {
        this.client.logger.info(`Client connected as user ${this.client.user!.tag}`);
    }
}