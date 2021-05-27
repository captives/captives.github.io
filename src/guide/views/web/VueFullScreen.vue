<template>
    <el-main>
        <el-card>
            <div slot="header" class="video-header">
                <url-input v-model="url" :list="$videoList"></url-input>
                <el-button type="warning" @click="toggleFullScreen">全屏</el-button>
            </div>
            <FullScreen v-model="isFullScreen" class="video-container">
                <video class="videodisplay" width="100%" :src="url" controls loop> </video>
                <el-button v-if="isFullScreen" type="danger" @click="toggleFullScreen">退出全屏</el-button>
            </FullScreen>
        </el-card>
        <!-- 源码 -->
        <vue-source src="guide/views/web/FullScreen.vue" lang="html"></vue-source>
    </el-main>
</template>
<script>
import FullScreen from "@/components/FullScreen.vue";
export default {
    name: "VueFullScreen",
    components: { FullScreen },
    data() {
        return {
            url: null,
            isFullScreen: false,
        };
    },
    methods: {
        toggleFullScreen() {
            this.isFullScreen = !this.isFullScreen;
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