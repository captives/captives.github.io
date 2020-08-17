<template>
  <div>
    {{user}}
    <button @click="onclick">更改下</button>
  </div>
</template>
<script lang="ts">
import { Component, Vue, PropSync } from 'vue-property-decorator'
@Component({
  name: "VuePropSyncArray"
})
export default class VuePropSyncArray extends Vue {
  @PropSync('value', { type: Array, default: () => [] }) private user!: Array<any>

  private onclick() {
    this.user.push({
      age: 100,
      name: "张三"
    });
  }
}
</script>