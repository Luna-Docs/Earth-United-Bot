"use strict";
module.exports = async (type, member) => {
    const pres = await member.presence.activities.find((pres) => pres.type === type);
    return pres;
};
//# sourceMappingURL=PresenceSearch.js.map