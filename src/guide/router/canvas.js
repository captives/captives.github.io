const prefix = "/canvas";
export { prefix };

export default {
    path: prefix,
    name: "Canvas",
    component: () =>
        import ("../views/canvas/Layout.vue"),
    redirect: prefix + "/index",
    children: [{
            path: prefix + "/index",
            name: "Canvas API",
            icon: "el-icon-printer",
            component: () =>
                import ("../views/canvas/index.vue"),
        },
        {
            path: prefix + "/video",
            name: "视频绘图",
            icon: "el-icon-printer",
            component: () =>
                import ("../views/canvas/DrawVideo.vue"),
        },
        {
            path: prefix + "/video-split",
            name: "视频画面分屏",
            icon: "el-icon-printer",
            component: () =>
                import ("../views/canvas/DrawVideoSplitScreen.vue"),
        },
        {
            path: prefix + "/video-splicing",
            name: "视频画面拼接",
            icon: "el-icon-printer",
            component: () =>
                import ("../views/canvas/DrawVideoSplicing.vue"),
        },
        {
            path: prefix + "/video-green-screen",
            name: "视频画面绿屏抠图",
            icon: "el-icon-printer",
            component: () =>
                import ("../views/canvas/DrawVideoGreenScreen.vue"),
        },
        {
            path: prefix + "/video-split-copy",
            name: "视频画面分割拷贝",
            icon: "el-icon-printer",
            component: () =>
                import ("../views/canvas/DrawVideoSplitCopy.vue"),
        },
        {
            path: prefix + "/base",
            name: "fabric 基础",
            icon: "el-icon-printer",
            component: () =>
                import ("../views/canvas/BaseFabric.vue"),
        },
        {
            path: prefix + "/drawboard",
            name: "fabric 画板",
            icon: "el-icon-printer",
            component: () =>
                import ("../views/canvas/DrawBoardFabric.vue"),
        },
        {
            path: prefix + "/oriole-drawboard",
            name: "插件版画板",
            icon: "el-icon-printer",
            component: () =>
                import ("../views/canvas/OrioleDrawBoard.vue"),
        },
        {
            path: prefix + "/drawboard-twojs",
            name: "Two.js 画板",
            icon: "el-icon-printer",
            component: () =>
                import ("../views/canvas/DrawTwojsBoardFabric.vue"),
        },
        {
            path: prefix + "/video-for-fabric",
            name: "视频绘图fabric",
            icon: "el-icon-printer",
            component: () =>
                import ("../views/canvas/DrawVideoForFabric.vue"),
        },
    ],
};