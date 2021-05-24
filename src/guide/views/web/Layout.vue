<template>
    <keep-alive>
        <router-view />
    </keep-alive>
</template>
<script>
import router from "./../../router/web";
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

.el-container {
    .el-breadcrumb {
        margin-left: 20px;
        line-height: 45px;
    }
}
</style>
