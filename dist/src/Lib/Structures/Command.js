"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Command {
    constructor(client, data) {
        this.client = client;
        this.category = data.category;
        this.name = data.name;
        this.aliases = data.aliases = [];
        this.usages = data.usages = ['No usages have been found!'];
        this.examples = data.examples = ['No examples have been found!'];
        this.description = data.description;
        this.permissions = data.permissions;
        this.cooldown = data.cooldown;
        this.settings = data.settings;
    }
    execute(message, params) {
        throw console.log(`${this.name} doesn't execute anything!`);
    }
}
exports.default = Command;
//# sourceMappingURL=Command.js.map