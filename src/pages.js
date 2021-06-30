module.exports = {
    index: {
        entry: "src/home/main.js",
        title: "loading...",
        template: "public/index.html",
        filename: "index.html",
        chunks: ["chunk-vendors", "chunk-common", "index"],
        styles: [
            "https://unpkg.com/element-ui/lib/theme-chalk/index.css",
        ],
        scripts: [
            "https://unpkg.com/element-ui/lib/index.js",
        ]
    },
    live: {
        entry: "src/live/main.ts",
        title: "loading...",
        template: "public/index.html",
        filename: "live.html",
        chunks: ["chunk-vendors", "chunk-common", "live"],
        styles: [
            "https://unpkg.com/element-ui/lib/theme-chalk/index.css",
        ],
        scripts: [
            "https://unpkg.com/element-ui/lib/index.js",
            "https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js",
        ]
    },
    guide: {
        entry: "src/guide/main.js",
        title: "loading...",
        template: "public/video.html",
        filename: "guide.html",
        chunks: ["chunk-vendors", "chunk-common", "guide"],
        styles: [
            "https://unpkg.com/element-ui/lib/theme-chalk/index.css",
        ],
        scripts: [
            "https://unpkg.com/element-ui/lib/index.js",
            "https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js",
            "https://cdn.bootcdn.net/ajax/libs/cropperjs/1.5.12/cropper.min.js",
            "https://cdn.bootcdn.net/ajax/libs/fingerprintjs/0.5.3/fingerprint.min.js",
            "https://cdn.bootcdn.net/ajax/libs/html2canvas/0.5.0-beta4/html2canvas.min.js"
        ]
    },
    main: {
        entry: "src/tutorial/main.ts",
        title: "loading...",
        template: "public/index.html",
        filename: "main.html",
        chunks: ["chunk-vendors", "chunk-common", "main"],
        styles: [
            "https://unpkg.com/element-ui/lib/theme-chalk/index.css",
        ],
        scripts: [
            "https://unpkg.com/element-ui/lib/index.js",
            "https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js",
        ]
    },
    travel: {
        entry: "src/travel/main.ts",
        title: "loading...",
        template: "public/index.html",
        filename: "travel.html",
        chunks: ["chunk-vendors", "chunk-common", "travel"],
        styles: [
            "https://cdn.bootcdn.net/ajax/libs/vant/3.1.0/index.min.css",
            "https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.min.css"
        ],
        scripts: [
            "https://cdn.bootcdn.net/ajax/libs/vant/3.1.0/vant.min.js",
            "https://cdn.bootcdn.net/ajax/libs/axios/0.21.1/axios.min.js",
        ]
    },
    charts: {
        entry: "src/charts/main.js",
        title: "loading...",
        template: "public/index.html",
        filename: "charts.html",
        chunks: ["chunk-vendors", "chunk-common", "charts"],
        styles: [
            "https://unpkg.com/element-ui/lib/theme-chalk/index.css",
        ],
        scripts: [
            "https://unpkg.com/element-ui/lib/index.js",
            "https://cdn.bootcdn.net/ajax/libs/echarts/5.1.2/echarts.min.js"
        ]
    },
};