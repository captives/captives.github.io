export default {
  path: "/tools",
  name: "工具箱",
  component: () => import("../views/Layout.vue"),
  redirect: "/tools/dashboard",
  children: [
    {
      path: "/tools/dashboard",
      name: "DashBoard",
      component: () => import("../views/index.vue"),
    },
    {
      path: "/tools/qr-code",
      name: "QR Code",
      component: () => import("../views/QRCode.vue"),
    },
    {
      path: "/tools/element",
      name: "element UI",
      component: () => import("../elements/VElInput.vue"),
    },
    {
      path: "/tools/vetree",
      name: "element Tree",
      component: () => import("../elements/VETree.vue"),
    },
    {
      path: "/tools/ruler",
      name: "Ruler",
      component: () => import("../views/Ruler.vue"),
    },
    {
      path: "/tools/drop",
      name: "拖放",
      component: () => import("../views/DragAndDrop.vue"),
    },
    {
      path: "/tools/console",
      name: "控制台输出",
      component: () => import("../views/Console.vue"),
    },
    {
      path: "/tools/url-format",
      name: "URL编解码",
      component: () => import("../elements/URLFormat.vue"),
    },
    {
      path: "/tools/vue-mixins",
      name: "VueMixins",
      component: () => import("../views/VueMixins.vue"),
    },
  ],
};
