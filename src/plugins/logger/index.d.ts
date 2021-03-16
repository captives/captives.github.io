
import Logger from './logger.js';
import { Vue } from "vue/types/vue";
import { PluginFunction, PluginObject } from "vue";

declare module 'vue/types/vue' {
    interface Vue {
        Debug: SocketIOClient.Socket,
    }
}

export interface DebugOptions {
    debug?: boolean;
    path?: string;
}

export default class Debug<T> implements PluginObject<T> {
    constructor(options: DebugOptions);
    install: PluginFunction<T>
}
