import Vue from "vue";
import VueRouter, { RouteConfig, Route } from "vue-router";
type Position = { x: number; y: number }

Vue.use(VueRouter);

const prefix = "";

let moreRoutes: Array<RouteConfig> = [
  { name: "文章", path: prefix + "/articles/index", component: () => import("../views/articles/index.vue") },
  { name: "WebSite", path: prefix + "/article/website", component: () => import("../views/WebSite.vue") },
]

//只允许本地添加
if (window.location.origin.indexOf('local') != -1) {
  moreRoutes = moreRoutes.concat([
    { name: "文档管理", path: prefix + "/markdown/index", component: () => import("../views/markdown/index.vue") },
    { name: "新建文档", path: prefix + "/markdown/edit/:id", component: () => import("../views/markdown/Editor.vue") }
  ]);
}

const routes: Array<RouteConfig> = [
  { path: prefix + "/", name: "Home", component: () => import("../views/Home.vue") },
  { path: prefix + "/view", name: "视图预览", component: () => import("../views/View.vue") },
  { path: prefix + "/about", name: "About", component: () => import("../views/About.vue") },
  {
    path: prefix + "/article", name: "...", redirect: prefix + "/articles/index",
    component: Vue.extend({ template: '<router-view></router-view>' }),
    children: moreRoutes
  }, {
    path: "*",
    name: "404",
    component: Vue.extend({ template: '<h1 class="center">404</h1>' }),
  }
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
