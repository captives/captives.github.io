import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { RoleType, localTime, formatTimeValue } from './plugins/utils'
//element UI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI, { size: 'small', zIndex: 3000 });

//Socket.io
import SocketClient from './plugins/SocketClient';
Vue.prototype.client = new SocketClient();

import BaseEvent from './plugins/BaseEvent';
Vue.prototype.elementEvent = new BaseEvent();

import { VideoStream, VideoClient } from './plugins/WebVideoClient';
Vue.prototype.videoStream = new VideoStream();
Vue.prototype.videoClient = new VideoClient();

//浏览器指纹
import Fingerprint from 'fingerprintjs'
Vue.prototype.$fingerprint = Date.now(); // new Fingerprint().get();

// //Logger
// import Logger from './plugins/Logger';
// Logger.includeTime = false;
// Logger.includeLevel = false;
// Logger.color = { log: '#409EFF', info: '#909399', warn: '#E6A23C', error: "#F56C6C" };

Vue.filter('localTime', localTime);
Vue.filter('formatTimeValue', formatTimeValue);

import axios from 'axios';
import VueAxios from 'vue-axios';
Vue.use(VueAxios, axios);

//RoleType
Vue.prototype.RoleType = RoleType;
Vue.config.productionTip = false
window.vue = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
