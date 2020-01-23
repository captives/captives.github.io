<template>
  <div ref="chart" class="chart-view"></div>
</template>
<script>
import * as echarts from 'echarts/lib/echarts';
import { geoCoordWorld } from './../utils/common';
const geoCoordMap = geoCoordWorld;
import 'echarts/map/js/world.js';
// https://gallery.echartsjs.com/editor.html?c=xD0gWIpefi
// https://gallery.echartsjs.com/editor.html?c=x0cM77n_4B
export default {
  name: "WorldEconomy",
  data() {
    return {
      data: [
        [{ name: "尼日利亚", value: 9100 }, { name: "香港邦泰" }],
        [{ name: "美国洛杉矶", value: 2370 }, { name: "香港邦泰" }],
        [{ name: "香港邦泰", value: 3130 }, { name: "香港邦泰" }],
        [{ name: "美国芝加哥", value: 2350 }, { name: "香港邦泰" }],
        [{ name: "加纳库马西", value: 5120 }, { name: "香港邦泰" }],
        [{ name: "英国曼彻斯特", value: 3110 }, { name: "香港邦泰" }],
        [{ name: "德国汉堡", value: 6280 }, { name: "上海" }],
        [{ name: "哈萨克斯坦阿拉木图", value: 7255 }, { name: "上海" }],
        [{ name: "俄罗斯伊尔库茨克", value: 8125 }, { name: "上海" }],
        [{ name: "巴西", value: 3590 }, { name: "上海" }],
        [{ name: "埃及达米埃塔", value: 3590 }, { name: "上海" }],
        [{ name: "西班牙巴塞罗纳", value: 3590 }, { name: "上海" }],
        [{ name: "柬埔寨金边", value: 3590 }, { name: "上海" }],
        [{ name: "意大利米兰", value: 3590 }, { name: "上海" }],
        [{ name: "乌拉圭蒙得维的亚", value: 3590 }, { name: "上海" }],
        [{ name: "莫桑比克马普托", value: 3590 }, { name: "上海" }],
        [{ name: "阿尔及利亚阿尔及尔", value: 3590 }, { name: "上海" }],
        [{ name: "阿联酋迪拜", value: 3590 }, { name: "上海" }],
        [{ name: "匈牙利布达佩斯", value: 3590 }, { name: "上海" }],
        [{ name: "澳大利亚悉尼", value: 3590 }, { name: "上海" }],
        [{ name: "美国加州", value: 3590 }, { name: "上海" }],
        [{ name: "澳大利亚墨尔本", value: 3590 }, { name: "上海" }],
        [{ name: "墨西哥", value: 3590 }, { name: "上海" }],
        [{ name: "加拿大温哥华", value: 3590 }, {          name: "上海"
        }]
      ]
    }
  },
  methods: {
    convertData(data) {
      var res = [];
      for (var i = 0; i < data.length; i++) {
        var dataItem = data[i];
        var fromCoord = geoCoordMap[dataItem[0].name];
        var toCoord = geoCoordMap[dataItem[1].name];
        if (fromCoord && toCoord) {
          res.push([{ coord: fromCoord, value: dataItem[0].value }, { coord: toCoord }]);
        }
      }
      return res;
    }
  },
  mounted() {
    this.chart = this.$echarts.init(this.$refs.chart);
    var series = [];
    [["上海", this.data]].forEach((item, i) => {
      series.push({
        type: "lines",
        zlevel: 2,
        effect: {
          show: true,
          period: 4, //箭头指向速度，值越小速度越快
          trailLength: 0.21, //特效尾迹长度[0,1]值越大，尾迹越长重
          symbol: "arrow", //箭头图标
          symbolSize: 5 //图标大小
        },
        lineStyle: {
          //增加渐变
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1,
              [
                { offset: 0, color: '#58B3CC' },
                { offset: 1, color: '#F58158' }
              ], false),
            width: 1,
            opacity: 0.03,
            curveness: 0.1
          }
        },
        data: this.convertData(item[1])
      }, {
        type: "effectScatter",
        coordinateSystem: "geo",
        zlevel: 2,
        rippleEffect: {
          //涟漪特效
          period: 4, //动画时间，值越小速度越快
          brushType: "stroke", //波纹绘制方式 stroke, fill
          scale: 4 //波纹圆环最大限制，值越大波纹越大
        },
        label: {
          normal: {
            show: true,
            position: "right", //显示位置
            offset: [5, 0], //偏移设置
            formatter: "{b}" //圆环显示文字
          },
          emphasis: {
            show: true
          }
        },
        symbol: "circle",
        symbolSize: function (val) {
          return 4 + val[2] / 1000; //圆环大小
        },
        itemStyle: {
          normal: {
            show: false,
          }
        },
        data: item[1].map(function (dataItem) {
          return {
            name: dataItem[0].name,
            value: geoCoordMap[dataItem[0].name].concat([dataItem[0].value])
          };
        })
      }, {//被攻击点
        type: "scatter",
        coordinateSystem: "geo",
        zlevel: 2,
        rippleEffect: {
          period: 4,
          brushType: "stroke",
          scale: 4
        },
        label: {
          normal: {
            show: true,
            position: "right",
            color: "#00ffff",
            formatter: "{b}",
            textStyle: {
              color: "#0bc7f3"
            }
          },
          emphasis: {
            show: true
          }
        },
        symbol: "pin",
        symbolSize: 30,
        itemStyle: {
          normal: {
            show: true,
            color: "#9966cc"
          }
        },
        data: [{
          name: item[0],
          value: geoCoordMap[item[0]].concat([100])
        }]
      });
    });

    let option = {
      backgroundColor: '#000',
      title: {
        text: '全球数字货币交易',
        left: 'center',
        textStyle: {
          color: '#fff'
        }
      },
      tooltip: {
        trigger: "item",
        backgroundColor: "#1540a1",
        borderColor: "#FFFFCC",
        showDelay: 0,
        hideDelay: 0,
        enterable: true,
        transitionDuration: 0,
        extraCssText: "z-index:100",
        formatter: function (params, ticket, callback) {
          //根据业务自己拓展要显示的内容
          var name = params.name;
          var value = params.value[params.seriesIndex + 1];
          return "<span style='color:#fff;'>" + name + "</span><br/>数据：" + value;
        }
      },
      visualMap: {
        //图例值控制
        min: 0,
        max: 10000,
        show: false,
        calculable: true,
        color: ["#0bc7f3"],
        textStyle: {
          color: "#fff"
        },
      },
      geo: {
        map: "world",
        label: {
          emphasis: {
            show: false
          }
        },
        roam: true, //是否允许缩放
        layoutCenter: ["50%", "50%"], //地图位置
        layoutSize: "180%",
        itemStyle: {
          normal: {
            areaColor: '#323c48',
            borderColor: '#8F98A6'
          },
          emphasis: {
            areaColor: '#2a333d'
          }
        }
      },

      series: series
    };

    this.chart.setOption(option);
    window.onresize = this.chart.resize;
  },
}
</script>
<style lang="stylus" scoped>
.chart-view {
  width: 100%;
  height: 100%;
  background: red;
}
</style>