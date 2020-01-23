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
      // setTimeout(next, 1000);
      next();
    });

    this.$router.afterEach(() => {
      this.loading = false;
    });
  }
}
</script>
<style lang="stylus" scoped>
.el-header {
  padding: 0;

  .el-menu {
    width: cacl(100% -220px);
  }
}

.el-tag.error {
  margin-top: 50px;
}
</style>