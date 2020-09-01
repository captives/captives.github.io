<template>
<body>
  <router-view></router-view>
</body>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
@Component({ name: "Main" })
export default class Main extends Vue {

}
</script>
<style lang="stylus" scoped>
.el-container {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
}
</style>
