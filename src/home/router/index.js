import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },{
    path: '/favorite',
    name: '收藏夹',
    component: () => import('../views/Favorite.vue')
  },{
    path: '/tools',
    name: 'Tools',
    component: () => import('../views/Layout.vue'),
    redirect: '/tools/dashboard',
    children: [{
      path: '/tools/dashboard', name: 'DashBoard', component: () => import('../views/index.vue')
    }, {
      path: '/tools/qr-code', name: 'QR Code', component: () => import('../views/QRCode.vue')
    }, {
      path: '/tools/element', name: 'element UI', component: () => import('../elements/VElInput.vue')
    }, {
      path: '/tools/vetree', name: 'element Tree', component: () => import('../elements/VETree.vue')
    }, {
      path: '/tools/ruler', name: 'Ruler', component: () => import('../views/Ruler.vue')
    }, {
      path: '/tools/drop', name: '拖放', component: () => import('../views/DragAndDrop.vue')
    }, {
      path: '/tools/url-format', name: 'URL编解码', component: () => import('../elements/URLFormat.vue')
    }, {
      path: '/tools/vue-mixins', name: 'VueMixins', component: () => import('../views/VueMixins.vue')
    }]
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path.lastIndexOf('.html') != -1) {
    window.location.href = to.path;
  } else {
    document.title = to.name;
    next();
  }
});

export default router
