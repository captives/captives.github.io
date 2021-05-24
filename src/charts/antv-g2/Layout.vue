<template>
    <el-container>
        <el-aside width="220px" class="hidden-sm-and-down">
            <nav-bar :list="list" class="nav" @change="navChangeHandler"> </nav-bar>
        </el-aside>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>
<script>
import router from "./../router/antv-g2";
import NavBar from "@/components/NavBar";
export default {
    label: "Layout",
    components: {
        NavBar,
    },
    data() {
        return {
            list: [],
        };
    },
    created() {
        this.list = router.children;
    },
    methods: {
        navChangeHandler(path, list) {
            this.$router.push({ path });
        },
    },
};
</script>
<style lang="stylus" scoped>
.el-container {
    height: calc(100% - 60px);

    .el-aside {
        height: 100%;
        overflow: auto;

        .el-menu {
            height: 100%;
        }
    }

    .chart-view {
        width: 100%;
        height: 100%;
    }
}
</style>
