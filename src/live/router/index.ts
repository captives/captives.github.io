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
    path: prefix + '/nav',
    name: 'WebSite',
    component: () => import('../views/WebSite.vue')
  }, {
    path: prefix + '/node',
    name: 'Nodejs 安装',
    component: () => import('../views/articles/NodejsInstall.vue')
  }, {
    path: prefix + '/editor',
    name: '编辑器',
    component: () => import('../views/VueEditor.vue')
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

const router = new VueRouter({ mode: 'history', routes });
export default router;
export { prefix };
