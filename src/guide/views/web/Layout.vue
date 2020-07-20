<template>
  <el-container>
    <el-aside width="220px">
      <nav-menu class="nav-menu" :list="router.children"></nav-menu>
    </el-aside>

    <el-container>
      <keep-alive>
        <router-view />
      </keep-alive>
    </el-container>
  </el-container>
</template>
<script>
import router from './../../router/web';
export default {
  name: router.name,
  data() {
    return {
      router
    }
  }
}
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