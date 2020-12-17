import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "@/assets/css/base-style.css";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

Vue.config.productionTip = false;

import global from "./../plugins/global";
Vue.use(global);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
