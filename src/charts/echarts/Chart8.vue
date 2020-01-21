<template>
  <div ref="chart" class="chart-view"></div>
</template>

<script>
export default {
  name: "Chart8",
  mounted() {
    const chart = this.$echarts.init(this.$refs.chart);
    // 指定图表的配置项和数据
    var option = {
      title: {
        text: '矩形树图',
        subtext: '虚构数据',
        left: 'center'
      },
      series: [{
        type: 'treemap',
        data: [{
          name: 'nodeA',            // First tree
          value: 10,
          children: [{
            name: 'nodeAa',       // First leaf of first tree
            value: 4
          }, {
            name: 'nodeAb',       // Second leaf of first tree
            value: 6
          }]
        }, {
          name: 'nodeB',            // Second tree
          value: 20,
          children: [{
            name: 'nodeBa',       // Son of first tree
            value: 20,
            children: [{
              name: 'nodeBa1',  // Granson of first tree
              value: 20
            }]
          }]
        }]
      }]
    };

    chart.setOption(option);
  }
}
</script>