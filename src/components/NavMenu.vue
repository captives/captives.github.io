<template>
  <el-menu
    v-if="list.length"
    :router="true"
    :default-active="selectIndex"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    @select="menuChangeHandler"
  >
    <template v-for="item in list">
      <template v-if="item.path.indexOf('.html') != -1">
        <el-menu-item :index="item.path" :key="item.path">
          <i :class="item.icon"></i>
          <el-link :href="item.path">{{item.name}}</el-link>
        </el-menu-item>
      </template>

      <template v-else>
        <el-menu-item :index="item.path" :route="prefix + item.path" :key="item.path">
          <i :class="item.icon"></i>
          {{item.name}}
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>
   
<script>
export default {
  name: "NavMenu",
  props: {
    prefix: {
      type: String, default: ""
    },
    list: {
      type: Array,
      default: () => []
    },
    routes: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectIndex: "/index",
    }
  },
  computed: {
    path() { //判断path是否在routes中
      return (path) => {
        return this.searchPath(path);
      }
    }
  },
  methods: {
    searchPath(path) {
      // let list = this.prefix.split('/');
      // this.routes.map(route => {

      // });

    },
    menuChangeHandler(key, keyPath) {
      console.log(this.prefix, key, keyPath);
    }
  },
  created() {
    const path = this.$route.path;
    const item = this.list.find((item, index) => path.indexOf(item.path) != -1);
    this.selectIndex = item.path;
  }
}
</script>
<style lang="stylus" scoped>
.el-menu {
  .el-link {
    color: #FFF;
  }
}
</style>