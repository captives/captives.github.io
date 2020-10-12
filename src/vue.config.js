module.exports = {
  pages: require('./src/pages.js'),
  //基本路径
  publicPath: './',
  //输出文件目录
  outputDir: "./captives.github.io",
  //放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'assets',
  //是否使用包含运行时编译器的 Vue 构建版本
  runtimeCompiler: false,
  //生产环境是否生成 sourceMap 文件，一般情况不建议打开
  productionSourceMap: process.env.NODE_ENV !== 'production',
  //是否在保存的时候检查
  lintOnSave: process.env.NODE_ENV !== 'production',
  chainWebpack: config => {
    config.optimization.delete('splitChunks')
  },
  // css: {
  //   // 启用 CSS modules
  //   modules: false,
  //   // 是否使用css分离插件
  //   extract: false,
  //   // 开启 CSS source maps，一般不建议开启
  //   sourceMap: false
  // },
  devServer: {
    // https: true,
    port: 2000,
    proxy: 'https://local.uuabc.com:2020/', //live -> source-server
    // public: 'https://local.uuabc.com:8080/',
    allowedHosts: [
      'localhost',
      'local.uuabc.com'
    ]
  }
}
