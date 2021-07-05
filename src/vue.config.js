//TODO 打包优化 https://zhuanlan.zhihu.com/p/105480113
const path = require('path');
const VueFilenameInjector = require('@d2-projects/vue-filename-injector');
const pages = require("./src/pages.js");
const prod = process.env.NODE_ENV === "production";
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    pages,
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
    configureWebpack: config => {
        //排除不需要打包到项目中的外部库
        config.externals = {
            vue: 'Vue',
            axios: 'axios',
            vant: "vant",
            'vue-router': 'VueRouter',
            'element-ui': 'ELEMENT'
        };

        //定义别名
        // config.resolve = {
        //     // 别名
        //     alias: {
        //         '@': path.resolve(__dirname, './src'),
        //         '~': path.resolve(__dirname, './public'),
        //     }
        // };
    },
    chainWebpack: (config) => {
        console.log('keys', Object.keys(pages));
        //修改pages内部指定的模版参数，可以直接在pages内部增加
        Object.keys(pages).forEach(key => {
            config.plugin('html-' + key).tap(items => {
                items[0].styles = items[0].styles || [];
                items[0].scripts = items[0].scripts || [];
                items[0].styles = items[0].styles.concat([
                    "https://cdn.bootcdn.net/ajax/libs/cropperjs/1.5.12/cropper.min.css"
                ]);

                items[0].scripts = [
                    "https://cn.vuejs.org/js/vue.min.js",
                    "https://cdn.bootcdn.net/ajax/libs/vue-router/3.5.1/vue-router.min.js",
                ].concat(items[0].scripts)
                console.log(key, items);
                return items;
            });
        });

        //图片压缩
        // config.module
        //     .rule('images')
        //     .use('image-webpack-loader')
        //     .loader('image-webpack-loader')
        //     .options({ bypassOnDebug: true })
        //     .end();

        //文件拷贝
        // config.plugin('copy')
        //     .use(require('copy-webpack-plugin'), [
        //         [{
        //             from: path.resolve(__dirname, 'src/assets/page.css'),
        //             to: path.resolve(__dirname, 'dist/css'),
        //         }]
        //     ]);

        // 生产环境，开启js\css压缩
        if (process.env.NODE_ENV === "production") {
            // 删除系统默认的splitChunk
            config.optimization.delete("splitChunks");
        }
        // in here, only with chainWebpack
        VueFilenameInjector(config, {
            propName: '__source' // default
        });
    },

    css: {
        // 是否使用css分离插件
        extract: true,
        // 开启 CSS source maps， 一般不建议开启
        sourceMap: false,
        // 因为配置了loaderOptions.css, 尽管requireModuleExtension的值为默认值，我们也需要指出
        requireModuleExtension: true,
        loaderOptions: {
            // 定义全局scss无需引入即可使用
            // sass: {
            //     prependData: `
            //         @import "@/assets/themes-cayman/page-markdown.scss";
            //     `
            // },
            scss: {
                prependData: `
                    @import "@/assets/themes-cayman/page-markdown.scss";
                `
            }
        }
    },

    devServer: {
        // https: true,
        port: 2000,
        proxy: "https://local.uuabc.com:2020/", //live -> source-server
        // public: 'https://local.uuabc.com:8080/',
        allowedHosts: ["localhost", "local.uuabc.com"],
    },
};