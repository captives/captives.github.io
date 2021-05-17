<template>
    <el-container>
        <el-aside width="220px">
            <nav-bar :list="list" class="nav" @change="navChangeHandler"> </nav-bar>
        </el-aside>
        <el-main>
            <keep-alive>
                <router-view />
            </keep-alive>
        </el-main>
    </el-container>
</template>
<script></script>
<script>
import router from "./../router/tools";
import NavBar from "@/components/NavBar";
export default {
    name: "Layout",
    components: {
        NavBar,
    },
    data() {
        return {
            list: router.children,
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
.el-aside {
    .el-menu {
        height: 100%;
    }
}

.el-container {
    .el-breadcrumb {
        margin-left: 20px;
        line-height: 45px;
    }
}
</style>
