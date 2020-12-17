import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);
const prefix = "";

const routes: Array<RouteConfig> = [
  {
    path: prefix,
    name: "直播会议",
    component: () => import("../views/Main.vue"),
    redirect: prefix + "/login",
  },
  {
    path: prefix + "/login",
    name: "登入",
    component: () => import("../views/Login.vue"),
  },
  {
    path: prefix + "/home",
    name: "首页",
    component: () => import("../views/Home.vue"),
  },
  {
    path: prefix + "/chat/:td",
    name: "聊天室",
    component: () => import("../views/ChatRoom.vue"),
  },
  {
    path: prefix + "/1v1/:td",
    name: "私密会议室",
    component: () => import("../views/PrivateRoom.vue"),
  },
  {
    path: prefix + "/1vn/:td",
    name: "多人会议室",
    component: () => import("../views/PublicRoom.vue"),
  },
  {
    path: prefix + "/live/:td",
    name: "直播",
    component: () => import("../views/LiveRoom.vue"),
  },
];

//屏蔽重复导航,控制台报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location: any) {
  //@ts-ignore
  return originalPush.call(this, location).catch((err: any) => err);
};

// mode: 'history',
const router = new VueRouter({
  routes,
});
export default router;
