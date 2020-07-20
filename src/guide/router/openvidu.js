const prefix = "/openvidu";
export { prefix };

export default {
    path: prefix,
    name: 'openvidu',
    component: () => import('../views/openvidu/Layout.vue'),
    redirect: prefix + "/index",
    children: [
        { path: prefix + "/index", name: "关键知识", icon: 'el-icon-menu', component: () => import('../views/openvidu/index.vue') },
        { path: prefix + "/hello", name: "Hello World", icon: 'el-icon-menu', component: () => import('../views/openvidu/HelloWorld.vue') },
        { path: prefix + "/avcall", name: "Audio Video Call", icon: 'el-icon-menu', component: () => import('../views/openvidu/AudioVideoCall.vue') },
    ]
}