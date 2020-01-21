import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter);

const routes = [{
  path: '/',
  name: 'home',
  component: Home
}, {
  path: '/about',
  name: 'about',
  component: () => import('../views/About.vue')
}, {
  path: '/e-charts',
  name: 'Echarts',
  component: () => import('../echarts/Layout.vue'),
  redirect: '/e-charts/index',
  children: [
    { path: "/e-charts/index", name: "索引", component: () => import('../echarts/index.vue') },
    { path: "/e-charts/chart1", name: "环形图", component: () => import('../echarts/Chart1.vue') },
    { path: "/e-charts/chart2", name: "柱状图", component: () => import('../echarts/Chart2.vue') },
    { path: "/e-charts/chart3", name: "仪表盘", component: () => import('../echarts/Chart3.vue') },
    { path: "/e-charts/chart4", name: "饼图", component: () => import('../echarts/Chart4.vue') },
    { path: "/e-charts/chart5", name: "CPU/内存消耗图", component: () => import('../echarts/Chart5.vue') },
    { path: "/e-charts/chart6", name: "饼状图", component: () => import('../echarts/Chart6.vue') },
    { path: "/e-charts/chart7", name: "饼图/环形合成图", component: () => import('../echarts/Chart7.vue') },
    { path: "/e-charts/chart8", name: "矩形树图", component: () => import('../echarts/Chart8.vue') },
    { path: "/e-charts/chart9", name: "倒金字塔图", component: () => import('../echarts/Chart9.vue') },
    { path: "/e-charts/chart10", name: "汽车仪表盘", component: () => import('../echarts/Chart10.vue') },
    { path: "/e-charts/chart11", name: "汽车仪表盘2", component: () => import('../echarts/Chart11.vue') },
    { path: "/e-charts/chart12", name: "线图和饼图", component: () => import('../echarts/Chart12.vue') },
    { path: "/e-charts/chart13", name: "柱状图（数组）", component: () => import('../echarts/Chart13.vue') },
    { path: "/e-charts/chart14", name: "柱状图（对象）", component: () => import('../echarts/Chart14.vue') },
    { path: "/e-charts/chart15", name: "柱状图叠加", component: () => import('../echarts/Chart15.vue') },
    { path: "/e-charts/chart16", name: "折线图堆叠", component: () => import('../echarts/Chart16.vue') },
    { path: "/e-charts/chart18", name: "折线面积图", component: () => import('../echarts/Chart18.vue') },
    { path: "/e-charts/chart17", name: "CPU消耗图", component: () => import('../echarts/Chart17.vue') },
    { path: "/e-charts/airroutemap1", name: "模拟迁徙 1", component: () => import('../echarts/AirRouteMap1.vue') },
    { path: "/e-charts/airroutemap2", name: "模拟迁徙 2", component: () => import('../echarts/AirRouteMap2.vue') },
    { path: "/e-charts/world-economy", name: "世界经济", component: () => import('../echarts/WorldEconomy.vue') },
    { path: "/e-charts/world-money", name: "全球数字货币交易", component: () => import('../echarts/WorldMoney.vue') },
  ]
}, {
  path: '/live',
  redirect: '/live.html'
}
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
