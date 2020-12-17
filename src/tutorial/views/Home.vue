<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <VueSync v-model="title"></VueSync>
    <!-- <VuePropertyDecorator :msg="title"></VuePropertyDecorator> -->
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// @ is an alias to /src
import VuePropertyDecorator from "./../components/VuePropertyDecorator.vue";
import VueSync from "./../components/VueSync.vue";
@Component({
  name: "Home",
  components: { VuePropertyDecorator, VueSync },
})
export default class Home extends Vue {
  private title = "Vue.js";
  private list: Array<string> = [];
  private selectValue = false;
}
</script>
<style lang="stylus" scoped>
.home
    text-align center
</style>
