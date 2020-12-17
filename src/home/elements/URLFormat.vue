<template>
  <el-main>
    <el-row :gutter="50">
      <el-col :span="12">
        <el-divider content-position="left">输入</el-divider>
        <el-input v-model="textInput" type="textarea" :rows="10"></el-input>
      </el-col>
      <el-col :span="12">
        <el-divider content-position="left">输出</el-divider>
        <el-input v-model="textOutput" type="textarea" :rows="10"></el-input>
      </el-col>
    </el-row>
    <el-row class="toolbar center">
      <el-button type="primary" @click="urlEncodeHandler"
        >URLEncode编码</el-button
      >
      <el-button type="success" @click="urlDecodeHandler"
        >URLDecode解码</el-button
      >
      <el-button type="danger" @click="clean">清空输入框</el-button>
    </el-row>
    <el-row>
      <p v-for="(item, index) in list" :key="index">{{ item }}</p>
    </el-row>
  </el-main>
</template>
<script>
export default {
  name: "URLFormat",
  data() {
    return {
      textInput: "",
      textOutput: "",
      list: [],
    };
  },
  methods: {
    urlEncodeHandler() {
      this.textOutput = encodeURIComponent(this.textInput);
      this.list = [];
    },
    urlDecodeHandler() {
      this.textOutput = decodeURIComponent(this.textInput);
      this.list = this.textOutput.split("&");
    },
    clean() {
      this.textInput = this.textOutput = null;
    },
  },
};
</script>
<style lang="stylus" scoped>
.toolbar {
  margin-top: 20px;
}
</style>
