<template>
  <el-container>
    <el-header id="nav">
      <router-link v-for="item in routes" :key="item.path" :to="item.path">{{
        item.name
      }}</router-link>
    </el-header>
    <router-view></router-view>
  </el-container>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import router from "./../router";
@Component({ name: "App" })
export default class App extends Vue {
  private routes: Array<any> = [];

  private created() {
    //@ts-ignore
    this.routes = router.options.routes;
    //@ts-ignore
    this.$router.afterEach(() => {
      //@ts-ignore
      document.title = this.$route.name;
    });
  }
}
</script>
<style lang="stylus">
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.el-drawer__wrapper {
  >>> .el-drawer:focus {
    outline: none;
  }

  >>> .el-drawer__header {
    padding-top: 20px;
    margin-bottom: 10px;

    &:focus, button:focus {
      outline: none;
    }
  }

  >>> .el-drawer__body {
    position: relative;

    .code {
      position: absolute;
      top: 0;
      left: 20px;
      right: 20px;
      bottom: 20px;
      margin: 0;
    }
  }
}
</style>
<style lang="stylus" scoped>
.el-container {
  .el-header {
    text-align: center;

    a {
      display: inline-block;
      margin: 10px;
      text-decoration: none;
    }
  }
}
</style>
