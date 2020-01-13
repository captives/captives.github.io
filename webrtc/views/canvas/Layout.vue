<template>
  <el-container>
    <el-aside width="220px">
      <el-menu
        v-if="list.length"
        :router="true"
        :default-active="selectIndex"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item
          v-for="(item, index) in list"
          :key="index"
          :index="'m' + (index + 1)"
          :route="'/canvas' + item.to"
        >
          <i :class="item.icon"></i>
          {{item.label}}
        </el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <router-view />
      <el-footer></el-footer>
    </el-container>
  </el-container>
</template>
<script>

</script>
<script>
export default {
  name: "Web",
  data() {
    return {
      selectIndex: 'm1',
      list: [
        { label: "API", to: '/index', icon: 'el-icon-printer' },
        { label: "视频绘图", to: '/video', icon: 'el-icon-printer' },
        { label: "视频画面分屏", to: '/video-split', icon: 'el-icon-printer' },
        { label: "视频画面拼接", to: '/video-splicing', icon: 'el-icon-printer' },
        { label: "视频画面绿屏抠图", to: '/video-green-screen', icon: 'el-icon-printer' },
        { label: "视频画面分割拷贝", to: '/video-split-copy', icon: 'el-icon-printer' },

        { label: "fabric 基础", to: '/base', icon: 'el-icon-printer' },
        { label: "视频绘图fabric", to: '/video-for-fabric', icon: 'el-icon-printer' },
      ]
    }
  },
  mounted() {
    let path = this.$route.path;
    path  = path && path.split('/');
    path = '/' + path[path.length -1];
    console.log(path);
    const item = this.list.find((item, index) => path == item.to);
    this.selectIndex = 'm' + (this.list.indexOf(item) + 1);
  }
}
</script>
<style lang="stylus" scoped>
.el-aside {
  .el-menu {
    height: 100%;
  }
}

.el-container {
  .el-breadcrumb {
    margin-left: 20px;
    line-height: 45px;
  }
}
</style>