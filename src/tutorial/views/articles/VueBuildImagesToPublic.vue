<template>
    <el-main>
        <h1>Vue 项目打包时自动把所有图片的本地路径改为 CDN 路径</h1>
        <div>
            开发时，写的图片路径通常是相对路径，在 webpack 的配置中可以进行配置，配置后在打包时就可以自动将我们写的相对路径转换成 CDN 路径：
            <p>@/assets/images/logo.png或../../assets/images/logo.png -> https://liuxy0551.gitee.io/image-hosting/images</p>
        </div>

        <h3>vue.config.js</h3>
        <div>
            1、process.env.NODE_ENV 判断项目环境; <br>
            2、相关选项写在了 url-loader 里, url-loader 的作用是将图片引用方式转换为 base64 的内联引用方式 <br>
            3、配置 limit (默认 10000)，可使文件大小小于此 limit 值(单位为 byte)的文件转换为 base64 格式, 大于此 limit 的, 会执行 options 中的 fallback 配置项 <br>
            4、fallback 默认值为 file-loader, 而且 url-loader 的 options 配置项也会被传递给 file-loader <br>
        </div>
        <vue-code>
            <pre lang="js">// vue.config.js
module.exports = {
  chainWebpack: config => {
    config
      .module
      .rule("images")
      .test(/\.(jpe?g|png|gif)$/i)
      .use("url-loader")
      .loader("url-loader")
      .options({
        limit: 10000,
        publicPath: process.env.NODE_ENV === 'production' ? 'https://liuxy0551.gitee.io/image-hosting/images' : '',
        outputPath: 'img',
        name: '[name].[ext]'
      })
      .end()
  }
}
            </pre>
        </vue-code>
    </el-main>
</template>