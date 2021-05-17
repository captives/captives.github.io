import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import echarts from "./echarts";
Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "入门",
        component: Home,
    },
    echarts,
    {
        path: "/about",
        name: "About",
        component: () =>
            import ("../views/About.vue"),
    },
];

const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;