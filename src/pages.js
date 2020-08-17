module.exports = {
    index: {
        entry: 'src/home/main.js',
        title: 'loading...',
        template: 'public/index.html',
        filename: 'index.html',
        chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
    live: {
        entry: 'src/live/main.ts',
        title: 'loading...',
        template: 'public/index.html',
        filename: 'live.html',
        chunks: ['chunk-vendors', 'chunk-common', 'live'],
    },
    guide: {
        entry: 'src/guide/main.js',
        title: 'loading...',
        template: 'public/video.html',
        filename: 'guide.html',
        chunks: ['chunk-vendors', 'chunk-common', 'guide'],
    },
    main: {
        entry: 'src/tutorial/main.ts',
        title: 'loading...',
        template: 'public/index.html',
        filename: 'main.html',
        chunks: ['chunk-vendors', 'chunk-common', 'main'],
    },
    charts: {
        entry: 'src/charts/main.js',
        title: 'loading...',
        template: 'public/index.html',
        filename: 'charts.html',
        chunks: ['chunk-vendors', 'chunk-common', 'charts'],
    }
}