<template>
  <el-container>
    <el-aside width="220px">
      <el-menu
        v-if="list.length"
        :router="true"
        default-active="m1"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-menu-item
          v-for="(item, index) in list"
          :key="index"
          :index="'m' + (index + 1)"
          :route="'/openvidu' + item.to"
        >
          <i :class="item.icon"></i>{{item.label}}
        </el-menu-item>
      </el-menu>
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
      list: [
        { label: "关键知识", to: '/index', icon: 'el-icon-menu' },
        { label: "Hello World", to: '/hello', icon: 'el-icon-menu' },
        { label: "AudioVideoCall", to: '/avcall', icon: 'el-icon-menu' },
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