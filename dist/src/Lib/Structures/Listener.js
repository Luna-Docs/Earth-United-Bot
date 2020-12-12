"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Listener {
    constructor(client, name) {
        this.once = false;
        this.client = client;
        this.name = name;
    }
    execute(..._args) {
        throw console.log(`${this.name} doesn't do anything!`);
    }
}
exports.default = Listener;
//# sourceMappingURL=Listener.js.map