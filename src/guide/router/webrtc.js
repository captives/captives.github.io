const prefix = "/webrtc";
export { prefix };

export default {
    path: prefix + "",
    name: 'webrtc',
    component: () => import('../views/webrtc/Layout.vue'),
    redirect: prefix + "/index",
    children: [
        { path: prefix + "/index", name: "关键知识", icon: 'el-icon-s-flag', component: () => import('../views/webrtc/index.vue') },
        { path: prefix + "/list", name: "用户设备列表", icon: 'el-icon-notebook-2', component: () => import('../views/webrtc/MediaDevices.vue') },
        { path: prefix + "/stream-from-usermedia", name: "视频流来自用户设备", icon: 'el-icon-camera', component: () => import('../views/webrtc/VideoStreamFromUserMedia.vue') },
        { path: prefix + "/dynamic-selection-usermedia", name: "动态选择用户设备", icon: 'el-icon-orange', component: () => import('../views/webrtc/ChooseUserMedia.vue') },
        { path: prefix + "/stream-from-displaymedia", name: "视频流来自显示设备", icon: 'el-icon-monitor', component: () => import('../views/webrtc/VideoStreamFromDisplayMedia.vue') },
        { path: prefix + "/stream-from-video", name: "视频流来自Video", icon: 'el-icon-film', component: () => import('../views/webrtc/VideoStreamFromVideo.vue') },
        { path: prefix + "/stream-from-canvas", name: "视频流来自Canvas", icon: 'el-icon-picture-outline', component: () => import('../views/webrtc/VideoStreamFromCanvas.vue') },
        { path: prefix + "/audiooutput", name: "音频输出到指定设备", icon: 'el-icon-headset', component: () => import('../views/webrtc/AudioOutput.vue') },
        { path: prefix + "/visualizer", name: "媒体流可视化", icon: 'el-icon-data-line', component: () => import('../views/webrtc/MediaStreamVisualizer.vue') },
        { path: prefix + "/audio-volume", name: "媒体流音量测算", icon: 'el-icon-odometer', component: () => import('../views/webrtc/AudioStreamVolume.vue') },
        { path: prefix + "/mixer", name: "媒体流混音", icon: 'el-icon-set-up', component: () => import('../views/webrtc/MediaStreamMixer.vue') },
        { path: prefix + "/pc", name: "对等连接", icon: 'el-icon-connection', component: () => import('../views/webrtc/PeerConnection.vue') },
        { path: prefix + "/remote", name: "对等连接传输流", icon: 'el-icon-money', component: () => import('../views/webrtc/AudioVideoCall.vue') },
        { path: prefix + "/recorder", name: "用户设备流录制", icon: 'el-icon-video-camera', component: () => import('../views/webrtc/UserMediaRecorder.vue') },
        { path: prefix + "/display-media-recorder", name: "显示设备录制流", icon: 'el-icon-video-camera-solid', component: () => import('../views/webrtc/DisplayMediaRecorder.vue') },
    ]
}