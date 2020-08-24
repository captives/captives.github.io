<template>
  <div class="home">
    <VueSync v-model="title"></VueSync>
    <img alt="Vue logo" src="../assets/logo.png" />
    <VuePropertyDecorator :msg="title"></VuePropertyDecorator>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// @ is an alias to /src
import VuePropertyDecorator from './../components/VuePropertyDecorator.vue'
import VueSync from "./../components/VueSync.vue";
@Component({
  name: "Home",
  components: { VuePropertyDecorator, VueSync }
})

export default class Home extends Vue {
  private title: string = "Vue.js";
  private list:Array<string> = [];
  //:title.sync="title"
}
</script>
<style lang="stylus" scoped>
.home{
  text-align center;
}
</style>