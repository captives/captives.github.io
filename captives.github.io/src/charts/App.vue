<template>
<body>
  <el-container>
    <el-header>
      <el-link href="https://www.chartjs.org/">chartjs</el-link> |
      <el-link href="https://www.echartsjs.com/">echartsjs</el-link>
    </el-header>
    <el-main>
      <el-tabs v-model="tabSelect">
        <el-tab-pane label="chart1" name="chart1"><Chart1 class="chart" /></el-tab-pane>
        <el-tab-pane label="chart2" name="chart2"><Chart2 class="chart" /></el-tab-pane>
        <el-tab-pane label="chart3" name="chart3"><Chart3 class="chart" /></el-tab-pane>
        <el-tab-pane label="chart4" name="chart4"><Chart4 class="chart" /></el-tab-pane>
        <el-tab-pane label="chart5" name="chart5"><Chart5 class="chart" /></el-tab-pane>
        <el-tab-pane label="chart6" name="chart6"><Chart6 class="chart" /></el-tab-pane>
        <el-tab-pane label="chart7" name="chart7"><Chart7 class="chart" /></el-tab-pane>
        <el-tab-pane label="chart8" name="chart8"><Chart8 class="chart" /></el-tab-pane>
        <el-tab-pane label="chart9" name="chart9"><Chart9 class="chart" /></el-tab-pane>
        <el-tab-pane label="chart10" name="chart10"><Chart10 class="chart" /></el-tab-pane>
        <el-tab-pane label="chart11" name="chart11"><Chart11 class="chart" /></el-tab-pane>
        <el-tab-pane label="chart12" name="chart12"><Chart12 class="chart" /></el-tab-pane>
        <el-tab-pane label="chart13" name="chart13"><Chart13 class="chart" /></el-tab-pane>
        <el-tab-pane label="chart14" name="chart14"><Chart14 class="chart" /></el-tab-pane>
        <el-tab-pane label="chart15" name="chart15"><Chart15 class="chart" /></el-tab-pane>
        <el-tab-pane label="chart16" name="chart16"><Chart16 class="chart" /></el-tab-pane>
        <el-tab-pane label="chart17" name="chart17"><Chart17 class="chart" /></el-tab-pane>
        <el-tab-pane label="chart18" name="chart18"><Chart18 class="chart" /></el-tab-pane>
      </el-tabs>
    </el-main>
    <el-footer></el-footer>
  </el-container>
</body>
</template>
<script>
import Chart1 from './components/Chart1.vue';
import Chart2 from './components/Chart2.vue';
import Chart3 from './components/Chart3.vue';
import Chart4 from './components/Chart4.vue';
import Chart5 from './components/Chart5.vue';
import Chart6 from './components/Chart6.vue';
import Chart7 from './components/Chart7.vue';
import Chart8 from './components/Chart8.vue';
import Chart9 from './components/Chart9.vue';
import Chart10 from './components/Chart10.vue';
import Chart11 from './components/Chart11.vue';
import Chart12 from './components/Chart12.vue';
import Chart13 from './components/Chart13.vue';
import Chart14 from './components/Chart14.vue';
import Chart15 from './components/Chart15.vue';
import Chart16 from './components/Chart16.vue';
import Chart18 from './components/Chart18.vue';
import Chart17 from './components/Chart17.vue';
export default {
  name: "App",
  components: {
    Chart1,
    Chart2,
    Chart3,
    Chart4,
    Chart5,
    Chart6,
    Chart7,
    Chart8,
    Chart9,
    Chart10,
    Chart11,
    Chart12,
    Chart13,
    Chart14,
    Chart15,
    Chart16,
    Chart18,
    Chart17,
  },
  data() {
    return {
      tabSelect:'chart1'
    }
  },
}
</script>
<style lang="stylus" scoped>
.chart {
  width: 720px;
  height: 480px;
}
</style>