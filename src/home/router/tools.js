export default {
    path: "/tools",
    name: "工具箱",
    component: () =>
        import ("../views/Layout.vue"),
    redirect: "/tools/dashboard",
    children: [{
            path: "/tools/dashboard",
            name: "DashBoard",
            component: () =>
                import ("../views/index.vue"),
        },
        {
            path: "/tools/qr-code",
            name: "QR Code",
            component: () =>
                import ("../views/QRCode.vue"),
        },
        {
            path: "/tools/vetree",
            name: "element Tree",
            component: () =>
                import ("../elements/VETree.vue"),
        },
        {
            path: "/tools/drop",
            name: "拖放",
            component: () =>
                import ("../views/DragAndDrop.vue"),
        },
        {
            path: "/tools/console",
            name: "控制台输出",
            component: () =>
                import ("../views/Console.vue"),
        },
    ],
};