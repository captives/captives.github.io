<template>
  <el-container>
    <el-aside width="220px">
      <nav-menu :list="list" prefix="/e-charts"></nav-menu>
    </el-aside>

    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
<script>
import NavMenu from '@/components/NavMenu';
export default {
  label: "ECharts",
  components: {
    NavMenu
  },
  data() {
    return {
      list: [
        { path: "/index", name: "索引", icon: 'el-icon-s-flag' },
        { path: "/chart1", name: "环形图", icon: 'el-icon-s-flag' },
        { path: "/chart2", name: "柱状图", icon: 'el-icon-s-flag' },
        { path: "/chart3", name: "仪表盘", icon: 'el-icon-s-flag' },
        { path: "/chart4", name: "饼图", icon: 'el-icon-s-flag' },
        { path: "/chart5", name: "CPU/内存消耗图", icon: 'el-icon-s-flag' },
        { path: "/chart6", name: "饼状图", icon: 'el-icon-s-flag' },
        { path: "/chart7", name: "饼图/环形合成图", icon: 'el-icon-s-flag' },
        { path: "/chart8", name: "矩形树图", icon: 'el-icon-s-flag' },
        { path: "/chart9", name: "倒金字塔图", icon: 'el-icon-s-flag' },
        { path: "/chart10", name: "汽车仪表盘", icon: 'el-icon-s-flag' },
        { path: "/chart11", name: "汽车仪表盘2", icon: 'el-icon-s-flag' },
        { path: "/chart12", name: "线图和饼图", icon: 'el-icon-s-flag' },
        { path: "/chart13", name: "柱状图（数组）", icon: 'el-icon-s-flag' },
        { path: "/chart14", name: "柱状图（对象）", icon: 'el-icon-s-flag' },
        { path: "/chart15", name: "柱状图叠加", icon: 'el-icon-s-flag' },
        { path: "/chart16", name: "折线图堆叠", icon: 'el-icon-s-flag' },
        { path: "/chart18", name: "折线面积图", icon: 'el-icon-s-flag' },
        { path: "/chart17", name: "CPU消耗图", icon: 'el-icon-s-flag' },
        { path: "/airroutemap1", name: "模拟迁徙 1", icon: 'el-icon-s-flag' },
        { path: "/airroutemap2", name: "模拟迁徙 2", icon: 'el-icon-s-flag' },
        { path: "/world-economy", name: "世界经济", icon: 'el-icon-s-flag' },
        { path: "/world-money", name: "全球数字货币交易", icon: 'el-icon-s-flag' },
      ]
    }
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