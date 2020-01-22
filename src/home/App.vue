<template>
  <el-container id="app">
    <el-header class="center">
      <el-row class="nav">
        <router-link to="/">Home</router-link>
        <router-link to="/element">ElementUI</router-link>
        <router-link to="/url-format">URL编解码</router-link>
        <a href="/live.html">LIVE</a>
        <a href="/webrtc.html">WEB RTC</a>
        <a href="/charts.html">图表</a>
        <a href="/sprite/index.html">雪碧图</a>
        <a href="/list.html">收藏夹</a>
        <router-link to="/about">处理中心</router-link>
      </el-row>
    </el-header>
    <router-view />
    <!-- <el-footer>Footer</el-footer> -->
  </el-container>
</template>
<style lang="stylus" scoped>
.el-header {
  a {
    display: inline-block;
    white-space: nowrap;
    padding: 0 10px;
    margin: 0 10px;
    line-height: 60px;
    text-decoration: none;
  }
}
</style>