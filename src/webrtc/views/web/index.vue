<template>
  <el-main>
    <el-tabs type="border-card">
      <el-tab-pane v-for="item in list" :key="item.label" :label="item.label">
        <iframe :src="item.url"></iframe>
      </el-tab-pane>
    </el-tabs>
  </el-main>
</template>
<script>
export default {
  name: "index",
  data() {
    return {
      list: [
        { label: '西瓜播放器', url: "//h5player.bytedance.com/" },
        { label: 'video.js', url: "//videojs.com/" },
        { label: 'MediaElement.js', url: "//www.mediaelementjs.com/" },
      ]
    }
  },
}
</script>
<style lang="stylus" scoped>
.el-main {
  overflow: hidden;

  .el-tabs {
    width: 100%;
    height: 100%;

    >>> .el-tabs__content {
      height: calc(100% - 69px);

      .el-tab-pane {
        height: 100%;
      }
    }

    iframe {
      width: 100%;
      height: 100%;
      border: none;
    }
  }
}
</style>