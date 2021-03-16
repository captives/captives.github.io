<template>
    <el-container>
        <el-header class="center">
            <el-row class="nav">
                <router-link to="/">首页</router-link>
                <a href="/live.html">会议室</a>
                <a href="/guide.html">指南</a>
                <a href="/charts.html">图表</a>
                <router-link to="/tools">工具</router-link>
                <router-link :to="{ path:'/iframe', query:{ url:'/static/sprite/index.html' }}">雪碧图</router-link>
                <router-link to="/favorite">收藏夹</router-link>
            </el-row>
        </el-header>

        <el-container>
            <router-view />
        </el-container>
        <!-- <el-footer>Footer</el-footer> -->
        <vue-debugger class="debug-btn"></vue-debugger>
    </el-container>
</template>
<script>
export default {
    name: "Main",
    data() {
        return {};
    },
    beforeCreate() {
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

.debug-btn {
    position: fixed;
    right: 10px;
    top: 10px;
}
</style>
