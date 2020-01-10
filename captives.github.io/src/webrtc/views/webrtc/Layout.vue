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
          :route="'/webrtc' + item.to"
        >
          <i :class="item.icon"></i>
          {{item.label}}
        </el-menu-item>
      </el-menu>
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
      selectIndex: 'm1',
      list: [
        { label: "关键知识", to: '/index', icon: 'el-icon-s-flag' },
        { label: "用户设备列表", to: '/list', icon: 'el-icon-notebook-2' },
        { label: "视频流来自用户设备", to: '/stream-from-usermedia', icon: 'el-icon-camera' },
        { label: "视频流来自显示设备", to: '/stream-from-displaymedia', icon: 'el-icon-monitor' },
        { label: "视频流来自Video", to: '/stream-from-video', icon: 'el-icon-film' },
        { label: "视频流来自Canvas", to: '/stream-from-canvas', icon: 'el-icon-picture-outline' },
        { label: "媒体流可视化", to: '/visualizer', icon: 'el-icon-data-line' },
        { label: "媒体流音量测算", to: '/audio-volume', icon: 'el-icon-odometer' },
        { label: "媒体流混音", to: '/mixer', icon: 'el-icon-set-up' },
        { label: "对等连接", to: '/pc', icon: 'el-icon-connection' },
        { label: "对等连接传输流", to: '/remote', icon: 'el-icon-money' },
        { label: "用户设备流录制", to: '/recorder', icon: 'el-icon-video-camera' },
        { label: "显示设备录制流", to: '/display-media-recorder', icon: 'el-icon-video-camera-solid' },
      ]
    }
  },
  mounted() {
    const path = this.$route.path;
    const item = this.list.find((item, index) => path.indexOf(item.to) != -1);
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