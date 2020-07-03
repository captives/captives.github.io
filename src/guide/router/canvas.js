const prefix = "/canvas";
export { prefix };

export default {
    path: prefix,
    name: 'Canvas',
    component: () => import('../views/canvas/Layout.vue'),
    redirect: prefix + '/index',
    children: [
        { path: prefix + '/index', name: "index", component: () => import('../views/canvas/index.vue') },
        { path: prefix + '/base', name: "Base", component: () => import('../views/canvas/BaseFabric.vue') },
        { path: prefix + '/video', name: "绘图", component: () => import('../views/canvas/DrawVideo.vue') },
        { path: prefix + '/video-split', name: "分屏", component: () => import('../views/canvas/DrawVideoSplitScreen.vue') },
        { path: prefix + '/video-splicing', name: "拼接", component: () => import('../views/canvas/DrawVideoSplicing.vue') },
        { path: prefix + '/video-green-screen', name: "拼接绿屏幕抠图", component: () => import('../views/canvas/DrawVideoGreenScreen.vue') },
        { path: prefix + '/video-split-copy', name: "分割拷贝", component: () => import('../views/canvas/DrawVideoSplitCopy.vue') },
        { path: prefix + '/drawboard', name: "drawboard", component: () => import('../views/canvas/DrawBoardFabric.vue') },
        { path: prefix + '/video-for-fabric', name: "Draw video for fabric", component: () => import('../views/canvas/DrawVideoForFabric.vue') },
    ]
}