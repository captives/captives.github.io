import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import echarts from "./echarts";
import antvG2 from "./antv-g2";
Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "入门",
        component: Home,
    },
    echarts,
    antvG2,
    {
        path: "/code-mirror",
        name: "CodeMirror",
        component: () =>
            import ("../views/CodeMirror.vue"),
    },
    {
        path: "/xterm",
        name: "Xterm",
        component: () =>
            import ("../views/Xterm.vue"),
    },
    // {
    //     path: "/md",
    //     name: "markdown页面样式",
    //     component: () =>
    //         import ("../views/Md.vue"),
    // },
    {
        path: "/about",
        name: "About",
        component: () =>
            import ("../views/About.vue"),
    },
];

//屏蔽重复导航,控制台报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};



const router = new VueRouter({
    // mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;