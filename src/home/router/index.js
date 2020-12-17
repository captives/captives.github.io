import Vue from "vue";
import VueRouter from "vue-router";
import tools from "./tools";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "首页",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/favorite",
    name: "收藏夹",
    component: () => import("../views/Favorite.vue"),
  },
  tools,
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

router.beforeEach((to, from, next) => {
  if (to.path.lastIndexOf(".html") != -1) {
    window.location.href = to.path;
  } else {
    document.title = to.name;
    next();
  }
});

export default router;
