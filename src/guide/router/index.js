import Vue from 'vue'
import VueRouter from 'vue-router'
import web from './web';
import canvas from './canvas';
import webrtc from './webrtc';
import openvidu from './openvidu';
import notes from './notes';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  }, web, canvas, webrtc, openvidu, notes, {
    path: '/live.html',
    name: "会议室",
    redirect: '/live.html'
  }, {
    path: '/about',
    name: '处理中心',
    component: () => import('../views/About.vue'),
  }];

//屏蔽重复导航,控制台报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export { routes };
export default router;
