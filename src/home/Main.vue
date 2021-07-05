<template>
    <el-container>
        <el-header class="center">
            <el-row class="nav">
                <router-link to="/" v-if="$route.path != '/'">首页</router-link>
                <a href="/live.html">会议室</a>
                <a href="/guide.html">指南</a>
                <a href="/charts.html">图表</a>
                <router-link :to="{ path:'/iframe', query: { url: blogURI } }">文章</router-link>
                <router-link :to="{ path:'/iframe', query: { url:'/static/sprite/index.html' }}">雪碧图</router-link>
                <router-link to="/favorite">收藏夹</router-link>
                <router-link to="/tools">...</router-link>
            </el-row>
        </el-header>
        <router-view />
        <vue-debugger class="debug-btn" v-if="isDebug"></vue-debugger>
        <vue-tts value="Hello"></vue-tts>
    </el-container>
</template>
<script>
export default {
    name: "Main",
    data() {
        return {};
    },
    computed: {
        isDebug() {
            return location.host.indexOf("local") != -1;
        },
        blogURI() {
            return (this.isDebug ? window.location.origin.replace(window.location.port, window.location.protocol === "http" ? 2010 : 2020) : "") + "/article.html";
        },
    },
    beforeCreate() {
        console.log(this.$route);
        this.$router.afterEach(() => {
            document.title = this.$route.name;
        });
    },
    mounted() {
        // Logger.log(" file source = ", this.$options.__source);
    },
};
</script>
<style lang="stylus" scoped>
.el-header {
    .nav {
        justify-content: center;
    }

    a {
        display: inline-block;
        white-space: nowrap;
        padding: 0 10px;
        margin: 0 10px;
        line-height: 60px;
        text-decoration: none;
    }
}

.el-container {
    height: 100%;
}

.debug-btn {
    position: fixed;
    right: 10px;
    top: 10px;
}
</style>
