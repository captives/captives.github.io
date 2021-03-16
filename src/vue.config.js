//TODO 打包优化 https://zhuanlan.zhihu.com/p/105480113
const VueFilenameInjector = require('@d2-projects/vue-filename-injector');

module.exports = {
    pages: require("./src/pages.js"),

    //基本路径
    publicPath: "./",

    //输出文件目录
    outputDir: "./captives.github.io",

    //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
    assetsDir: "assets",

    runtimeCompiler: true,
    parallel: true,
    lintOnSave: false,

    //生产环境是否生成 sourceMap 文件，一般情况不建议打开
    productionSourceMap: false,
    configureWebpack: {
        //写法一：排除不需要打包到项目中的外部库
        externals: {
            //包名 ： 全局变量
            // vue: 'Vue',
            // 'vue-router': 'VueRouter',
            // axios: 'axios'
        }
    },
    chainWebpack: (config) => {
        // 生产环境，开启js\css压缩
        if (process.env.NODE_ENV === "production") {
            // 删除系统默认的splitChunk
            config.optimization.delete("splitChunks");
        }
        // in here, only with chainWebpack
        VueFilenameInjector(config, {
            propName: '__source' // default
        });

        //写法二：排除不需要打包到项目中的外部库
        // config.externals({ 'AMap': 'AMap', 'AMapUI': 'AMapUI' })
        console.log('------', config);
    },

    // css: {
    //     // 启用 CSS modules
    //     modules: false,
    //     // 是否使用css分离插件
    //     extract: process.env.NODE_ENV === "production",
    //     // 开启 CSS source maps，一般不建议开启
    //     sourceMap: false
    // },
    devServer: {
        // https: true,
        port: 2000,
        proxy: "https://local.uuabc.com:2020/", //live -> source-server
        // public: 'https://local.uuabc.com:8080/',
        allowedHosts: ["localhost", "local.uuabc.com"],
    },

    css: {
        loaderOptions: {
            stylus: {
                'resolve url': true,
                'import': [
                    './src/travel/theme'
                ]
            }
        }
    },

    pluginOptions: {
        'cube-ui': {
            postCompile: true,
            theme: true
        }
    }
};