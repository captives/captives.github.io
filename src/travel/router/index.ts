import Vue from "vue";
import VueRouter, { RouteConfig, Route } from "vue-router";
Vue.use(VueRouter);


const prefix = "";
const routes: Array<RouteConfig> = [
  { path: prefix + "/", name: "Home", component: () => import("../views/WeChat.vue") },
  { path: prefix + "/home", name: "Home", component: () => import("../views/Home.vue") },
  { path: prefix + "/about", name: "About", component: () => import("../views/About.vue"), },
];

//屏蔽重复导航,控制台报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location: any) {
  //@ts-ignore
  return originalPush.call(this, location).catch((err: any) => err)
}


type Position = { x: number; y: number }
const router = new VueRouter({
  routes,
  // scrollBehavior(to: Route, from: Route, savedPosition: Position | void) {
  //   // return 期望滚动到哪个的位置
  //   return savedPosition || { x: 0, y: 0 }
  // }
});

export default router;
export { prefix };
