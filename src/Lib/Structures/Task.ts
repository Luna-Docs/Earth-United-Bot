import Cluster from "./Client";
import {TaskOptions} from "../Types/EUB";

export default class Task {
    client: Cluster;
    id: number;
    type: string;
    end: number;
    data: unknown;

    constructor(client: Cluster, options: TaskOptions) {
        this.client = client;
        this.id = options.id;
        this.type = options.type;
        this.end = options.end;
        this.data = options.data;
    }

    execute(_data?: unknown): Promise<void> {
        throw new Error('Unsupported operation.');
    }
}