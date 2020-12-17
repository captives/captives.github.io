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
      color: [
        {
          type: "linear",
          x: 0,
          y: 0,
          x1: 0,
          y1: 1,
          colorStops: [
            {
              offset: 0,
              color: "#01e3ae", // 0% 处的颜色
            },
            {
              offset: 1,
              color: "#00a1e9", // 100% 处的颜色
            },
          ],
          globalCoord: false, // 缺省为 false
        },
      ],
      tooltip: {
        trigger: "item",
        formatter: "{b} : {c}",
      },
      backgroundColor: "#04225e",
      xAxis: {
        type: "value",
        axisLine: {
          lineStyle: {
            color: "#06358f",
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: "#00c0ff",
        },
      },
      yAxis: {
        type: "category",
        data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      series: [
        {
          data: [120, 200, 150, 80, 70, 110, 130],
          type: "bar",
          barWidth: 30,
          itemStyle: {
            normal: {
              opacity: 0.65,
            },
            emphasis: {
              opacity: 1,
            },
          },
        },
      ],
    };

    setInterval(() => {
      option.series[0].data = [];
      option.yAxis.data.map((item, index) => {
        option.series[0].data.push(Math.floor(Math.random() * 500));
      });

      chart.setOption(option);
    }, 30000);
    chart.setOption(option);
    window.onresize = chart.resize;

    setInterval(() => {
      const index = Math.floor(Math.random() * option.series[0].data.length);
      chart.dispatchAction({ type: "downplay", seriesIndex: 0 });
      chart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: index,
      });
      chart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: index,
      });
    }, 5000);
  },
};
</script>
