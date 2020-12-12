"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const path_1 = require("path");
const discord_js_1 = require("discord.js");
const klaw_1 = tslib_1.__importDefault(require("klaw"));
class ListenerHandler extends discord_js_1.Collection {
    constructor(client) {
        super();
        this.client = client;
    }
    async init() {
        const path = path_1.resolve(path_1.join(__dirname, '..', 'Listeners'));
        const start = Date.now();
        klaw_1.default(path)
            .on('data', (item) => {
            const file = path_1.parse(item.path);
            if (file.ext && file.ext === '.js') {
                const Listener = ((r) => r.default || r)(require(path_1.resolve(path_1.join(file.dir, file.base))));
                const listener = new Listener(this.client, file.name, path_1.resolve(path_1.join(file.dir, file.base)));
                this.set(file.name, listener);
                // @ts-ignore
                this.client[listener.once ? 'once' : 'on'](listener.name, (...args) => listener.execute(...args));
            }
        })
            .on('end', () => {
            this.client.logger.info(`Loaded ${this.size} Events in ${Date.now() - start}ms`);
        });
    }
}
exports.default = ListenerHandler;
//# sourceMappingURL=ListenerHandler.js.map