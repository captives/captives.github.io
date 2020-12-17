const prefix = "/openvidu";
export { prefix };

export default {
  path: prefix,
  name: "OpenVidu",
  component: () => import("../views/openvidu/Layout.vue"),
  redirect: prefix + "/index",
  children: [
    {
      path: prefix + "/index",
      name: "OpenVidu 知识点",
      icon: "el-icon-menu",
      component: () => import("../views/openvidu/index.vue"),
    },
    {
      path: prefix + "/hello",
      name: "Hello World",
      icon: "el-icon-menu",
      component: () => import("../views/openvidu/HelloWorld.vue"),
    },
    {
      path: prefix + "/avcall",
      name: "Audio Video Call",
      icon: "el-icon-menu",
      component: () => import("../views/openvidu/AudioVideoCall.vue"),
    },
  ],
};
