const prefix = "/notes";
export { prefix };

export default {
    path: prefix,
    name: 'notes',
    component: () => import('../views/notes/Layout.vue'),
    redirect: prefix + "/index",
    children: [
        { path: prefix + "/index", name: "关键知识", component: () => import('../views/notes/index.vue') },
    ]
}