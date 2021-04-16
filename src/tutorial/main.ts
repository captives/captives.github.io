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
//@ts-ignore
import animate from 'animate.css/animate.compat.css'
Vue.use(animate);

import MarkdownEditor from '@/plugins/MarkdownEditor';
Vue.use(MarkdownEditor);

new Vue({
  router,
  store,
  render: (h) => h(Main),
}).$mount("#app");
