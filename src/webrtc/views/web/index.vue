<template>
  <el-main>
    <el-tabs type="border-card">
      <el-tab-pane v-for="item in list" :key="item.label" :label="item.label">
        <p v-if="item.desc">{{item.desc}}</p>
        <iframe :src="item.url" allow="autoplay" frameborder="0" scrolling="no"></iframe>
        <canvas style="position:absolute; width:100%;height:100%;top:0;left:0"></canvas>
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
        // { label: '自动播放策略', url: "https://dev.redis.server/testIframe.html" },
        // { label: '淘宝镜像', url: "//npm.taobao.org/" },
        // { label: '西瓜播放器', url: "//h5player.bytedance.com/" },
        // { label: 'video.js', url: "//videojs.com/" },
        // { label: 'MediaElement.js', url: "//www.mediaelementjs.com/" },
      ]
    }
  },
  mounted() {
    setTimeout(() => {
      this.list.push({ label: '自动播放策略', url: "/v3/testIframe.html", desc:"这里模拟百家云教室加载课件" });
    }, 5000);
  }
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