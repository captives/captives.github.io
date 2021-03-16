import Vue from "vue";
import VueRouter, { RouteConfig, Route } from "vue-router";
import Home from "../views/Home.vue";
type Position = { x: number; y: number }

Vue.use(VueRouter);

const prefix = "";
const routes: Array<RouteConfig> = [
  { path: prefix + "/", name: "Home", component: Home },
  { path: prefix + "/view", name: "视图预览", component: () => import("../views/View.vue") },
  { path: prefix + "/about", name: "About", component: () => import("../views/About.vue") },
  {
    path: prefix + "/article", name: "...", redirect: prefix + "/articles/index",
    component: Vue.extend({ template: '<router-view></router-view>' }),
    children: [
      { name: "文章", path: prefix + "/articles/index", component: () => import("../views/articles/index.vue") },
      { name: "WebSite", path: prefix + "/article/website", component: () => import("../views/WebSite.vue") },
      { name: "编辑器", path: prefix + "/article/edit", component: () => import("../views/files/VueEditor.vue") },
    ]
  },
];

//屏蔽重复导航,控制台报错
// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location: any) {
//   return originalPush.call(this, location).catch((err: any) => err)
// }

const router = new VueRouter({
  routes,
  // scrollBehavior(to: Route, from: Route, savedPosition: Position | void) {
  //   // return 期望滚动到哪个的位置
  //   return savedPosition || { x: 0, y: 0 }
  // }
});

export default router;
export { prefix };
