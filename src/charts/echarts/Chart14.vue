<template>
  <div ref="chart" class="chart-view"></div>
</template>

<script>
export default {
  name: "Chart2",
  mounted() {
    const chart = this.$echarts.init(this.$refs.chart);
    // 指定图表的配置项和数据
    var option = {
      title: {
        text: "数据集来自对象",
        subtext: "纯属虚构",
      },
      legend: {},
      tooltip: {},
      dataset: {
        dimensions: ["product", "2015", "2016", "2017"],
        source: [
          { product: "Matcha Latte", 2015: 43.3, 2016: 85.8, 2017: 93.7 },
          { product: "Milk Tea", 2015: 83.1, 2016: 73.4, 2017: 55.1 },
          { product: "Cheese Cocoa", 2015: 86.4, 2016: 65.2, 2017: 82.5 },
          { product: "Walnut Brownie", 2015: 72.4, 2016: 53.9, 2017: 39.1 },
        ],
      },
      xAxis: { type: "category" },
      yAxis: {},
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
    };

    chart.setOption(option);
    window.onresize = chart.resize;
  },
};
</script>
