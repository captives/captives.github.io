<template>
    <router-view />
</template>
<script>
import router from "./../../router/canvas";
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
    .nav-menu {
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
