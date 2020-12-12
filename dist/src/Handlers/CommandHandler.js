"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = require("path");
const discord_js_1 = require("discord.js");
const klaw_1 = tslib_1.__importDefault(require("klaw"));
class CommandHandler extends discord_js_1.Collection {
    constructor(client) {
        super();
        this.client = client;
    }
    async init() {
        const path = path_1.resolve(path_1.join(__dirname, '..', 'Commands'));
        const start = Date.now();
        klaw_1.default(path)
            .on('data', (item) => {
            const file = path_1.parse(item.path);
            if (!file.ext || file.ext !== '.js')
                return;
            const req = ((r) => r.default || r)(require(path_1.resolve(path_1.join(file.dir, file.base))));
            const newReq = new req(this.client, file.name, path_1.resolve(path_1.join(file.dir, file.base)));
            this.set(file.name, newReq);
        })
            .on('end', () => {
            this.client.logger.info(`Loaded ${this.size} Commands in ${Date.now() - start}ms`);
            return this;
        });
    }
    fetch(name) {
        if (this.has(name))
            return this.get(name);
        if (this.client.aliases.has(name))
            return this.get(this.client.aliases.get(name));
    }
}
exports.default = CommandHandler;
//# sourceMappingURL=CommandHandler.js.map