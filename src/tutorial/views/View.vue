<template>
    <el-container>
        <el-aside width="414px">
            <iframe ref="iframe" :src="url" frameborder="0"></iframe>
        </el-aside>
        <el-main>
            <el-button type="primary" size="mini" @click="refreshHandler">刷新</el-button>
        </el-main>
    </el-container>
</template>
<script lang='ts'>
import { Component, Ref, Vue } from 'vue-property-decorator'
@Component({ name: 'View' })
export default class View extends Vue {
    @Ref() private iframe: HTMLIFrameElement;
    private url: string = "";

    created() {
        this.$router.onReady(() => {
            const query: any = this.$route.query;
            this.url = query.url || '/travel.html';
        });
    }

    private refreshHandler() {
        this.iframe.src = this.url + "?v=" + Date.now();
    }
}
</script>
<style lang='stylus' scoped>
.el-aside {
    margin-left: 100px;
    width: 414px;
    height: 736px;
    border: 2px dotted blue;
    box-sizing: border-box;

    iframe {
        width: 100%;
        height: 100%;
    }
}
</style>