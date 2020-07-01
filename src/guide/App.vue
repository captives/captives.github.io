<template>
  <el-container id="app" class="fill">
    <el-header>
      <nav-menu :list="list" mode="horizontal" class="nav"></nav-menu>
    </el-header>
    <el-container v-loading="loading">
      <router-view />
    </el-container>
  </el-container>
</template>
<script>
import route1 from './router/index'
export default {
  name: "App",
  data() {
    return {
      loading: false,
      list: [
        { name: "Home", path: '/index.html', logo: './assets/logo.png' },
        { name: "目录", path: '/', logo: './assets/logo.png' },
        { name: "HTML5 Web", path: '/web', logo: null },
        { name: "Canvas", path: '/canvas', logo: null },
        { name: "WebRTC", path: '/webrtc', logo: null },
        { name: "OpenVidu", path: '/openvidu', logo: null },
        { name: "图表", path: '/charts.html', logo: null },
        { name: "处理中心", path: '/about', logo: null },
      ]
    }
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      this.loading = true;
      next();
    });

    this.$router.afterEach(() => {
      this.loading = false;
      document.title = this.$route.name;
    });
  }
}
</script>

<style>
.scroll::-webkit-scrollbar {
  /* 滚动条整体样式 */
  width: 6px;
  height: 6px;
  margin-right: 20px;
}

.scroll::-webkit-scrollbar-thumb {
  /* 滚动条里面小方块 */
  border-radius: 10px;
  box-shadow: inset 0 0 2px rgba(0, 0, 0, 0.2);
  background: #ccc;
}

.scroll::-webkit-scrollbar-track {
  /* 滚动条里面轨道 */
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  height: 10px;
  background: rgba(0, 0, 0, 0);
}
</style>

<style lang="stylus">
video, audio {
  outline: none;
}

ve {
  display: inline;
  color: #fff;
  background: #3d7e9a;
  border-radius: 4px;
  padding: 3px 9px;
  font-size: 10px;
  margin: 0 5px;
}
</style>

<style lang="stylus" scoped>
.el-header {
  padding: 0;
  text-align: center;

  .el-menu {
    width: cacl(100% -220px);
  }
}

.el-tag.error {
  margin-top: 50px;
}
</style>