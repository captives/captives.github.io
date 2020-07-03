<template>
  <el-container>
    <el-aside width="220px">
      <nav-menu class="nav-menu" :list="list"></nav-menu>
    </el-aside>

    <el-container>
      <router-view />
      <el-footer></el-footer>
    </el-container>
  </el-container>
</template>
<script>

</script>
<script>
import data, { prefix } from './../../router/notes';
export default {
  name: data.name,
  data() {
    return {
      prefix: null,
      selectIndex: "/index",
      list: []
    }
  },
  mounted() {
    this.prefix = "";
    this.list = data.children || [];
    console.log(prefix, data);
  }
}
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