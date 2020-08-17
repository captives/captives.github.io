<template>
  <el-container>
    <el-aside width="220px">
      <vue-menu :list="list"></vue-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
<script>
import router from './../router/echarts';
import NavMenu from '@/components/NavMenu';
export default {
  label: "ECharts",
  components: {
    NavMenu
  },
  data() {
    return {
      list: []
    }
  },
  created() {
    this.list = router.children;
  }
}
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