import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
const prefix: string = "/live";
const routes: Array<RouteConfig> = [
  {
    path: prefix,
    name: 'Home',
    component: Home
  }, {
    path: prefix + '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
]

//屏蔽重复导航,控制台报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location: any) {
  //@ts-ignore
  return originalPush.call(this, location).catch((err: any) => err)
}

// mode: 'history',
const router = new VueRouter({ routes });
export default router;
export { prefix };
