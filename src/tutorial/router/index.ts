import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const prefix = "";
const routes: Array<RouteConfig> = [
  {
    path: prefix,
    name: "Home",
    component: Home,
  },
  {
    path: prefix + "/nav",
    name: "WebSite",
    component: () => import("../views/WebSite.vue"),
  },
  {
    path: prefix + "/node",
    name: "Nodejs 安装",
    component: () => import("../views/articles/NodejsInstall.vue"),
  },
  {
    path: prefix + "/editor",
    name: "编辑器",
    component: () => import("../views/VueEditor.vue"),
  },
  {
    path: prefix + "/matrix",
    name: "矩阵",
    component: () => import("../views/matrix/index.vue"),
  },
  {
    path: prefix + "/html5",
    name: "HTML5",
    component: () => import("../views/articles/HTML5.vue"),
  },
  {
    path: prefix + "/vscode",
    name: "VScode Setting",
    component: () => import("../views/articles/VSCodeSettings.vue"),
  },
  {
    path: prefix + "/js-uuid",
    name: "JavaScript 创建GUID/UUID",
    component: () => import("../views/articles/JavaScriptGenerateUUID.vue"),
  },
  {
    path: prefix + "/webrtc-recorder",
    name: "WebRTC录制",
    component: () => import("../views/articles/WebRTCRecorder.vue"),
  },
  {
    path: prefix + "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
];

//屏蔽重复导航,控制台报错
// const originalPush = VueRouter.prototype.push;
// VueRouter.prototype.push = function push(location: any) {
//   return originalPush.call(this, location).catch((err: any) => err)
// }

// mode: "history"
const router = new VueRouter({ routes });
export default router;
export { prefix };
