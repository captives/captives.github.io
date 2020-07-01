<template>
  <div>
    <h1>{{docTitle}}</h1>
    <button @click="onclick">更改标题</button>
  </div>
</template>
<script lang="ts">
import { Vue, PropSync, Component } from 'vue-property-decorator';

@Component({
  name: "VueSync"
})
export default class VueSync extends Vue {
  // @PropSync('value', { type: Array, default: () => [] }) private list!: Array<string>;
  @PropSync('value', { type: String, default: "标题" }) private docTitle!: string;
  // @PropSync('title', { type: String, default: "标题" }) private docTitle: string;
  // private get docTitle() {
  //   return this.list.join('----');
  // }
  private onclick() {
    this.docTitle = "讲述VueSync!" +new Date().toUTCString();
    // this.list.push("Time -> " + Date.now());
    console.log(this.docTitle);
  }
}
</script>