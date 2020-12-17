const prefix = "/notes";
export { prefix };

export default {
  path: prefix,
  name: "记事本",
  component: () => import("../views/notes/Layout.vue"),
  redirect: prefix + "/index",
  children: [
    {
      path: prefix + "/index",
      name: "记事本 知识点",
      component: () => import("../views/notes/index.vue"),
    },
  ],
};
