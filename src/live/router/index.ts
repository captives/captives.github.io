import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)
const prefix: string = "";

const routes: Array<RouteConfig> = [{
  path: prefix,
  name: 'Home',
  component: () => import('../views/Home.vue'),
  redirect:prefix + "/login"
}, {
  path: prefix + "/login",
  name: '登入',
  component: () => import('../views/Login.vue')
}, {
  path: prefix + '/room',
  name: '会议室',
  component: () => import('../views/Room.vue')
}
]

//屏蔽重复导航,控制台报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location: any) {
  //@ts-ignore
  return originalPush.call(this, location).catch((err: any) => err)
}

// mode: 'history',
const router = new VueRouter({
  routes
});
export default router;
