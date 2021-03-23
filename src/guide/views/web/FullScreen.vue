<template>
    <el-main>
        <el-card>
            <div slot="header" class="video-header">
                <url-input v-model="url" :list="$videoList"></url-input>
                <el-button type="warning" @click="toggleFullScreen">全屏</el-button>
            </div>
            <div ref="video-container" class="video-container">
                <video class="videodisplay" width="100%" :src="url" controls loop> </video>
                <el-button v-if="isFullScreen" type="danger" @click="toggleFullScreen">退出全屏</el-button>
            </div>
        </el-card>
        <!-- 源码 -->
        <vue-source src="guide/views/web/FullScreen.vue" lang="html"></vue-source>
    </el-main>
</template>
<script>
export default {
    name: "FullScreen",
    data() {
        return {
            url: null,
            isFullScreen: false,
        };
    },
    created() {
        document.addEventListener("fullscreenchange", (event) => {
            this.isFullScreen = !!(document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen || document.msFullscreenElement);
        });
    },
    methods: {
        toggleFullScreen() {
            const element = this.$refs["video-container"];
            if (this.isFullScreen) {
                this.exitFullScreen();
            } else {
                this.enterFullScreen(element);
            }
            this.isFullScreen = !!(document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen || document.msFullscreenElement);
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
    },
};
</script>
<style lang="stylus" scoped>
.video-header {
    display: flex;

    .el-button {
        margin-left: 10px;
    }
}

.video-container {
    height: 100%;

    .el-button {
        position: absolute;
        right: 20px;
        top: 20px;
    }
}
</style>