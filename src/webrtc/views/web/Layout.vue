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
          :route="'/web' + item.to"
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
        { label: "关键知识", to: '/index', icon: 'el-icon-s-flag' },
        { label: "VideoJs", to: '/video-js', icon: 'el-icon-notebook-2' },
        { label: "西瓜视频", to: '/xgvideo', icon: 'el-icon-notebook-2' },
        { label: "简单LRC播放器", to: '/audio-lrc', icon: 'el-icon-notebook-2' },
        { label: "MediaSource", to: '/media-source', icon: 'el-icon-notebook-2' },
        { label: "html2canvas", to: '/html-to-canvas', icon: 'el-icon-notebook-2' },
        { label: "cropperjs", to: '/cropperjs', icon: 'el-icon-notebook-2' },
        { label: "vue cropper", to: '/vue-cropper', icon: 'el-icon-notebook-2' },
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