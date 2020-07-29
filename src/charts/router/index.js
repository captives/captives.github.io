import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import echarts from './echarts';
Vue.use(VueRouter);

const routes = [{
  path: '/',
  name: '快速入门',
  component: Home
}, {
  path: '/about',
  name: 'About',
  component: () => import('../views/About.vue')
}, echarts]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
