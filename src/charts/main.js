import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/display.css';
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

import * as echarts from "echarts/lib/echarts";
// 引入 echarts 主模块。
// import 'echarts/lib/echarts';
// import './theme/macarons.js';
// import './theme/roma.js';
// 引入柱形图
import "echarts/lib/chart/line";
import "echarts/lib/chart/bar";
import "echarts/lib/chart/pie";
import "echarts/lib/chart/scatter";
import "echarts/lib/chart/radar";
import "echarts/lib/chart/gauge";
import "echarts/lib/chart/treemap";

//地图插件
import "echarts/lib/chart/funnel";
import "echarts/lib/chart/lines";
import "echarts/lib/chart/effectScatter";

//有问题
import "echarts/lib/component/graphic";
import "echarts/lib/chart/graph";

// 引入提示框组件、标题组件、工具箱、legend组件。
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/toolbox";
import "echarts/lib/component/legend";

//SVG渲染器模块
import 'zrender/lib/svg/svg';

Vue.prototype.$echarts = echarts;

import "./../assets/css/code-style.css";
import Source from "./../components/Source";
Vue.component("vue-source", Source);


Vue.config.productionTip = false;
window.vue = new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");