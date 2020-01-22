<template>
  <el-container id="app" class="fill">
    <el-header>
      <el-menu
        class="nav"
        :router="true"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        @select="navChangeHandler"
      >
        <el-menu-item index="0" disabled>
          <!--路由不同，展示不同logo
            <img
            style="display:block;object-fit:contain; height:60px; width:220px"
            src="https://openvidu.io/img/logos/openvidu_vert_white_bg_trans_cropped.png"
          />-->
        </el-menu-item>
        <el-menu-item v-for="item in list" :key="item.to" :index="item.to" :route="item.to">
          <i :class="item.icon"></i>
          {{item.label}}
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-container v-loading="loading">
      <router-view />
    </el-container>
  </el-container>
</template>
<script>
import route1 from './router/index'
export default {
  name: "",
  data() {
    return {
      loading: false,
      index: '0',
      list: [
        { label: "Home", to: '/index.html', logo: './assets/logo.png' },
        { label: "HTML5 Web", to: '/web', logo: null },
        { label: "Canvas", to: '/canvas', logo: null },
        { label: "WebRTC", to: '/webrtc', logo: null },
        { label: "OpenVidu", to: '/openvidu', logo: null },
        { label: "图表", to: '/charts.html', logo: null },
        { label: "处理中心", to: '/about', logo: null },
      ]
    }
  },
  methods: {
    navChangeHandler(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  created() {
    console.log('33333', route1);
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