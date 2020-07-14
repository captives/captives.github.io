<template>
  <el-container>
    <el-aside width="220px">
      <nav-menu class="nav-menu" :list="list" :prefix="prefix"></nav-menu>
    </el-aside>
    <el-main>
      <keep-alive>
        <router-view />
      </keep-alive>
    </el-main>
  </el-container>
</template>
<script>

</script>
<script>
import NavMenu from './../../components/NavMenu';
export default {
  name: "Web",
  components: { NavMenu },
  data() {
    return {
      prefix: '/tools',
      list: [
        { name: "DashBoard", path: '/dashboard', icon: 'el-icon-s-flag' },
        { name: "QR Code", path: '/qr-code', icon: 'el-icon-s-flag' },
        { name: "Element UI", path: '/element', icon: 'el-icon-s-flag' },
        { name: "Element Tree", path: '/vetree', icon: 'el-icon-s-flag' },
        { name: "URL编解码", path: '/url-format', icon: 'el-icon-s-flag' },
        { name: "水平尺", path: '/ruler', icon: 'el-icon-s-flag' },
        { name: "拖放", path: '/drop', icon: 'el-icon-s-flag' },
        { name: "Vue Mixins", path: '/vue-mixins', icon: 'el-icon-s-flag' },
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