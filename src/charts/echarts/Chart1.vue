<template>
  <div ref="chart" class="chart-view"></div>
</template>

<script>
export default {
  name: "Chart1",
  data() {
    return {
      index: 0,
    };
  },
  mounted() {
    const that = this;
    const chart = this.$echarts.init(this.$refs.chart);
    // 指定图表的配置项和数据
    var option = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)",
      },
      legend: {
        orient: "vertical",
        padding: [5, 10],
        itemGap: 30,
        itemWidth: 15,
        itemHeight: 15,
        right: 40,
        top: 20,
        bottom: 20,
        data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: ["50%", "80%"],
          avoidLabelOverlap: false,
          // hoverAnimation:false,
          hoverOffset: 5,
          label: {
            normal: {
              show: false,
              fontSize: "25",
              // 设置标签显示内容 ，默认显示{b}
              // {a}指series.name
              // {b}指series.data的name
              // {c}指series.data的value
              // {d}%指这一部分占总数的百分比
              formatter: function (item) {
                return (
                  "{d|" +
                  Math.round(item.percent) +
                  "%} \n {b|" +
                  item.name +
                  "}"
                );
              },
              position: "center",
              rich: {
                b: {
                  fontSize: 18,
                },
                d: {
                  fontSize: "35",
                  color: "#30c792",
                  height: 60,
                },
              },
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "30",
                formatter: "{c}台",
              },
            },
          },

          grid: {
            height: "65%",
          },
          data: [
            { value: 335, name: "直接访问" },
            { value: 310, name: "邮件营销" },
            { value: 234, name: "联盟广告" },
            { value: 135, name: "视频广告" },
            { value: 1548, name: "搜索引擎" },
          ],
        },
      ],
    };

    setInterval(() => {
      option.series[0].data.map((item) => {
        item.value = Math.floor(Math.random() * 1000);
      });

      chart.setOption(option);
    }, 20000);
    chart.setOption(option);
    window.onresize = chart.resize;

    setInterval(() => {
      chart.dispatchAction({
        type: "downplay",
        seriesIndex: 0,
        dataIndex: that.index,
      });

      that.index++;
      that.index = that.index >= option.series[0].data.length ? 0 : that.index;
      chart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: that.index,
      });
      chart.dispatchAction({
        type: "showTip",
        seriesIndex: 0,
        dataIndex: that.index,
      });
    }, 3000);

    // //设置默认选中高亮部分
    chart.dispatchAction({ type: "highlight", seriesIndex: 0, dataIndex: 0 });
    // // 当鼠标移入时，如果不是第一项，则把当前项置为选中，如果是第一项，则设置第一项为当前项
    chart.on("mouseover", function (e) {
      chart.dispatchAction({ type: "downplay", seriesIndex: 0 });
      // if (e.dataIndex == that.index) {
      // } else {
      //   chart.dispatchAction({ type: 'downplay', seriesIndex: 0, dataIndex: that.index });
      // }

      // if (e.dataIndex == 0) {
      chart.dispatchAction({
        type: "highlight",
        seriesIndex: 0,
        dataIndex: e.dataIndex,
      });
      // }
    });

    // //当鼠标离开时，把当前项置为选中
    chart.on("mouseout", function (e) {
      that.index = e.dataIndex;
      //   // chart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: e.dataIndex });
      //   chart.dispatchAction({ type: 'highlight', seriesIndex: 0, dataIndex: that.index });
    });
  },
};
</script>
