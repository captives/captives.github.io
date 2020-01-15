<template>
  <el-row :gutter="20">
    <el-col :span="8">
      显示
      <p style="white-space: pre-line;">{{text}}</p>
    </el-col>
    <el-col :span="8">
      请输入文本
      <el-input type="textarea" :rows="20" v-model="text"></el-input>
    </el-col>

    <el-col :span="8">
      html 显示
      <p v-html="html"></p>
      <p>{{html}}</p>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "VElInput",
  data() {
    return {
      text: ''
    }
  },
  computed: {
    html() {
      let lines = this.text.split('\n');
      //去除空行
      return lines.filter(item => item.trim() != '').join('<br/>');
    }
  }
}
</script>