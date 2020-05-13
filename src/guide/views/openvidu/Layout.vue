<template>
  <el-container>
    <el-aside width="220px">
      <nav-menu class="nav-menu" :list="list" :prefix="prefix"></nav-menu>
    </el-aside>

    <el-container>
      <router-view />
      <el-footer>Footer</el-footer>
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
      prefix: "/openvidu",
      list: [
        { name: "关键知识", path: '/index', icon: 'el-icon-menu' },
        { name: "Hello World", path: '/hello', icon: 'el-icon-menu' },
        { name: "AudioVideoCall", path: '/avcall', icon: 'el-icon-menu' },
      ]
    }
  },
}
</script>
<style lang="stylus" scoped>
.el-aside {
  .el-menu {
    height: 100%;
  }
}
</style>

<style lang="stylus">
.el-tag.error {
  margin-top: 50px;
}
</style>