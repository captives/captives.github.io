<template>
    <el-container id="app" class="fill">
        <el-header style="text-align:center">
            <nav-bar :list="routes" mode="horizontal" text-color="#fff" active-text-color="#ffd04b" background-color="#545c64" class="nav" @change="navChangeHandler"> </nav-bar>
        </el-header>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </el-container>
</template>
<script>
import NavBar from "@/components/NavBar";

export default {
    name: "App",
    components: {
        NavBar,
    },
    data() {
        return {
            routes: this.$router.options.routes,
        };
    },
    methods: {
        navChangeHandler(path, list) {
            this.$router.push({ path });
        },
    },
};
</script>
<style lang="stylus" scoped>
.el-header {
    text-align: center;
    padding: 0;
}

.fill {
    position: absolute;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    left: 0;
    top: 0;
}

.chart {
    width: 1800px;
    height: 720px;
    display: inline-block;
}
</style>
