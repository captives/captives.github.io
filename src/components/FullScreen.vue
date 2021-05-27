<template>
    <div ref="container" :class="{'container':true, 'fullscreen' : value}">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: "JrFullScreen",
    props: {
        value: {
            type: Boolean,
            default: false,
        },
    },
    watch: {
        value(full) {
            this.fullscreen = full;
            const element = this.$refs["container"];
            full ? this.enterFullScreen(element) : this.exitFullScreen();
        },
    },
    methods: {
        isFullScreen() {
            return !!(document.fullscreen || document.mozFullScreen || document.webkitIsFullScreen || document.webkitFullScreen || document.msFullScreen);
        },
        isFullscreenEnabled() {
            return document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled;
        },
        toggleFullScreen() {
            const element = this.$refs["container"];
            if (this.value) {
                this.exitFullScreen();
            } else {
                this.enterFullScreen(element);
            }

            this.$emit("input", this.isFullScreen());
        },
        enterFullScreen(element) {
            if (element.requestFullscreen) {
                //W3C
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                //FireFox
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullScreen) {
                //Chrome等
                element.webkitRequestFullScreen();
            } else if (element.msRequestFullscreen) {
                //IE11
                element.msRequestFullscreen();
            }
        },
        exitFullScreen() {
            if (!this.isFullScreen()) {
                return;
            }

            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        },
        getFullscreenElement() {
            return document.fullscreenElement || document.mozFullScreenElement || document.msFullScreenElement || document.webkitFullscreenElement || null;
        },
    },
    created() {
        document.addEventListener("fullscreenchange", (event) => {
            this.$emit("input", this.isFullScreen());
            this.$emit("change", this.isFullScreen());
        });
    },
};
</script>
<style lang="stylus" scoped>
.container {
    position: relative;
    border: 1px solid orange;
    box-sizing: content-box;
}
</style>