import Vue from 'vue'
import App from './App.vue'
import '@/assets/css/base-style.css';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import * as echarts from 'echarts/lib/echarts';
// 引入 echarts 主模块。
// import 'echarts/lib/echarts';
// import './theme/macarons.js';
// import './theme/roma.js';
// 引入柱形图
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/scatter';
import 'echarts/lib/chart/radar';
import 'echarts/lib/chart/gauge';
import 'echarts/lib/chart/treemap';
import 'echarts/lib/chart/funnel';

//有问题
import "echarts/lib/component/graphic";
import 'echarts/lib/chart/graph';

//// 引入提示框组件、标题组件、工具箱、legend组件。
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/legend';

Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('body')
