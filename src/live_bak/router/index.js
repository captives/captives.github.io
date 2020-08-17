import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [{
  path: '/',
  name: '登入',
  component: () => import('./../views/Home.vue'),
},{
  path: '/one',
  name: '一对一',
  component: () => import('./../views/About.vue')
},{
  path: '/many',
  name: '一对多',
  component: () => import('./../views/About.vue')
},{
  path: '/live',
  name: '直播',
  component: () => import('./../views/About.vue')
},{
  path: '/desc',
  name: '说明',
  component: () => import('./../views/About.vue')
}]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
