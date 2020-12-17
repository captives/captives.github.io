<template>
  <el-container>
    <el-aside width="220px">
      <vue-menu class="nav-menu" :list="router.children"></vue-menu>
    </el-aside>

    <el-container>
      <router-view />
    </el-container>
  </el-container>
</template>
<script>
import router from "./../../router/webrtc";
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
