import Vue from "vue";
import App from "./Main.vue";
import router from "./router";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

import global from "./../plugins/global";
Vue.use(global);

import Splash from '@/directives/Splash.js';
Vue.use(Splash);

import Debug from '@/plugins/logger/index.js'
Vue.use(new Debug({ debug: true }));

Vue.config.productionTip = false;
new Vue({ router, render: (h) => h(App) }).$mount("#app");