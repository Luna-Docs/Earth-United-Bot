"use strict";
var _logger;
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const winston_1 = require("winston");
// Class
class Logger {
    constructor() {
        _logger.set(this, void 0);
        tslib_1.__classPrivateFieldSet(this, _logger, winston_1.createLogger({
            format: winston_1.format.combine(winston_1.format.timestamp({ format: 'MM-DD-YYYY | hh:mm:ss A' }), winston_1.format.printf((info) => {
                const { timestamp, level, message, ...rest } = info;
                const msg = `[${timestamp}] (${level}): ${message}`;
                return `${msg}${Object.keys(rest).length ? `\n${JSON.stringify(rest, null, 2)}` : ''}`;
            })),
            transports: [
                new winston_1.transports.Console({
                    format: winston_1.format.colorize({ level: true }),
                    level: 'info'
                }),
                new winston_1.transports.File({
                    format: winston_1.format.combine(winston_1.format.timestamp(), winston_1.format.json()),
                    level: 'debug',
                    filename: 'combined.log'
                })
            ]
        }));
    }
    info(message) {
        tslib_1.__classPrivateFieldGet(this, _logger).info(message);
    }
    debug(message) {
        tslib_1.__classPrivateFieldGet(this, _logger).debug(message);
    }
    warn(message) {
        tslib_1.__classPrivateFieldGet(this, _logger).warn(message);
    }
    error(message) {
        tslib_1.__classPrivateFieldGet(this, _logger).error(message.stack ? message.stack : message.toString());
    }
}
exports.default = Logger;
_logger = new WeakMap();
;
//# sourceMappingURL=Logger.js.map