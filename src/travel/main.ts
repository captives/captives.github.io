import Vue from "vue";
import Main from "./Main.vue";
import router from "./router";

// 日志
// import Debug from '@/plugins/logger/index'
// Vue.use(new Debug({ debug: process.env.NODE_ENV === "production" }));

//@ts-ignore  日历
import VueHashCalendar from 'vue-hash-calendar';
import 'vue-hash-calendar/lib/vue-hash-calendar.css';
Vue.use(VueHashCalendar);

import VueAwesomeSwiper from 'vue-awesome-swiper';
import 'swiper/swiper.min.css';
Vue.use(VueAwesomeSwiper);

//引入动画库, 新旧使用方式不一致
// import 'animate.css';
import 'animate.css/animate.compat.css';

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant)


Vue.config.productionTip = false;
new Vue({ router, render: (h) => h(Main) }).$mount("#app");
