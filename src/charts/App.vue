<template>
  <el-container id="app" class="fill">
    <el-header>
      <NavMenu :list="list" mode="horizontal" class="nav"></NavMenu>
    </el-header>
    <router-view></router-view>
  </el-container>
</template>
<script>
import NavMenu from '@/components/NavMenu';
export default {
  name: "App",
  components: {
    NavMenu
  },
  data() {
    return {
      list: [
        { name: "Home", path: "/index.html" },
        { name: "目录", path: "/" },
        { name: "E-Charts", path: "/e-charts" },
        { name: "About", path: "/about" },
      ]
    }
  },
}
</script>
<style lang="stylus" scoped>
.el-header {
  text-align: center;
  padding: 0;
}

.chart {
  width: 1800px;
  height: 720px;
  display: inline-block;
}
</style>