import Logger from './logger';

export default {
    /**
     *  Assign runtime callbacks
     */
    beforeCreate() {
        // const logger = new Logger();
        this.logger.prefix = this.$options.name;
        // this.logger = logger;
    },

    /**
     * Register all events
     */
    mounted() {
        this.logger.prefix = this.$options.name;
    },
    /**
     * unsubscribe when component unmounting
     */
    beforeDestroy() {
        this.logger.prefix = this.$options.name;
    }
}