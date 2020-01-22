<template>
  <el-container>
    <el-aside width="220px">
      <nav-menu class="nav-menu" :list="list" :prefix="prefix"></nav-menu>
    </el-aside>

    <el-container>
      <keep-alive>
        <router-view />
      </keep-alive>
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
      prefix: '/web',
      list: [
        { name: "关键知识", path: '/index', icon: 'el-icon-s-flag' },
        { name: "VideoJs", path: '/video-js', icon: 'el-icon-notebook-2' },
        { name: "西瓜视频", path: '/xgvideo', icon: 'el-icon-notebook-2' },
        { name: "简单LRC播放器", path: '/audio-lrc', icon: 'el-icon-notebook-2' },
        { name: "MediaSource", path: '/media-source', icon: 'el-icon-notebook-2' },
        { name: "html2canvas", path: '/html-to-canvas', icon: 'el-icon-notebook-2' },
        { name: "cropperjs", path: '/cropperjs', icon: 'el-icon-notebook-2' },
        { name: "vue cropper", path: '/vue-cropper', icon: 'el-icon-notebook-2' },
        { name: "PDF 在线阅读器", path: '/pdf-js', icon: 'el-icon-notebook-2' },
      ]
    }
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