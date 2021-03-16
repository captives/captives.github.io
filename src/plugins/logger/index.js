import Logger from './logger';
import Mixin from './mixin';

export default class Debug {
    constructor(options) {
        this.logger = new Logger();
        this.logger.debug = !!options.debug || false;
    }

    /**
     * Vue.js entry point
     * @param Vue
     */
    install(Vue) {
        const version = Number(Vue.version.split('.')[0])
        if (version >= 3) {
            Vue.config.globalProperties.logger = this.logger;
        } else {
            Vue.prototype.logger = this.logger;
        }

        Vue.mixin(Mixin);

        this.logger.debug && this.logger.info('Vue-Debug plugin enabled');
    }
}