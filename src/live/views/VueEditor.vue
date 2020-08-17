<template>
  <el-main>
    <!-- Account: 593278382@qq.com -->
    <editor
      apiKey="9j0jjt7739g05sqrj9uki6phym2b0gxsjqaamqdox4gj52hw"
      v-model="content"
      :init="options"
    ></editor>

    <el-divider content-position="left">输出</el-divider>
    <div v-html="content"></div>
    <el-divider content-position="left">内容</el-divider>
    <div>{{content}}</div>

    <el-divider content-position="left">动效图</el-divider>
  </el-main>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Editor from '@tinymce/tinymce-vue';
@Component({
  name: 'VueEditor',
  components: { Editor }
})
export default class VueEditor extends Vue {
  private content: string = "";
  private options: any = {
    height: 600,
    language: "zh_CN",
    //  content_css: 'css/content.css',
    // menu: {
    //   file: { title: 'File', items: 'newdocument restoredraft | preview | print ' },
    //   edit: { title: 'Edit', items: 'undo redo | cut copy paste | selectall | searchreplace' },
    //   view: { title: 'View', items: 'code | visualaid visualchars visualblocks | spellchecker | preview fullscreen' },
    //   insert: { title: 'Insert', items: 'image link media template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor toc | insertdatetime' },
    //   format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | formats blockformats fontformats fontsizes align | forecolor backcolor | removeformat' },
    //   tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | code wordcount' },
    //   table: { title: 'Table', items: 'inserttable | cell row column | tableprops deletetable' },
    //   help: { title: 'Help', items: 'help' }
    // }
  }
}
</script>
<style lang="stylus" scoped>
.el-main {
  text-align: left;
}
</style>