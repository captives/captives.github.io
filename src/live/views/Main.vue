<template>
  <el-container>
    <router-view></router-view>
  </el-container>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({ name: "Main" })
export default class Main extends Vue {

}
</script>
<style lang="stylus" scoped>
.el-container {
  text-align: center;
}
</style>
