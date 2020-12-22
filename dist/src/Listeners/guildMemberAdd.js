"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const Listener_1 = tslib_1.__importDefault(require("../Lib/Structures/Listener"));
const Waiter_1 = tslib_1.__importDefault(require("../Features/Waiter"));
class Ready extends Listener_1.default {
    constructor() {
        super(...arguments);
        this.once = true;
    }
    async execute(member) {
        const role = await this.client.fetch.role.get("Default", member.guild);
        Waiter_1.default(500);
        member.roles.add(role);
    }
}
exports.default = Ready;
//# sourceMappingURL=guildMemberAdd.js.map