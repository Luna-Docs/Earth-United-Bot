import {resolve, join, parse} from "path";
import {Collection} from "discord.js";
import klaw from "klaw";

import Cluster from "../Lib/Structures/Client";
import Listener from "../Lib/Structures/Listener";

export default class ListenerHandler extends Collection<string, Listener> {
    client: Cluster;

    constructor(client: Cluster) {
        super();

        this.client = client;
    }

    async init() {
        const path = resolve(join(__dirname, '..', 'Listeners'));
        const start = Date.now();

        klaw(path)
            .on('data', (item) => {
                const file = parse(item.path);

                if (file.ext && file.ext === '.js') {
                    const Listener = ((r) => r.default || r)(require(resolve(join(file.dir, file.base))));
                    const listener: Listener = new Listener(this.client, file.name, resolve(join(file.dir, file.base)));

                    this.set(file.name, listener);

                    // @ts-ignore
                    this.client[listener.once ? 'once' : 'on'](listener.name, (...args: unknown[]) => listener.execute(...args));
                }
            })
            .on('end', () => {
                this.client.logger.info(`Loaded ${this.size} Events in ${Date.now() - start}ms`);
            });
    }
}