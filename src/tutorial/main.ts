import Vue from "vue";
import Main from "./views/Main.vue";
import router from "./router";
import store from "./store";
import "@/assets/css/base-style.css";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

Vue.config.productionTip = false;

import global from "@/plugins/global";
Vue.use(global);

new Vue({
  router,
  store,
  render: (h) => h(Main),
}).$mount("#app");
