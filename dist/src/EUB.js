"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dotenv_1 = require("dotenv");
dotenv_1.config({ path: `${__dirname}/../.env` });
const Client_1 = tslib_1.__importDefault(require("./Lib/Structures/Client"));
const client = new Client_1.default();
client.start("Nzg3MDQxMDk3MDMzMDU2MjY2.X9PLJA.QhoJko7ecyVhnLRTbQ9C85woOZI");
//# sourceMappingURL=EUB.js.map