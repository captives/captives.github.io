<template>
    <div ref="chart" class="chart-view"></div>
</template>
<script>
import { geoCoordMap } from "./../utils/common";
import "./../utils/world.js";
//https://gallery.echartsjs.com/editor.html?c=xSyKKAw97l
export default {
    name: "WorldEconomy",
    data() {
        return {
            data: [
                {
                    time: 1970,
                    data: [
                        {
                            name: "United States of America",
                            value: [1025000, 31.222, "美国"],
                        },
                        { name: "Russia", value: [433412, 13.202, "俄国"] },
                        { name: "Japan", value: [209071, 6.369, "日本"] },
                        { name: "Germany", value: [208867, 6.362, "德国"] },
                        { name: "France", value: [146982, 4.477, "法国"] },
                        { name: "United Kingdom", value: [124970, 3.807, "英国"] },
                        { name: "Italy", value: [109260, 3.328, "意大利"] },
                        { name: "China", value: [91506, 2.787, "中国"] },
                        { name: "Canada", value: [86303, 2.629, "加拿大"] },
                        { name: "India", value: [61470, 1.873, "印度"] },
                    ],
                },
                {
                    time: 1980,
                    data: [
                        {
                            name: "United States of America",
                            value: [2768900, 23.337, "美国"],
                        },
                        { name: "Japan", value: [1086988, 9.027, "日本"] },
                        { name: "Russia", value: [940038, 7.923, "俄国"] },
                        { name: "Germany", value: [919651, 6.253, "德国"] },
                        { name: "France", value: [691157, 5.825, "法国"] },
                        { name: "United Kingdom", value: [541917, 4.567, "英国"] },
                        { name: "Italy", value: [459811, 3.875, "意大利"] },
                        { name: "China", value: [306520, 2.583, "中国"] },
                        { name: "Canada", value: [268889, 2.266, "加拿大"] },
                        { name: "Mexico", value: [227664, 1.919, "墨西哥"] },
                    ],
                },
                {
                    time: 1990,
                    data: [
                        {
                            name: "United States of America",
                            value: [5754800, 25.921, "美国"],
                        },
                        { name: "Japan", value: [3103698, 13.774, "日本"] },
                        { name: "Germany", value: [1714447, 7.722, "德国"] },
                        { name: "France", value: [1244419, 5.605, "法国"] },
                        { name: "Italy", value: [1133465, 5.105, "意大利"] },
                        { name: "United Kingdom", value: [1012617, 4.561, "英国"] },
                        { name: "Russia", value: [775810, 3.501, "俄国"] },
                        { name: "Canada", value: [582735, 2.625, "加拿大"] },
                        { name: "Spain", value: [520938, 2.346, "西班牙"] },
                        { name: "China", value: [404494, 1.822, "中国"] },
                    ],
                },
                {
                    time: 2000,
                    data: [
                        {
                            name: "United States of America",
                            value: [9898800, 30.659, "美国"],
                        },
                        { name: "Japan", value: [4731199, 14.456, "日本"] },
                        { name: "Germany", value: [1886400, 5.843, "德国"] },
                        { name: "United Kingdom", value: [1477132, 4.575, "英国"] },
                        { name: "France", value: [1326333, 4.108, "法国"] },
                        { name: "China", value: [1192836, 3.695, "中国"] },
                        { name: "Italy", value: [1097343, 3.399, "意大利"] },
                        { name: "Canada", value: [724914, 2.245, "加拿大"] },
                        { name: "Brazil", value: [644729, 1.997, "巴西"] },
                        { name: "Mexico", value: [636731, 1.972, "墨西哥"] },
                    ],
                },
                {
                    time: 2010,
                    data: [
                        {
                            name: "United States of America",
                            value: [14419600, 22.679, "美国"],
                        },
                        { name: "China", value: [5951462, 9.36, "中国"] },
                        { name: "Japan", value: [5488424, 8.632, "日本"] },
                        { name: "Germany", value: [3306028, 5.2, "德国"] },
                        { name: "France", value: [2565755, 4.035, "法国"] },
                        { name: "United Kingdom", value: [2266049, 3.564, "英国"] },
                        { name: "Brazil", value: [2143035, 3.371, "巴西"] },
                        { name: "Italy", value: [2056941, 3.235, "意大利"] },
                        { name: "India", value: [1678297, 2.64, "印度"] },
                        { name: "Canada", value: [1577040, 2.48, "加拿大"] },
                    ],
                },
                {
                    time: 2015,
                    data: [
                        {
                            name: "United States of America",
                            value: [17947000, 23.208, "美国"],
                        },
                        { name: "China", value: [10982829, 14.204, "中国"] },
                        { name: "Japan", value: [4123258, 5.329, "日本"] },
                        { name: "Germany", value: [3357614, 4.333, "德国"] },
                        { name: "United Kingdom", value: [2849345, 3.685, "英国"] },
                        { name: "France", value: [2421560, 3.13, "法国"] },
                        { name: "India", value: [2090706, 2.703, "印度"] },
                        { name: "Italy", value: [1815757, 2.347, "意大利"] },
                        { name: "Brazil", value: [1772589, 2.289, "巴西"] },
                        { name: "Canada", value: [1552386, 2.005, "加拿大"] },
                    ],
                },
            ],
        };
    },
    mounted() {
        this.chart = this.$echarts.init(this.$refs.chart);
        window.onresize = this.chart.resize;
        let data = this.data;

        let option = {
            baseOption: {
                animationDurationUpdate: 1000,
                animationEasingUpdate: "quinticInOut",
                timeline: {
                    axisType: "category",
                    orient: "vertical",
                    autoPlay: true,
                    inverse: true,
                    playInterval: 5000,
                    left: null,
                    right: 5,
                    top: 20,
                    bottom: 20,
                    width: 46,
                    height: null,
                    label: {
                        normal: {
                            textStyle: {
                                color: "#ddd",
                            },
                        },
                        emphasis: {
                            textStyle: {
                                color: "#fff",
                            },
                        },
                    },
                    symbol: "none",
                    lineStyle: {
                        color: "#555",
                    },
                    checkpointStyle: {
                        color: "#bbb",
                        borderColor: "#777",
                        borderWidth: 1,
                    },
                    controlStyle: {
                        showNextBtn: false,
                        showPrevBtn: false,
                        normal: {
                            color: "#666",
                            borderColor: "#666",
                        },
                        emphasis: {
                            color: "#aaa",
                            borderColor: "#aaa",
                        },
                    },
                    data: data.map(function (ele) {
                        return ele.time;
                    }),
                },
                backgroundColor: "#404a59",
                title: {
                    text: "1970年以来中国GDP排名变化情况",
                    subtext: "GDP单位:百万美元",
                    left: "center",
                    top: "top",
                    textStyle: {
                        fontSize: 25,
                        color: "rgba(255,255,255, 0.9)",
                    },
                },
                tooltip: {
                    formatter: function (params) {
                        if (params.data && "value" in params.data) {
                            return params.data.value[2] + ": " + params.data.value[0];
                        }
                    },
                },
                grid: {
                    left: "12%",
                    right: "45%",
                    top: "70%",
                    bottom: 20,
                },
                xAxis: {},
                yAxis: {},
                series: [
                    {
                        id: "map",
                        type: "map",
                        mapType: "world",
                        top: "10%",
                        bottom: "25%",
                        left: 10,
                        itemStyle: {
                            normal: {
                                areaColor: "#323c48",
                                borderColor: "#404a59",
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                },
                                areaColor: "rgba(255,255,255, 0.5)",
                            },
                        },
                        data: [],
                    },
                    {
                        id: "bar",
                        type: "bar",
                        tooltip: {
                            show: false,
                        },
                        label: {
                            normal: {
                                show: true,
                                position: "right",
                                textStyle: {
                                    color: "#ddd",
                                },
                            },
                        },
                        data: [],
                    },
                    {
                        id: "pie",
                        type: "pie",
                        radius: ["8%", "20%"],
                        center: ["75%", "85%"],
                        roseType: "radius",
                        tooltip: {
                            formatter: "{b} {d}%",
                        },
                        data: [],
                        label: {
                            normal: {
                                textStyle: {
                                    color: "#ddd",
                                },
                            },
                        },
                        labelLine: {
                            normal: {
                                lineStyle: {
                                    color: "#ddd",
                                },
                            },
                        },
                        itemStyle: {
                            normal: {
                                borderColor: "rgba(0,0,0,0.3)",
                                borderSize: 1,
                            },
                        },
                    },
                ],
            },
            options: [],
        };

        for (var i = 0; i < data.length; i++) {
            //计算其余国家GDP
            var restPercent = 100;
            var restValue = 0;
            data[i].data.forEach(function (ele) {
                restPercent = restPercent - ele.value[1];
            });
            restValue = data[i].data[0].value[0] * (restPercent / data[i].data[0].value[1]);
            console.log(restPercent);
            console.log(restValue);
            option.options.push({
                visualMap: [
                    {
                        dimension: 0,
                        left: 10,
                        itemWidth: 12,
                        min: data[i].data[9].value[0],
                        max: data[i].data[0].value[0],
                        text: ["High", "Low"],
                        textStyle: {
                            color: "#ddd",
                        },
                        inRange: {
                            color: ["lightskyblue", "yellow", "orangered", "red"],
                        },
                    },
                ],
                xAxis: {
                    type: "value",
                    boundaryGap: [0, 0.1],
                    axisLabel: {
                        show: false,
                    },
                },
                yAxis: {
                    type: "category",
                    axisLabel: {
                        textStyle: {
                            color: "#ddd",
                        },
                    },
                    data: data[i].data
                        .map(function (ele) {
                            return ele.value[2];
                        })
                        .reverse(),
                },
                series: [
                    {
                        id: "map",
                        data: data[i].data,
                    },
                    {
                        id: "bar",
                        data: data[i].data
                            .map(function (ele) {
                                return ele.value[0];
                            })
                            .sort(function (a, b) {
                                return a > b;
                            }),
                    },
                    {
                        id: "pie",
                        data: data[i].data
                            .map(function (ele) {
                                return {
                                    name: ele.value[2],
                                    value: ele.value,
                                };
                            })
                            .concat({
                                name: "其他国家",
                                value: restValue,
                            }),
                    },
                ],
            });
        }

        this.chart.setOption(option);
        window.onresize = this.chart.resize;
    },
    methods: {},
};
</script>
