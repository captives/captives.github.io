<template>
  <el-container>
    <el-aside width="220px">
      <vue-menu class="nav-menu" :list="list"></vue-menu>
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
import NavMenu from "./../../components/NavMenu";
import router from "./../router/tools";
export default {
  name: "Layout",
  components: { NavMenu },
  data() {
    return {
      list: router.children,
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
