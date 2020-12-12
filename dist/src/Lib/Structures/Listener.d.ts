import Cluster from "../Structures/Client";
export default class Listener {
    client: Cluster;
    name: string;
    once: boolean;
    constructor(client: Cluster, name: string);
    execute(..._args: unknown[]): Promise<void>;
}
