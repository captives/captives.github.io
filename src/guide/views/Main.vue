<template>
  <el-container>
    <el-header>
      <el-menu
        mode="horizontal"
        text-color="#FFFFFF"
        background-color="#545C64"
        active-text-color="#FFD04B"
        :collapse="isCollapse"
        :default-active="selectActive"
        @select="navSelectHandler"
      >
        <el-menu-item index="/index.html">
          <span class="nav-menu-logo">logo</span>
        </el-menu-item>
        <template v-for="item in routes">
          <el-submenu v-if="item.children" :key="item.path" :index="item.path">
            <template slot="title">
              <i :class="item.icon" v-if="item.icon"></i>
              <span slot="title">{{item.name}}</span>
            </template>

            <el-menu-item
              v-for="sub in item.children"
              :key="sub.path"
              :index="sub.path"
            >{{sub.name}}</el-menu-item>
          </el-submenu>
          <el-menu-item v-else :key="item.path" :index="item.path">{{item.name}}</el-menu-item>
        </template>
      </el-menu>
    </el-header>
    <el-container>
      <router-view />
    </el-container>
  </el-container>
</template>
<script>
import router, { routes } from './../router/index';
export default {
  name: "Main",
  data() {
    return {
      isCollapse: false,
      selectActive: '',
      routes
    }
  },
  methods: {
    searchPath() {
      const path = window.location.hash.substr(1, window.location.hash.length);
      this.selectActive = path || this.routes[0].path;
    },
    navSelectHandler(path) {
      console.log('nav', path);
      if (path.indexOf('.') != -1) {
        window.location.href = path;
      } else {
        this.selectActive = path;
        this.$router.push({ path });
      }
    }
  },
  activated() {
    this.searchPath();
  },
  created() {
    this.searchPath();
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

sub {
  display: inline;
  color: #fff;
  background: #3d7e9a;
  border-radius: 4px;
  padding: 3px 9px;
  font-size: 10px;
  margin: 0 5px;
  letter-spacing: 0.5px;
  vertical-align: middle;
}
</style>

<style lang="stylus" scoped>
.el-header {
  padding: 0;
  text-align: center;

  .el-menu {
    color: #FFF;
    width: cacl(100% -220px);

    .nav-menu-logo {
      width: 200px;
      float: left;
      outline: none;
      height: 60px;
      line-height: 60px;
    }
  }
}

.el-tag.error {
  margin-top: 50px;
}
</style>