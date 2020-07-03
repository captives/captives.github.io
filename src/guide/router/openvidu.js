const prefix = "/openvidu";
export { prefix };

export default {
    path: prefix,
    name: 'openvidu',
    component: () => import('../views/openvidu/Layout.vue'),
    redirect: prefix + "/index",
    children: [
        { path: prefix + "/index", name: "OpenVidu Tutorials", component: () => import('../views/openvidu/index.vue') },
        { path: prefix + "/hello", name: "Hello World", component: () => import('../views/openvidu/HelloWorld.vue') },
        { path: prefix + "/avcall", name: "Audio Video Call", component: () => import('../views/openvidu/AudioVideoCall.vue') },
    ]
}