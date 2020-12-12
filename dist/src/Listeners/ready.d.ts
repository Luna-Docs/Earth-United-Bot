import Listener from "../Lib/Structures/Listener";
export default class Ready extends Listener {
    once: boolean;
    execute(): Promise<void>;
}
