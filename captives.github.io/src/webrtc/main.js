import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/base-style.css';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import * as echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/gauge';

// 引入提示框组件、标题组件、工具箱、legend组件。
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
Vue.prototype.$echarts = echarts;

import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);

// import '@/assets/css/code-style.css';
// import Code from './../components/Code.vue'
// Vue.component('el-code', Code);
import global from './../plugins/global';
Vue.use(global);

Vue.config.productionTip = false
window.vue = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')