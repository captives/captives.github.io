import Vue from 'vue'
import VueRouter from 'vue-router'
import web from './web';
import canvas from './canvas';
import webrtc from './webrtc';
import openvidu from './openvidu';
import notes from './notes';

Vue.use(VueRouter);

const routes = [web, canvas, webrtc, openvidu, notes,
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  }, {
    path: '/live',
    redirect: '/live.html'
  }, {
    path: '/about',
    name: 'about',
    component: () => import('../views/About.vue'),
  }]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export { routes };
export default router;
