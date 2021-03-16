import home from "./home/router";
import live from "./live/router";
import charts from "./charts/router";
import guide from "./guide/router";
import tutorial from "./tutorial/router";

console.log('router ', guide.options, tutorial.options);
const router = [{
        name: "首页",
        path: "/index.html",
        children: home.options.routes,
    },
    {
        path: "/live.html",
        name: "会议室",
        children: live.options.routes,
    },
    {
        name: "指南",
        path: "/guide.html",
        children: guide.options.routes,
    },
    {
        name: "教程",
        path: "/main.html",
        children: tutorial.options.routes,
    },
    {
        path: "/sprite/index.html",
        name: "雪碧图",
    },
    {
        path: "/charts.html",
        name: "图表",
        children: charts.options.routes,
    },
];

export default router;