import Cluster from "./Client";
import { TaskOptions } from "../Types/EUB";
export default class Task {
    client: Cluster;
    id: number;
    type: string;
    end: number;
    data: unknown;
    constructor(client: Cluster, options: TaskOptions);
    execute(_data?: unknown): Promise<void>;
}
