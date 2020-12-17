<template>
  <div>
    {{ value }}
    <button @click="onclick">更改下</button>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Model } from "vue-property-decorator";
@Component({
  name: "VueModel",
})
export default class VueModel extends Vue {
  @Model("change", { type: Object, default: () => {} }) private value!: any;

  private onclick() {
    this.$emit("change", { age: 100, name: "张三" });
  }
}
</script>
