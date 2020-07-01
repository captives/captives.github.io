<template>
  <div>
    {{user}}
    <button @click="onclick">更改下</button>

    <h2>{{offspring}}</h2>
    <button @click="addclick">增加数据</button>
  </div>
</template>
<script lang="ts">
import { Component, Vue, PropSync } from 'vue-property-decorator'
@Component({
  name: "VuePropSync"
})
export default class VuePropSync extends Vue {
  @PropSync('value', { type: Object, default: () => { } }) private user!: any;
  @PropSync('children', { type: Object, default: () => { } }) private offspring!: any;

  private onclick() {
    this.user.age = 100;
    this.user.name = "张三";
    console.log("-0-----", this.user);
  }

  private addclick() {
    this.offspring[Date.now()] = new Date().toLocaleDateString();
    this.$emit('update:children', this.offspring);
  }
}
</script>