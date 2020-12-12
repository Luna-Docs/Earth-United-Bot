"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EUBRoleFetcher {
    constructor(client) {
        this.client = client;
    }
    /** Gets a role by the input which was given. */
    async get(identifier, guild) {
        const roleProcessor = await guild.roles.cache.find((r) => r.name.toLowerCase() === identifier.toLowerCase() ||
            r.id === identifier.replace(/[\\<>@&]/g, ''));
        return roleProcessor || null;
    }
}
exports.default = EUBRoleFetcher;
//# sourceMappingURL=Role.js.map