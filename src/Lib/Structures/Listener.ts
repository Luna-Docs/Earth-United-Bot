import Cluster from "../Structures/Client";

export default class Listener {
    client: Cluster;
    name: string;
    once = false;

    constructor(client: Cluster, name: string) {
        this.client = client;
        this.name = name;
    }

    execute(..._args: unknown[]) {
        throw console.log(`${this.name} doesn't do anything!`);
    }
}