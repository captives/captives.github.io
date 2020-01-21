<template>
  <el-container>
    <el-aside width="220px">
      <el-menu
        v-if="list.length"
        :router="true"
        :default-active="selectIndex"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item
          v-for="(item, index) in list"
          :key="index"
          :index="'e' + (index + 1)"
          :route="'/e-charts' + item.to"
        >
          <i :class="item.icon"></i>
          {{item.label}}
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>
<script>
export default {
  label: "webrtc",
  data() {
    return {
      selectIndex: 'e1',
      list: [
        { to: "/index", label: "索引", icon: 'el-icon-s-flag' },
        { to: "/chart1", label: "环形图", icon: 'el-icon-s-flag' },
        { to: "/chart2", label: "柱状图", icon: 'el-icon-s-flag' },
        { to: "/chart3", label: "仪表盘", icon: 'el-icon-s-flag' },
        { to: "/chart4", label: "饼图", icon: 'el-icon-s-flag' },
        { to: "/chart5", label: "CPU/内存消耗图", icon: 'el-icon-s-flag' },
        { to: "/chart6", label: "饼状图", icon: 'el-icon-s-flag' },
        { to: "/chart7", label: "饼图/环形合成图", icon: 'el-icon-s-flag' },
        { to: "/chart8", label: "矩形树图", icon: 'el-icon-s-flag' },
        { to: "/chart9", label: "倒金字塔图", icon: 'el-icon-s-flag' },
        { to: "/chart10", label: "汽车仪表盘", icon: 'el-icon-s-flag' },
        { to: "/chart11", label: "汽车仪表盘2", icon: 'el-icon-s-flag' },
        { to: "/chart12", label: "线图和饼图", icon: 'el-icon-s-flag' },
        { to: "/chart13", label: "柱状图（数组）", icon: 'el-icon-s-flag' },
        { to: "/chart14", label: "柱状图（对象）", icon: 'el-icon-s-flag' },
        { to: "/chart15", label: "柱状图叠加", icon: 'el-icon-s-flag' },
        { to: "/chart16", label: "折线图堆叠", icon: 'el-icon-s-flag' },
        { to: "/chart18", label: "折线面积图", icon: 'el-icon-s-flag' },
        { to: "/chart17", label: "CPU消耗图", icon: 'el-icon-s-flag' },
        { to: "/airroutemap1", label: "模拟迁徙 1", icon: 'el-icon-s-flag' },
        { to: "/airroutemap2", label: "模拟迁徙 2", icon: 'el-icon-s-flag' },
      ]
    }
  },
  mounted() {
    const path = this.$route.path;
    const item = this.list.find((item, index) => path.indexOf(item.to) != -1);
    this.selectIndex = 'e' + (this.list.indexOf(item) + 1);
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
  .chart-view{
    width 1200px;
    height 720px;
  }
}
</style>