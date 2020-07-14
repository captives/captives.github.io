<template>
  <div class="about">
    <h1>This is an about page</h1>
     <FileUploader />
    <a href="https://segmentfault.com/a/1190000005764629">JavaScript 类数组对象</a>
    <a href="https://segmentfault.com/a/1190000017790888">JS判断数组的六种方法详解</a>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import FileUploader from './../components/FileUploader.vue';
@Component({
  name: "About",
  components: { FileUploader }
})
export default class About extends Vue {

}
</script>