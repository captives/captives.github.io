import Vue from "vue";
import Main from "./views/Main.vue";
import router from "./router";
import store from "./store";
import "@/assets/css/base-style.css";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

import VueSocketIO from "vue-socket.io";
Vue.use(
  new VueSocketIO({
    debug: true,
    connection: "https://local.uuabc.com:2020",
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_",
    },
    //@ts-ignore
    options: { path: "/metting", transports: ["websocket"] },
  })
);

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(Main),
}).$mount("body");
