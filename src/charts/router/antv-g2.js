const path = "/antv-g2";

const Layout = () =>
    import ("../antv-g2/Layout.vue");
console.log(Layout);

export default {
    path: path,
    name: "Antv/G2",
    component: Layout,
    redirect: path + "/index",
    children: [{
        path: path + "/index",
        name: "G2/索引",
        component: () =>
            import ("../antv-g2/index.vue"),
    }, {
        path: path + "/chart1",
        name: "G2/柱状图",
        component: () =>
            import ("../antv-g2/Chart1.vue"),
    }, {
        path: path + "/chart2",
        name: "G2/饼状图",
        component: () =>
            import ("../antv-g2/Chart2.vue"),
    }, {
        path: path + "/chart3",
        name: "G2/镜像分组条行图(SVG)",
        component: () =>
            import ("../antv-g2/Chart3.vue"),
    }]
}