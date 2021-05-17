import Vue from "vue";
import Main from "./Main.vue";
import router from "./router";
import store from "./store";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI, { size: "small" });

Vue.config.productionTip = false;

import global from "@/plugins/global";
Vue.use(global);

//引入动画库
import 'animate.css/animate.compat.css'

import MarkdownEditor from '@/plugins/MarkdownEditor';
Vue.use(MarkdownEditor);

new Vue({
  router,
  store,
  render: (h) => h(Main),
}).$mount("#app");
