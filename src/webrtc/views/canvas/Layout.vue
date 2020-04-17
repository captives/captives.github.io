<template>
  <el-container>
    <el-aside width="220px">
      <nav-menu class="nav-menu" :list="list" :prefix="prefix"></nav-menu>
    </el-aside>

    <el-container>
      <router-view />
    </el-container>
  </el-container>
</template>
<script>

</script>
<script>
export default {
  name: "Layout",
  data() {
    return {
      prefix: '/canvas',
      list: [
        { name: "API", path: '/index', icon: 'el-icon-printer' },
        { name: "视频绘图", path: '/video', icon: 'el-icon-printer' },
        { name: "视频画面分屏", path: '/video-split', icon: 'el-icon-printer' },
        { name: "视频画面拼接", path: '/video-splicing', icon: 'el-icon-printer' },
        { name: "视频画面绿屏抠图", path: '/video-green-screen', icon: 'el-icon-printer' },
        { name: "视频画面分割拷贝", path: '/video-split-copy', icon: 'el-icon-printer' },

        { name: "fabric 基础", path: '/base', icon: 'el-icon-printer' },
        { name: "fabric 画板", path: '/drawboard', icon: 'el-icon-printer' },
        { name: "视频绘图fabric", path: '/video-for-fabric', icon: 'el-icon-printer' },
      ]
    }
  }
}
</script>
<style lang="stylus" scoped>
.el-aside {
  .nav-menu {
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