<template>
  <el-container>
    <el-aside width="220px">
      <nav-menu class="nav-menu" :list="list" :prefix="prefix"></nav-menu>
    </el-aside>

    <el-container>
      <el-breadcrumb v-if="false" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
      </el-breadcrumb>

      <router-view />
      <el-footer></el-footer>
    </el-container>
  </el-container>
</template>
<script>

</script>
<script>
export default {
  name: "webrtc",
  data() {
    return {
      prefix: "/webrtc",
      selectIndex: "/index",
      list: [
        { name: "关键知识", path: '/index', icon: 'el-icon-s-flag' },
        { name: "用户设备列表", path: '/list', icon: 'el-icon-notebook-2' },
        { name: "视频流来自用户设备", path: '/stream-from-usermedia', icon: 'el-icon-camera' },
        { name: "动态选择用户设备", path: '/dynamic-selection-usermedia', icon: 'el-icon-orange' },
        { name: "视频流来自显示设备", path: '/stream-from-displaymedia', icon: 'el-icon-monitor' },
        { name: "视频流来自Video", path: '/stream-from-video', icon: 'el-icon-film' },
        { name: "视频流来自Canvas", path: '/stream-from-canvas', icon: 'el-icon-picture-outline' },
        { name: "音频输出到指定设备", path: '/audiooutput', icon: 'el-icon-headset' },
        { name: "媒体流可视化", path: '/visualizer', icon: 'el-icon-data-line' },
        { name: "媒体流音量测算", path: '/audio-volume', icon: 'el-icon-odometer' },
        { name: "媒体流混音", path: '/mixer', icon: 'el-icon-set-up' },
        { name: "对等连接", path: '/pc', icon: 'el-icon-connection' },
        { name: "对等连接传输流", path: '/remote', icon: 'el-icon-money' },
        { name: "用户设备流录制", path: '/recorder', icon: 'el-icon-video-camera' },
        { name: "显示设备录制流", path: '/display-media-recorder', icon: 'el-icon-video-camera-solid' },
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