export interface ListenerData {
    name: string;
    info: CustomData;
    once: boolean;
}

export interface CustomData {
    usedBy: string;
    executes: string;
}