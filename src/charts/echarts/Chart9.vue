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
        text: '漏斗图',
        subtext: '纯属虚构'
      },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}%"
      },
      toolbox: {
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {}
        }
      },
      legend: {
        data: ['展现', '点击', '访问', '咨询', '订单']
      },
      calculable: true,
      series: [{
        name: '漏斗图',
        type: 'funnel',
        left: '10%',
        top: 60,
        //x2: 80,
        bottom: 60,
        width: '80%',
        // height: {totalHeight} - y - y2,
        min: 0,
        max: 100,
        minSize: '0%',
        maxSize: '100%',
        sort: 'descending',
        gap: 2,
        label: {
          show: true,
          position: 'inside'
        },
        labelLine: {
          length: 10,
          lineStyle: {
            width: 1,
            type: 'solid'
          }
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1
        },
        emphasis: {
          label: {
            fontSize: 20
          }
        },
        data: [
          { value: 60, name: '访问' },
          { value: 40, name: '咨询' },
          { value: 20, name: '订单' },
          { value: 80, name: '点击' },
          { value: 100, name: '展现' }
        ]
      }
      ]
    };


    setInterval(() => {
      option.series[0].data.map(item => {
        item.value = Math.floor(Math.random() * 150);
      });

      chart.setOption(option);
    }, 5000);

    chart.setOption(option);
    window.onresize = chart.resize;
  }
}
</script>