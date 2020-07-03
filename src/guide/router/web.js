const prefix = "/web";
export { prefix };

export default
    {
        path: prefix,
        name: 'HTML5 Web',
        component: () => import('../views/web/Layout.vue'),
        redirect: prefix + '/index',
        children: [
            { path: prefix + '/index', name: 'HTML5', component: () => import('../views/web/index.vue') },
            { path: prefix + '/video-js', name: 'VideoJS', component: () => import('../views/web/VideoJs.vue') },
            { path: prefix + '/xgvideo', name: 'XGVideo', component: () => import('../views/web/XGVideo.vue') },
            { path: prefix + '/audio-lrc', name: 'LRC播放器', component: () => import('../views/web/AudioLRC.vue') },
            { path: prefix + '/media-source', name: 'Media Source', component: () => import('../views/web/MediaSource.vue') },
            { path: prefix + '/html-to-canvas', name: 'html2canvas', component: () => import('../views/web/Html2Canvas.vue') },
            { path: prefix + '/cropperjs', name: 'cropper', component: () => import('../views/web/VueCropperjs.vue') },
            { path: prefix + '/vue-cropper', name: 'vue cropper', component: () => import('../views/web/VueCropper.vue') },
            { path: prefix + '/pdf-js', name: 'PDF Js', component: () => import('../views/web/PDFJs.vue') },
            { path: prefix + '/websql', name: 'Web SQL', component: () => import('../views/web/WebSQL.vue') },
            { path: prefix + '/vue-apollo-client', name: 'VueApolloClient', component: () => import('../views/web/VueApolloClient.vue') },
            { path: prefix + '/math-jax', name: 'MathJax', component: () => import('../views/web/MathJax.vue') },
            { path: prefix + '/vue-scroller', name: '无限滚动', component: () => import('../views/web/VueSeamlessScroll.vue') },
        ]
    }
