import {resolve, join, parse} from "path";
import {Collection} from "discord.js";
import klaw from "klaw";

import Cluster from "../Lib/Structures/Client";
import Command from "../Lib/Structures/Command";

export default class CommandHandler extends Collection<string, Command> {
    client: Cluster;

    constructor(client: Cluster) {
        super();

        this.client = client;
    }

    async init() {
        const path = resolve(join(__dirname, '..', 'Commands'));
        const start = Date.now();

        klaw(path)
            .on('data', (item: any) => {
                const file = parse(item.path);
                if (!file.ext || file.ext !== '.js') return;

                const req = ((r) => r.default || r)(require(resolve(join(file.dir, file.base))));
                const newReq = new req(this.client, file.name, resolve(join(file.dir, file.base)));

                this.set(file.name, newReq);
            })
            .on('end', () => {
                this.client.logger.info(`Loaded ${this.size} Commands in ${Date.now() - start}ms`);

                return this;
            });
    }

    fetch(name: string) {
        if (this.has(name)) return this.get(name) as Command;
        if (this.client.aliases.has(name)) return this.get(this.client.aliases.get(name)!) as Command;
    }
}