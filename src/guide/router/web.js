const prefix = "/web";
export { prefix };

export default {
    path: prefix,
    name: "HTML5Web",
    component: () =>
        import ("../views/web/Layout.vue"),
    redirect: prefix + "/index",
    children: [{
        path: prefix + "/index",
        name: "HTML5 知识点",
        icon: "el-icon-s-flag",
        component: () =>
            import ("../views/web/index.vue"),
    }, {
        path: prefix + "/video-js",
        name: "VideoJs",
        icon: "el-icon-notebook-2",
        component: () =>
            import ("../views/web/VideoJs.vue"),
    }, {
        path: prefix + "/xgvideo",
        name: "西瓜视频",
        icon: "el-icon-notebook-2",
        component: () =>
            import ("../views/web/XGVideo.vue"),
    }, {
        path: prefix + "/shaka-player",
        name: "ShakaPlayer",
        icon: "el-icon-notebook-2",
        component: () =>
            import ("../views/web/VueShakaPlayer.vue"),
    }, {
        path: prefix + "/audio-lrc",
        name: "简单LRC播放器",
        icon: "el-icon-notebook-2",
        component: () =>
            import ("../views/web/AudioLRC.vue"),
    }, {
        path: prefix + "/media-source",
        name: "Media Source",
        icon: "el-icon-notebook-2",
        component: () =>
            import ("../views/web/MediaSource.vue"),
    }, {
        path: prefix + "/html-to-canvas",
        name: "html2canvas",
        icon: "el-icon-notebook-2",
        component: () =>
            import ("../views/web/Html2Canvas.vue"),
    }, {
        path: prefix + "/cropperjs",
        name: "Cropperjs",
        icon: "el-icon-notebook-2",
        component: () =>
            import ("../views/web/VueCropperjs.vue"),
    }, {
        path: prefix + "/vue-cropper",
        name: "Vue Cropper",
        icon: "el-icon-notebook-2",
        component: () =>
            import ("../views/web/VueCropper.vue"),
    }, {
        path: prefix + "/pdf-js",
        name: "PDF 在线阅读器",
        icon: "el-icon-notebook-2",
        component: () =>
            import ("../views/web/PDFJs.vue"),
    }, {
        path: prefix + "/websql",
        name: "Web SQL",
        icon: "el-icon-notebook-2",
        component: () =>
            import ("../views/web/WebSQL.vue"),
    }, {
        path: prefix + "/vue-apollo-client",
        name: 'Vue Apollo Client"',
        icon: "el-icon-notebook-2",
        component: () =>
            import ("../views/web/VueApolloClient.vue"),
    }, {
        path: prefix + "/math-jax",
        name: "MathJax",
        icon: "el-icon-notebook-2",
        component: () =>
            import ("../views/web/MathJax.vue"),
    }, {
        path: prefix + "/vue-scroller",
        name: "无限滚动",
        icon: "el-icon-notebook-2",
        component: () =>
            import ("../views/web/VueSeamlessScroll.vue"),
    }, {
        path: prefix + "/vue-poster",
        name: "Vue Canvas Poster",
        icon: "el-icon-notebook-2",
        component: () =>
            import ("../views/web/VuePoster.vue"),
    }, {
        path: prefix + "/dom-capture",
        name: "DOM Capture",
        icon: "el-icon-notebook-2",
        component: () =>
            import ("../views/web/DOMCapture.vue"),
    }, {
        path: prefix + "/iframe-deliver",
        name: "动态添加Iframe数据交互",
        icon: "el-icon-notebook-2",
        component: () =>
            import ("../views/web/DynamicIframeDeliver.vue"),
    }, {
        path: prefix + "/streams-api",
        name: "Streams API",
        icon: "el-icon-notebook-2",
        component: () =>
            import ("../views/web/StreamsAPI.vue"),
    }, {
        path: prefix + "/fullscreen",
        name: "Web FullScreen",
        icon: "el-icon-notebook-2",
        component: () =>
            import ("../views/web/VueFullScreen.vue"),
    }, ],
};