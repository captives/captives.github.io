const prefix = "/web";
export { prefix };

export default
    {
        path: prefix,
        name: 'HTML5 Web',
        component: () => import('../views/web/Layout.vue'),
        redirect: prefix + '/index',
        children: [
            { path: prefix + '/index', name: '关键知识', icon: 'el-icon-s-flag', component: () => import('../views/web/index.vue') },
            { path: prefix + '/video-js', name: 'VideoJs', icon: 'el-icon-notebook-2', component: () => import('../views/web/VideoJs.vue') },
            { path: prefix + '/xgvideo', name: '西瓜视频', icon: 'el-icon-notebook-2', component: () => import('../views/web/XGVideo.vue') },
            { path: prefix + '/audio-lrc', name: '简单LRC播放器', icon: 'el-icon-notebook-2', component: () => import('../views/web/AudioLRC.vue') },
            { path: prefix + '/media-source', name: 'Media Source', icon: 'el-icon-notebook-2', component: () => import('../views/web/MediaSource.vue') },
            { path: prefix + '/html-to-canvas', name: 'html2canvas', icon: 'el-icon-notebook-2', component: () => import('../views/web/Html2Canvas.vue') },
            { path: prefix + '/cropperjs', name: 'Cropperjs', icon: 'el-icon-notebook-2', component: () => import('../views/web/VueCropperjs.vue') },
            { path: prefix + '/vue-cropper', name: 'Vue Cropper', icon: 'el-icon-notebook-2', component: () => import('../views/web/VueCropper.vue') },
            { path: prefix + '/pdf-js', name: 'PDF 在线阅读器', icon: 'el-icon-notebook-2', component: () => import('../views/web/PDFJs.vue') },
            { path: prefix + '/websql', name: 'Web SQL', icon: 'el-icon-notebook-2', component: () => import('../views/web/WebSQL.vue') },
            { path: prefix + '/vue-apollo-client', name: 'Vue Apollo Client"', icon: 'el-icon-notebook-2', component: () => import('../views/web/VueApolloClient.vue') },
            { path: prefix + '/math-jax', name: 'MathJax', icon: 'el-icon-notebook-2', component: () => import('../views/web/MathJax.vue') },
            { path: prefix + '/vue-scroller', name: '无限滚动', icon: 'el-icon-notebook-2', component: () => import('../views/web/VueSeamlessScroll.vue') },
        ]
    }
