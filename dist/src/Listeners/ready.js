"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Listener_1 = tslib_1.__importDefault(require("../Lib/Structures/Listener"));
class Ready extends Listener_1.default {
    constructor() {
        super(...arguments);
        this.once = true;
    }
    async execute() {
        this.client.user.setPresence({
            status: 'dnd',
            activity: {
                type: 'COMPETING',
                name: 'EUN Discord'
            }
        });
        this.client.logger.info(`Client connected as user ${this.client.user.tag}`);
    }
}
exports.default = Ready;
//# sourceMappingURL=ready.js.map