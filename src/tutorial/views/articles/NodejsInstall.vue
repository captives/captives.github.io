<template>
  <el-main>
    <h3>安装Nodejs</h3>
    <p>命令行下载</p>
    <vue-code>
      <pre lang="sh">
wget https://nodejs.org/dist/.../node-v4.2.1-linux-x64.tar.gz</pre
      >
    </vue-code>
    <p>解压缩文件</p>
    <vue-code>
      <pre lang="sh">tar –zxvf node-v4.2.1-linux-x64.tar.gz</pre>
    </vue-code>
    <p>
      移动副本目录到
      <em>/opt/</em>下
    </p>
    <vue-code>
      <pre lang="sh">sudo cp -r node-v4.2.1-linux-x64/ /opt/</pre>
    </vue-code>
    <p>设置全局软连接</p>
    <vue-code>
      <pre lang="sh">
sudo ln -s /opt/node-v4.2.1-linux-x64/bin/node /usr/local/bin/node</pre
      >
      <pre lang="sh">
sudo ln -s /opt/node-v4.2.1-linux-x64/bin/npm /usr/local/bin/npm</pre
      >
    </vue-code>
    <p>查看安装版本号</p>
    <vue-code>
      <pre lang="sh">node -v</pre>
      <pre lang="sh">npm -v</pre>
    </vue-code>

    <h3>npm install 镜像仓库</h3>
    <p>查看镜像仓库</p>
    <vue-code>
      <pre lang="sh">npm config get registry  #https://registry.npmjs.org/</pre>
    </vue-code>

    <p>如果使用npm安装一些包失败，可使用以下三种办法任意一种都能解决问题</p>
    <p>
      1、通过
      <em>config</em>命令
    </p>
    <vue-code>
      <pre lang="sh">
npm config set registry https://registry.npm.taobao.org</pre
      >
      <pre lang="sh">npm info underscore #查看underscore模块信息</pre>
    </vue-code>

    <p>2、命令行指定</p>
    <vue-code>
      <pre lang="sh">npm --registry https://registry.npm.taobao.org</pre>
    </vue-code>

    <p>
      3、编辑
      <em>~/.npmrc</em>加入以下内容
    </p>
    <span>
      windows路径在
      <em>{npm_install_dir}/node_modules/npm/npmrc</em>
    </span>
    <vue-code>
      <pre lang="sh">registry = https://registry.npm.taobao.org</pre>
    </vue-code>

    <h3>Nodejs 调试</h3>
    <p>启动</p>
    <vue-code>
      <pre lang="sh">node –inspect index.js</pre>
    </vue-code>
    <span>
      一共有两种打开调试工具的方法，第一种是在 Chrome 浏览器的地址栏，键入
      <em>chrome://inspect</em>或者 <em>about:inspect</em>进入, 在
      Devices/Target 部分，点击 inspect 链接，就能进入调试工具了。
    </span>
  </el-main>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "NodejsInstall",
})
export default class NodejsInstall extends Vue {}
</script>
<style lang="stylus" scoped>
.el-main {
  text-align: initial;
  width: 60%;
  min-width: 750px;
  margin: 0 auto;
}
</style>
