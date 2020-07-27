<template>
  <el-container id="app">
    <el-header id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </el-header>
      <router-view></router-view>
  </el-container>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component({ name: "App" })
export default class App extends Vue {
  private created() {
    //@ts-ignore
    this.$router.afterEach(() => {
      //@ts-ignore
      document.title = this.$route.name;
    });
  }
}

</script>
<style lang="stylus">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
