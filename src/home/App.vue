<template>
  <el-container id="app">
    <el-header class="center">
      <el-row class="nav">
        <router-link to="/">首页</router-link>
        <a href="/live.html">会议室</a>
        <a href="/guide.html">指南</a>
        <a href="/charts.html">图表</a>
        <router-link to="/tools">工具</router-link>
        <a href="/sprite/index.html">雪碧图</a>
        <a href="/list.html">收藏夹</a>
      </el-row>
    </el-header>
    <router-view />
    <!-- <el-footer>Footer</el-footer> -->
  </el-container>
</template>
<style lang="stylus" scoped>
.el-header {
  .nav {
    justify-content: center;
  }

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