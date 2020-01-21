<template>
  <el-container id="app" class="fill">
    <el-header>
      <a href="/">Home</a>
      <router-link to="/" name="Home">目录</router-link>
      <router-link to="/e-charts" name="echarts">E-Charts</router-link>
      <router-link to="/about" name="About">About</router-link>
    </el-header>
    <router-view></router-view>
  </el-container>
</template>
<script>
export default {
  name: "App",
}
</script>
<style lang="stylus" scoped>
.el-header {
  text-align: center;
  background-color: rgb(84, 92, 100);

  a {
    color: #FFF;
    display: inline-block;
    padding: 0 10px;
    margin: 0 10px;
    line-height: 60px;
    text-decoration: none;
  }
}

.chart {
  width: 1800px;
  height: 720px;
  display: inline-block;
}
</style>