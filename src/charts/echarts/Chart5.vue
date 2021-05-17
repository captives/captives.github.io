<template>
    <div ref="chart" class="chart-view"></div>
</template>
<script>
export default {
    name: "Chart2",
    mounted() {
        const chart = this.$echarts.init(this.$refs.chart, null, { renderer: "svg" });

        var data = [
            {
                name: "CPU",
                value: 7,
            },
            {
                name: "内存",
                value: 30,
            },
        ];

        var titleArr = [],
            seriesArr = [];
        var colors = [
            ["#389af4", "#dfeaff"],
            ["#ff8c37", "#ffdcc3"],
            ["#ffc257", "#ffedcc"],
            ["#fd6f97", "#fed4e0"],
            ["#a181fc", "#e3d9fe"],
        ];
        data.forEach(function (item, index) {
            titleArr.push({
                text: item.value + "%",
                top: "45%",
                left: index * 50 + 25 + "%",
                textAlign: "center",
                textStyle: {
                    fontWeight: "normal",
                    fontSize: "70",
                    color: "#30c792",
                },
                subtext: item.name.toUpperCase(),
                subtextStyle: {
                    fontSize: 20,
                    color: "#FFFFFF",
                    align: "center",
                },
            });

            seriesArr.push(
                {
                    name: item.name.toUpperCase(),
                    type: "pie",
                    radius: ["60%", "80%"],
                    startAngle: 225,
                    color: [
                        {
                            type: "linear",
                            x: 0,
                            y: 0,
                            x2: 0.4,
                            y2: 1,
                            colorStops: [
                                {
                                    offset: 0,
                                    color: "#00f7df", // 0% 处的颜色
                                },
                                {
                                    offset: 0.5,
                                    color: "#00f7df", // 0% 处的颜色
                                },
                                {
                                    offset: 1,
                                    color: "#015bf6", // 100% 处的颜色
                                },
                            ],
                            globalCoord: false, // 缺省为 false
                        },
                        "none",
                    ],
                    hoverAnimation: false,
                    legendHoverLink: false,
                    z: 10,
                    labelLine: { normal: { show: false } },
                    center: [index * 50 + 25 + "%", "50%"],
                    data: [{ value: (75 * item.value) / 100 }, { value: 100 - (75 * item.value) / 100 }],
                },
                {
                    name: "",
                    type: "pie",
                    radius: ["60%", "80%"],
                    center: [index * 50 + 25 + "%", "50%"],
                    startAngle: 225,
                    color: ["#052471"],
                    z: 9,
                    hoverAnimation: false,
                    legendHoverLink: false,
                    labelLine: { normal: { show: false } },
                    data: [{ value: 75, itemStyle: { normal: { color: "#052471" } } }, { value: 25 }],
                }
            );
        });

        var option = {
            backgroundColor: "#666",
            title: titleArr,
            series: seriesArr,
        };
        chart.setOption(option);
        window.onresize = chart.resize;
    },
};
</script>
