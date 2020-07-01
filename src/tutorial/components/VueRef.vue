<template>
  <div>
    <h1>{{ time }}</h1>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({
  name: "VueRef"
})
export default class VueRef extends Vue {
  private time: string = "";
  private created() {
    this.time = new Date().toLocaleString();
  }

  public show(str: string) {
    alert(this.time + '点我干嘛' + str);
  }
}
</script>