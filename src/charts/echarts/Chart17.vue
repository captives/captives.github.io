<template>
  <div ref="chart" class="chart-view"></div>
</template>

<script>
export default {
  name: "Chart2",
  mounted() {
    const chart = this.$echarts.init(this.$refs.chart);
    var option = {
      legend: {
        data: ["吃饭", "睡觉", "打豆豆"],
        icon: "rect",
        top: 22,
        right: 24,
        itemGap: 15,
        itemWidth: 10,
        itemHeight: 10,
        textStyle: {
          color: "#fff",
        },
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "cross",
          label: {
            backgroundColor: "#6a7985",
          },
        },
      },
      color: ["#289df5", "#fbc01b", "#ff5050"],
      grid: {
        left: 24,
        right: "0",
        bottom: "30",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        axisLine: {
          lineStyle: {
            color: "#0a2b52",
            width: 0.5, //这里是为了突出显示加上的
          },
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: "#6ba1bb",
            fontSize: 12,
          },
          formatter: function (value) {
            //debugger
            var ret = ""; //拼接加\n返回的类目项
            var maxLength = 5; //每项显示文字个数
            var valLength = value.length; //X轴类目项的文字个数
            var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数
            if (rowN > 1) {
              //如果类目项的文字大于3,
              for (var i = 0; i < rowN; i++) {
                var temp = ""; //每次截取的字符串
                var start = i * maxLength; //开始截取的位置
                var end = start + maxLength; //结束截取的位置
                //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧
                temp = value.substring(start, end) + "\n";
                ret += temp; //凭借最终的字符串
              }
              return ret;
            } else {
              return value;
            }
          },
        },
        name: "(月)",
        nameTextStyle: {
          padding: [24, 0, 0, 0],
          color: "#00c5d7",
        },
        nameGap: 0,
        data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
      },
      yAxis: {
        type: "value",
        axisLine: {
          show: false,
        },
        axisTick: {
          length: 0, // 刻度线的长度
        },
        splitLine: {
          lineStyle: {
            color: ["#051d5f"],
            width: 1,
            type: "solid",
          },
        },
        axisLabel: {
          textStyle: {
            color: "#a3a4b2",
          },
        },
      },
      series: [
        {
          name: "吃饭",
          type: "line",
          smooth: true,
          symbol: "circle", // 拐点类型
          stack: 100,
          symbolSize: 3, // 拐点圆的大小
          itemStyle: {
            normal: {
              color: "#289df5", // 折线条的颜色
              borderColor: "#289df5", // 拐点边框颜色
              areaStyle: {
                type: "default",
                opacity: 0.1,
              },
              opacity: 0.55,
            },
            emphasis: {
              areaStyle: {
                type: "default",
                opacity: 0.5,
              },
              opacity: 1,
            },
          },
          data: [310, 212, 221, 154, 260, 430, 310, 110, 120, 210, 124, 60],
        },
        {
          name: "睡觉",
          type: "line",
          smooth: true,
          symbol: "circle",
          stack: 100,
          symbolSize: 3,
          itemStyle: {
            normal: {
              color: "#fbc01b",
              borderColor: "#fbc01b",
              areaStyle: {
                type: "default",
                opacity: 0.1,
              },
            },
          },
          data: [151, 282, 151, 120, 120, 80, 130, 182, 234, 191, 90, 30],
        },
        {
          name: "打豆豆",
          type: "line",
          smooth: true,
          symbol: "circle",
          stack: 100,
          symbolSize: 3,
          itemStyle: {
            normal: {
              color: "#ff5050",
              borderColor: "#ff5050",
              areaStyle: {
                type: "default",
                opacity: 0.1,
              },
            },
          },
          data: [120, 132, 70, 34, 60, 59, 140, 210, 124, 112, 23, 20],
        },
      ],
    };
    chart.setOption(option);
    window.onresize = chart.resize;

    setInterval(() => {
      option.series.forEach((item, index) => {
        item.data.push(Math.floor(Math.random() * 1000));
        if (item.data.length > 12) {
          item.data.shift();
        }
      });

      chart.setOption(option);
    }, 30000);

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
