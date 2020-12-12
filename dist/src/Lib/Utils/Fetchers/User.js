"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EUBUserFetcher {
    constructor(client) {
        this.client = client;
    }
    /** Gets a user by the input which was given. */
    async get(identifier) {
        let userProcessor = await this.client.users.cache.find((u) => u.username.toLowerCase() === identifier.toLowerCase() ||
            u.tag.toLowerCase() === identifier.toLowerCase() ||
            u.id === identifier.replace(/[\\<>@!]/g, ''));
        try {
            if (!userProcessor)
                userProcessor = await this.fetch(identifier);
        }
        catch (err) {
            this.client.logger.error(err);
        }
        return userProcessor || null;
    }
    /** Uses forceful fetching to make sure if the user exists it's fetchable. */
    async fetch(ID) {
        return await this.client.users.fetch(ID, false, true);
    }
}
exports.default = EUBUserFetcher;
//# sourceMappingURL=User.js.map