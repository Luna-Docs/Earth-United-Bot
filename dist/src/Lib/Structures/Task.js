"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Task {
    constructor(client, options) {
        this.client = client;
        this.id = options.id;
        this.type = options.type;
        this.end = options.end;
        this.data = options.data;
    }
    execute(_data) {
        throw new Error('Unsupported operation.');
    }
}
exports.default = Task;
//# sourceMappingURL=Task.js.map