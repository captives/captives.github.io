import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [{
  path: '/',
  name: 'Home',
  component: () => import('../views/Home.vue')
}, {
  path: '/canvas',
  name: 'Canvas',
  component: () => import('../views/canvas/Layout.vue'),
  redirect: '/canvas/index',
  children: [
    { path: '/canvas/index', name: "index", component: () => import('../views/canvas/index.vue') },
    { path: '/canvas/base', name: "Base", component: () => import('../views/canvas/BaseFabric.vue') },
    { path: '/canvas/video', name: "绘图", component: () => import('../views/canvas/DrawVideo.vue') },
    { path: '/canvas/video-split', name: "分屏", component: () => import('../views/canvas/DrawVideoSplitScreen.vue') },
    { path: '/canvas/video-splicing', name: "拼接", component: () => import('../views/canvas/DrawVideoSplicing.vue') },
    { path: '/canvas/video-green-screen', name: "拼接绿屏幕抠图", component: () => import('../views/canvas/DrawVideoGreenScreen.vue') },
    { path: '/canvas/video-split-copy', name: "分割拷贝", component: () => import('../views/canvas/DrawVideoSplitCopy.vue') },
    { path: '/canvas/drawboard', name: "drawboard", component: () => import('../views/canvas/DrawBoardFabric.vue') },
    { path: '/canvas/video-for-fabric', name: "Draw video for fabric", component: () => import('../views/canvas/DrawVideoForFabric.vue') },
  ]
}, {
  path: '/web',
  name: 'HTML5 Web',
  component: () => import('../views/web/Layout.vue'),
  redirect: '/web/index',
  children: [
    { path: '/web/index', name: 'HTML5', component: () => import('../views/web/index.vue') },
    { path: '/web/video-js', name: 'VideoJS', component: () => import('../views/web/VideoJs.vue') },
    { path: '/web/xgvideo', name: 'XGVideo', component: () => import('../views/web/XGVideo.vue') },
    { path: '/web/audio-lrc', name: 'LRC播放器', component: () => import('../views/web/AudioLRC.vue') },
    { path: '/web/media-source', name: 'Media Source', component: () => import('../views/web/MediaSource.vue') },
    { path: '/web/html-to-canvas', name: 'html2canvas', component: () => import('../views/web/Html2Canvas.vue') },
    { path: '/web/cropperjs', name: 'cropper', component: () => import('../views/web/VueCropperjs.vue') },
    { path: '/web/vue-cropper', name: 'vue cropper', component: () => import('../views/web/VueCropper.vue') },
    { path: '/web/pdf-js', name: 'PDF Js', component: () => import('../views/web/PDFJs.vue') },
    { path: '/web/websql', name: 'Web SQL', component: () => import('../views/web/WebSQL.vue') },
    { path: '/web/vue-apollo-client', name: 'VueApolloClient', component: () => import('../views/web/VueApolloClient.vue') },
    { path: '/web/math-jax', name: 'MathJax', component: () => import('../views/web/MathJax.vue') },
    { path: '/web/vue-scroller', name: '无限滚动', component: () => import('../views/web/VueSeamlessScroll.vue') },
  ]
}, {
  path: '/webrtc',
  name: 'webrtc',
  component: () => import('../views/webrtc/Layout.vue'),
  redirect: '/webrtc/index',
  children: [
    { path: "/webrtc/index", name: "WebRTC Tutorials", component: () => import('../views/webrtc/index.vue') },
    { path: "/webrtc/list", name: "Enumerate Devices", component: () => import('../views/webrtc/MediaDevices.vue') },
    { path: "/webrtc/stream-from-usermedia", name: "Video Stream from UserMedia", component: () => import('../views/webrtc/VideoStreamFromUserMedia.vue') },
    { path: "/webrtc/audiooutput", name: "选择音频输出设备", component: () => import('../views/webrtc/AudioOutput.vue') },
    { path: "/webrtc/dynamic-selection-usermedia", name: "Dynamic selection of devices", component: () => import('../views/webrtc/ChooseUserMedia.vue') },
    { path: "/webrtc/stream-from-displaymedia", name: "Video Stream from DisplayMedia", component: () => import('../views/webrtc/VideoStreamFromDisplayMedia.vue') },
    { path: "/webrtc/stream-from-video", name: "Video Stream from video", component: () => import('../views/webrtc/VideoStreamFromVideo.vue') },
    { path: "/webrtc/stream-from-canvas", name: "Video Stream from Canvas", component: () => import('../views/webrtc/VideoStreamFromCanvas.vue') },
    { path: "/webrtc/pc", name: "Peer Connection", component: () => import('../views/webrtc/PeerConnection.vue') },
    { path: "/webrtc/remote", name: "Audio VideoCall", component: () => import('../views/webrtc/AudioVideoCall.vue') },
    { path: "/webrtc/visualizer", name: "Stream Visualizer", component: () => import('../views/webrtc/MediaStreamVisualizer.vue') },
    { path: "/webrtc/mixer", name: "Stream Mixer", component: () => import('../views/webrtc/MediaStreamMixer.vue') },
    { path: "/webrtc/recorder", name: "Media Recorder", component: () => import('../views/webrtc/UserMediaRecorder.vue') },
    { path: "/webrtc/display-media-recorder", name: "Display Media Record", component: () => import('../views/webrtc/DisplayMediaRecorder.vue') },
    { path: "/webrtc/audio-volume", name: "Audio Stream Volume", component: () => import('../views/webrtc/AudioStreamVolume.vue') },
  ]
}, {
  path: '/openvidu',
  name: 'openvidu',
  component: () => import('../views/openvidu/Layout.vue'),
  redirect: '/openvidu/index',
  children: [
    { path: "/openvidu/index", name: "OpenVidu Tutorials", component: () => import('../views/openvidu/index.vue') },
    { path: "/openvidu/hello", name: "Hello World", component: () => import('../views/openvidu/HelloWorld.vue') },
    { path: "/openvidu/avcall", name: "Audio Video Call", component: () => import('../views/openvidu/AudioVideoCall.vue') },
  ]
}, {
  path: '/live',
  redirect: '/live.html'
}, {
  path: '/about',
  name: 'about',
  component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
}]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
