<template>
    <el-container>
        <el-aside width="220px" class="hidden-sm-and-down">
            <vue-nav-bar class="nav-menu" :list="router.children"></vue-nav-bar>
        </el-aside>

        <el-container>
            <router-view />
            <el-footer>Footer</el-footer>
        </el-container>
    </el-container>
</template>
<script></script>
<script>
import router from "./../../router/openvidu";
export default {
    name: router.name,
    data() {
        return {
            router,
        };
    },
};
</script>
<style lang="stylus" scoped>
.el-aside {
    .el-menu {
        height: 100%;
    }
}
</style>

<style lang="stylus">
.el-tag.error {
    margin-top: 50px;
}
</style>
