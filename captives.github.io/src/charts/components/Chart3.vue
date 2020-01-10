<template>
  <div ref="chart"></div>
</template>

<script>
export default {
  name: "Chart3",
  mounted() {
    const chart = this.$echarts.init(this.$refs.chart);
    // 指定图表的配置项和数据
    var option = {
      tooltip: {
        formatter: "{a} <br/>{b} : {c}%"
      },
      toolbox: {
        feature: {
          restore: {},
          saveAsImage: {}
        }
      },
      series: [{
        name: '业务指标',
        type: 'gauge',
        detail: { formatter: '{value}%' },
        data: [{ value: 50, name: '完成率' }]
      }]
    };

    setInterval(function () {
      option.series[0].data[0].value = (Math.random() * 100).toFixed(2) - 0;
      chart.setOption(option, true);
    }, 1000);
    chart.setOption(option);
  }
}
</script>