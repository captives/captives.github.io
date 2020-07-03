const prefix = "/webrtc";
export { prefix };

export default {
    path: prefix + "",
    name: 'webrtc',
    component: () => import('../views/webrtc/Layout.vue'),
    redirect: prefix + "/index",
    children: [
        { path: prefix + "/index", name: "WebRTC Tutorials", component: () => import('../views/webrtc/index.vue') },
        { path: prefix + "/list", name: "Enumerate Devices", component: () => import('../views/webrtc/MediaDevices.vue') },
        { path: prefix + "/stream-from-usermedia", name: "Video Stream from UserMedia", component: () => import('../views/webrtc/VideoStreamFromUserMedia.vue') },
        { path: prefix + "/audiooutput", name: "选择音频输出设备", component: () => import('../views/webrtc/AudioOutput.vue') },
        { path: prefix + "/dynamic-selection-usermedia", name: "Dynamic selection of devices", component: () => import('../views/webrtc/ChooseUserMedia.vue') },
        { path: prefix + "/stream-from-displaymedia", name: "Video Stream from DisplayMedia", component: () => import('../views/webrtc/VideoStreamFromDisplayMedia.vue') },
        { path: prefix + "/stream-from-video", name: "Video Stream from video", component: () => import('../views/webrtc/VideoStreamFromVideo.vue') },
        { path: prefix + "/stream-from-canvas", name: "Video Stream from Canvas", component: () => import('../views/webrtc/VideoStreamFromCanvas.vue') },
        { path: prefix + "/pc", name: "Peer Connection", component: () => import('../views/webrtc/PeerConnection.vue') },
        { path: prefix + "/remote", name: "Audio VideoCall", component: () => import('../views/webrtc/AudioVideoCall.vue') },
        { path: prefix + "/visualizer", name: "Stream Visualizer", component: () => import('../views/webrtc/MediaStreamVisualizer.vue') },
        { path: prefix + "/mixer", name: "Stream Mixer", component: () => import('../views/webrtc/MediaStreamMixer.vue') },
        { path: prefix + "/recorder", name: "Media Recorder", component: () => import('../views/webrtc/UserMediaRecorder.vue') },
        { path: prefix + "/display-media-recorder", name: "Display Media Record", component: () => import('../views/webrtc/DisplayMediaRecorder.vue') },
        { path: prefix + "/audio-volume", name: "Audio Stream Volume", component: () => import('../views/webrtc/AudioStreamVolume.vue') },
    ]
}